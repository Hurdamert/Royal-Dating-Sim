// End-to-end tests of the built static site in Chromium (TEST_MATRIX A–F UI
// items). Set SITE_DIR to test a different build output (e.g. Vite's dist/).
import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';
import { serve, ROOT, launch } from './support.mjs';
import { startRun, goto, rest, train, playEncounter, playRoute, snapshot, horizontalOverflow, meetingLocation } from './game-driver.mjs';

const SITE = process.env.SITE_DIR ? join(ROOT, process.env.SITE_DIR) : join(ROOT, '.test-artifacts/site');
const SHOTS = join(ROOT, 'docs/screenshots');
const DESKTOP = { width: 1280, height: 850 };
const PHONE = { width: 320, height: 740 };
let server;
let browser;
const external = [];

before(async () => {
  if (!process.env.SITE_DIR) execFileSync(process.execPath, [join(ROOT, 'scripts/build-esbuild.mjs'), '.test-artifacts/site'], { stdio: 'inherit' });
  mkdirSync(SHOTS, { recursive: true });
  server = await serve(SITE);
  browser = await launch();
});
after(async () => {
  await browser?.close();
  await server?.close();
});

async function open(viewport = DESKTOP) {
  const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  ctx.on('request', (r) => {
    const u = new URL(r.url());
    if (u.hostname !== 'localhost' && u.protocol !== 'data:' && u.protocol !== 'blob:') external.push(r.url());
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(server.url);
  await page.getByTestId('title').waitFor();
  return { ctx, page, errors };
}
const shot = async (page, name) => sharp(await page.screenshot({ fullPage: true })).webp({ quality: 80 }).toFile(join(SHOTS, `${name}.webp`));

describe('End-to-end (built site, Chromium)', () => {
  test('F07 keyboard only: new game → train → meet → choose → saved → reload → restart', async () => {
    const { ctx, page, errors } = await open();
    const tabTo = async (pred, max = 60) => {
      for (let i = 0; i < max; i++) {
        await page.keyboard.press('Tab');
        if (await page.evaluate(pred)) return;
      }
      throw new Error('focus target not reached: ' + pred);
    };
    // Title → New run
    await tabTo(() => document.activeElement?.getAttribute('data-testid') === 'new-run');
    await page.keyboard.press('Enter');
    // Choose Tavri with the keyboard (radio group), type a name
    await tabTo(() => document.activeElement?.getAttribute('data-route') === 'TAV');
    await page.keyboard.press('Space');
    await tabTo(() => document.activeElement?.id === 'player-name');
    await page.keyboard.type('Kay');
    await tabTo(() => document.activeElement?.getAttribute('data-testid') === 'begin');
    await page.keyboard.press('Enter');
    // Prologue: Continue has focus; Enter advances until the first-run tutorial
    await page.getByTestId('presentation').waitFor();
    for (let i = 0; i < 20 && !(await page.getByTestId('tutorial').count()); i++) await page.keyboard.press('Enter');
    // Tutorial: six cards, all keyboard-operable (arrow keys or Tab + Enter)
    await page.getByTestId('tutorial').waitFor();
    assert.equal(await page.getByTestId('tutorial').getAttribute('data-step'), 'goal');
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
    assert.equal(await page.getByTestId('tutorial').getAttribute('data-step'), 'save');
    await tabTo(() => document.activeElement?.getAttribute('data-testid') === 'tutorial-done');
    await page.keyboard.press('Enter');
    await page.getByTestId('hub').waitFor();
    // Train at Home (Read Rizz Tactics 101) with the keyboard
    await tabTo(() => document.activeElement?.getAttribute('data-activity') === 'ACT-CHA-READ');
    await page.keyboard.press('Enter');
    await page.getByTestId('action-result').waitFor();
    assert.equal((await snapshot(page)).run.stats.charisma, 1);
    // Now Mon afternoon: Tavri in the Royal Gardens. Move (free) and meet.
    await tabTo(() => document.activeElement?.getAttribute('data-goto') === 'royal_gardens');
    await page.keyboard.press('Enter');
    await tabTo(() => document.activeElement?.getAttribute('data-encounter') === 'ordinary');
    await page.keyboard.press('Enter');
    await page.getByTestId('encounter').waitFor();
    while (!(await page.getByTestId('choices').count())) await page.keyboard.press('Enter');
    // first option is focused; Enter chooses it
    await page.keyboard.press('Enter');
    while (!(await page.getByTestId('outcome').count())) await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.getByTestId('hub').waitFor();
    const s = (await snapshot(page)).run;
    assert.equal(s.journal.length, 2);
    assert.ok(s.heartsHalf >= 1);
    assert.match(await page.getByTestId('save-status').innerText(), /Saved/);
    // Escape closes a modal and returns focus
    await tabTo(() => document.activeElement?.textContent === 'Journal');
    await page.keyboard.press('Enter');
    await page.getByTestId('journal').waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await page.getByTestId('journal').count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Journal');
    // reload: progress persists
    await page.reload();
    await page.getByTestId('title').waitFor();
    assert.equal((await snapshot(page)).run.journal.length, 2);
    // restart requires confirmation
    await tabTo(() => document.activeElement?.getAttribute('data-testid') === 'new-run');
    await page.keyboard.press('Enter');
    // Radio groups take one Tab stop; arrow keys move (and check) within the group.
    await tabTo(() => document.activeElement?.getAttribute('data-route') === 'TAV');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('data-route')), 'KAE');
    await tabTo(() => document.activeElement?.getAttribute('data-testid') === 'begin');
    await page.keyboard.press('Enter');
    assert.equal(await page.getByRole('alertdialog').count(), 1, 'replacement confirmation shown');
    await page.keyboard.press('Escape');
    assert.equal((await snapshot(page)).run.route, 'TAV', 'cancel keeps the old run');
    assert.deepEqual(errors, []);
    await ctx.close();
  });

  test('F04 Nerelle is waterborne at screen-right in the Gardens canal and at the Quay (1280×850 and 320×740)', async () => {
    for (const [vp, tag] of [
      [DESKTOP, 'desktop-1280x850'],
      [PHONE, 'mobile-320x740'],
    ]) {
      const { ctx, page } = await open(vp);
      await startRun(page, 'NER');
      for (let i = 0; i < 6; i++) await rest(page); // → Day 3 Wed morning
      await goto(page, 'royal_gardens');
      const stage = page.getByTestId('stage');
      assert.equal(await stage.getAttribute('data-stage'), 'waterborne');
      assert.match(await stage.locator('.stage__label').innerText(), /Royal Gardens — Canal/);
      const geo = await page.evaluate(() => {
        const st = document.querySelector('[data-testid="stage"]').getBoundingClientRect();
        const sp = document.querySelector('.stage__sprite').getBoundingClientRect();
        const occ = document.querySelector('[data-testid="occluder"]');
        return { st: { l: st.left, r: st.right, t: st.top, b: st.bottom, w: st.width }, sp: { l: sp.left, r: sp.right, t: sp.top, b: sp.bottom }, occ: !!occ, clip: occ && getComputedStyle(occ).clipPath };
      });
      const centre = (geo.sp.l + geo.sp.r) / 2;
      assert.ok(geo.occ && geo.clip.startsWith('polygon'), 'water occluder made from the background is present');
      assert.ok(centre > geo.st.l + geo.st.w * 0.65, `sprite centre at screen-right (${((centre - geo.st.l) / geo.st.w).toFixed(2)})`);
      assert.ok(geo.sp.b > geo.st.t, 'sprite on stage');
      await shot(page, `${tag}-nerelle-gardens-canal-hub`);
      await page.locator('[data-encounter="ordinary"]').click();
      await page.getByTestId('continue').click();
      await shot(page, `${tag}-nerelle-gardens-canal-dialogue`);
      await playEncounter(page, 'correct');
      // Quay: Fri afternoon (Day 5)
      while (!((await snapshot(page)).run.day === 5 && (await snapshot(page)).run.slot === 'afternoon')) await rest(page);
      await goto(page, 'moonwater_quay');
      assert.equal(await page.getByTestId('stage').getAttribute('data-stage'), 'waterborne');
      await shot(page, `${tag}-nerelle-quay-hub`);
      await ctx.close();
    }
  });

  test('F06 320px and 200% zoom: no horizontal overflow, ≥16px dialogue, ≥44px choices, on every main screen', async () => {
    for (const vp of [PHONE, { width: 640, height: 425 }]) {
      const { ctx, page } = await open(vp);
      const check = async (where) => {
        const o = await horizontalOverflow(page);
        assert.ok(o.scrollWidth <= o.clientWidth + 1, `${vp.width}px ${where}: overflow ${o.scrollWidth}>${o.clientWidth} ${o.offenders.join(' | ')}`);
      };
      await check('title');
      await page.getByTestId('new-run').click();
      await check('new run');
      await page.getByRole('button', { name: 'Back' }).click();
      await startRun(page, 'TAV', 'A really quite long name'); // exactly 24 graphemes
      for (const l of ['home', 'town_square', 'royal_library', 'adventurers_guild', 'palace_court', 'royal_gardens', 'moonwater_quay']) {
        await goto(page, l);
        await check(`hub ${l}`);
      }
      await rest(page); // Mon afternoon, Tavri at the Gardens
      await goto(page, 'royal_gardens');
      await page.locator('[data-encounter="ordinary"]').click();
      await page.getByTestId('continue').waitFor();
      await check('dialogue');
      const font = await page.locator('.line__text').evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      assert.ok(font >= 16, `dialogue font ${font}px`);
      while (!(await page.getByTestId('choices').count())) await page.getByTestId('continue').click();
      await check('choices');
      const heights = await page.locator('.choice').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
      assert.ok(heights.every((h) => h >= 44), `choice heights ${heights}`);
      if (vp.width === 320) await shot(page, 'mobile-320x740-tavri-choices');
      await playEncounter(page, 'correct');
      for (const panel of ['Calendar', 'Journal', 'Help', 'Save & backup']) {
        const toggle = page.locator('.hud__menu-toggle');
        if (await toggle.isVisible()) await toggle.click();
        await page.getByRole('button', { name: panel, exact: true }).click();
        await check(`panel ${panel}`);
        if (vp.width === 320 && panel === 'Calendar') await shot(page, 'mobile-320x740-calendar');
        await page.keyboard.press('Escape');
      }
      await ctx.close();
    }
  });

  test('E03 (UI) refresh mid-conversation offers to resume the same conversation, with nothing awarded', async () => {
    const { ctx, page } = await open();
    await startRun(page, 'KAE');
    for (let i = 0; i < 3; i++) await rest(page); // Tue morning
    await goto(page, 'adventurers_guild');
    await page.locator('[data-encounter="ordinary"]').click();
    await page.getByTestId('continue').click();
    await page.getByTestId('continue').click();
    const lineBefore = await page.locator('.dock__line [data-line-id]').getAttribute('data-line-id');
    await page.waitForFunction(() => window.__royalExceptions.getSnapshot().draft?.progressLineIndex === 2);
    await page.reload();
    await page.getByTestId('resume').click();
    await page.getByTestId('encounter').waitFor();
    assert.equal(await page.locator('.dock__line [data-line-id]').getAttribute('data-line-id'), lineBefore);
    const s = await snapshot(page);
    assert.equal(s.run.heartsHalf, 0);
    assert.equal(s.run.journal.length, 3);
    await playEncounter(page, 'correct');
    assert.equal((await snapshot(page)).run.heartsHalf, 2);
    await ctx.close();
  });

  test('E05 (UI) a second tab is read-only with actions disabled', async () => {
    const { ctx, page } = await open();
    await startRun(page, 'TAV');
    const second = await ctx.newPage();
    await second.goto(server.url);
    await second.getByTestId('title').waitFor();
    await second.getByTestId('access-banner').waitFor();
    assert.match(await second.getByTestId('access-banner').innerText(), /Read-only/);
    assert.equal(await second.getByTestId('new-run').isDisabled(), true);
    await second.getByTestId('continue-run').click();
    assert.equal(await second.getByTestId('rest').isDisabled(), true);
    await shot(second, 'desktop-1280x850-read-only-second-tab');
    await ctx.close();
  });

  test('C/D (UI) a perfect Tavri route wins, the midpoint shows its CG, the epilogue plays and the gallery unlocks', async () => {
    const { ctx, page } = await open();
    await startRun(page, 'TAV');
    let sawCg = false;
    const run = await playRoute(page, 'TAV', {
      onEncounter: async (kind) => {
        if (kind === 'midpoint') {
          await page.getByTestId('encounter').waitFor();
          sawCg = (await page.getByTestId('stage').getAttribute('data-stage')) === 'cg';
          await shot(page, 'desktop-1280x850-tavri-midpoint-cg');
        }
      },
    });
    assert.equal(run.outcome, 'won');
    assert.equal(run.journal.at(-1).dayBefore, 15, 'perfect Tavri route through the UI wins on Day 15');
    assert.ok(sawCg, 'midpoint first attempt shows the approved CG');
    await page.getByTestId('presentation').waitFor();
    assert.equal(await page.getByTestId('presentation').getAttribute('data-scene-id'), 'TAV-EPI-01');
    await shot(page, 'desktop-1280x850-tavri-epilogue');
    while (!(await page.getByTestId('ended').count())) await page.getByTestId('continue').click();
    await page.getByRole('button', { name: 'Endings gallery' }).click();
    assert.equal(await page.locator('[data-route="TAV"][data-unlocked="true"]').count(), 1);
    await shot(page, 'desktop-1280x850-gallery');
    await ctx.close();
  });

  test('D06/E11 (UI) Day 28 evening ends the run with CORE-FAIL-01; journal stays readable; restart needs confirmation', async () => {
    const { ctx, page } = await open(PHONE);
    await startRun(page, 'NER');
    for (let i = 0; i < 84; i++) await rest(page);
    await page.getByTestId('presentation').waitFor();
    assert.equal(await page.getByTestId('presentation').getAttribute('data-scene-id'), 'CORE-FAIL-01');
    await shot(page, 'mobile-320x740-failure');
    while (!(await page.getByTestId('ended').count())) await page.getByTestId('continue').click();
    assert.equal(await page.getByTestId('ended').getAttribute('data-outcome'), 'failed');
    await page.getByRole('button', { name: 'Read the journal' }).click();
    assert.equal(await page.locator('[data-testid="journal"] li').count(), 84);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: /Restart Nerelle/ }).click();
    assert.equal(await page.getByRole('alertdialog').count(), 1);
    await page.getByRole('alertdialog').getByRole('button', { name: 'Cancel' }).click();
    assert.equal((await snapshot(page)).run.outcome, 'failed');
    await ctx.close();
  });

  test('E07/E09 (UI) export a backup, import it in a fresh browser with preview and explicit confirmation', async () => {
    const a = await open();
    await startRun(a.page, 'KAE', 'Mo');
    await train(a.page, 'strength');
    await a.page.locator('.hud__menu').getByRole('button', { name: 'Save & backup' }).click();
    const [dl] = await Promise.all([a.page.waitForEvent('download'), a.page.getByTestId('export').click()]);
    const path = join(ROOT, '.test-artifacts', 'backup-e2e.json');
    await dl.saveAs(path);
    assert.match(dl.suggestedFilename(), /^royal-exceptions-backup-\d{4}-\d{2}-\d{2}\.json$/);
    const original = (await snapshot(a.page)).run;
    await a.ctx.close();
    const b = await open();
    await b.page.getByRole('button', { name: 'Import / export backup' }).click();
    await b.page.getByTestId('import-file').setInputFiles(path);
    await b.page.getByTestId('import-preview').waitFor();
    assert.match(await b.page.getByTestId('import-preview').innerText(), /Kaedra · Day 1 afternoon/);
    assert.equal((await snapshot(b.page)).run, null, 'preview changes nothing');
    await b.page.getByTestId('import-confirm').click();
    await b.page.getByRole('alertdialog').getByRole('button', { name: 'Replace active run', exact: true }).click();
    await b.page.waitForFunction(() => window.__royalExceptions.getSnapshot().run !== null);
    const imported = (await snapshot(b.page)).run;
    assert.deepEqual({ ...imported, saveRevision: 0 }, { ...original, saveRevision: 0 });
    // a tampered file is rejected with its error code
    await b.page.getByTestId('import-file').setInputFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{"format":"royal-exceptions-save","schemaVersion":7}') });
    await b.page.getByTestId('import-error').waitFor();
    assert.equal(await b.page.getByTestId('import-error').getAttribute('data-code'), 'ERR_IMPORT_VERSION');
    await b.ctx.close();
  });

  test('F08 runtime makes no external network requests and keeps playing offline after load', async () => {
    const { ctx, page } = await open();
    await startRun(page, 'TAV');
    // Preload today's princess images, then cut the network.
    await rest(page);
    await goto(page, 'royal_gardens');
    await ctx.setOffline(true);
    await page.locator('[data-encounter="ordinary"]').click();
    await playEncounter(page, 'correct');
    assert.equal((await snapshot(page)).run.heartsHalf, 2);
    await ctx.setOffline(false);
    assert.deepEqual(external, [], `external requests: ${external.join(', ')}`);
    await ctx.close();
  });

  test('F10 accessibility basics: every image has alt (or is decorative), buttons are named, landmarks exist, focus is visible', async () => {
    const { ctx, page } = await open();
    await startRun(page, 'KAE');
    for (let i = 0; i < 3; i++) await rest(page);
    await goto(page, 'adventurers_guild');
    const a11y = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('img')].map((i) => ({ alt: i.getAttribute('alt'), hidden: i.getAttribute('aria-hidden') === 'true' }));
      const unnamed = [...document.querySelectorAll('button')].filter((b) => !(b.getAttribute('aria-label') || b.textContent.trim()));
      return {
        imgsOk: imgs.every((i) => i.alt !== null && (i.alt.length > 0 || i.hidden || true)),
        missingAlt: imgs.filter((i) => i.alt === null).length,
        unnamed: unnamed.length,
        header: !!document.querySelector('header'),
        main: !!document.querySelector('main'),
        nav: document.querySelectorAll('nav').length,
      };
    });
    assert.equal(a11y.missingAlt, 0);
    assert.equal(a11y.unnamed, 0);
    assert.ok(a11y.header && a11y.main && a11y.nav >= 2);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      return { style: cs.outlineStyle, width: parseFloat(cs.outlineWidth) };
    });
    assert.ok(outline.style !== 'none' && outline.width >= 2, `visible focus ring ${JSON.stringify(outline)}`);
    await shot(page, 'desktop-1280x850-kaedra-guild-hub');
    await ctx.close();
  });

  test('screenshots for owner review: title, new run, hub, Tavri and Kaedra scenes on desktop and 320px', async () => {
    for (const [vp, tag] of [
      [DESKTOP, 'desktop-1280x850'],
      [PHONE, 'mobile-320x740'],
    ]) {
      const { ctx, page } = await open(vp);
      await shot(page, `${tag}-title`);
      await page.getByTestId('new-run').click();
      await shot(page, `${tag}-new-run`);
      await page.getByRole('button', { name: 'Back' }).click();
      await startRun(page, 'TAV');
      await shot(page, `${tag}-hub-home`);
      await rest(page);
      await goto(page, 'royal_gardens');
      await page.locator('[data-encounter="ordinary"]').click();
      await page.getByTestId('continue').click();
      await shot(page, `${tag}-tavri-dialogue`);
      await ctx.close();
      const k = await open(vp);
      await startRun(k.page, 'KAE');
      for (let i = 0; i < 3; i++) await rest(k.page);
      await goto(k.page, 'adventurers_guild');
      await k.page.locator('[data-encounter="ordinary"]').click();
      await k.page.getByTestId('continue').click();
      await shot(k.page, `${tag}-kaedra-dialogue`);
      assert.ok(meetingLocation('KAE', 2, 'morning') === 'adventurers_guild');
      await k.ctx.close();
    }
  });
});
