// Test helpers: deterministic IDs and a small driver that issues real actions
// through the real engine (no shortcuts into state).
import assert from 'node:assert/strict';
import { applyAction, encounterAvailability, newRun, projectEarning } from '../../src/core/engine.ts';
import { ACTIVITIES, meetingLocation } from '../../src/core/schedule.ts';
import { getScene, sceneIds } from '../../src/core/content.ts';
import type { EncounterKind, LocationId, PlayerAction, Route, RunState, Stat } from '../../src/core/model.ts';
import type { OutcomeClass } from '../../src/content/types.ts';

let counter = 0;
export function uuid(): string {
  counter++;
  const hex = counter.toString(16).padStart(12, '0');
  return `00000000-0000-4000-8000-${hex}`;
}
export function resetIds() {
  counter = 0;
}

export function freshRun(route: Route, name = 'Tester'): RunState {
  return newRun(route, name, '11111111-1111-4111-8111-111111111111', 0);
}

export function apply(s: RunState, a: PlayerAction): RunState {
  const r = applyAction(s, a);
  if (!r.ok) assert.fail(`action refused: ${r.code} (${JSON.stringify(a)}) at Day ${s.day} ${s.slot}`);
  return r.state;
}

export const rest = (s: RunState, location: LocationId = 'home') => apply(s, { type: 'rest', actionId: uuid(), location });

export function train(s: RunState, stat: Stat, which = 0): RunState {
  const acts = ACTIVITIES.filter((a) => a.stat === stat);
  const act = acts[which]!;
  return apply(s, { type: 'train', actionId: uuid(), location: act.location, activityId: act.id });
}

export function optionOf(sceneId: string, cls: OutcomeClass): string {
  const scene = getScene(sceneId);
  assert.ok(scene, `scene ${sceneId}`);
  const o = scene.options.find((x) => x.outcomeClass === cls);
  assert.ok(o, `no ${cls} option in ${sceneId}`);
  return o.choiceId;
}

/** Meet the princess at her scheduled location using the given encounter kind and answer class. */
export function meet(
  s: RunState,
  encounter: EncounterKind,
  cls: OutcomeClass,
  proposalCls: OutcomeClass | null = null,
): RunState {
  const where = meetingLocation(s.route, s.day, s.slot);
  assert.ok(where, `princess not scheduled on Day ${s.day} ${s.slot}`);
  const avail = encounterAvailability(s, where);
  assert.equal(avail.blocked, null, `encounter blocked: ${JSON.stringify(avail.blocked)} on Day ${s.day} ${s.slot}`);
  const offer = avail.offers.find((o) => o.encounter === encounter);
  assert.ok(offer, `no ${encounter} offer on Day ${s.day} ${s.slot}; offers=${JSON.stringify(avail.offers)}`);
  const choiceId = optionOf(offer.sceneId, cls);
  let linked: string | null = null;
  if (encounter === 'ordinary' || encounter === 'optional') {
    const net = getScene(offer.sceneId)!.options.find((o) => o.choiceId === choiceId)!.netHalfHearts;
    if (projectEarning(s, net).linkedProposal) {
      assert.ok(proposalCls, 'linked proposal triggered but no proposal answer supplied');
      linked = optionOf(sceneIds.proposal(s.route), proposalCls);
    }
  }
  return apply(s, { type: 'encounter', actionId: uuid(), location: where, encounter, sceneId: offer.sceneId, choiceId, linkedProposalChoiceId: linked });
}

/** Advance with Rest until the princess is scheduled in the current slot and today's meeting is unused. */
export function restUntilEligible(s: RunState): RunState {
  let guard = 0;
  while (s.outcome === 'active' && (meetingLocation(s.route, s.day, s.slot) === null || s.dailyEncounterUsed)) {
    s = rest(s);
    if (++guard > 100) assert.fail('never eligible');
  }
  return s;
}

/** Train the route's milestone stats to 6/4 (eleven sessions). */
export function trainMilestone(s: RunState, primary: Stat, secondary: Stat): RunState {
  while (s.stats[primary] < 6) s = train(s, primary);
  while (s.stats[secondary] < 4) s = train(s, secondary);
  return s;
}
