// Run-state validation used for imports and for startup corruption detection.
// Two layers: (1) exact structural/type/range checks, then (2) a full replay of
// the journal through the real engine from a fresh run; the replayed state must
// equal the stored state field for field. Invalid states are rejected, never
// coerced (SAVE_RECOVERY_AND_FAILURES.md).
import {
  OPTIONAL_SCENES,
  ROUTES,
  SCHEMA_VERSION,
  SLOTS,
  STATS,
  STAT_CAP,
  TOTAL_DAYS,
  TOTAL_SLOTS,
  isLocation,
  isRoute,
  isSlot,
  type GalleryRecord,
  type JournalRecord,
  type Route,
  type RunState,
} from './model';
import { actionFromRecord, applyAction, newRun, normalizePlayerName } from './engine';

export type ValidationResult<T> = { ok: true; value: T } | { ok: false; errors: string[] };

const RUN_KEYS = [
  'schemaVersion',
  'saveRevision',
  'runId',
  'route',
  'playerName',
  'day',
  'slot',
  'heartsHalf',
  'stats',
  'trainingPartial',
  'midpointStatus',
  'midpointFirstSeen',
  'proposalStatus',
  'proposalFirstSeen',
  'optionalsExperienced',
  'dailyEncounterUsed',
  'ordinaryNext',
  'journal',
  'outcome',
  'winnerRoute',
] as const;

const RECORD_KEYS = [
  'actionId',
  'dayBefore',
  'slotBefore',
  'route',
  'kind',
  'location',
  'sceneIdOrActivityId',
  'selectedChoiceId',
  'linkedProposalChoiceId',
  'heartsBeforeHalf',
  'heartsAfterHalf',
  'statBeforeAfterOrNull',
  'midpointBeforeAfter',
  'proposalBeforeAfter',
  'outcomeAfter',
  'atRevision',
] as const;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MIDPOINT = ['locked', 'pending', 'retry_pending', 'completed'];
const PROPOSAL = ['locked', 'retry_pending', 'completed'];
const OUTCOMES = ['active', 'won', 'failed'];
const KINDS = ['rest', 'train', 'ordinary', 'optional', 'midpoint', 'midpoint_retry', 'proposal_retry'];

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isInt = (v: unknown, lo: number, hi: number) => typeof v === 'number' && Number.isInteger(v) && v >= lo && v <= hi;

function exactKeys(o: Record<string, unknown>, keys: readonly string[], where: string, errs: string[]) {
  for (const k of Object.keys(o)) if (!keys.includes(k)) errs.push(`${where}: unexpected field "${k}"`);
  for (const k of keys) if (!(k in o)) errs.push(`${where}: missing field "${k}"`);
}

function checkRecordShape(r: unknown, i: number, errs: string[]): r is JournalRecord {
  const w = `journal[${i}]`;
  if (!isObj(r)) {
    errs.push(`${w}: not an object`);
    return false;
  }
  const before = errs.length;
  exactKeys(r, RECORD_KEYS, w, errs);
  if (typeof r.actionId !== 'string' || !UUID_RE.test(r.actionId)) errs.push(`${w}.actionId must be a UUID`);
  if (!isInt(r.dayBefore, 1, TOTAL_DAYS)) errs.push(`${w}.dayBefore out of range`);
  if (!isSlot(r.slotBefore)) errs.push(`${w}.slotBefore invalid`);
  if (!isRoute(r.route)) errs.push(`${w}.route invalid`);
  if (!KINDS.includes(r.kind as string)) errs.push(`${w}.kind invalid`);
  if (!isLocation(r.location)) errs.push(`${w}.location invalid`);
  for (const k of ['sceneIdOrActivityId', 'selectedChoiceId', 'linkedProposalChoiceId'] as const)
    if (r[k] !== null && typeof r[k] !== 'string') errs.push(`${w}.${k} must be string or null`);
  if (!isInt(r.heartsBeforeHalf, 0, 20) || !isInt(r.heartsAfterHalf, 0, 20)) errs.push(`${w}: hearts out of range`);
  if (!Array.isArray(r.midpointBeforeAfter) || r.midpointBeforeAfter.length !== 2 || !r.midpointBeforeAfter.every((x) => MIDPOINT.includes(x as string)))
    errs.push(`${w}.midpointBeforeAfter invalid`);
  if (!Array.isArray(r.proposalBeforeAfter) || r.proposalBeforeAfter.length !== 2 || !r.proposalBeforeAfter.every((x) => PROPOSAL.includes(x as string)))
    errs.push(`${w}.proposalBeforeAfter invalid`);
  if (!OUTCOMES.includes(r.outcomeAfter as string)) errs.push(`${w}.outcomeAfter invalid`);
  if (!isInt(r.atRevision, 1, Number.MAX_SAFE_INTEGER)) errs.push(`${w}.atRevision invalid`);
  const sc = r.statBeforeAfterOrNull;
  if (sc !== null) {
    if (!isObj(sc)) errs.push(`${w}.statBeforeAfterOrNull invalid`);
    else {
      exactKeys(sc, ['stat', 'levelBefore', 'partialBefore', 'levelAfter', 'partialAfter'], `${w}.statBeforeAfterOrNull`, errs);
      if (!(STATS as readonly string[]).includes(sc.stat as string)) errs.push(`${w}: stat invalid`);
      if (!isInt(sc.levelBefore, 0, STAT_CAP) || !isInt(sc.levelAfter, 0, STAT_CAP)) errs.push(`${w}: stat level out of range`);
      if (!isInt(sc.partialBefore, 0, 1) || !isInt(sc.partialAfter, 0, 1)) errs.push(`${w}: partial out of range`);
    }
  }
  return errs.length === before;
}

/** Structural check of a run object. Returns the typed value only if fully well-formed. */
export function checkRunShape(v: unknown): ValidationResult<RunState> {
  const errs: string[] = [];
  if (!isObj(v)) return { ok: false, errors: ['activeRun must be an object or null'] };
  exactKeys(v, RUN_KEYS, 'activeRun', errs);
  if (v.schemaVersion !== SCHEMA_VERSION) errs.push(`activeRun.schemaVersion must be ${SCHEMA_VERSION}`);
  if (!isInt(v.saveRevision, 0, Number.MAX_SAFE_INTEGER)) errs.push('saveRevision invalid');
  if (typeof v.runId !== 'string' || !UUID_RE.test(v.runId)) errs.push('runId must be a UUID');
  if (!isRoute(v.route)) errs.push('route invalid');
  if (typeof v.playerName !== 'string') errs.push('playerName must be a string');
  else {
    const n = normalizePlayerName(v.playerName);
    if (!n.ok || n.name !== v.playerName) errs.push('playerName is not a normalized name (≤24 graphemes, trimmed, no control characters)');
  }
  if (!isInt(v.day, 1, TOTAL_DAYS)) errs.push('day out of range 1..28');
  if (!isSlot(v.slot)) errs.push('slot invalid');
  if (!isInt(v.heartsHalf, 0, 20)) errs.push('heartsHalf out of range 0..20');
  for (const key of ['stats', 'trainingPartial'] as const) {
    const m = v[key];
    if (!isObj(m)) errs.push(`${key} must be an object`);
    else {
      exactKeys(m, STATS, key, errs);
      for (const st of STATS) if (!isInt(m[st], 0, key === 'stats' ? STAT_CAP : 1)) errs.push(`${key}.${st} out of range`);
    }
  }
  if (!MIDPOINT.includes(v.midpointStatus as string)) errs.push('midpointStatus invalid');
  if (!PROPOSAL.includes(v.proposalStatus as string)) errs.push('proposalStatus invalid');
  for (const b of ['midpointFirstSeen', 'proposalFirstSeen', 'dailyEncounterUsed'] as const)
    if (typeof v[b] !== 'boolean') errs.push(`${b} must be boolean`);
  if (!isObj(v.optionalsExperienced)) errs.push('optionalsExperienced must be an object');
  else {
    exactKeys(v.optionalsExperienced, OPTIONAL_SCENES, 'optionalsExperienced', errs);
    for (const k of OPTIONAL_SCENES) if (typeof v.optionalsExperienced[k] !== 'boolean') errs.push(`optionalsExperienced.${k} must be boolean`);
  }
  if (!isObj(v.ordinaryNext)) errs.push('ordinaryNext must be an object');
  else {
    exactKeys(v.ordinaryNext, ROUTES, 'ordinaryNext', errs);
    for (const r of ROUTES) {
      const c = v.ordinaryNext[r];
      if (!isObj(c)) errs.push(`ordinaryNext.${r} invalid`);
      else {
        exactKeys(c, ['PRE', 'POST'], `ordinaryNext.${r}`, errs);
        if (!isInt(c.PRE, 0, TOTAL_SLOTS) || !isInt(c.POST, 0, TOTAL_SLOTS)) errs.push(`ordinaryNext.${r} cursor out of range`);
      }
    }
  }
  if (!OUTCOMES.includes(v.outcome as string)) errs.push('outcome invalid');
  if (v.winnerRoute !== null && !isRoute(v.winnerRoute)) errs.push('winnerRoute invalid');
  if (!Array.isArray(v.journal)) errs.push('journal must be an array');
  else {
    if (v.journal.length > TOTAL_SLOTS) errs.push('journal longer than 84 records');
    v.journal.forEach((r, i) => checkRecordShape(r, i, errs));
    const ids = new Set<string>();
    for (const r of v.journal) if (isObj(r) && typeof r.actionId === 'string') {
      if (ids.has(r.actionId)) errs.push(`duplicate journal actionId ${r.actionId}`);
      ids.add(r.actionId);
    }
  }
  return errs.length ? { ok: false, errors: errs } : { ok: true, value: v as unknown as RunState };
}

/**
 * Full validation: shape, then deterministic replay through the engine.
 * The replay reproduces each recorded action at its recorded revision and must
 * yield byte-identical journal records and an identical final state.
 */
export function validateRun(v: unknown): ValidationResult<RunState> {
  const shape = checkRunShape(v);
  if (!shape.ok) return shape;
  const stored = shape.value;
  const errs: string[] = [];

  let s = newRun(stored.route, stored.playerName, stored.runId, 0);
  let prevRev = 0;
  for (let i = 0; i < stored.journal.length; i++) {
    const rec = stored.journal[i]!;
    if (rec.atRevision <= prevRev && i > 0) {
      errs.push(`journal[${i}].atRevision not increasing`);
      break;
    }
    if (rec.route !== stored.route) {
      errs.push(`journal[${i}] belongs to another route`);
      break;
    }
    s = { ...s, saveRevision: rec.atRevision - 1 };
    const res = applyAction(s, actionFromRecord(rec));
    if (!res.ok) {
      errs.push(`journal[${i}] (${rec.kind} on Day ${rec.dayBefore} ${rec.slotBefore}) is not a legal action: ${res.code}`);
      break;
    }
    if (JSON.stringify(res.record) !== JSON.stringify(canonicalRecord(rec))) {
      errs.push(`journal[${i}] does not match the replayed result of its own action`);
      break;
    }
    s = res.state;
    prevRev = rec.atRevision;
  }
  if (!errs.length) {
    if (stored.saveRevision < prevRev) errs.push('saveRevision is older than the last journal record');
    const a = { ...s, saveRevision: 0 };
    const b = { ...canonicalRun(stored), saveRevision: 0 };
    if (JSON.stringify(a) !== JSON.stringify(b)) {
      const diff = RUN_KEYS.filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
      errs.push(`state does not match its journal replay (fields: ${diff.join(', ')})`);
    }
  }
  return errs.length ? { ok: false, errors: errs } : { ok: true, value: stored };
}

/** Re-create an object with keys in engine order so JSON comparison is order-independent. */
function canonicalRecord(r: JournalRecord): JournalRecord {
  return {
    actionId: r.actionId,
    dayBefore: r.dayBefore,
    slotBefore: r.slotBefore,
    route: r.route,
    kind: r.kind,
    location: r.location,
    sceneIdOrActivityId: r.sceneIdOrActivityId,
    selectedChoiceId: r.selectedChoiceId,
    linkedProposalChoiceId: r.linkedProposalChoiceId,
    heartsBeforeHalf: r.heartsBeforeHalf,
    heartsAfterHalf: r.heartsAfterHalf,
    statBeforeAfterOrNull: r.statBeforeAfterOrNull
      ? {
          stat: r.statBeforeAfterOrNull.stat,
          levelBefore: r.statBeforeAfterOrNull.levelBefore,
          partialBefore: r.statBeforeAfterOrNull.partialBefore,
          levelAfter: r.statBeforeAfterOrNull.levelAfter,
          partialAfter: r.statBeforeAfterOrNull.partialAfter,
        }
      : null,
    midpointBeforeAfter: [r.midpointBeforeAfter[0], r.midpointBeforeAfter[1]],
    proposalBeforeAfter: [r.proposalBeforeAfter[0], r.proposalBeforeAfter[1]],
    outcomeAfter: r.outcomeAfter,
    atRevision: r.atRevision,
  };
}

function canonicalRun(r: RunState): RunState {
  const base = newRun(r.route, r.playerName, r.runId, r.saveRevision);
  return {
    ...base,
    day: r.day,
    slot: r.slot,
    heartsHalf: r.heartsHalf,
    stats: Object.fromEntries(STATS.map((k) => [k, r.stats[k]])) as RunState['stats'],
    trainingPartial: Object.fromEntries(STATS.map((k) => [k, r.trainingPartial[k]])) as RunState['trainingPartial'],
    midpointStatus: r.midpointStatus,
    midpointFirstSeen: r.midpointFirstSeen,
    proposalStatus: r.proposalStatus,
    proposalFirstSeen: r.proposalFirstSeen,
    optionalsExperienced: Object.fromEntries(OPTIONAL_SCENES.map((k) => [k, r.optionalsExperienced[k]])) as RunState['optionalsExperienced'],
    dailyEncounterUsed: r.dailyEncounterUsed,
    ordinaryNext: Object.fromEntries(ROUTES.map((k) => [k, { PRE: r.ordinaryNext[k].PRE, POST: r.ordinaryNext[k].POST }])) as RunState['ordinaryNext'],
    journal: r.journal.map(canonicalRecord),
    outcome: r.outcome,
    winnerRoute: r.winnerRoute,
  };
}

export function validateGallery(v: unknown): ValidationResult<Route[]> {
  if (!Array.isArray(v)) return { ok: false, errors: ['completedGallery must be an array'] };
  const errs: string[] = [];
  const seen = new Set<string>();
  for (const r of v) {
    if (!isRoute(r)) errs.push(`completedGallery contains invalid route ${JSON.stringify(r)}`);
    else if (seen.has(r)) errs.push(`completedGallery lists ${r} twice`);
    else seen.add(r);
  }
  return errs.length ? { ok: false, errors: errs } : { ok: true, value: sortRoutes(v as Route[]) };
}

export function validateGalleryRecord(v: unknown): ValidationResult<GalleryRecord> {
  if (!isObj(v)) return { ok: false, errors: ['gallery record must be an object'] };
  const errs: string[] = [];
  exactKeys(v, ['schemaVersion', 'completed'], 'gallery', errs);
  if (v.schemaVersion !== SCHEMA_VERSION) errs.push(`gallery.schemaVersion must be ${SCHEMA_VERSION}`);
  const g = validateGallery(v.completed);
  if (!g.ok) errs.push(...g.errors);
  return errs.length ? { ok: false, errors: errs } : { ok: true, value: { schemaVersion: SCHEMA_VERSION, completed: (g as { ok: true; value: Route[] }).value } };
}

export function sortRoutes(rs: Route[]): Route[] {
  return ROUTES.filter((r) => rs.includes(r));
}

/** Consistency rule between a run and the gallery it travels with. */
export function runGalleryConsistent(run: RunState | null, gallery: Route[]): string[] {
  if (run && run.outcome === 'won' && run.winnerRoute && !gallery.includes(run.winnerRoute))
    return ['a won run must have its route in the completed gallery'];
  return [];
}

export { SLOTS };
