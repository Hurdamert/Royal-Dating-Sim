// Presentation rules that can be checked without a browser: stage geometry for
// Nerelle's waterborne staging (F04 contract) and WCAG 2.2 AA colour contrast
// for every text/background pair the stylesheet uses.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { BG_H, BG_W, compositionFor, NERELLE_SPRITE_CUT, NERELLE_WATERLINE, spriteWidth, type Composition, type Rect } from '../../src/ui/staging.ts';
import { LOCATIONS, ROUTES } from '../../src/core/model.ts';
import { ROUTE_SPECS } from '../../src/core/schedule.ts';


/** Water-line y of a polygon at a given x (top edge), by scanning its edges. */
function topEdgeAt(poly: [number, number][], x: number): number {
  let best = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i]!;
    const [x2, y2] = poly[(i + 1) % poly.length]!;
    if ((x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) && x1 !== x2) best = Math.min(best, y1 + ((x - x1) / (x2 - x1)) * (y2 - y1));
  }
  return best;
}

describe('Stage compositions', () => {
  const crops = (c: Composition): [string, Rect][] => [
    ['desktop', c.crop],
    ['phone', c.cropPhone],
  ];

  test('every crop is 16:9 and inside the 1672×941 background', () => {
    for (const r of ROUTES)
      for (const l of LOCATIONS) {
        const c = compositionFor(r, l);
        if (!c) continue;
        for (const [name, k] of crops(c)) {
          assert.ok(Math.abs(k.w * 9 - k.h * 16) <= 16 * 1.5, `${r}@${l} ${name} crop ratio`);
          assert.ok(k.x >= 0 && k.y >= 0 && k.x + k.w <= BG_W + 0.5 && k.y + k.h <= BG_H + 0.5, `${r}@${l} ${name} crop bounds`);
        }
      }
  });

  test('Nerelle only has compositions where she is scheduled (water), never an upright land placement', () => {
    const scheduled = new Set(Object.values(ROUTE_SPECS.NER.meeting).flatMap((d) => Object.values(d)));
    assert.deepEqual([...scheduled].sort(), ['moonwater_quay', 'royal_gardens']);
    for (const l of LOCATIONS) {
      const c = compositionFor('NER', l);
      if (scheduled.has(l)) assert.ok(c?.waterborne && c.occluder, `${l} is waterborne with a water occluder`);
      else assert.equal(c, null, `${l} has no Nerelle composition (falls back to a framed bust)`);
    }
  });

  test('Nerelle: everything below the waterline is covered by the background-pixel occluder; head stays in frame', () => {
    assert.ok(NERELLE_SPRITE_CUT > NERELLE_WATERLINE, 'the transparent cut in her sprites lies under the water');
    for (const l of ['royal_gardens', 'moonwater_quay'] as const) {
      const c = compositionFor('NER', l)!;
      const s = c.sprite;
      const w = spriteWidth(s);
      const waist = s.top + NERELLE_WATERLINE * s.height;
      for (const x of [s.cx - w * 0.25, s.cx, s.cx + w * 0.25]) {
        const xx = Math.min(BG_W - 1, x);
        const line = topEdgeAt(c.occluder!, xx);
        assert.ok(line <= waist + 12, `${l}: water line ${line.toFixed(0)} at x=${xx.toFixed(0)} must be at/above her collarbone ${waist.toFixed(0)}`);
      }
      for (const [name, k] of crops(c)) assert.ok(s.top >= k.y - 2, `${l} ${name}: head (top ${s.top}) inside crop (y ${k.y})`);
    }
  });

  test('Nerelle: the waterline sits on water pixels of the approved background, not stone or paving', async () => {
    for (const [l, file] of [['royal_gardens', 'bg_royal_gardens.webp'], ['moonwater_quay', 'bg_moonwater_quay.webp']] as const) {
      const c = compositionFor('NER', l)!;
      const { data, info } = await sharp(`public/art/${file}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      assert.equal(info.width, BG_W);
      const w = spriteWidth(c.sprite);
      let water = 0;
      let total = 0;
      // A 14px band just under the waterline across her torso (centre 40% of the sprite).
      // (The previous Gardens placement, waterline on the wall coping, scores 0%; the Quay scores ~84% because of sun glints.)
      for (let x = Math.round(c.sprite.cx - w * 0.2); x <= Math.min(BG_W - 1, c.sprite.cx + w * 0.2); x += 4) {
        const top = Math.ceil(topEdgeAt(c.occluder!, x));
        for (let y = top + 2; y < top + 16; y += 2) {
          const i = (y * info.width + x) * 3;
          const [r, g, b] = [data[i]!, data[i + 1]!, data[i + 2]!];
          total++;
          if (b > r + 25 && b >= g) water++;
        }
      }
      assert.ok(water / total > 0.75, `${l}: ${((water / total) * 100).toFixed(0)}% of the waterline band is water-coloured`);
    }
  });

  test('All-ages art: every shipped character image comes from its edit; reference sheets are not shipped; Nerelle ends at the waterline', async () => {
    const derived = JSON.parse(readFileSync('public/art/derived_manifest.json', 'utf8')) as {
      assets: { asset_id: string; kind: string; file: string; edited_from?: string; route?: string; route_status?: string }[];
    };
    const chars = derived.assets.filter((a) => (a.kind === 'expression_sprite' || a.kind === 'midpoint_CG') && !a.route);
    assert.equal(chars.length, 18);
    for (const a of chars) assert.ok(a.edited_from, `${a.asset_id} ships from its all-ages edit`);
    // Owner-requested routes ship their own recorded art: five portraits and one illustration each.
    const sen = derived.assets.filter((a) => a.route === 'SEN');
    assert.deepEqual(sen.map((a) => a.asset_id).sort(), ['senna_senna_annoyed', 'senna_senna_lamplight', 'senna_senna_neutral', 'senna_senna_playful', 'senna_senna_surprised', 'senna_senna_worried']);
    for (const a of sen) assert.ok(a.route_status === 'placeholder' || a.route_status === 'generated', a.asset_id);
    assert.equal(derived.assets.filter((a) => a.kind === 'character_sheet').length, 0, 'reference sheets are not shipped');
    // Owner request: no illustration shows a princess lying down. The two whose
    // originals do ship as recorded seated redraws: reference → editor output →
    // recorded correction → the shipped edit, every step pinned by its hash.
    const sha = (f: string) => createHash('sha256').update(readFileSync(f)).digest('hex');
    const edits = JSON.parse(readFileSync('art-src/edited/EDITS.json', 'utf8')) as Record<string, { edited_sha256: string; redrawn?: string }>;
    for (const id of ['tavri_tavri_private_confession', 'nerelle_nerelle_forbidden_journey']) {
      const spec = JSON.parse(readFileSync(`scripts/art/modest/${id}.json`, 'utf8')) as { redrawn?: { file: string; record: string } };
      assert.ok(spec.redrawn, `${id} ships its seated redraw`);
      const rec = JSON.parse(readFileSync(spec.redrawn.record, 'utf8')) as {
        prompt: string;
        reference: { commit: string; sha256: string };
        generated: { file: string; sha256: string };
        result: { file: string; sha256: string; size: number[] };
      };
      assert.match(rec.prompt, /sits upright/);
      assert.equal(sha(rec.generated.file), rec.generated.sha256, `${id}: editor output unchanged`);
      assert.equal(rec.result.file, spec.redrawn.file);
      assert.equal(sha(rec.result.file), rec.result.sha256, `${id}: corrected picture matches its record`);
      assert.equal(sha(`art-src/edited/${id}.png`), rec.result.sha256, `${id}: the shipped edit is the redraw, byte for byte`);
      assert.equal(edits[id]?.edited_sha256, rec.result.sha256);
      assert.deepEqual(rec.result.size, [1448, 1086]);
      assert.match(rec.reference.commit, /^[0-9a-f]{40}$/);
    }
    for (const a of chars.filter((x) => x.asset_id.startsWith('nerelle_') && x.kind === 'expression_sprite')) {
      const { data, info } = await sharp(`public/art/${a.file}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const from = Math.ceil(NERELLE_SPRITE_CUT * info.height) + 1;
      let opaque = 0;
      for (let y = from; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3]! > 8) opaque++;
      assert.equal(opaque, 0, `${a.file}: nothing below the waterline cut`);
    }
  });

  test('Gardens: Nerelle is at screen-right beside the canal in both desktop and 320px crops; label names the canal', () => {
    const c = compositionFor('NER', 'royal_gardens')!;
    for (const [name, k] of crops(c)) {
      const rel = (c.sprite.cx - k.x) / k.w;
      assert.ok(rel > 0.7, `${name}: sprite centre at ${(rel * 100).toFixed(0)}% of stage width`);
    }
    assert.equal(c.label, 'Royal Gardens — Canal');
  });
});

// ---------------------------------------------------------------------------
function lum(hex: string): number {
  const h = hex.replace('#', '').slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a: string, b: string): number {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p) as [number, number];
  return (x + 0.05) / (y + 0.05);
}

describe('WCAG 2.2 AA colour contrast', () => {
  const css = readFileSync('src/styles.css', 'utf8');
  const token = (name: string) => {
    const m = new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css);
    assert.ok(m, `token --${name}`);
    return m[1]!;
  };
  const T = {
    parchment: token('parchment'),
    paper: token('paper'),
    ink: token('ink'),
    inkSoft: token('ink-soft'),
    glass: token('glass-solid'),
    gold: token('gold'),
    burgundy: token('burgundy'),
    burgundyHover: token('burgundy-hover'),
    focus: token('focus'),
  };
  const text: [string, string, string][] = [
    ['ink on parchment', T.ink, T.parchment],
    ['ink on paper', T.ink, T.paper],
    ['soft ink on parchment', T.inkSoft, T.parchment],
    ['soft ink on paper', T.inkSoft, T.paper],
    ['paper on dialogue glass', T.paper, T.glass],
    ['gold speaker label on dialogue glass', T.gold, T.glass],
    ['paper on burgundy button', T.paper, T.burgundy],
    ['paper on burgundy hover', T.paper, T.burgundyHover],
    ['burgundy text on paper', T.burgundy, T.paper],
    ['focus-teal link on paper', T.focus, T.paper],
    ['error red on paper', '#8a1f1f', T.paper],
    ['saved green on paper', '#1d5b33', T.paper],
    ['warning brown on paper', '#7a4f00', T.paper],
    ['ink on warning banner', T.ink, '#fff4dc'],
    ['ink on info banner', T.ink, '#e9f3f5'],
    ['paper on stage label', T.paper, '#222631'],
    ['white on danger button', '#ffffff', '#8a1f1f'],
    ['soft ink on past calendar day', T.inkSoft, '#ece6dc'],
    ['Tavri name on paper', '#8f4f2f', T.paper],
    ['Nerelle name on paper', '#1d6670', T.paper],
    ['Kaedra name on paper', '#5b4a7d', T.paper],
    ['Senna name on paper', '#35603d', T.paper],
  ];
  for (const [name, fg, bg] of text) {
    test(`text ≥ 4.5:1 — ${name}`, () => {
      const r = ratio(fg, bg);
      assert.ok(r >= 4.5, `${name}: ${r.toFixed(2)}:1`);
    });
  }
  test('non-text: focus ring ≥ 3:1 against parchment, paper and dialogue glass', () => {
    for (const bg of [T.parchment, T.paper, T.glass]) assert.ok(ratio(T.focus, bg) >= 3, `${ratio(T.focus, bg).toFixed(2)}`);
  });
  test('gold is never used as ordinary text on parchment (known contrast failure)', () => {
    assert.ok(ratio(T.gold, T.parchment) < 4.5, 'premise: gold on parchment fails');
    // Every rule that colours text gold must be a dialogue speaker label (dark glass background).
    const rules = [...css.matchAll(/([^{}]+)\{[^}]*\bcolor:\s*var\(--gold\)/g)].map((m) => m[1]!.trim());
    assert.ok(rules.length > 0);
    for (const sel of rules) assert.match(sel, /line__speaker/, `gold text only for speaker labels on dark glass: "${sel}"`);
  });
});
