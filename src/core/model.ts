// Core game model: exact state variables from COMPLETE_GAME_SPEC.md §2 and the
// journal record from §8. Pure data; no I/O.
import type { Route, Stage } from '../content/types';
export type { Route, Stage } from '../content/types';

export const ROUTES = ['TAV', 'NER', 'KAE'] as const satisfies readonly Route[];
export const SLOTS = ['morning', 'afternoon', 'evening'] as const;
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export const STATS = ['charisma', 'intelligence', 'strength', 'kindness'] as const;
export const LOCATIONS = [
  'home',
  'town_square',
  'royal_library',
  'adventurers_guild',
  'palace_court',
  'royal_gardens',
  'moonwater_quay',
] as const;
export const OPTIONAL_SCENES = [
  'TAV-EVT-PRE-01',
  'TAV-EVT-POST-01',
  'NER-EVT-PRE-01',
  'NER-EVT-POST-01',
  'KAE-EVT-PRE-01',
  'KAE-EVT-POST-01',
] as const;

export const TOTAL_DAYS = 28;
export const TOTAL_SLOTS = TOTAL_DAYS * SLOTS.length; // 84
export const STAT_CAP = 10;
export const PRE_CAP_HALF = 10; // five hearts
export const POST_CAP_HALF = 20; // ten hearts
export const OPTIONAL_THRESHOLD = 3;
export const NAME_MAX_GRAPHEMES = 24;
export const SCHEMA_VERSION = 1 as const;

export type Slot = (typeof SLOTS)[number];
export type Weekday = (typeof WEEKDAYS)[number];
export type Stat = (typeof STATS)[number];
export type LocationId = (typeof LOCATIONS)[number];
export type OptionalSceneId = (typeof OPTIONAL_SCENES)[number];
export type MidpointStatus = 'locked' | 'pending' | 'retry_pending' | 'completed';
export type ProposalStatus = 'locked' | 'retry_pending' | 'completed';
export type Outcome = 'active' | 'won' | 'failed';
export type EncounterKind = 'ordinary' | 'optional' | 'midpoint' | 'midpoint_retry' | 'proposal_retry';
export type ActionKind = 'rest' | 'train' | EncounterKind;

export interface StatChange {
  stat: Stat;
  levelBefore: number;
  partialBefore: 0 | 1;
  levelAfter: number;
  partialAfter: 0 | 1;
}

export interface JournalRecord {
  actionId: string;
  dayBefore: number;
  slotBefore: Slot;
  route: Route;
  kind: ActionKind;
  location: LocationId;
  sceneIdOrActivityId: string | null;
  selectedChoiceId: string | null;
  linkedProposalChoiceId: string | null;
  heartsBeforeHalf: number;
  heartsAfterHalf: number;
  statBeforeAfterOrNull: StatChange | null;
  midpointBeforeAfter: [MidpointStatus, MidpointStatus];
  proposalBeforeAfter: [ProposalStatus, ProposalStatus];
  outcomeAfter: Outcome;
  /** saveRevision of the committed state this action produced. */
  atRevision: number;
}

export interface RunState {
  schemaVersion: typeof SCHEMA_VERSION;
  saveRevision: number;
  runId: string;
  route: Route;
  playerName: string;
  day: number;
  slot: Slot;
  heartsHalf: number;
  stats: Record<Stat, number>;
  trainingPartial: Record<Stat, 0 | 1>;
  midpointStatus: MidpointStatus;
  midpointFirstSeen: boolean;
  proposalStatus: ProposalStatus;
  proposalFirstSeen: boolean;
  optionalsExperienced: Record<OptionalSceneId, boolean>;
  dailyEncounterUsed: boolean;
  ordinaryNext: Record<Route, Record<Stage, number>>;
  journal: JournalRecord[];
  outcome: Outcome;
  winnerRoute: Route | null;
}

/** Persistent ending gallery, stored separately from the run. */
export interface GalleryRecord {
  schemaVersion: typeof SCHEMA_VERSION;
  completed: Route[];
}

export type PlayerAction =
  | { type: 'rest'; actionId: string; location: LocationId }
  | { type: 'train'; actionId: string; location: LocationId; activityId: string }
  | {
      type: 'encounter';
      actionId: string;
      location: LocationId;
      encounter: EncounterKind;
      sceneId: string;
      choiceId: string;
      linkedProposalChoiceId: string | null;
    };

/** Reasons an attempted action is refused. Refusals never mutate state. */
export type RefusalCode =
  | 'terminal'
  | 'wrong_location'
  | 'unknown_activity'
  | 'stat_capped'
  | 'not_scheduled'
  | 'used_today'
  | 'midpoint_requirements'
  | 'encounter_mismatch'
  | 'unknown_scene'
  | 'bad_choice'
  | 'linked_proposal_required'
  | 'linked_proposal_unexpected'
  | 'duplicate_action';

export function isRoute(v: unknown): v is Route {
  return v === 'TAV' || v === 'NER' || v === 'KAE';
}
export function isLocation(v: unknown): v is LocationId {
  return typeof v === 'string' && (LOCATIONS as readonly string[]).includes(v);
}
export function isSlot(v: unknown): v is Slot {
  return typeof v === 'string' && (SLOTS as readonly string[]).includes(v);
}
