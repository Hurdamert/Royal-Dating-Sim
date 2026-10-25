// Contextual filtering of the 14 approved Humpty help passages (free, read-only).
// Filters never reveal hidden optional thresholds.
import type { RunState } from '../core/model';
import { encounterAvailability, midpointRequirementsMet } from '../core/engine';
import { meetingLocation } from '../core/schedule';
import type { SessionSnapshot } from '../persistence/session';

export function relevantHelp(run: RunState | null, snap: SessionSnapshot): string[] {
  const ids: string[] = [];
  if (!run) {
    ids.push('HD-HELP-START');
    if (snap.phase === 'recovery') ids.push('HD-HELP-RECOVERY');
    return ids;
  }
  if (run.outcome === 'failed') return ['HD-HELP-FAILURE', 'HD-HELP-SAVING'];
  if (run.journal.length < 3) ids.push('HD-HELP-START', 'HD-HELP-SCHEDULE', 'HD-HELP-TRAIN');
  if (run.dailyEncounterUsed) ids.push('HD-HELP-DAILY');
  if (run.midpointStatus === 'pending' || run.midpointStatus === 'retry_pending') {
    ids.push('HD-HELP-CAP');
    if (!midpointRequirementsMet(run)) ids.push('HD-HELP-CAP_BLOCKED');
  }
  if (run.midpointStatus === 'retry_pending') ids.push('HD-HELP-MID_RETRY');
  if (run.midpointStatus === 'completed' && run.heartsHalf >= 16 && run.proposalStatus === 'locked') ids.push('HD-HELP-TEN_HEARTS');
  if (run.proposalStatus === 'retry_pending') ids.push('HD-HELP-FIN_RETRY');
  if (run.day >= 24) ids.push('HD-HELP-DEADLINE');
  const where = meetingLocation(run.route, run.day, run.slot);
  if (where && encounterAvailability(run, where).offers.some((o) => o.encounter === 'optional')) ids.push('HD-HELP-OPTIONAL');
  if (snap.saveStatus === 'error' || snap.access !== 'writer') ids.push('HD-HELP-SAVING');
  if (snap.lastError?.code.startsWith('ERR_IMPORT')) ids.push('HD-HELP-RECOVERY');
  return [...new Set(ids)];
}
