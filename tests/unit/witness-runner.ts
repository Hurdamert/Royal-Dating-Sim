// Shared witness runner (see witnesses.test.ts for the TEST_MATRIX G description).
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { encounterAvailability } from '../../src/core/engine.ts';
import { meetingLocation, fromTimeIndex } from '../../src/core/schedule.ts';
import type { Route, RunState, Stat, Slot } from '../../src/core/model.ts';
import { freshRun, meet, rest, train } from './helpers.ts';

const FIX = 'handoff/04_ACCEPTANCE_AND_FIXTURES';

function parseCsv(path: string): Record<string, string>[] {
  const lines = readFileSync(path, 'utf8').trim().split('\n');
  const split = (line: string) => {
    const out: string[] = [];
    let cur = '';
    let q = false;
    for (const ch of line) {
      if (ch === '"') q = !q;
      else if (ch === ',' && !q) {
        out.push(cur);
        cur = '';
      } else cur += ch;
    }
    out.push(cur);
    return out;
  };
  const head = split(lines[0]!);
  return lines.slice(1).map((l) => Object.fromEntries(split(l).map((v, i) => [head[i]!, v])));
}

// Owner-requested new routes carry their own witnesses in the same format
// (content/routes/<ROUTE>/fixtures), designed against this engine.
const routeFix = existsSync('content/routes') ? readdirSync('content/routes').filter((r) => existsSync(`content/routes/${r}/fixtures`)).sort() : [];
export const schedRows = [
  ...parseCsv(`${FIX}/Abstract_Route_Schedules.csv`),
  ...routeFix.flatMap((r) => parseCsv(`content/routes/${r}/fixtures/Route_Schedules.csv`)),
];
const trainRows = [
  ...parseCsv(`${FIX}/Abstract_Training_Witnesses.csv`),
  ...routeFix.flatMap((r) => parseCsv(`content/routes/${r}/fixtures/Training_Witnesses.csv`)),
];
export const EXPECTED_WIN_DAY: Record<string, number> = {
  TAV_PERFECT: 15,
  NER_PERFECT: 15,
  KAE_PERFECT: 16,
  TAV_RECOVERY: 27,
  NER_RECOVERY: 27,
  KAE_RECOVERY: 27,
  ...Object.assign({}, ...routeFix.map((r) => JSON.parse(readFileSync(`content/routes/${r}/fixtures/expected.json`, 'utf8')) as Record<string, number>)),
};

export interface WitnessResult {
  fixture: string;
  winDay: number;
  winSlot: Slot;
  actions: number;
  trainingSessions: number;
  rests: number;
  encounters: number;
}

export function runWitness(fixture: string): { state: RunState; result: WitnessResult } {
  const rows = schedRows.filter((r) => r.fixture === fixture);
  const trains = trainRows.filter((r) => r.fixture === fixture);
  assert.ok(rows.length && trains.length, `fixture ${fixture} present`);
  const route = rows[0]!.route as Route;
  const key = (d: string | number, s: string) => `${d}:${s}`;
  const encounterAt = new Map(rows.map((r) => [key(r.day!, r.slot!), r]));
  const trainAt = new Map(trains.map((r) => [key(r.day!, r.slot!), r.stat as Stat]));
  let s = freshRun(route);
  let trainingSessions = 0;
  let rests = 0;
  let encounters = 0;
  let consumed = 0;

  for (let t = 0; t < 84 && s.outcome === 'active'; t++) {
    const { day, slot } = fromTimeIndex(t);
    assert.equal(s.day, day);
    assert.equal(s.slot, slot);
    const enc = encounterAt.get(key(day, slot));
    const tr = trainAt.get(key(day, slot));
    const ctx = `${fixture} Day ${day} ${slot}`;
    if (enc) {
      consumed++;
      assert.equal(Number(enc.hearts_before_half), s.heartsHalf, `${ctx}: hearts before (first divergent state: ${JSON.stringify({ hearts: s.heartsHalf, stats: s.stats, midpoint: s.midpointStatus })})`);
      const where = meetingLocation(route, day, slot);
      assert.ok(where, `${ctx}: princess must be scheduled`);
      const action = enc.action!;
      if (action === 'miss') {
        // A "miss" is an eligible meeting slot the player deliberately skips.
        const code = encounterAvailability(s, where).blocked?.code ?? null;
        assert.ok(code !== 'not_scheduled' && code !== 'used_today' && code !== 'terminal', `${ctx}: missed slot must be a real meeting opportunity (got ${code})`);
        if (tr) {
          s = train(s, tr);
          trainingSessions++;
        } else {
          s = rest(s);
          rests++;
        }
      } else {
        assert.equal(tr, undefined, `${ctx}: encounter and training in the same slot`);
        encounters++;
        const mid = s.midpointStatus === 'retry_pending' ? 'midpoint_retry' : 'midpoint';
        switch (action) {
          case 'correct':
            s = meet(s, 'ordinary', 'correct');
            break;
          case 'ordinary_wrong':
            s = meet(s, 'ordinary', 'wrong');
            break;
          case 'midpoint_success':
            s = meet(s, mid, 'correct');
            break;
          case 'midpoint_fail':
            s = meet(s, mid, 'wrong');
            break;
          case 'correct+proposal_success':
            s = meet(s, 'ordinary', 'correct', 'correct');
            break;
          case 'ordinary_wrong+proposal_fail':
            s = meet(s, 'ordinary', 'wrong', 'wrong');
            break;
          case 'proposal_retry_success':
            s = meet(s, 'proposal_retry', 'correct');
            break;
          default:
            assert.fail(`${ctx}: unknown witness action ${action}`);
        }
      }
      assert.equal(s.heartsHalf, Number(enc.hearts_after_half), `${ctx}: hearts after ${action}`);
    } else if (tr) {
      s = train(s, tr);
      trainingSessions++;
    } else {
      s = rest(s);
      rests++;
    }
  }
  assert.equal(consumed, rows.length, `${fixture}: every witness row was reached`);
  const last = s.journal.at(-1)!;
  return {
    state: s,
    result: { fixture, winDay: last.dayBefore, winSlot: last.slotBefore, actions: s.journal.length, trainingSessions, rests, encounters },
  };
}

