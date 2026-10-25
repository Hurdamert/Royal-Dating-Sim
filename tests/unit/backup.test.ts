// TEST_MATRIX E07/E08 (pure parts): canonical digest, round-trip, and every
// rejection class. Storage-touching cases run in the browser suite.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildBackup, parseBackup, backupDigest, MAX_IMPORT_BYTES } from '../../src/persistence/backup.ts';
import { canonicalJson } from '../../src/persistence/canonical.ts';
import { checkDraft, type EncounterDraft } from '../../src/persistence/draft.ts';
import { encounterAvailability } from '../../src/core/engine.ts';
import { meetingLocation } from '../../src/core/schedule.ts';
import { runWitness } from './witness-runner.ts';
import { freshRun, rest, train, meet, restUntilEligible } from './helpers.ts';

describe('E. Backup format', () => {
  test('canonical JSON sorts keys recursively and keeps array order', () => {
    assert.equal(canonicalJson({ b: 1, a: [3, { d: 1, c: 2 }] }), '{"a":[3,{"c":2,"d":1}],"b":1}');
    assert.throws(() => canonicalJson({ x: Number.NaN }));
  });

  test('digest excludes exportedAt/integrity and is reproducible', async () => {
    const run = runWitness('KAE_PERFECT').state;
    const a = JSON.parse(await buildBackup(run, ['KAE'], new Date('2026-01-01T00:00:00Z')));
    const b = JSON.parse(await buildBackup(run, ['KAE'], new Date('2027-06-01T12:00:00Z')));
    assert.equal(a.integrity.digest, b.integrity.digest);
    assert.equal(a.integrity.digest, await backupDigest(run, ['KAE']));
    assert.equal(a.format, 'royal-exceptions-save');
    assert.equal(a.schemaVersion, 1);
  });

  test('E07 round-trip preserves run, hearts, partial stats, cursors, flags, gallery, journal', async () => {
    let s = freshRun('NER', 'Mira');
    while (s.stats.kindness < 5) s = train(s, 'kindness');
    s = train(s, 'kindness'); // partial
    s = meet(restUntilEligible(s), 'ordinary', 'wrong');
    for (const run of [s, runWitness('TAV_RECOVERY').state]) {
      const text = await buildBackup(run, run.outcome === 'won' ? [run.route] : []);
      const p = await parseBackup(text);
      assert.ok(p.ok, JSON.stringify(p));
      assert.deepEqual(p.activeRun, run);
      assert.deepEqual(p.completedGallery, run.outcome === 'won' ? [run.route] : []);
    }
    const empty = await parseBackup(await buildBackup(null, ['TAV', 'KAE']));
    assert.ok(empty.ok && empty.activeRun === null && empty.completedGallery.join() === 'TAV,KAE');
  });

  const good = async () => JSON.parse(await buildBackup(rest(freshRun('TAV')), [])) as Record<string, unknown>;
  const reseal = async (o: Record<string, unknown>) => {
    o.integrity = { algorithm: 'SHA-256', digest: await backupDigest(o.activeRun as never, o.completedGallery as never) };
    return JSON.stringify(o);
  };

  const cases: [string, () => Promise<string>, string][] = [
    ['not JSON', async () => '{nope', 'ERR_IMPORT_FORMAT'],
    ['oversize', async () => ' '.repeat(MAX_IMPORT_BYTES + 1), 'ERR_IMPORT_FORMAT'],
    ['array top level', async () => '[]', 'ERR_IMPORT_FORMAT'],
    ['unknown top-level field', async () => JSON.stringify({ ...(await good()), extra: 1 }), 'ERR_IMPORT_FORMAT'],
    ['wrong format', async () => JSON.stringify({ ...(await good()), format: 'other' }), 'ERR_IMPORT_FORMAT'],
    ['future schema', async () => JSON.stringify({ ...(await good()), schemaVersion: 2 }), 'ERR_IMPORT_VERSION'],
    ['schema 0', async () => JSON.stringify({ ...(await good()), schemaVersion: 0 }), 'ERR_IMPORT_VERSION'],
    ['__proto__ key', async () => (await reseal(await good())).replace('"activeRun":', '"__proto__":{"x":1},"activeRun":'), 'ERR_IMPORT_FORMAT'],
    ['constructor key nested', async () => {
      const o = await good();
      (o.activeRun as Record<string, unknown>).stats = { constructor: 1 };
      return JSON.stringify(o);
    }, 'ERR_IMPORT_FORMAT'],
    ['too deep', async () => {
      const o = await good();
      let deep: unknown = 1;
      for (let i = 0; i < 40; i++) deep = [deep];
      o.exportedAt = undefined;
      (o as Record<string, unknown>).completedGallery = deep;
      return JSON.stringify(o);
    }, 'ERR_IMPORT_FORMAT'],
    ['infinite number', async () => {
      const text = (await reseal(await good())).replace('"heartsHalf":0', '"heartsHalf":1e999');
      assert.match(text, /1e999/);
      return text;
    }, 'ERR_IMPORT_FORMAT'],
    ['digest tampered', async () => {
      const o = await good();
      (o.integrity as Record<string, string>).digest = 'a'.repeat(64);
      return JSON.stringify(o);
    }, 'ERR_IMPORT_DIGEST'],
    ['content edited after export', async () => {
      const o = await good();
      (o.activeRun as Record<string, unknown>).heartsHalf = 6;
      return JSON.stringify(o);
    }, 'ERR_IMPORT_DIGEST'],
    ['impossible state resealed', async () => {
      const o = await good();
      (o.activeRun as Record<string, unknown>).heartsHalf = 6;
      return reseal(o);
    }, 'ERR_IMPORT_STATE'],
    ['journal too long', async () => {
      const o = await good();
      const run = o.activeRun as { journal: unknown[] };
      run.journal = Array.from({ length: 85 }, () => run.journal[0]);
      return reseal(o);
    }, 'ERR_IMPORT_STATE'],
    ['invalid gallery', async () => {
      const o = await good();
      o.completedGallery = ['TAV', 'TAV'];
      return reseal(o);
    }, 'ERR_IMPORT_STATE'],
    ['won run missing from gallery', async () => {
      const o = JSON.parse(await buildBackup(runWitness('NER_PERFECT').state, ['NER'])) as Record<string, unknown>;
      o.completedGallery = [];
      return reseal(o);
    }, 'ERR_IMPORT_STATE'],
  ];
  for (const [name, make, code] of cases) {
    test(`E08 rejects ${name} with ${code}`, async () => {
      const r = await parseBackup(await make());
      assert.equal(r.ok, false);
      if (!r.ok) assert.equal(r.code, code, JSON.stringify(r.details));
    });
  }
});

describe('E03 draft staleness rules', () => {
  test('draft is resumable only at its own revision/slot and while still offered', () => {
    const s = restUntilEligible(freshRun('TAV'));
    const where = meetingLocation('TAV', s.day, s.slot)!;
    const offer = encounterAvailability(s, where).offers[0]!;
    const d: EncounterDraft = {
      actionId: '22222222-2222-4222-8222-222222222222',
      startRevision: s.saveRevision,
      sceneId: offer.sceneId,
      originKind: offer.encounter,
      location: where,
      progressLineIndex: 2,
      selectedOriginChoiceId: null,
      selectedProposalChoiceId: null,
      stage: 'intro',
      route: 'TAV',
      day: s.day,
      slot: s.slot,
      createdAt: new Date().toISOString(),
    };
    assert.deepEqual(checkDraft(d, s), { status: 'resumable' });
    assert.deepEqual(checkDraft({ ...d, startRevision: s.saveRevision - 1 }, s), { status: 'stale', reason: 'revision' });
    assert.deepEqual(checkDraft({ ...d, location: 'home' }, s), { status: 'stale', reason: 'unavailable' });
    assert.deepEqual(checkDraft({ ...d, stage: 'nonsense' }, s), { status: 'stale', reason: 'malformed' });
    const after = meet(s, 'ordinary', 'correct');
    assert.equal(checkDraft(d, after).status, 'stale');
  });
});
