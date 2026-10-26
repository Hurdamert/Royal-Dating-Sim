// Save-state validation: legitimate states (including every witness end state)
// pass full journal replay; tampered or impossible states are rejected.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { validateRun, validateGallery, runGalleryConsistent } from '../../src/core/validate.ts';
import { SCHEMA_VERSION, type RunState } from '../../src/core/model.ts';
import { freshRun, rest, train, meet, restUntilEligible } from './helpers.ts';
import { runWitness } from './witness-runner.ts';

const clone = (s: RunState): RunState => structuredClone(s);

describe('State validation by journal replay', () => {
  test('fresh, mid-run, terminal-failed and every witness end state are valid', () => {
    let s = freshRun('TAV');
    assert.equal(validateRun(s).ok, true);
    s = train(rest(s), 'charisma');
    s = meet(restUntilEligible(s), 'ordinary', 'correct');
    assert.equal(validateRun(s).ok, true);
    let f = freshRun('KAE');
    while (f.outcome === 'active') f = rest(f);
    assert.equal(validateRun(f).ok, true);
    for (const fx of ['TAV_PERFECT', 'NER_RECOVERY', 'KAE_RECOVERY']) {
      const r = validateRun(runWitness(fx).state);
      assert.equal(r.ok, true, JSON.stringify(r));
    }
  });

  test('a saveRevision bumped by import/new-run is accepted when not older than the journal', () => {
    const s = rest(freshRun('NER'));
    assert.equal(validateRun({ ...s, saveRevision: 40 }).ok, true);
    assert.equal(validateRun({ ...s, saveRevision: 0 }).ok, false);
  });

  const tamper: [string, (s: RunState) => void][] = [
    ['hearts edited', (s) => void (s.heartsHalf = 8)],
    ['hearts negative', (s) => void (s.heartsHalf = -1)],
    ['hearts above cap', (s) => void (s.heartsHalf = 21)],
    ['stat edited', (s) => void (s.stats.charisma = 9)],
    ['stat non-integer', (s) => void (s.stats.charisma = 1.5)],
    ['partial at level 0', (s) => void (s.trainingPartial.strength = 1)],
    ['midpoint faked complete', (s) => void (s.midpointStatus = 'completed')],
    ['won without proposal', (s) => void ((s.outcome = 'won'), (s.winnerRoute = 'TAV'))],
    ['cursor advanced', (s) => void (s.ordinaryNext.TAV.PRE += 1)],
    ['optional marked seen', (s) => void (s.optionalsExperienced['TAV-EVT-PRE-01'] = true)],
    ['day jumped', (s) => void (s.day = 20)],
    ['daily flag cleared', (s) => void (s.dailyEncounterUsed = !s.dailyEncounterUsed)],
    ['journal record hearts edited', (s) => void (s.journal.at(-1)!.heartsAfterHalf = 10)],
    ['journal record removed', (s) => void s.journal.pop()],
    ['journal duplicated id', (s) => void s.journal.push(structuredClone(s.journal[0]!))],
    ['unknown choice id', (s) => void (s.journal.at(-1)!.selectedChoiceId = 'TAV-ORD-PRE-U01-C1-XXX')],
    ['extra field', (s) => void ((s as unknown as Record<string, unknown>).cheat = true)],
    ['missing field', (s) => void delete (s as unknown as Record<string, unknown>).outcome],
    ['bad route', (s) => void ((s as unknown as Record<string, unknown>).route = 'XYZ')],
    ['bad runId', (s) => void (s.runId = 'not-a-uuid')],
    ['day 29', (s) => void (s.day = 29)],
    ['player name with control char', (s) => void (s.playerName = 'a\u0001b')],
    ['a newer schema version', (s) => void ((s as unknown as Record<string, unknown>).schemaVersion = SCHEMA_VERSION + 1)],
  ];
  for (const [name, mut] of tamper) {
    test(`rejects: ${name}`, () => {
      let s = freshRun('TAV');
      s = meet(restUntilEligible(s), 'ordinary', 'correct');
      s = train(s, 'charisma');
      const t = clone(s);
      mut(t);
      const r = validateRun(t);
      assert.equal(r.ok, false, `${name} should be rejected`);
    });
  }

  test('gallery validation and consistency', () => {
    assert.deepEqual(validateGallery(['KAE', 'TAV']), { ok: true, value: ['TAV', 'KAE'] });
    assert.equal(validateGallery(['TAV', 'TAV']).ok, false);
    assert.equal(validateGallery(['ZED']).ok, false);
    assert.equal(validateGallery('TAV').ok, false);
    const won = runWitness('TAV_PERFECT').state;
    assert.deepEqual(runGalleryConsistent(won, []).length, 1);
    assert.deepEqual(runGalleryConsistent(won, ['TAV']).length, 0);
  });
});
