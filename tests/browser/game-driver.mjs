// UI driver for end-to-end tests: plays the real built game only through the
// page (clicks / keys). Game knowledge used to pick actions (schedule, which
// authored option is correct) comes from the handoff/content files, never from
// hidden UI state. The session snapshot is read only to decide what to do next.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './support.mjs';

const content = JSON.parse(readFileSync(join(ROOT, 'src/content/generated/content.json'), 'utf8'));
const schedule = JSON.parse(readFileSync(join(ROOT, 'handoff/03_IMPLEMENTATION_BLUEPRINT/route_schedules_and_training.json'), 'utf8'));
const WD = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const meetingLocation = (route, day, slot) => schedule.routes[route].meeting[WD[(day - 1) % 7]]?.[slot] ?? null;
export const activityFor = (stat) => schedule.activities.find((a) => a.stat === stat);

export async function snapshot(page) {
  return page.evaluate(() => {
    const s = window.__royalExceptions.getSnapshot();
    return { run: s.run, gallery: s.gallery, access: s.access, draft: s.draft, phase: s.phase };
  });
}

export async function startRun(page, route, name = 'Robin') {
  await page.getByTestId('title').waitFor();
  await page.getByTestId('new-run').click();
  await page.locator(`input[data-route="${route}"]`).check({ force: true });
  await page.getByTestId('name-input').fill(name);
  await page.getByTestId('begin').click();
  const confirm = page.getByRole('alertdialog');
  if (await confirm.count()) await confirm.getByRole('button', { name: /Replace and begin/ }).click();
  await page.getByTestId('presentation').waitFor();
  while (!(await page.getByTestId('hub').count())) {
    if (await page.getByTestId('tutorial-skip').count()) await page.getByTestId('tutorial-skip').click();
    else if (await page.getByTestId('tutorial-done').count()) await page.getByTestId('tutorial-done').click();
    else await page.getByTestId('continue').click();
  }
}

export async function goto(page, location) {
  await page.locator(`[data-goto="${location}"]`).click();
  await page.locator(`[data-testid="hub"][data-location="${location}"]`).waitFor();
}

export async function rest(page) {
  const before = (await snapshot(page)).run.saveRevision;
  await page.getByTestId('rest').click();
  await page.waitForFunction((b) => window.__royalExceptions.getSnapshot().run.saveRevision > b, before);
}

export async function train(page, stat) {
  const a = activityFor(stat);
  await goto(page, a.location);
  const before = (await snapshot(page)).run.saveRevision;
  await page.locator(`[data-activity="${a.id}"]`).click();
  await page.waitForFunction((b) => window.__royalExceptions.getSnapshot().run.saveRevision > b, before);
}

/** Play the currently open encounter, picking options of the given classes. */
export async function playEncounter(page, cls = 'correct', proposalCls = 'correct', hooks = {}) {
  await page.getByTestId('encounter').waitFor();
  let choicesSeen = 0;
  for (let guard = 0; guard < 200; guard++) {
    if (await page.getByTestId('outcome').count()) {
      if (hooks.onOutcome) await hooks.onOutcome();
      await page.getByTestId('outcome').getByRole('button').click();
      return;
    }
    const enc = page.getByTestId('encounter');
    if (!(await enc.count())) return;
    if (hooks.onStep) await hooks.onStep(await enc.getAttribute('data-phase'), await enc.getAttribute('data-scene-id'));
    if (await page.getByTestId('choices').count()) {
      const want = choicesSeen === 0 ? cls : proposalCls;
      // The DOM carries only the authored option index; outcome classes are looked
      // up in the content table so nothing in the page reveals the right answer.
      const sceneId = await enc.getAttribute('data-scene-id');
      const buttons = page.locator('[data-choice-index]');
      const n = await buttons.count();
      let picked = null;
      for (let i = 0; i < n; i++) {
        const idx = Number(await buttons.nth(i).getAttribute('data-choice-index'));
        if (content.scenes[sceneId]?.options[idx]?.outcomeClass === want) picked = buttons.nth(i);
      }
      await (picked ?? buttons.first()).click();
      choicesSeen++;
      continue;
    }
    const c = page.getByTestId('continue');
    if (await c.count()) await c.click();
    else {
      const notice = page.locator('.dock--notice button');
      if (await notice.count()) await notice.click();
      else await page.waitForTimeout(30);
    }
  }
  throw new Error('encounter did not finish');
}

/**
 * Play a route through the UI: meet whenever possible with `answer`, otherwise
 * train the milestone stats, otherwise rest. Stops when the run ends.
 */
export async function playRoute(page, route, { answer = 'correct', proposal = 'correct', maxActions = 90, onEncounter } = {}) {
  const spec = schedule.routes[route];
  for (let n = 0; n < maxActions; n++) {
    const { run } = await snapshot(page);
    if (run.outcome !== 'active') return run;
    const where = meetingLocation(route, run.day, run.slot);
    const midGate = run.midpointStatus === 'pending' || run.midpointStatus === 'retry_pending';
    const statsOk = run.stats[spec.primary] >= 6 && run.stats[spec.secondary] >= 4;
    if (where && !run.dailyEncounterUsed && (!midGate || statsOk)) {
      await goto(page, where);
      const btn = page.locator('[data-encounter]').first();
      const kind = await btn.getAttribute('data-encounter');
      await btn.click();
      if (onEncounter) await onEncounter(kind, page);
      await playEncounter(page, answer, proposal);
      const after = await snapshot(page);
      if (after.run.outcome !== 'active') return after.run;
      await page.getByTestId('hub').waitFor();
      continue;
    }
    if (await page.getByTestId('hub').count()) {
      if (run.stats[spec.primary] < 6) await train(page, spec.primary);
      else if (run.stats[spec.secondary] < 4) await train(page, spec.secondary);
      else await rest(page);
    }
  }
  return (await snapshot(page)).run;
}

/** Scrollable-overflow check for the 320px / 200% zoom criteria. */
export async function horizontalOverflow(page) {
  return page.evaluate(() => {
    const d = document.documentElement;
    const offenders = [];
    if (d.scrollWidth > d.clientWidth + 1) {
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.right > d.clientWidth + 1 && getComputedStyle(el).position !== 'fixed') offenders.push(`${el.tagName.toLowerCase()}.${el.className}`.slice(0, 80));
        if (offenders.length > 5) break;
      }
    }
    return { scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, offenders };
  });
}
