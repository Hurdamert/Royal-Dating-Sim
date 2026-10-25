// Development helper: build-once screenshots of key screens for visual review.
// Usage: node tests/browser/explore-shots.mjs <outDir>
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { serve, ROOT, launch } from './support.mjs';

const outDir = process.argv[2] ?? join(ROOT, '.test-artifacts/shots');
mkdirSync(outDir, { recursive: true });
execFileSync(process.execPath, [join(ROOT, 'scripts/build-esbuild.mjs'), '.test-artifacts/site'], { stdio: 'inherit' });
const server = await serve(join(ROOT, '.test-artifacts/site'));
const browser = await launch();

async function play(viewport, tag, route, steps) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.error('[pageerror]', e.message));
  page.on('console', (m) => m.type() === 'error' && console.error('[console]', m.text()));
  await page.goto(server.url);
  await page.getByTestId('title').waitFor();
  await page.screenshot({ path: join(outDir, `${tag}-01-title.png`), fullPage: true });
  await page.getByTestId('new-run').click();
  await page.locator(`input[data-route="${route}"]`).check({ force: true });
  await page.getByTestId('name-input').fill('Robin');
  await page.screenshot({ path: join(outDir, `${tag}-02-newrun.png`), fullPage: true });
  await page.getByTestId('begin').click();
  await page.getByTestId('presentation').waitFor();
  await page.screenshot({ path: join(outDir, `${tag}-03-prologue.png`), fullPage: true });
  for (let i = 0; i < 8; i++) await page.getByTestId('continue').click();
  await page.getByTestId('hub').waitFor();
  await page.screenshot({ path: join(outDir, `${tag}-04-hub.png`), fullPage: true });
  await steps(page, tag);
  await ctx.close();
}

const menu = async (page, name) => {
  const toggle = page.locator('.hud__menu-toggle');
  if (await toggle.isVisible()) await toggle.click();
  await page.getByRole('button', { name }).click();
};
const restN = async (page, n) => {
  for (let i = 0; i < n; i++) {
    await page.getByTestId('rest').click();
    await page.getByTestId('action-result').waitFor();
  }
};

for (const [vp, tag] of [
  [{ width: 1280, height: 850 }, 'desk'],
  [{ width: 320, height: 740 }, 'mob'],
]) {
  await play(vp, `${tag}-ner`, 'NER', async (page, t) => {
    // Day 1 Mon morning → Wed morning (Day 3) = 6 rests; Nerelle at Royal Gardens canal.
    await restN(page, 6);
    await page.locator('[data-goto="royal_gardens"]').click();
    await page.screenshot({ path: join(outDir, `${t}-05-gardens-hub.png`), fullPage: true });
    await page.locator('[data-encounter="ordinary"]').click();
    await page.getByTestId('encounter').waitFor();
    await page.getByTestId('continue').click();
    await page.screenshot({ path: join(outDir, `${t}-06-gardens-dialogue.png`), fullPage: true });
    for (let i = 0; i < 6; i++) {
      if (await page.getByTestId('choices').count()) break;
      await page.getByTestId('continue').click();
    }
    await page.screenshot({ path: join(outDir, `${t}-07-gardens-choices.png`), fullPage: true });
    await page.locator('.choice').first().click();
    while (!(await page.getByTestId('outcome').count())) {
      const c = page.getByTestId('continue');
      if (await c.count()) await c.click();
      else await page.waitForTimeout(50);
    }
    await page.screenshot({ path: join(outDir, `${t}-08-outcome.png`), fullPage: true });
    await page.getByTestId('outcome').getByRole('button').click();
    // Wed afternoon → Fri afternoon (Day 5) = 1 (Wed aft) .. rest to Fri afternoon: Wed A, Wed E, Thu M/A/E, Fri M → 6 rests
    await restN(page, 6);
    await page.locator('[data-goto="moonwater_quay"]').click();
    await page.screenshot({ path: join(outDir, `${t}-09-quay-hub.png`), fullPage: true });
    await menu(page, 'Calendar');
    await page.screenshot({ path: join(outDir, `${t}-10-calendar.png`), fullPage: true });
    await page.keyboard.press('Escape');
    await menu(page, 'Journal');
    await page.screenshot({ path: join(outDir, `${t}-11-journal.png`), fullPage: true });
    await page.keyboard.press('Escape');
  });
  await play(vp, `${tag}-kae`, 'KAE', async (page, t) => {
    await restN(page, 3); // Tue morning: Guild
    await page.locator('[data-goto="adventurers_guild"]').click();
    await page.locator('[data-encounter="ordinary"]').click();
    await page.getByTestId('continue').click();
    await page.screenshot({ path: join(outDir, `${t}-05-guild-dialogue.png`), fullPage: true });
  });
}
await browser.close();
await server.close();
console.log('screenshots in', outDir);
