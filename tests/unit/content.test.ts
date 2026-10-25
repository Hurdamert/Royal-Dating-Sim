// TEST_MATRIX F01–F03 (content side): source hashes, scene inventory, ID
// uniqueness, exact text preservation and the four-string Tavri overlay.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { CONTENT } from '../../src/core/content.ts';
import { LOCATIONS } from '../../src/core/model.ts';

const sha = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex');

describe('F. Content and sources', () => {
  test('F01 28 art originals match manifest hashes (7 BG, 15 sprites, 3 CG, 3 sheets); 7 locations, no canal node', () => {
    const manifest = JSON.parse(readFileSync('handoff/02_ART_ASSETS/asset_manifest.json', 'utf8')) as { kind: string; path: string; sha256: string }[];
    assert.equal(manifest.length, 28);
    const by = (k: string) => manifest.filter((m) => m.kind === k).length;
    assert.deepEqual([by('background'), by('expression_sprite'), by('midpoint_CG'), by('character_sheet')], [7, 15, 3, 3]);
    for (const m of manifest) assert.equal(sha(`handoff/${m.path}`), m.sha256, m.path);
    assert.equal(LOCATIONS.length, 7);
    assert.ok(!LOCATIONS.some((l) => l.includes('canal')));
  });

  test('F02 77 scenes: 21 pivotal, 2 shared, 54 ordinary; IDs globally unique', () => {
    const scenes = Object.values(CONTENT.scenes);
    assert.equal(scenes.length, 77);
    assert.equal(scenes.filter((s) => s.kind === 'shared').length, 2);
    assert.equal(scenes.filter((s) => s.kind === 'ordinary').length, 54);
    assert.equal(scenes.filter((s) => s.kind !== 'shared' && s.kind !== 'ordinary').length, 21);
    const ids: string[] = [];
    for (const s of scenes) {
      ids.push(s.sceneId);
      if (s.choicePointId) ids.push(s.choicePointId);
      for (const l of s.introLines) ids.push(l.id);
      for (const o of s.options) {
        ids.push(o.choiceId);
        for (const l of o.branchLines) ids.push(l.id);
      }
    }
    assert.equal(new Set(ids).size, ids.length);
  });

  test('F02 checked-in content table is exactly what the compiler produces from the frozen archives', () => {
    const out = execFileSync(process.execPath, ['--import', 'tsx', 'scripts/compile-content.ts', '--check'], { encoding: 'utf8' });
    assert.match(out, /Content check OK/);
  });

  test('F03 Tavri effective comedy scene has exactly the four approved replacements', () => {
    const s = CONTENT.scenes['TAV-EVT-POST-01']!;
    assert.equal(s.title, 'Unscripted Comedy');
    const text = [...s.introLines, ...s.options.flatMap((o) => o.branchLines)].map((l) => l.text).join('\n');
    assert.match(text, /Royal Comedy Showcase/);
    assert.match(text, /brilliant on command/);
    assert.match(text, /myself for once/);
    assert.doesNotMatch(text, /Comedy Evening|brilliant tonight|for an evening/);
    assert.equal(s.source.effectiveOverlay?.includes('Tavri_Approved_Time_Neutral_Overlay.json'), true);
  });

  test('display-only scenes have no choices; every choice scene has a correct option and PLAYER lines', () => {
    for (const s of Object.values(CONTENT.scenes)) {
      if (s.displayOnly) assert.equal(s.options.length, 0, s.sceneId);
      else {
        assert.ok(s.options.some((o) => o.outcomeClass === 'correct'), s.sceneId);
        for (const o of s.options) assert.ok(o.labelText.length > 0 && o.branchLines.length > 0, o.choiceId);
      }
    }
  });

  test('support copy: 14 help, 12 quips, 8 activities, 12 TXT + 14 UI strings', () => {
    const sp = CONTENT.support;
    assert.equal(sp.help.length, 14);
    assert.equal(sp.squareQuips.length, 12);
    assert.equal(sp.activities.length, 8);
    assert.equal(Object.keys(sp.strings).filter((k) => k.startsWith('TXT-')).length, 12);
    assert.equal(Object.keys(sp.strings).filter((k) => k.startsWith('UI-')).length, 14);
  });

  test('{PLAYER} is the only substitution token in authored text', () => {
    for (const s of Object.values(CONTENT.scenes))
      for (const l of [...s.introLines, ...s.options.flatMap((o) => o.branchLines)]) {
        const tokens = l.text.match(/\{[A-Z_]+\}/g) ?? [];
        for (const t of tokens) assert.equal(t, '{PLAYER}', l.id);
      }
  });
});
