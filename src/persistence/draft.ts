// Pending-encounter draft: navigation state only, never reward-bearing.
// Stored separately from the committed run (SAVE_RECOVERY "Precise draft checkpoint").
import { isLocation, isRoute, isSlot, type EncounterKind, type LocationId, type Route, type RunState, type Slot } from '../core/model';
import { encounterAvailability } from '../core/engine';
import { getScene } from '../core/content';

export type DraftStage = 'intro' | 'branch' | 'linked_proposal' | 'ready_to_commit';

export interface EncounterDraft {
  actionId: string;
  startRevision: number;
  sceneId: string;
  originKind: EncounterKind;
  location: LocationId;
  progressLineIndex: number;
  selectedOriginChoiceId: string | null;
  selectedProposalChoiceId: string | null;
  stage: DraftStage;
  route: Route;
  day: number;
  slot: Slot;
  createdAt: string;
}

const KINDS: EncounterKind[] = ['ordinary', 'optional', 'midpoint', 'midpoint_retry', 'proposal_retry'];
const STAGES: DraftStage[] = ['intro', 'branch', 'linked_proposal', 'ready_to_commit'];

export function isDraftShape(v: unknown): v is EncounterDraft {
  if (!v || typeof v !== 'object') return false;
  const d = v as Record<string, unknown>;
  return (
    typeof d.actionId === 'string' &&
    typeof d.startRevision === 'number' &&
    typeof d.sceneId === 'string' &&
    KINDS.includes(d.originKind as EncounterKind) &&
    isLocation(d.location) &&
    typeof d.progressLineIndex === 'number' &&
    Number.isInteger(d.progressLineIndex) &&
    d.progressLineIndex >= 0 &&
    (d.selectedOriginChoiceId === null || typeof d.selectedOriginChoiceId === 'string') &&
    (d.selectedProposalChoiceId === null || typeof d.selectedProposalChoiceId === 'string') &&
    STAGES.includes(d.stage as DraftStage) &&
    isRoute(d.route) &&
    typeof d.day === 'number' &&
    isSlot(d.slot) &&
    typeof d.createdAt === 'string'
  );
}

export type DraftCheck = { status: 'resumable' } | { status: 'stale'; reason: 'revision' | 'committed' | 'unavailable' | 'malformed' };

/** Decide whether a stored draft can be resumed against the committed run. */
export function checkDraft(draft: unknown, run: RunState | null): DraftCheck {
  if (!isDraftShape(draft) || !run) return { status: 'stale', reason: 'malformed' };
  if (run.journal.some((j) => j.actionId === draft.actionId)) return { status: 'stale', reason: 'committed' };
  if (draft.startRevision !== run.saveRevision) return { status: 'stale', reason: 'revision' };
  if (draft.route !== run.route || draft.day !== run.day || draft.slot !== run.slot) return { status: 'stale', reason: 'revision' };
  const avail = encounterAvailability(run, draft.location);
  if (!avail.offers.some((o) => o.encounter === draft.originKind && o.sceneId === draft.sceneId)) return { status: 'stale', reason: 'unavailable' };
  const scene = getScene(draft.sceneId);
  if (!scene) return { status: 'stale', reason: 'malformed' };
  if (draft.selectedOriginChoiceId && !scene.options.some((o) => o.choiceId === draft.selectedOriginChoiceId)) return { status: 'stale', reason: 'malformed' };
  return { status: 'resumable' };
}
