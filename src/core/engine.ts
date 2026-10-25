// Pure deterministic game engine. Eligibility checks are read-only; the only
// state transition is applyAction(), which returns a new state plus exactly one
// journal record, or a refusal that leaves the input untouched.
import {
  OPTIONAL_SCENES,
  OPTIONAL_THRESHOLD,
  POST_CAP_HALF,
  PRE_CAP_HALF,
  ROUTES,
  SCHEMA_VERSION,
  SLOTS,
  STAT_CAP,
  STATS,
  TOTAL_DAYS,
  NAME_MAX_GRAPHEMES,
  type EncounterKind,
  type JournalRecord,
  type LocationId,
  type OptionalSceneId,
  type PlayerAction,
  type RefusalCode,
  type Route,
  type RunState,
  type Slot,
  type Stat,
  type StatChange,
  type Stage,
} from './model';
import { ACTIVITY_BY_ID, ACTIVITIES, MIDPOINT_PRIMARY, MIDPOINT_SECONDARY, ROUTE_SPECS, meetingLocation, type ActivitySpec } from './schedule';
import { findOption, getScene, ordinarySceneId, sceneIds, CONTENT } from './content';

// ---------------------------------------------------------------------------
// Player name

export type NameResult = { ok: true; name: string } | { ok: false; reason: 'too_long' | 'control_chars' };

export function graphemeCount(s: string): number {
  const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  let n = 0;
  for (const _ of seg.segment(s)) n++;
  return n;
}

/** Trim, NFC-normalize, enforce ≤24 grapheme clusters; empty → "Traveler" (TXT-NAME-FALLBACK). */
export function normalizePlayerName(input: string): NameResult {
  const s = input.normalize('NFC').trim();
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/.test(s)) return { ok: false, reason: 'control_chars' };
  if (graphemeCount(s) > NAME_MAX_GRAPHEMES) return { ok: false, reason: 'too_long' };
  return { ok: true, name: s === '' ? CONTENT.support.strings['TXT-NAME-FALLBACK'] ?? 'Traveler' : s };
}

// ---------------------------------------------------------------------------
// New run

export function newRun(route: Route, playerName: string, runId: string, saveRevision: number): RunState {
  return {
    schemaVersion: SCHEMA_VERSION,
    saveRevision,
    runId,
    route,
    playerName,
    day: 1,
    slot: 'morning',
    heartsHalf: 0,
    stats: { charisma: 0, intelligence: 0, strength: 0, kindness: 0 },
    trainingPartial: { charisma: 0, intelligence: 0, strength: 0, kindness: 0 },
    midpointStatus: 'locked',
    midpointFirstSeen: false,
    proposalStatus: 'locked',
    proposalFirstSeen: false,
    optionalsExperienced: Object.fromEntries(OPTIONAL_SCENES.map((s) => [s, false])) as Record<OptionalSceneId, boolean>,
    dailyEncounterUsed: false,
    ordinaryNext: Object.fromEntries(ROUTES.map((r) => [r, { PRE: 0, POST: 0 }])) as Record<Route, Record<Stage, number>>,
    journal: [],
    outcome: 'active',
    winnerRoute: null,
  };
}

// ---------------------------------------------------------------------------
// Derived values

export const stageOf = (s: RunState): Stage => (s.midpointStatus === 'completed' ? 'POST' : 'PRE');
export const heartCap = (s: RunState): number => (s.midpointStatus === 'completed' ? POST_CAP_HALF : PRE_CAP_HALF);
export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function midpointRequirementsMet(s: RunState): boolean {
  const spec = ROUTE_SPECS[s.route];
  return s.stats[spec.primary] >= MIDPOINT_PRIMARY && s.stats[spec.secondary] >= MIDPOINT_SECONDARY;
}

export interface MidpointRequirements {
  primary: { stat: Stat; need: number; have: number };
  secondary: { stat: Stat; need: number; have: number };
}
export function midpointRequirements(s: RunState): MidpointRequirements {
  const spec = ROUTE_SPECS[s.route];
  return {
    primary: { stat: spec.primary, need: MIDPOINT_PRIMARY, have: s.stats[spec.primary] },
    secondary: { stat: spec.secondary, need: MIDPOINT_SECONDARY, have: s.stats[spec.secondary] },
  };
}

/** Training math (§5): 0..4 → +1 level; 5..9 → partial 0→1, then 1→0 and +1 level. */
export function trainingResult(level: number, partial: 0 | 1): { level: number; partial: 0 | 1 } {
  if (level >= STAT_CAP) return { level, partial };
  if (level < 5) return { level: level + 1, partial: 0 };
  if (partial === 0) return { level, partial: 1 };
  return { level: level + 1, partial: 0 };
}

// ---------------------------------------------------------------------------
// Read-only availability (never mutates)

export interface EncounterOffer {
  encounter: EncounterKind;
  sceneId: string;
}

export interface EncounterAvailability {
  /** Where the princess is during the current slot (null if unavailable this slot). */
  princessLocationNow: LocationId | null;
  offers: EncounterOffer[];
  blocked: null | { code: 'terminal' | 'not_scheduled' | 'used_today' | 'midpoint_requirements'; requirements?: MidpointRequirements };
}

export function encounterAvailability(s: RunState, location: LocationId): EncounterAvailability {
  const where = meetingLocation(s.route, s.day, s.slot);
  const base = { princessLocationNow: where };
  if (s.outcome !== 'active') return { ...base, offers: [], blocked: { code: 'terminal' } };
  if (where !== location) return { ...base, offers: [], blocked: { code: 'not_scheduled' } };
  if (s.dailyEncounterUsed) return { ...base, offers: [], blocked: { code: 'used_today' } };

  if (s.midpointStatus === 'pending' || s.midpointStatus === 'retry_pending') {
    if (!midpointRequirementsMet(s)) {
      return { ...base, offers: [], blocked: { code: 'midpoint_requirements', requirements: midpointRequirements(s) } };
    }
    const offer: EncounterOffer =
      s.midpointStatus === 'pending'
        ? { encounter: 'midpoint', sceneId: sceneIds.midpoint(s.route) }
        : { encounter: 'midpoint_retry', sceneId: sceneIds.midpointRetry(s.route) };
    return { ...base, offers: [offer], blocked: null };
  }
  if (s.proposalStatus === 'retry_pending') {
    return { ...base, offers: [{ encounter: 'proposal_retry', sceneId: sceneIds.proposalRetry(s.route) }], blocked: null };
  }

  const stage = stageOf(s);
  const cap = heartCap(s);
  const offers: EncounterOffer[] = [];
  if (s.heartsHalf < cap) {
    offers.push({ encounter: 'ordinary', sceneId: ordinarySceneId(s.route, stage, s.ordinaryNext[s.route][stage]) });
    const spec = stage === 'PRE' ? ROUTE_SPECS[s.route].optionalPre : ROUTE_SPECS[s.route].optionalPost;
    if (!s.optionalsExperienced[spec.sceneId] && s.stats[spec.stat] >= Math.max(spec.atLeast, OPTIONAL_THRESHOLD)) {
      offers.push({ encounter: 'optional', sceneId: spec.sceneId });
    }
  }
  return { ...base, offers, blocked: null };
}

export interface TrainingOffer {
  activity: ActivitySpec;
  available: boolean;
  reason: null | 'terminal' | 'stat_capped';
}

export function trainingAvailability(s: RunState, location: LocationId): TrainingOffer[] {
  return ACTIVITIES.filter((a) => a.location === location).map((activity) => {
    const reason = s.outcome !== 'active' ? 'terminal' : s.stats[activity.stat] >= STAT_CAP ? 'stat_capped' : null;
    return { activity, available: reason === null, reason };
  });
}

export function canRest(s: RunState): boolean {
  return s.outcome === 'active';
}

/**
 * For an ordinary/optional choice, project the clamped heart result and
 * whether the full proposal must be linked into the same encounter (§6).
 */
export function projectEarning(s: RunState, netHalfHearts: number): { projected: number; applied: number; linkedProposal: boolean; reachesMidpoint: boolean } {
  const cap = heartCap(s);
  const projected = clamp(s.heartsHalf + netHalfHearts, 0, cap);
  const linkedProposal = s.midpointStatus === 'completed' && projected === POST_CAP_HALF && !s.proposalFirstSeen && s.proposalStatus === 'locked';
  const reachesMidpoint = s.midpointStatus === 'locked' && projected === PRE_CAP_HALF;
  return { projected, applied: projected - s.heartsHalf, linkedProposal, reachesMidpoint };
}

// ---------------------------------------------------------------------------
// The single state transition

export type ApplyResult = { ok: true; state: RunState; record: JournalRecord } | { ok: false; code: RefusalCode };

const refuse = (code: RefusalCode): ApplyResult => ({ ok: false, code });

function advanceTime(s: RunState): void {
  if (s.outcome === 'won') return; // victory time is preserved (§8 Advance)
  if (s.day === TOTAL_DAYS && s.slot === 'evening') {
    s.outcome = 'failed'; // no playable Day 29
    return;
  }
  const i = SLOTS.indexOf(s.slot);
  if (i < SLOTS.length - 1) s.slot = SLOTS[i + 1] as Slot;
  else {
    s.slot = 'morning';
    s.day += 1;
    s.dailyEncounterUsed = false;
  }
}

function clone(s: RunState): RunState {
  return structuredClone(s);
}

export function applyAction(state: RunState, action: PlayerAction): ApplyResult {
  if (state.outcome !== 'active') return refuse('terminal');
  if (state.journal.some((j) => j.actionId === action.actionId)) return refuse('duplicate_action');

  const s = clone(state);
  const before = {
    day: s.day,
    slot: s.slot,
    hearts: s.heartsHalf,
    midpoint: s.midpointStatus,
    proposal: s.proposalStatus,
  };
  let statChange: StatChange | null = null;
  let sceneOrActivity: string | null = null;
  let selectedChoiceId: string | null = null;
  let linkedProposalChoiceId: string | null = null;
  let kind: JournalRecord['kind'];

  if (action.type === 'rest') {
    kind = 'rest';
  } else if (action.type === 'train') {
    kind = 'train';
    const a = ACTIVITY_BY_ID[action.activityId];
    if (!a) return refuse('unknown_activity');
    if (a.location !== action.location) return refuse('wrong_location');
    const lvl = s.stats[a.stat];
    if (lvl >= STAT_CAP) return refuse('stat_capped');
    const part = s.trainingPartial[a.stat];
    const r = trainingResult(lvl, part);
    s.stats[a.stat] = r.level;
    s.trainingPartial[a.stat] = r.partial;
    statChange = { stat: a.stat, levelBefore: lvl, partialBefore: part, levelAfter: r.level, partialAfter: r.partial };
    sceneOrActivity = a.id;
  } else {
    kind = action.encounter;
    const avail = encounterAvailability(s, action.location);
    if (avail.blocked) return refuse(avail.blocked.code);
    const offer = avail.offers.find((o) => o.encounter === action.encounter);
    if (!offer || offer.sceneId !== action.sceneId) return refuse('encounter_mismatch');
    const scene = getScene(action.sceneId);
    if (!scene) return refuse('unknown_scene');
    const option = findOption(scene, action.choiceId);
    if (!option) return refuse('bad_choice');
    sceneOrActivity = scene.sceneId;
    selectedChoiceId = option.choiceId;
    const route = s.route;

    if (action.encounter === 'ordinary' || action.encounter === 'optional') {
      const proj = projectEarning(s, option.netHalfHearts);
      if (proj.linkedProposal) {
        if (!action.linkedProposalChoiceId) return refuse('linked_proposal_required');
        const fin = getScene(sceneIds.proposal(route));
        if (!fin) return refuse('unknown_scene');
        const finOpt = findOption(fin, action.linkedProposalChoiceId);
        if (!finOpt) return refuse('bad_choice');
        linkedProposalChoiceId = finOpt.choiceId;
        s.heartsHalf = proj.projected;
        s.proposalFirstSeen = true;
        if (finOpt.outcomeClass === 'correct') {
          s.proposalStatus = 'completed';
          s.outcome = 'won';
          s.winnerRoute = route;
        } else {
          s.proposalStatus = 'retry_pending';
        }
      } else {
        if (action.linkedProposalChoiceId !== null) return refuse('linked_proposal_unexpected');
        s.heartsHalf = proj.projected;
        if (proj.reachesMidpoint) s.midpointStatus = 'pending';
      }
      if (action.encounter === 'ordinary') {
        const stage = stageOf(state); // stage at encounter start
        s.ordinaryNext[route][stage] += 1;
      } else {
        s.optionalsExperienced[scene.sceneId as OptionalSceneId] = true;
      }
    } else {
      if (action.linkedProposalChoiceId !== null) return refuse('linked_proposal_unexpected');
      const correct = option.outcomeClass === 'correct';
      if (action.encounter === 'midpoint' || action.encounter === 'midpoint_retry') {
        s.midpointFirstSeen = true;
        s.midpointStatus = correct ? 'completed' : 'retry_pending';
      } else {
        // proposal_retry
        if (correct) {
          s.proposalStatus = 'completed';
          s.outcome = 'won';
          s.winnerRoute = route;
        }
      }
    }
    s.dailyEncounterUsed = true;
  }

  advanceTime(s);
  s.saveRevision = state.saveRevision + 1;
  const record: JournalRecord = {
    actionId: action.actionId,
    dayBefore: before.day,
    slotBefore: before.slot,
    route: s.route,
    kind,
    location: action.location,
    sceneIdOrActivityId: sceneOrActivity,
    selectedChoiceId,
    linkedProposalChoiceId,
    heartsBeforeHalf: before.hearts,
    heartsAfterHalf: s.heartsHalf,
    statBeforeAfterOrNull: statChange,
    midpointBeforeAfter: [before.midpoint, s.midpointStatus],
    proposalBeforeAfter: [before.proposal, s.proposalStatus],
    outcomeAfter: s.outcome,
    atRevision: s.saveRevision,
  };
  s.journal.push(record);
  return { ok: true, state: s, record };
}

/** Rebuild the action that produced a journal record (used by save validation/replay). */
export function actionFromRecord(r: JournalRecord): PlayerAction {
  if (r.kind === 'rest') return { type: 'rest', actionId: r.actionId, location: r.location };
  if (r.kind === 'train') return { type: 'train', actionId: r.actionId, location: r.location, activityId: r.sceneIdOrActivityId ?? '' };
  return {
    type: 'encounter',
    actionId: r.actionId,
    location: r.location,
    encounter: r.kind,
    sceneId: r.sceneIdOrActivityId ?? '',
    choiceId: r.selectedChoiceId ?? '',
    linkedProposalChoiceId: r.linkedProposalChoiceId,
  };
}

export { STATS };
