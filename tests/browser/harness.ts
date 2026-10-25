// Browser test harness: exposes the real persistence + engine modules on
// window.RE so Playwright tests can drive them against real IndexedDB/Web Locks.
import { GameSession } from '../../src/persistence/session';
import { openDatabase, deleteDatabase } from '../../src/persistence/db';
import { parseBackup, buildBackup } from '../../src/persistence/backup';
import { applyAction, encounterAvailability, projectEarning } from '../../src/core/engine';
import { meetingLocation, ACTIVITIES } from '../../src/core/schedule';
import { getScene, sceneIds } from '../../src/core/content';
import type { PlayerAction, RunState, Stat } from '../../src/core/model';
import type { OutcomeClass } from '../../src/content/types';

const uuid = () => crypto.randomUUID();

function restAction(): PlayerAction {
  return { type: 'rest', actionId: uuid(), location: 'home' };
}
function trainAction(stat: Stat): PlayerAction {
  const a = ACTIVITIES.find((x) => x.stat === stat)!;
  return { type: 'train', actionId: uuid(), location: a.location, activityId: a.id };
}
/** Build a meet action for the current slot, or null if the princess is not here/now. */
function meetAction(s: RunState, cls: OutcomeClass, proposalCls: OutcomeClass = 'correct'): PlayerAction | null {
  const where = meetingLocation(s.route, s.day, s.slot);
  if (!where) return null;
  const av = encounterAvailability(s, where);
  const offer = av.offers[0];
  if (!offer) return null;
  const scene = getScene(offer.sceneId)!;
  const opt = scene.options.find((o) => o.outcomeClass === cls) ?? scene.options[0]!;
  let linked: string | null = null;
  if ((offer.encounter === 'ordinary' || offer.encounter === 'optional') && projectEarning(s, opt.netHalfHearts).linkedProposal) {
    linked = getScene(sceneIds.proposal(s.route))!.options.find((o) => o.outcomeClass === proposalCls)!.choiceId;
  }
  return { type: 'encounter', actionId: uuid(), location: where, encounter: offer.encounter, sceneId: offer.sceneId, choiceId: opt.choiceId, linkedProposalChoiceId: linked };
}

declare global {
  interface Window {
    RE: typeof RE;
  }
}
const RE = { GameSession, openDatabase, deleteDatabase, parseBackup, buildBackup, applyAction, restAction, trainAction, meetAction, uuid };
window.RE = RE;
document.body.dataset.ready = '1';
