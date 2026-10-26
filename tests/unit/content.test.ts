// TEST_MATRIX F01–F03 (content side): source hashes, scene inventory, ID
// uniqueness, exact text preservation and the four-string Tavri overlay.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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

  test('F02 77 frozen scenes (21 pivotal, 2 shared, 54 ordinary) plus 25 per owner-requested route; IDs globally unique', () => {
    const all = Object.values(CONTENT.scenes);
    const scenes = all.filter((s) => s.route !== 'SEN');
    assert.equal(scenes.length, 77);
    assert.equal(scenes.filter((s) => s.kind === 'shared').length, 2);
    assert.equal(scenes.filter((s) => s.kind === 'ordinary').length, 54);
    assert.equal(scenes.filter((s) => s.kind !== 'shared' && s.kind !== 'ordinary').length, 21);
    // Senna (content/routes/SEN): the same 25-scene shape as each frozen route.
    const sen = all.filter((s) => s.route === 'SEN');
    assert.equal(sen.length, 25);
    assert.equal(sen.filter((s) => s.kind === 'ordinary').length, 18);
    assert.equal(sen.filter((s) => s.kind !== 'ordinary').length, 7);
    assert.ok(CONTENT.generatedFrom.routes.SEN && /owner/i.test(CONTENT.generatedFrom.routes.SEN.authority));
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

  // The frozen base text (archives + approved Tavri overlay), before any owner-requested revision.
  const baseFile = join(mkdtempSync(join(tmpdir(), 're-base-')), 'base.json');
  execFileSync(process.execPath, ['--import', 'tsx', 'scripts/compile-content.ts', '--print-base', baseFile], { env: { ...process.env, CONTENT_REVISION: 'none' } });
  const BASE = JSON.parse(readFileSync(baseFile, 'utf8')) as typeof CONTENT.scenes;

  test('F02 independent parse: the readable canon scene sections match the compiled base text line for line', () => {
    // A second, deliberately simple parser over handoff/01_APPROVED_CANON/scene_sections
    // (a different file set from the archives the compiler reads), so a parsing
    // mistake in the compiler cannot hide behind its own output.
    const overlay = JSON.parse(readFileSync('handoff/01_APPROVED_CANON/tavri_text_overlay.json', 'utf8')) as { replacements: { old: string; new: string }[] };
    const manifest = JSON.parse(readFileSync('handoff/01_APPROVED_CANON/scene_section_manifest.json', 'utf8')) as { scene_id: string; content_path: string }[];
    assert.equal(manifest.length, 77);
    let checked = 0;
    for (const m of manifest) {
      let md = readFileSync(`handoff/${m.content_path}`, 'utf8');
      if (m.scene_id === 'TAV-EVT-POST-01') for (const r of overlay.replacements) md = md.replace(r.old, r.new);
      const scene = BASE[m.scene_id]!;
      assert.ok(scene, m.scene_id);
      const lines = new Map([...scene.introLines, ...scene.options.flatMap((o) => o.branchLines)].map((l) => [l.id, l]));
      const labels = new Map(scene.options.map((o) => [o.choiceId, o.labelText]));
      const seen = new Set<string>();
      let pendingOption: string | null = null;
      for (const raw of md.split('\n')) {
        // Some sections put an option's PLAYER line on the line after its header.
        const cont = /^\s*PLAYER:\s+(.*)$/.exec(raw);
        if (pendingOption && cont) {
          assert.equal(labels.get(pendingOption), cont[1]!.trim(), `${pendingOption} label`);
          seen.add(pendingOption);
          checked++;
          pendingOption = null;
          continue;
        }
        const header = /^\s*\d+\.\s+`([A-Z0-9-]+)`/.exec(raw);
        pendingOption = header && labels.has(header[1]!) && !raw.includes('PLAYER:') ? header[1]! : null;
        const line = /^\s*-\s+`([A-Z0-9-]+)`\s+([A-Z][A-Z ]*?)(?:\s+\[([A-Z]+)\])?:\s+(.*)$/.exec(raw);
        if (line && lines.has(line[1]!)) {
          const l = lines.get(line[1]!)!;
          assert.equal(l.speaker, line[2], `${line[1]} speaker`);
          assert.equal(l.expression ?? undefined, line[3] ?? undefined, `${line[1]} expression`);
          assert.equal(l.text, line[4]!.trim(), `${line[1]} text`);
          seen.add(line[1]!);
          checked++;
          continue;
        }
        const opt = /^\s*\d+\.\s+`([A-Z0-9-]+)`.*?PLAYER:\s+(.*)$/.exec(raw);
        if (opt && labels.has(opt[1]!)) {
          assert.equal(labels.get(opt[1]!), opt[2]!.trim(), `${opt[1]} label`);
          seen.add(opt[1]!);
          checked++;
        }
      }
      for (const id of [...lines.keys(), ...labels.keys()]) assert.ok(seen.has(id), `${m.scene_id}: ${id} found in the readable canon section`);
    }
    assert.equal(checked, 973, 'every authored line and choice label was cross-checked');
  });

  test('F03 Tavri effective base text has exactly the four approved replacements', () => {
    const s = BASE['TAV-EVT-POST-01']!;
    assert.equal(s.title, 'Unscripted Comedy');
    const text = [...s.introLines, ...s.options.flatMap((o) => o.branchLines)].map((l) => l.text).join('\n');
    assert.match(text, /Royal Comedy Showcase/);
    assert.match(text, /brilliant on command/);
    assert.match(text, /myself for once/);
    assert.doesNotMatch(text, /Comedy Evening|brilliant tonight|for an evening/);
    assert.equal(s.source.effectiveOverlay?.includes('Tavri_Approved_Time_Neutral_Overlay.json'), true);
    const report = JSON.parse(readFileSync('src/content/generated/content-report.json', 'utf8'));
    assert.equal(report.tavriOverlayDifferences, 4);
  });

  test('owner revision changes words only: scenes, choice points, options, outcomes and heart values equal the frozen base', () => {
    assert.deepEqual(
      Object.keys(CONTENT.scenes)
        .filter((id) => CONTENT.scenes[id]!.route !== 'SEN')
        .sort(),
      Object.keys(BASE).sort(),
    );
    for (const [id, b] of Object.entries(BASE)) {
      const a = CONTENT.scenes[id]!;
      const mech = (x: typeof a) => [x.sceneId, x.kind, x.route, x.stage, x.choicePointId, x.displayOnly, x.options.map((o) => [o.choiceId, o.outcomeId, o.outcomeClass, o.netHalfHearts])];
      assert.deepEqual(mech(a), mech(b), id);
    }
    const rev = CONTENT.generatedFrom.revision;
    if (rev) {
      assert.match(rev.authority, /owner/i);
      assert.match(rev.filesSha256, /^[0-9a-f]{64}$/);
    }
  });

  test('every scene line ID is globally unique and princess lines use only the route princess', () => {
    const seen = new Set<string>();
    const princess = { TAV: 'TAVRI', NER: 'NERELLE', KAE: 'KAEDRA', SEN: 'SENNA' } as const;
    for (const s of Object.values(CONTENT.scenes))
      for (const l of [...s.introLines, ...s.options.flatMap((o) => o.branchLines)]) {
        assert.ok(!seen.has(l.id), `duplicate ${l.id}`);
        seen.add(l.id);
        for (const p of Object.values(princess)) if (l.speaker === p) assert.equal(s.route && princess[s.route], p, `${l.id}: ${p} in ${s.sceneId}`);
      }
  });

  test('epilogue location cue lines still exist (staging switches to the Royal Gardens at these IDs)', () => {
    for (const [scene, line] of [['TAV-EPI-01', 'TAV-EPI-012'], ['NER-EPI-01', 'NER-EPI-017'], ['KAE-EPI-01', 'KAE-EPI-012'], ['SEN-EPI-01', 'SEN-EPI-LATER']] as const) {
      const s = CONTENT.scenes[scene]!;
      assert.ok(s.introLines.some((l) => l.id === line), `${scene} keeps ${line}`);
    }
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
