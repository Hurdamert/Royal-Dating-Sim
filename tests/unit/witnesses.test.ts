// TEST_MATRIX G: convert each of the six abstract witnesses into an actual,
// legal, slot-by-slot action stream (every intervening slot is a Rest or a
// training action at a legitimate location), run it through the real engine
// with real scene/choice IDs, and assert the claimed outcome day and every
// intermediate heart value. Any divergence fails with the first divergent state.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import type { Stat } from '../../src/core/model.ts';
import { runWitness, schedRows, EXPECTED_WIN_DAY } from './witness-runner.ts';
import { getScene } from '../../src/core/content.ts';

const classOf = (sceneId: string | null, choiceId: string | null) => getScene(sceneId ?? '')?.options.find((o) => o.choiceId === choiceId)?.outcomeClass ?? null;

describe('G. Witness streams through the real engine', () => {
  for (const fixture of Object.keys(EXPECTED_WIN_DAY)) {
    test(`${fixture} wins on Day ${EXPECTED_WIN_DAY[fixture]}`, () => {
      const { state, result } = runWitness(fixture);
      assert.equal(state.outcome, 'won', `${fixture} outcome`);
      assert.equal(result.winDay, EXPECTED_WIN_DAY[fixture]);
      assert.equal(result.trainingSessions, 11, 'eleven training sessions');
      assert.equal(state.stats[{ TAV: 'charisma', NER: 'kindness', KAE: 'strength' }[state.route] as Stat], 6);
      // Counted from what the engine actually recorded, not from the input fixture.
      const wrongOrdinary = state.journal.filter((j) => j.kind === 'ordinary' && classOf(j.sceneIdOrActivityId, j.selectedChoiceId) === 'wrong').length;
      if (fixture.endsWith('RECOVERY')) {
        const rows = schedRows.filter((r) => r.fixture === fixture);
        assert.equal(rows.filter((r) => r.action === 'miss').length, 4, 'fixture declares four missed meetings');
        assert.equal(wrongOrdinary, 4, 'engine journal holds four wrong ordinary answers');
        assert.equal(state.journal.filter((j) => (j.kind === 'midpoint' || j.kind === 'midpoint_retry') && j.midpointBeforeAfter[1] === 'retry_pending').length, 1);
        assert.equal(state.journal.filter((j) => j.proposalBeforeAfter[0] === 'locked' && j.proposalBeforeAfter[1] === 'retry_pending').length, 1);
      } else assert.equal(wrongOrdinary, 0, 'perfect witness answers every ordinary correctly');
      console.log(`  ${JSON.stringify(result)}`);
    });
  }
});
