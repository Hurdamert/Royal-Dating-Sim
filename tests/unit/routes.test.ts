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
    const status = (a: { status?: string }) => a.status ?? ART.status;
    const sprites = ART.assets.filter((a: { kind: string }) => a.kind === 'expression_sprite');
    const cg = ART.assets.find((a: { kind: string }) => a.kind === 'midpoint_CG');
    assert.equal(sprites.length, 5);
    // The five portraits change together, so the stage never mixes real portraits with silhouettes.
    assert.equal(new Set(sprites.map(status)).size, 1);
    const portraitsPlaceholder = status(sprites[0]) === 'placeholder';
    const cgPlaceholder = status(cg) === 'placeholder';
    assert.equal(!!ART_PLACEHOLDER.SEN?.portraits, portraitsPlaceholder);
    assert.equal(!!ART_PLACEHOLDER.SEN?.illustration, cgPlaceholder);
    assert.equal(/placeholder/i.test(spriteAlt('SEN', 'NEUTRAL')), portraitsPlaceholder);
    assert.equal(/placeholder/i.test(CG_ALT.SEN), cgPlaceholder);
    assert.equal(ART.status, portraitsPlaceholder === cgPlaceholder ? status(cg) : 'partial');
  });

  test('generated art records where each image came from', () => {
    const sources = JSON.parse(readFileSync('art-src/routes/SEN/generated/SOURCES.json', 'utf8')).images;
    for (const a of ART.assets.filter((x: { status?: string }) => (x.status ?? ART.status) === 'generated')) {
      const key = a.asset_id.replace('senna_senna_', '');
      const src = sources[key];
      assert.ok(src, a.asset_id);
      assert.equal(a.from, `generated/${src.file}`);
      assert.equal(a.from_sha256, src.sha256);
      assert.ok(src.model && src.settings && typeof src.settings.seed === 'number', a.asset_id);
      assert.ok(src.prompt || (src.prompt_summary && src.unrecorded?.includes('prompt')), `${a.asset_id}: prompt or an honest note that it was not kept`);
    }
  });

  test('her scenes record where they came from and why', () => {
    const r = CONTENT.generatedFrom.routes.SEN!;
    assert.equal(r.scenes, 25);
    assert.match(r.requested, /apothecary/i);
    for (const s of Object.values(CONTENT.scenes).filter((x) => x.route === 'SEN')) assert.equal(s.source.originalArchive, 'content/routes/SEN', s.sceneId);
  });
});
