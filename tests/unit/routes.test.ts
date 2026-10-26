// Owner-requested new route (Senna, content/routes/SEN): her schedule, art status
// and the "four princesses" copy agree everywhere the game reads them.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ROUTE_SPECS, meetingLocation } from '../../src/core/schedule.ts';
import { ROUTES, WEEKDAYS, SLOTS } from '../../src/core/model.ts';
import { CONTENT, supportString } from '../../src/core/content.ts';
import { ART_PLACEHOLDER, ROUTE_NAME, ROUTE_TAGLINE, CG_ALT, spriteAlt } from '../../src/ui/labels.ts';
import { PRINCESS_SPEAKER } from '../../src/ui/sceneStaging.ts';

const ROUTE = JSON.parse(readFileSync('content/routes/SEN/ROUTE.json', 'utf8'));
const ART = JSON.parse(readFileSync('art-src/routes/SEN/ART.json', 'utf8'));

describe('Senna (owner-requested route)', () => {
  test('is a fourth route everywhere: engine, labels, speaker', () => {
    assert.deepEqual([...ROUTES], ['TAV', 'NER', 'KAE', 'SEN']);
    assert.equal(ROUTE_NAME.SEN, 'Senna');
    assert.ok(ROUTE_TAGLINE.SEN.length > 20);
    assert.equal(PRINCESS_SPEAKER.SEN, ROUTE.speaker);
  });

  test('her schedule and stats come from her route file: five days, two slots each, Intelligence + Kindness', () => {
    const spec = ROUTE_SPECS.SEN;
    assert.equal(spec.primary, 'intelligence');
    assert.equal(spec.secondary, 'kindness');
    let cells = 0;
    for (const w of WEEKDAYS)
      for (const s of SLOTS) {
        const want = ROUTE.meeting[w]?.[s] ?? null;
        assert.equal(spec.meeting[w][s] ?? null, want, `${w} ${s}`);
        if (want) cells++;
      }
    assert.equal(cells, 10);
    assert.equal(meetingLocation('SEN', 1, 'morning'), 'adventurers_guild');
    assert.equal(spec.optionalPre.sceneId, 'SEN-EVT-PRE-01');
    assert.equal(spec.optionalPost.stat, 'charisma');
  });

  test('the New Run intro counts four princesses', () => {
    assert.match(supportString('UI-INTRO-02'), /^Four princesses/);
  });

  test('placeholder art is labelled as such, and only while it is a placeholder', () => {
    assert.equal(!!ART_PLACEHOLDER.SEN, ART.status === 'placeholder');
    assert.equal(/placeholder/i.test(CG_ALT.SEN), ART.status === 'placeholder');
    assert.equal(/placeholder/i.test(spriteAlt('SEN', 'NEUTRAL')), ART.status === 'placeholder');
  });

  test('her scenes record where they came from and why', () => {
    const r = CONTENT.generatedFrom.routes.SEN!;
    assert.equal(r.scenes, 25);
    assert.match(r.requested, /apothecary/i);
    for (const s of Object.values(CONTENT.scenes).filter((x) => x.route === 'SEN')) assert.equal(s.source.originalArchive, 'content/routes/SEN', s.sceneId);
  });
});
