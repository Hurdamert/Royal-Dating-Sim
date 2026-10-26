// Engine tests mapped to TEST_MATRIX.md sections A–D. Every test drives the
// real engine with real scene/choice IDs.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { applyAction, encounterAvailability, trainingAvailability, normalizePlayerName, projectEarning, trainingResult } from '../../src/core/engine.ts';
import { ACTIVITIES, ROUTE_SPECS, meetingLocation, weekdayOf } from '../../src/core/schedule.ts';
import { getScene, ordinarySceneId, sceneIds } from '../../src/core/content.ts';
import { LOCATIONS, ROUTES, SLOTS, STATS, type Route, type RunState } from '../../src/core/model.ts';
import { apply, freshRun, meet, rest, restUntilEligible, train, trainMilestone, uuid, optionOf } from './helpers.ts';

const SPEC_TABLE: Record<Route, string> = {
  // COMPLETE_GAME_SPEC §4 / TEST_MATRIX A05, transcribed literally.
  TAV: 'Mon A/E royal_gardens; Tue M/A town_square; Thu A/E palace_court; Sat M/A royal_library; Sun A/E royal_gardens',
  NER: 'Mon A/E moonwater_quay; Wed M/A royal_gardens; Fri A/E moonwater_quay; Sat M/A royal_gardens; Sun A/E moonwater_quay',
  KAE: 'Tue M/A adventurers_guild; Wed A/E palace_court; Thu M/A adventurers_guild; Sat A/E royal_gardens; Sun A/E palace_court',
  // Senna: owner-requested route (content/routes/SEN/ROUTE.json), transcribed from her bible.
  SEN: 'Mon M/A adventurers_guild; Tue A/E royal_library; Thu M/A town_square; Fri A/E moonwater_quay; Sat M/A royal_gardens',
};
const SLOT_LETTER = { morning: 'M', afternoon: 'A', evening: 'E' } as const;

describe('A. Start, schedule and transitions', () => {
  test('A01 fresh run starts Day 1 Monday morning with zero stats/hearts and no milestones', () => {
    for (const r of ROUTES) {
      const s = freshRun(r);
      assert.equal(s.day, 1);
      assert.equal(weekdayOf(s.day), 'Mon');
      assert.equal(s.slot, 'morning');
      assert.equal(s.heartsHalf, 0);
      assert.deepEqual(s.stats, { charisma: 0, intelligence: 0, strength: 0, kindness: 0 });
      assert.equal(s.midpointStatus, 'locked');
      assert.equal(s.proposalStatus, 'locked');
      assert.equal(s.journal.length, 0);
      assert.equal(s.outcome, 'active');
    }
  });

  test('A03 exactly 28 days × 3 slots; Sun D7→Mon D8, Sun D21→Mon D22; no Day 29', () => {
    let s = freshRun('TAV');
    const seen: string[] = [];
    while (s.outcome === 'active') {
      seen.push(`${s.day}:${s.slot}`);
      s = rest(s);
    }
    assert.equal(seen.length, 84);
    assert.equal(s.outcome, 'failed');
    assert.equal(s.day, 28);
    assert.equal(s.slot, 'evening');
    assert.equal(s.journal.length, 84);
    assert.equal(weekdayOf(7), 'Sun');
    assert.equal(weekdayOf(8), 'Mon');
    assert.equal(weekdayOf(21), 'Sun');
    assert.equal(weekdayOf(22), 'Mon');
    assert.ok(seen.includes('8:morning') && seen.includes('22:morning'));
    assert.ok(!seen.some((x) => x.startsWith('29:')));
  });

  test('A04 Rest consumes one slot, one journal record, no heart change', () => {
    const s0 = freshRun('NER');
    const s1 = rest(s0);
    assert.equal(s1.slot, 'afternoon');
    assert.equal(s1.journal.length, 1);
    assert.equal(s1.journal[0]!.kind, 'rest');
    assert.equal(s1.heartsHalf, 0);
    assert.equal(s1.saveRevision, s0.saveRevision + 1);
  });

  test('A05 schedule is exhaustive and exactly matches the spec table for every day/slot/route', () => {
    for (const r of ROUTES) {
      const want = new Set<string>();
      for (const part of SPEC_TABLE[r].split('; ')) {
        const [day, slots, loc] = part.split(' ') as [string, string, string];
        for (const l of slots.split('/')) want.add(`${day} ${l} ${loc}`);
      }
      const got = new Set<string>();
      for (let day = 1; day <= 28; day++)
        for (const slot of SLOTS) {
          const loc = meetingLocation(r, day, slot);
          if (loc) got.add(`${weekdayOf(day)} ${SLOT_LETTER[slot]} ${loc}`);
        }
      assert.deepEqual([...got].sort(), [...want].sort(), r);
      // the princess is never available in her third slot of a scheduled day
      for (const w of Object.values(ROUTE_SPECS[r].meeting)) assert.ok(Object.keys(w).length === 0 || Object.keys(w).length === 2);
    }
  });

  test('A06 wrong location / wrong slot / already met: refused with no mutation', () => {
    let s = freshRun('TAV');
    s = rest(s); // Mon afternoon: Tavri in Royal Gardens
    const before = JSON.stringify(s);
    const scene = ordinarySceneId('TAV', 'PRE', 0);
    const choice = optionOf(scene, 'correct');
    const wrongLoc = applyAction(s, { type: 'encounter', actionId: uuid(), location: 'town_square', encounter: 'ordinary', sceneId: scene, choiceId: choice, linkedProposalChoiceId: null });
    assert.deepEqual(wrongLoc, { ok: false, code: 'not_scheduled' });
    assert.equal(JSON.stringify(s), before);
    const morning = freshRun('TAV'); // Mon morning: not scheduled anywhere
    const r2 = applyAction(morning, { type: 'encounter', actionId: uuid(), location: 'royal_gardens', encounter: 'ordinary', sceneId: scene, choiceId: choice, linkedProposalChoiceId: null });
    assert.equal(r2.ok, false);
    s = meet(s, 'ordinary', 'correct'); // Mon evening now, Tavri still at Gardens but used
    assert.equal(s.slot, 'evening');
    const av = encounterAvailability(s, 'royal_gardens');
    assert.equal(av.blocked?.code, 'used_today');
    const snap = JSON.stringify(s);
    const r3 = applyAction(s, { type: 'encounter', actionId: uuid(), location: 'royal_gardens', encounter: 'ordinary', sceneId: ordinarySceneId('TAV', 'PRE', 1), choiceId: optionOf(ordinarySceneId('TAV', 'PRE', 1), 'correct'), linkedProposalChoiceId: null });
    assert.deepEqual(r3, { ok: false, code: 'used_today' });
    assert.equal(JSON.stringify(s), snap);
  });

  test('A07 second scheduled slot same day is blocked; next day first slot allowed', () => {
    let s = freshRun('KAE');
    s = rest(rest(rest(s))); // Tue morning
    s = meet(s, 'ordinary', 'correct'); // Tue morning meet → Tue afternoon
    assert.equal(encounterAvailability(s, 'adventurers_guild').blocked?.code, 'used_today');
    s = rest(rest(s)); // Wed morning
    assert.equal(s.dailyEncounterUsed, false);
    s = rest(s); // Wed afternoon: Kaedra at Palace Court
    assert.equal(encounterAvailability(s, 'palace_court').blocked, null);
  });

  test('A08 only the selected princess can be met; other routes never scheduled into this run', () => {
    let s = freshRun('NER');
    s = rest(rest(rest(s))); // Tue morning: Kaedra/Tavri days, not Nerelle
    for (const loc of LOCATIONS) assert.equal(encounterAvailability(s, loc).offers.length, 0);
  });

  test('A01 player name: trimmed, ≤24 graphemes, fallback Traveler', () => {
    assert.deepEqual(normalizePlayerName('  Ada  '), { ok: true, name: 'Ada' });
    assert.deepEqual(normalizePlayerName('   '), { ok: true, name: 'Traveler' });
    assert.deepEqual(normalizePlayerName('👩‍💻'.repeat(24)), { ok: true, name: '👩‍💻'.repeat(24) });
    assert.deepEqual(normalizePlayerName('👩‍💻'.repeat(25)), { ok: false, reason: 'too_long' });
    assert.deepEqual(normalizePlayerName('a\u0007b'), { ok: false, reason: 'control_chars' });
  });
});

describe('B. Training', () => {
  test('B01/B02 training math for every stat and level', () => {
    for (let lvl = 0; lvl < 5; lvl++) assert.deepEqual(trainingResult(lvl, 0), { level: lvl + 1, partial: 0 });
    for (let lvl = 5; lvl < 10; lvl++) {
      assert.deepEqual(trainingResult(lvl, 0), { level: lvl, partial: 1 });
      assert.deepEqual(trainingResult(lvl, 1), { level: lvl + 1, partial: 0 });
    }
  });

  test('B03 seven sessions to reach 6, four to reach 4, eleven total; alternating activities share progress', () => {
    for (const stat of STATS) {
      let s = freshRun('TAV');
      let n = 0;
      while (s.stats[stat] < 6) {
        s = train(s, stat, n % 2); // alternate the two activities for this stat
        n++;
      }
      assert.equal(n, 7, stat);
      assert.equal(s.trainingPartial[stat], 0);
      for (const other of STATS) if (other !== stat) assert.equal(s.stats[other], 0);
    }
    let s = freshRun('TAV');
    const before = s.journal.length;
    s = trainMilestone(s, 'charisma', 'intelligence');
    assert.equal(s.journal.length - before, 11);
  });

  test('B04 each activity only at its location; exactly two per stat', () => {
    for (const stat of STATS) assert.equal(ACTIVITIES.filter((a) => a.stat === stat).length, 2);
    const s = freshRun('KAE');
    for (const a of ACTIVITIES) {
      for (const loc of LOCATIONS) {
        const r = applyAction(s, { type: 'train', actionId: uuid(), location: loc, activityId: a.id });
        assert.equal(r.ok, loc === a.location, `${a.id}@${loc}`);
      }
      assert.ok(trainingAvailability(s, a.location).some((o) => o.activity.id === a.id && o.available));
    }
  });

  test('B05 training at level 10 is refused at no cost; partial survives other training', () => {
    let s = freshRun('NER');
    s = { ...s, stats: { ...s.stats, strength: 10 } };
    const snap = JSON.stringify(s);
    const r = applyAction(s, { type: 'train', actionId: uuid(), location: 'home', activityId: 'ACT-STR-CAL' });
    assert.deepEqual(r, { ok: false, code: 'stat_capped' });
    assert.equal(JSON.stringify(s), snap);
    assert.equal(trainingAvailability(s, 'home').find((o) => o.activity.id === 'ACT-STR-CAL')?.reason, 'stat_capped');
    let t = freshRun('NER');
    while (t.stats.kindness < 5) t = train(t, 'kindness');
    t = train(t, 'kindness');
    assert.equal(t.trainingPartial.kindness, 1);
    t = train(t, 'charisma');
    t = rest(t);
    assert.equal(t.trainingPartial.kindness, 1);
    t = train(t, 'kindness', 1);
    assert.equal(t.stats.kindness, 6);
    assert.equal(t.trainingPartial.kindness, 0);
  });
});

/** Drive a route to the midpoint gate: train 6/4 and earn 5 hearts with correct answers. */
function toMidpointPending(route: Route): RunState {
  const spec = ROUTE_SPECS[route];
  let s = freshRun(route);
  while (s.heartsHalf < 10) {
    s = restUntilEligible(s);
    s = meet(s, 'ordinary', 'correct');
  }
  assert.equal(s.midpointStatus, 'pending');
  return trainMilestone(s, spec.primary, spec.secondary);
}

function toPost(route: Route): RunState {
  let s = restUntilEligible(toMidpointPending(route));
  s = meet(s, 'midpoint', 'correct');
  assert.equal(s.midpointStatus, 'completed');
  return s;
}

describe('C. Hearts and ordinary text', () => {
  test('C01 ordinary nets: correct +2, wrong +1, offensive −1, no extra meeting bonus', () => {
    for (const [cls, delta] of [['correct', 2], ['wrong', 1]] as const) {
      let s = rest(freshRun('TAV'));
      s = meet(s, 'ordinary', cls);
      assert.equal(s.heartsHalf, delta);
    }
    // Play an actual offensive answer: TAV PRE U01 (first in the pool) has one.
    const start = rest(freshRun('TAV'));
    assert.equal(getScene('TAV-ORD-PRE-U01')!.options.some((o) => o.outcomeClass === 'offensive'), true);
    const s = meet({ ...start, heartsHalf: 4 }, 'ordinary', 'offensive');
    assert.equal(s.heartsHalf, 3, 'offensive nets exactly −1 half-heart');
    assert.equal(s.journal.at(-1)!.heartsBeforeHalf - s.journal.at(-1)!.heartsAfterHalf, 1);
    // …and clamps at zero rather than going negative
    assert.equal(meet(start, 'ordinary', 'offensive').heartsHalf, 0);
  });

  test('C02 clamp at 0, at 10 before midpoint, at 20 after; no carry', () => {
    const s = freshRun('TAV');
    assert.equal(projectEarning(s, -1).projected, 0);
    assert.equal(projectEarning({ ...s, heartsHalf: 9 }, 2).projected, 10);
    assert.equal(projectEarning({ ...s, heartsHalf: 9, midpointStatus: 'completed' }, 2).projected, 11);
    assert.equal(projectEarning({ ...s, heartsHalf: 19, midpointStatus: 'completed' }, 2).projected, 20);
  });

  test('C03 reaching ten half-hearts makes the next eligible encounter the midpoint, not the same day', () => {
    let s = freshRun('TAV');
    while (s.heartsHalf < 10) s = meet(restUntilEligible(s), 'ordinary', 'correct');
    assert.equal(s.midpointStatus, 'pending');
    assert.equal(s.dailyEncounterUsed, true);
    // Even with the stats in place, nothing offers the midpoint for the rest of that day…
    const ready = (x: RunState): RunState => ({ ...x, stats: { ...x.stats, charisma: 6, intelligence: 4 } });
    const day = s.day;
    while (s.day === day) {
      for (const l of LOCATIONS) assert.ok(!encounterAvailability(ready(s), l).offers.some((o) => o.encounter === 'midpoint'), `no midpoint on day ${day} ${s.slot} at ${l}`);
      s = rest(s);
    }
    // …and the next eligible encounter is the midpoint.
    s = restUntilEligible(s);
    assert.notEqual(s.day, day);
    assert.deepEqual(encounterAvailability(ready(s), meetingLocation('TAV', s.day, s.slot)!).offers, [{ encounter: 'midpoint', sceneId: sceneIds.midpoint('TAV') }]);
  });

  test('C04 midpoint blocked at no cost when primary < 6 or secondary < 4', () => {
    for (const route of ROUTES) {
      let s = freshRun(route);
      while (s.heartsHalf < 10) s = meet(restUntilEligible(s), 'ordinary', 'correct');
      s = restUntilEligible(s);
      const where = meetingLocation(route, s.day, s.slot)!;
      const av = encounterAvailability(s, where);
      assert.equal(av.blocked?.code, 'midpoint_requirements');
      assert.equal(av.blocked?.requirements?.primary.need, 6);
      assert.equal(av.blocked?.requirements?.secondary.need, 4);
      const snap = JSON.stringify(s);
      const r = applyAction(s, { type: 'encounter', actionId: uuid(), location: where, encounter: 'midpoint', sceneId: sceneIds.midpoint(route), choiceId: optionOf(sceneIds.midpoint(route), 'correct'), linkedProposalChoiceId: null });
      assert.deepEqual(r, { ok: false, code: 'midpoint_requirements' });
      assert.equal(JSON.stringify(s), snap);
      assert.ok(trainingAvailability(s, 'home').some((t) => t.available));
    }
  });

  test('C05 midpoint failure: one slot, no hearts change, later-day short retry; full scene never replays', () => {
    for (const route of ROUTES) {
      let s = restUntilEligible(toMidpointPending(route));
      const day = s.day;
      s = meet(s, 'midpoint', 'wrong');
      assert.equal(s.heartsHalf, 10);
      assert.equal(s.midpointStatus, 'retry_pending');
      assert.equal(s.midpointFirstSeen, true);
      // The failed attempt used today's encounter: nowhere offers anything else today.
      assert.equal(s.dailyEncounterUsed, true);
      for (const l of LOCATIONS) assert.deepEqual(encounterAvailability(s, l).offers, [], `${route}: no second encounter on day ${day}`);
      s = restUntilEligible(s);
      assert.notEqual(s.day, day);
      const av = encounterAvailability(s, meetingLocation(route, s.day, s.slot)!);
      assert.deepEqual(av.offers, [{ encounter: 'midpoint_retry', sceneId: sceneIds.midpointRetry(route) }]);
      s = meet(s, 'midpoint_retry', 'wrong');
      s = restUntilEligible(s);
      assert.equal(encounterAvailability(s, meetingLocation(route, s.day, s.slot)!).offers[0]!.sceneId, sceneIds.midpointRetry(route));
      s = meet(s, 'midpoint_retry', 'correct');
      assert.equal(s.midpointStatus, 'completed');
      assert.equal(s.journal.filter((j) => j.sceneIdOrActivityId === sceneIds.midpoint(route)).length, 1);
    }
  });

  test('C06/C08 completed midpoint is permanent despite later heart loss; POST U01 is next', () => {
    let s = restUntilEligible(toPost('TAV'));
    assert.equal(encounterAvailability(s, meetingLocation('TAV', s.day, s.slot)!).offers[0]!.sceneId, 'TAV-ORD-POST-U01');
    // C08: an offensive POST answer at exactly five hearts drops below five without undoing the milestone.
    const u03 = 'TAV-ORD-POST-U03';
    assert.ok(getScene(u03)!.options.some((o) => o.outcomeClass === 'offensive'));
    s = { ...s, heartsHalf: 10, ordinaryNext: { ...s.ordinaryNext, TAV: { ...s.ordinaryNext.TAV, POST: 2 } } };
    assert.equal(encounterAvailability(s, meetingLocation('TAV', s.day, s.slot)!).offers[0]!.sceneId, u03);
    s = meet(s, 'ordinary', 'offensive');
    assert.equal(s.heartsHalf, 9, 'below five hearts');
    assert.equal(s.midpointStatus, 'completed');
    // The next encounter is the next POST ordinary, never a repeat of the midpoint.
    s = restUntilEligible(s);
    const next = encounterAvailability(s, meetingLocation('TAV', s.day, s.slot)!).offers;
    assert.deepEqual(next, [{ encounter: 'ordinary', sceneId: 'TAV-ORD-POST-U04' }]);
  });

  test('C07 ordinary order U01..U06 then F01,F02,F03 cycling, per route/stage; cursor moves only on commit', () => {
    assert.deepEqual(
      Array.from({ length: 12 }, (_, i) => ordinarySceneId('NER', 'PRE', i).slice(-3)),
      ['U01', 'U02', 'U03', 'U04', 'U05', 'U06', 'F01', 'F02', 'F03', 'F01', 'F02', 'F03'],
    );
    let s = restUntilEligible(freshRun('NER'));
    const seen: string[] = [];
    // stay under five hearts with wrong answers so the PRE pool keeps cycling
    for (let i = 0; i < 9; i++) {
      s = restUntilEligible(s);
      const offer = encounterAvailability(s, meetingLocation('NER', s.day, s.slot)!).offers[0]!;
      seen.push(offer.sceneId.slice(-3));
      // looking at availability twice does not advance anything
      encounterAvailability(s, meetingLocation('NER', s.day, s.slot)!);
      s = meet(s, 'ordinary', i % 2 === 0 ? 'wrong' : (getScene(offer.sceneId)!.options.length === 3 ? 'offensive' : 'wrong'));
    }
    assert.deepEqual(seen, ['U01', 'U02', 'U03', 'U04', 'U05', 'U06', 'F01', 'F02', 'F03']);
    assert.equal(s.ordinaryNext.NER.PRE, 9);
    assert.equal(s.ordinaryNext.NER.POST, 0);
  });

  test('C09/C10 optional: threshold 3 on the stage stat, explicit choice, marked seen even on wrong, never replays', () => {
    for (const route of ROUTES) {
      const spec = ROUTE_SPECS[route];
      let s = restUntilEligible(freshRun(route));
      const loc = () => meetingLocation(route, s.day, s.slot)!;
      assert.deepEqual(encounterAvailability(s, loc()).offers.map((o) => o.encounter), ['ordinary']);
      while (s.stats[spec.optionalPre.stat] < 3) s = train(s, spec.optionalPre.stat);
      s = restUntilEligible(s);
      assert.deepEqual(encounterAvailability(s, loc()).offers.map((o) => o.encounter), ['ordinary', 'optional']);
      // choose ordinary: optional stays available and untouched
      s = meet(s, 'ordinary', 'correct');
      assert.equal(s.optionalsExperienced[spec.optionalPre.sceneId], false);
      s = restUntilEligible(s);
      s = meet(s, 'optional', 'offensive');
      assert.equal(s.optionalsExperienced[spec.optionalPre.sceneId], true);
      s = restUntilEligible(s);
      assert.deepEqual(encounterAvailability(s, loc()).offers.map((o) => o.encounter), ['ordinary']);
    }
  });

  test('C11 optionals are never required: perfect route wins without any optional', () => {
    for (const route of ROUTES) {
      let s = toPost(route);
      while (s.outcome === 'active') s = meet(restUntilEligible(s), 'ordinary', 'correct', 'correct');
      assert.equal(s.outcome, 'won');
      assert.ok(Object.values(s.optionalsExperienced).every((v) => v === false));
    }
  });

  test('C12 every ordinary offers correct + ordinary wrong, offensive only when authored', () => {
    for (const route of ROUTES)
      for (const stage of ['PRE', 'POST'] as const)
        for (let c = 0; c < 9; c++) {
          const sc = getScene(ordinarySceneId(route, stage, c))!;
          assert.equal(sc.options[0]!.outcomeClass, 'correct');
          assert.equal(sc.options[1]!.outcomeClass, 'wrong');
          if (sc.options[2]) assert.equal(sc.options[2].outcomeClass, 'offensive');
        }
  });
});

describe('D. Marriage, end, deadline', () => {
  function toHearts(route: Route, target: number): RunState {
    let s = toPost(route);
    while (s.heartsHalf < target) {
      s = restUntilEligible(s);
      const step = target - s.heartsHalf >= 2 ? 'correct' : 'wrong';
      s = meet(s, 'ordinary', step);
    }
    return restUntilEligible(s);
  }

  test('D01 at 19, ordinary wrong +1 links the full proposal in the same action (no extra slot/journal)', () => {
    let s = toHearts('TAV', 19);
    const len = s.journal.length;
    const t = s.day * 3;
    s = meet(s, 'ordinary', 'wrong', 'correct');
    assert.equal(s.journal.length, len + 1);
    assert.equal(s.outcome, 'won');
    assert.equal(s.heartsHalf, 20);
    const rec = s.journal.at(-1)!;
    assert.equal(rec.kind, 'ordinary');
    assert.ok(rec.linkedProposalChoiceId?.startsWith('TAV-FIN-C1-'));
    assert.equal(s.day * 3, t, 'victory preserves day');
  });

  test('D01 at 18, correct +2 also links; linked choice required and validated', () => {
    const s = toHearts('NER', 18);
    const where = meetingLocation('NER', s.day, s.slot)!;
    const sceneId = encounterAvailability(s, where).offers[0]!.sceneId;
    const base = { type: 'encounter', actionId: uuid(), location: where, encounter: 'ordinary', sceneId, choiceId: optionOf(sceneId, 'correct') } as const;
    assert.deepEqual(applyAction(s, { ...base, linkedProposalChoiceId: null }), { ok: false, code: 'linked_proposal_required' });
    assert.deepEqual(applyAction(s, { ...base, linkedProposalChoiceId: 'NOT-A-CHOICE' }), { ok: false, code: 'bad_choice' });
    const ok = applyAction(s, { ...base, linkedProposalChoiceId: optionOf('NER-FIN-01', 'correct') });
    assert.ok(ok.ok && ok.state.outcome === 'won' && ok.state.ordinaryNext.NER.POST === s.ordinaryNext.NER.POST + 1);
  });

  test('D02/D03/D04 wrong first proposal keeps 20, retry later day; wrong retry stays; correct retry wins', () => {
    let s = toHearts('KAE', 18);
    const day = s.day;
    s = meet(s, 'ordinary', 'correct', 'wrong');
    assert.equal(s.heartsHalf, 20);
    assert.equal(s.proposalStatus, 'retry_pending');
    assert.equal(s.proposalFirstSeen, true);
    assert.equal(s.outcome, 'active');
    s = restUntilEligible(s);
    assert.notEqual(s.day, day);
    const where = meetingLocation('KAE', s.day, s.slot)!;
    assert.deepEqual(encounterAvailability(s, where).offers, [{ encounter: 'proposal_retry', sceneId: 'KAE-FIN-RETRY-01' }]);
    s = meet(s, 'proposal_retry', 'wrong');
    assert.equal(s.heartsHalf, 20);
    assert.equal(s.proposalStatus, 'retry_pending');
    s = meet(restUntilEligible(s), 'proposal_retry', 'correct');
    assert.equal(s.outcome, 'won');
    assert.equal(s.winnerRoute, 'KAE');
    assert.equal(s.journal.filter((j) => j.linkedProposalChoiceId).length, 1, 'full proposal shown once');
  });

  test('D05 Day 28 evening: correct linked proposal wins before deadline; wrong one fails', () => {
    // Construct a legal Day 28 evening encounter for Tavri (Sun A/E Gardens is Day 28).
    for (const [cls, outcome] of [['correct', 'won'], ['wrong', 'failed']] as const) {
      let s = toHearts('TAV', 18);
      // wait (Rest) until Day 28 evening without meeting
      while (!(s.day === 28 && s.slot === 'evening')) s = rest(s);
      assert.equal(meetingLocation('TAV', 28, 'evening'), 'royal_gardens');
      s = meet(s, 'ordinary', 'correct', cls);
      assert.equal(s.outcome, outcome);
      assert.equal(s.day, 28);
      assert.equal(s.slot, 'evening');
    }
  });

  test('D06 Day 28 evening Rest/training ends in failure', () => {
    for (const last of ['rest', 'train'] as const) {
      let s = freshRun('NER');
      while (!(s.day === 28 && s.slot === 'evening')) s = rest(s);
      s = last === 'rest' ? rest(s) : train(s, 'kindness');
      assert.equal(s.outcome, 'failed');
      assert.equal(s.journal.length, 84);
      assert.deepEqual(applyAction(s, { type: 'rest', actionId: uuid(), location: 'home' }), { ok: false, code: 'terminal' });
    }
  });

  test('E04 (engine) the same actionId cannot be applied twice', () => {
    const s0 = freshRun('TAV');
    const a = { type: 'rest', actionId: uuid(), location: 'home' } as const;
    const s1 = apply(s0, a);
    assert.deepEqual(applyAction(s1, a), { ok: false, code: 'duplicate_action' });
  });
});
