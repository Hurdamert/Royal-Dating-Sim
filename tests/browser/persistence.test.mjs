// TEST_MATRIX E01–E11 and D07 against real Chromium IndexedDB + Web Locks.
import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildHarness, serve, launch, openHarness } from './support.mjs';

let server;
let browser;
before(async () => {
  server = await serve(await buildHarness());
  browser = await launch();
});
after(async () => {
  await browser?.close();
  await server?.close();
});

/** Fresh isolated origin storage per test via a new browser context. */
async function ctx() {
  return browser.newContext();
}

async function sessionPage(context, env = '{}') {
  const page = await openHarness(context, server.url);
  await page.evaluate(async (envSrc) => {
    // eslint-disable-next-line no-new-func
    const env = new Function(`return ${envSrc}`)();
    window.S = new window.RE.GameSession(env);
    await window.S.init();
  }, env);
  return page;
}

const snap = (page) => page.evaluate(() => {
  const s = window.S.getSnapshot();
  return { phase: s.phase, access: s.access, run: s.run, gallery: s.gallery, draft: s.draft, recovery: s.recovery, lastError: s.lastError, notice: s.notice };
});
const raw = (page) => page.evaluate(() => window.S.database.readAll());

describe('E. Persistence in a real browser', () => {
  test('E01 every action is one transaction: revision+1, one journal record, previous_good = prior state', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    await p.evaluate(() => window.S.startNewRun('TAV', 'Ada'));
    const r0 = await raw(p);
    assert.equal(r0.active.saveRevision, 0);
    assert.equal(r0.active.playerName, 'Ada');
    const res = await p.evaluate(() => window.S.commit(window.RE.restAction()));
    assert.equal(res.ok, true);
    const r1 = await raw(p);
    assert.equal(r1.active.saveRevision, 1);
    assert.equal(r1.active.journal.length, 1);
    assert.deepEqual(r1.previousGood, r0.active);
    assert.equal(r1.active.journal[0].atRevision, 1);
    await c.close();
  });

  test('E02 forced abort mid-commit leaves active, previous_good, gallery, revision untouched; user sees error', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    await p.evaluate(async () => {
      await window.S.startNewRun('NER', 'Bo');
      await window.S.commit(window.RE.restAction());
    });
    const before = await raw(p);
    for (const mode of ['abort', 'throw', 'quota']) {
      const res = await p.evaluate(async (mode) => {
        window.S.database.hooks.beforeCommitWrites = (tx) => {
          if (mode === 'abort') tx.abort();
          else if (mode === 'quota') throw new DOMException('full', 'QuotaExceededError');
          else throw new Error('injected');
        };
        const r = await window.S.commit(window.RE.trainAction('kindness'));
        window.S.database.hooks.beforeCommitWrites = undefined;
        return { r, err: window.S.getSnapshot().lastError?.code, status: window.S.getSnapshot().saveStatus };
      }, mode);
      assert.equal(res.r.ok, false, mode);
      assert.equal(res.err, mode === 'quota' ? 'ERR_SAVE_QUOTA' : 'ERR_SAVE_TRANSACTION', mode);
      assert.equal(res.status, 'error');
      const now = await raw(p);
      assert.deepEqual(now.active, before.active, `${mode}: active unchanged`);
      assert.deepEqual(now.previousGood, before.previousGood, `${mode}: previous_good unchanged`);
      assert.deepEqual(now.gallery, before.gallery);
    }
    // the in-memory snapshot also still shows the pre-action state
    assert.deepEqual((await snap(p)).run, before.active);
    await c.close();
  });

  test('E03 refresh at intro/choice/branch/linked stage resumes the same draft; after commit there is no draft and no double award', async () => {
    const c = await ctx();
    let p = await sessionPage(c);
    await p.evaluate(async () => {
      await window.S.startNewRun('TAV', 'Cy');
      await window.S.commit(window.RE.restAction()); // Mon afternoon: Tavri at Gardens
    });
    for (const stage of ['intro', 'branch', 'linked_proposal', 'ready_to_commit']) {
      await p.evaluate(async (stage) => {
        const s = window.S.getSnapshot().run;
        const a = window.RE.meetAction(s, 'correct');
        window.__action = a;
        await window.S.saveDraft({
          actionId: a.actionId, startRevision: s.saveRevision, sceneId: a.sceneId, originKind: a.encounter, location: a.location,
          progressLineIndex: 1, selectedOriginChoiceId: stage === 'intro' ? null : a.choiceId, selectedProposalChoiceId: null,
          stage, route: s.route, day: s.day, slot: s.slot, createdAt: new Date().toISOString(),
        });
      }, stage);
      const draftBefore = (await snap(p)).draft;
      const revBefore = (await raw(p)).active.saveRevision;
      await p.close();
      p = await sessionPage(c); // simulated refresh
      const s2 = await snap(p);
      assert.deepEqual(s2.draft, draftBefore, `${stage}: draft resumed`);
      assert.equal((await raw(p)).active.saveRevision, revBefore, `${stage}: nothing committed by refresh`);
      await p.evaluate(() => window.S.discardDraft());
    }
    // commit from a draft, then refresh: draft gone, hearts awarded once
    await p.evaluate(async () => {
      const s = window.S.getSnapshot().run;
      const a = window.RE.meetAction(s, 'correct');
      await window.S.saveDraft({ actionId: a.actionId, startRevision: s.saveRevision, sceneId: a.sceneId, originKind: a.encounter, location: a.location, progressLineIndex: 0, selectedOriginChoiceId: a.choiceId, selectedProposalChoiceId: null, stage: 'ready_to_commit', route: s.route, day: s.day, slot: s.slot, createdAt: new Date().toISOString() });
      await window.S.commit(a);
    });
    await p.close();
    p = await sessionPage(c);
    const s3 = await snap(p);
    assert.equal(s3.draft, null);
    assert.equal(s3.run.heartsHalf, 2);
    assert.equal((await raw(p)).draft, null);
    await c.close();
  });

  test('E03 a draft from an older revision is discarded with ERR_DRAFT_CONFLICT, at no cost', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    await p.evaluate(async () => {
      await window.S.startNewRun('TAV', 'Di');
      await window.S.commit(window.RE.restAction());
      const s = window.S.getSnapshot().run;
      const a = window.RE.meetAction(s, 'correct');
      // write a draft that claims an older start revision directly to storage
      await window.S.database.saveDraft({ actionId: a.actionId, startRevision: s.saveRevision - 1, sceneId: a.sceneId, originKind: a.encounter, location: a.location, progressLineIndex: 0, selectedOriginChoiceId: null, selectedProposalChoiceId: null, stage: 'intro', route: s.route, day: s.day, slot: s.slot, createdAt: new Date().toISOString() });
      await window.S.reload();
    });
    const s = await snap(p);
    assert.equal(s.draft, null);
    assert.equal(s.notice, 'ERR_DRAFT_CONFLICT');
    assert.equal(s.run.heartsHalf, 0);
    assert.equal((await raw(p)).draft, null);
    await c.close();
  });

  test('E04 double-click / rapid retry of the same actionId awards once', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    const out = await p.evaluate(async () => {
      await window.S.startNewRun('KAE', 'Ed');
      // Tue morning: Kaedra at the Guild
      for (let i = 0; i < 3; i++) await window.S.commit(window.RE.restAction());
      const s = window.S.getSnapshot().run;
      const a = window.RE.meetAction(s, 'correct');
      const results = await Promise.all([window.S.commit(a), window.S.commit(a), window.S.commit(a)]);
      const again = await window.S.commit(a);
      return { results, again, run: window.S.getSnapshot().run };
    });
    assert.equal(out.run.heartsHalf, 2);
    assert.equal(out.run.journal.filter((j) => j.kind === 'ordinary').length, 1);
    assert.equal(out.again.ok && out.again.duplicate, true);
    await c.close();
  });

  test('E05 second tab is read-only; it cannot commit; takeover after writer closes reloads newest revision', async () => {
    const c = await ctx();
    const writer = await sessionPage(c);
    await writer.evaluate(async () => {
      await window.S.startNewRun('NER', 'Fi');
      await window.S.commit(window.RE.restAction());
    });
    const reader = await sessionPage(c);
    let r = await snap(reader);
    assert.equal(r.access, 'read_only');
    assert.equal(r.run.saveRevision, 1);
    const attempt = await reader.evaluate(() => window.S.commit(window.RE.restAction()));
    assert.deepEqual(attempt, { ok: false, code: 'not_writer' });
    // writer keeps playing; reader sees it via BroadcastChannel
    await writer.evaluate(() => window.S.commit(window.RE.restAction()));
    await reader.waitForFunction(() => window.S.getSnapshot().run?.saveRevision === 2);
    // reader asks to take over, writer closes
    await reader.evaluate(() => { void window.S.requestTakeover(); });
    await writer.evaluate(() => window.S.commit(window.RE.restAction())); // revision 3 before closing
    await writer.close();
    await reader.waitForFunction(() => window.S.getSnapshot().access === 'writer');
    r = await snap(reader);
    assert.equal(r.run.saveRevision, 3, 'takeover reloaded the newest committed revision');
    const ok = await reader.evaluate(() => window.S.commit(window.RE.restAction()));
    assert.equal(ok.ok, true);
    await c.close();
  });

  test('E06 Web Locks unsupported → read-only; IndexedDB unavailable → no writable play', async () => {
    const c = await ctx();
    const p = await sessionPage(c, '{ locks: undefined }');
    const s = await snap(p);
    assert.equal(s.access, 'unsupported');
    const r = await p.evaluate(() => window.S.startNewRun('TAV', 'X'));
    assert.equal(r, null);
    const q = await sessionPage(c, '{ indexedDB: { open() { throw new DOMException("blocked", "SecurityError"); } } }');
    const t = await snap(q);
    assert.equal(t.phase, 'unavailable');
    assert.equal(t.access, 'storage_unavailable');
    assert.equal(t.lastError.code, 'ERR_STORAGE_UNAVAILABLE');
    await c.close();
  });

  test('E07/E09/D07 export → import round trip; preview/cancel changes nothing; confirm keeps previous_good and unions gallery', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    const exported = await p.evaluate(async () => {
      await window.S.startNewRun('TAV', 'Gus');
      for (let i = 0; i < 4; i++) await window.S.commit(window.RE.trainAction('charisma'));
      return window.S.exportBackup();
    });
    const env = JSON.parse(exported);
    assert.equal(env.activeRun.stats.charisma, 4);
    assert.equal('draft' in env, false);
    const c2 = await ctx();
    const q = await sessionPage(c2);
    await q.evaluate(async () => {
      await window.S.startNewRun('KAE', 'Other');
      // pretend this browser already unlocked Kaedra's ending
      await window.S.database.writeRawForTest('gallery', { schemaVersion: 1, completed: ['KAE'] });
      await window.S.reload();
    });
    const before = await raw(q);
    const preview = await q.evaluate((t) => window.S.previewImport(t), exported);
    assert.equal(preview.ok, true);
    assert.deepEqual(await raw(q), before, 'preview/cancel changes nothing');
    await q.evaluate(async (t) => {
      const pv = await window.S.previewImport(t);
      await window.S.confirmImport(pv, { replaceRun: true, galleryMode: 'union' });
    }, exported);
    const after = await raw(q);
    assert.deepEqual(after.previousGood, before.active, 'overwritten run kept as previous_good');
    assert.deepEqual(after.gallery.completed, ['KAE'], 'existing unlock kept');
    const { saveRevision: a, ...restA } = after.active;
    const { saveRevision: b, ...restB } = env.activeRun;
    assert.deepEqual(restA, restB, 'run preserved exactly');
    assert.ok(a > before.active.saveRevision && a > b);
    await c.close();
    await c2.close();
  });

  test('E08 invalid imports are rejected without touching a healthy run', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    await p.evaluate(async () => {
      await window.S.startNewRun('NER', 'Hal');
      await window.S.commit(window.RE.restAction());
    });
    const before = await raw(p);
    const codes = await p.evaluate(async () => {
      const good = JSON.parse(await window.S.exportBackup());
      const bad = [
        '{',
        JSON.stringify({ ...good, schemaVersion: 2 }),
        JSON.stringify({ ...good, integrity: { algorithm: 'SHA-256', digest: '0'.repeat(64) } }),
        JSON.stringify({ ...good, extra: true }),
      ];
      const out = [];
      for (const t of bad) out.push((await window.S.previewImport(t)).code);
      return out;
    });
    assert.deepEqual(codes, ['ERR_IMPORT_FORMAT', 'ERR_IMPORT_VERSION', 'ERR_IMPORT_DIGEST', 'ERR_IMPORT_FORMAT']);
    assert.deepEqual(await raw(p), before);
    await c.close();
  });

  test('E10 corrupt active + valid previous_good → recovery view; restore needs explicit call; gallery survives', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    await p.evaluate(async () => {
      await window.S.startNewRun('TAV', 'Ivy');
      await window.S.commit(window.RE.restAction());
      await window.S.commit(window.RE.restAction());
      await window.S.database.writeRawForTest('gallery', { schemaVersion: 1, completed: ['NER'] });
      const r = await window.S.database.readAll();
      const corrupt = { ...r.active, heartsHalf: 9 };
      await window.S.database.writeRawForTest('active', corrupt);
      await window.S.reload();
    });
    let s = await snap(p);
    assert.equal(s.phase, 'recovery');
    assert.ok(s.recovery.activeErrors.length > 0);
    assert.equal(s.recovery.previousGood.saveRevision, 1);
    assert.deepEqual(s.gallery, ['NER']);
    assert.equal(s.run, null, 'corrupt fields are not loaded');
    await p.evaluate(() => window.S.restorePreviousGood());
    s = await snap(p);
    assert.equal(s.phase, 'ready');
    assert.equal(s.run.journal.length, 1);
    assert.deepEqual(s.gallery, ['NER']);
    await c.close();
  });

  test('E10 (review fix) a new run started from recovery never replaces the good snapshot with the damaged save', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    const out = await p.evaluate(async () => {
      await window.S.startNewRun('TAV', 'Ivy');
      await window.S.commit(window.RE.restAction());
      await window.S.commit(window.RE.restAction());
      const r = await window.S.database.readAll();
      await window.S.database.writeRawForTest('active', { ...r.active, heartsHalf: 9 });
      await window.S.reload();
      const phase = window.S.getSnapshot().phase;
      await window.S.startNewRun('NER', 'Ivy');
      const after = await window.S.database.readAll();
      return { phase, prevRevision: after.previousGood.saveRevision, prevRoute: after.previousGood.route, prevHearts: after.previousGood.heartsHalf, activeRoute: after.active.route };
    });
    assert.equal(out.phase, 'recovery');
    assert.equal(out.activeRoute, 'NER');
    assert.equal(out.prevRoute, 'TAV', 'the valid earlier snapshot is still the rollback snapshot');
    assert.equal(out.prevRevision, 1);
    assert.equal(out.prevHearts, 0, 'not the damaged copy');
    await c.close();
  });

  test('E09 (review fix) "replace my endings" keeps the ending of a won run that stays active, so its backup still imports', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    const out = await p.evaluate(async () => {
      const S = window.S;
      await S.startNewRun('TAV', 'Kit');
      let guard = 0;
      while (S.getSnapshot().run.outcome === 'active' && guard++ < 84) {
        const s = S.getSnapshot().run;
        const meet = window.RE.meetAction(s, 'correct', 'correct');
        if (meet && !s.dailyEncounterUsed && (await S.commit(meet)).ok) continue;
        if (s.stats.charisma < 6) await S.commit(window.RE.trainAction('charisma'));
        else if (s.stats.intelligence < 4) await S.commit(window.RE.trainAction('intelligence'));
        else await S.commit(window.RE.restAction());
      }
      // A gallery-only backup that knows only Nerelle's ending.
      const other = await S.previewImport(await window.RE.buildBackup(null, ['NER']));
      await S.confirmImport(other, { replaceRun: false, galleryMode: 'replace' });
      const gallery = S.getSnapshot().gallery;
      const own = await S.previewImport(await S.exportBackup());
      return { outcome: S.getSnapshot().run.outcome, gallery, ownOk: own.ok, ownCode: own.ok ? null : own.code };
    });
    assert.equal(out.outcome, 'won');
    assert.deepEqual(out.gallery, ['TAV', 'NER']);
    assert.equal(out.ownOk, true, `own backup imports (${out.ownCode})`);
    await c.close();
  });

  test('E11/D07 failed run stays readable until a new run is explicitly started; gallery persists across new runs', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    const out = await p.evaluate(async () => {
      await window.S.startNewRun('KAE', 'Jo');
      await window.S.database.writeRawForTest('gallery', { schemaVersion: 1, completed: ['TAV'] });
      await window.S.reload();
      for (let i = 0; i < 84; i++) await window.S.commit(window.RE.restAction());
      const failed = window.S.getSnapshot().run;
      const blocked = await window.S.commit(window.RE.restAction());
      await window.S.reload();
      const stillThere = window.S.getSnapshot().run.outcome;
      await window.S.startNewRun('NER', 'Jo');
      return { outcome: failed.outcome, journal: failed.journal.length, blocked, stillThere, gallery: window.S.getSnapshot().gallery, newRun: window.S.getSnapshot().run.route };
    });
    assert.equal(out.outcome, 'failed');
    assert.equal(out.journal, 84);
    assert.equal(out.blocked.ok, false);
    assert.equal(out.stillThere, 'failed');
    assert.deepEqual(out.gallery, ['TAV']);
    assert.equal(out.newRun, 'NER');
    await c.close();
  });

  test('D02/D07 a won run unlocks its gallery entry in the same transaction', async () => {
    const c = await ctx();
    const p = await sessionPage(c);
    const out = await p.evaluate(async () => {
      const S = window.S;
      await S.startNewRun('TAV', 'Kit');
      const stat = (s, k) => s.stats[k];
      // Play a perfect Tavri route through the real session.
      let guard = 0;
      while (S.getSnapshot().run.outcome === 'active' && guard++ < 84) {
        const s = S.getSnapshot().run;
        const meet = window.RE.meetAction(s, 'correct', 'correct');
        if (meet && !s.dailyEncounterUsed) {
          const r = await S.commit(meet);
          if (r.ok) continue;
        }
        if (stat(s, 'charisma') < 6) await S.commit(window.RE.trainAction('charisma'));
        else if (stat(s, 'intelligence') < 4) await S.commit(window.RE.trainAction('intelligence'));
        else await S.commit(window.RE.restAction());
      }
      const r = await S.database.readAll();
      return { outcome: r.active.outcome, gallery: r.gallery?.completed, day: r.active.day };
    });
    assert.equal(out.outcome, 'won');
    assert.deepEqual(out.gallery, ['TAV']);
    await c.close();
  });
});
