// Build optimized WebP deployment copies of the approved art.
// Originals in handoff/02_ART_ASSETS are only ever READ (hash-verified first).
//
// All-ages edit (owner request 2026-10-25): every character image (15 sprites,
// 3 midpoint illustrations) ships from its wardrobe-edited derivative in
// art-src/edited/ (made from the original by scripts/art/modest.py; hashes in
// art-src/edited/EDITS.json). The three character reference sheets are design
// documents, not game screens, and are no longer shipped to players.
//
// Owner-requested new routes (content/routes/<ROUTE>) bring their own art in
// art-src/routes/<ROUTE>/, listed with hashes and status (placeholder or
// generated, with provenance) in that folder's ART.json.
//
//   node scripts/optimize-art.mjs          # (re)generate public/art + manifest
//   node scripts/optimize-art.mjs --check  # verify derived copies match the manifest
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const H = join(root, 'handoff');
const OUT = join(root, 'public/art');
const MANIFEST = join(OUT, 'derived_manifest.json');
const sha = (b) => createHash('sha256').update(b).digest('hex');

const source = JSON.parse(readFileSync(join(H, '02_ART_ASSETS/asset_manifest.json'), 'utf8'));
const EDITED = join(root, 'art-src/edited');
const edits = existsSync(join(EDITED, 'EDITS.json')) ? JSON.parse(readFileSync(join(EDITED, 'EDITS.json'), 'utf8')) : {};
const MUST_EDIT = new Set(['expression_sprite', 'midpoint_CG']);
const ROUTE_ART = join(root, 'art-src/routes');
/** Art for owner-requested new routes: [{ route, status, asset }] with the file verified against ART.json. */
const routeArt = (existsSync(ROUTE_ART) ? readdirSync(ROUTE_ART) : [])
  .filter((d) => existsSync(join(ROUTE_ART, d, 'ART.json')))
  .sort()
  .flatMap((d) => {
    const rec = JSON.parse(readFileSync(join(ROUTE_ART, d, 'ART.json'), 'utf8'));
    if (rec.route !== d) fail(`art-src/routes/${d}/ART.json names route ${rec.route}`);
    if (!['placeholder', 'generated'].includes(rec.status)) fail(`art-src/routes/${d}: status must be placeholder or generated`);
    return rec.assets.map((a) => {
      const path = `art-src/routes/${d}/${a.file}`;
      const buf = readFileSync(join(root, path));
      if (sha(buf) !== a.sha256) fail(`${path} does not match ART.json`);
      return { route: d, status: rec.status, asset: a, path, buf };
    });
  });
const NOT_SHIPPED = new Set(['character_sheet']);

/** The bytes a shipped file is derived from: the edited derivative where policy requires one. */
function inputFor(a) {
  const orig = readFileSync(join(H, a.path));
  if (sha(orig) !== a.sha256) fail(`original ${a.path} hash mismatch`);
  if (!MUST_EDIT.has(a.kind)) return { buf: orig, edit: null };
  const e = edits[a.asset_id];
  if (!e) fail(`${a.asset_id}: no all-ages edit recorded in art-src/edited/EDITS.json`);
  if (e.source_sha256 !== a.sha256) fail(`${a.asset_id}: edit was made from a different original`);
  const buf = readFileSync(join(EDITED, `${a.asset_id}.png`));
  if (sha(buf) !== e.edited_sha256) fail(`${a.asset_id}: edited PNG does not match EDITS.json`);
  return { buf, edit: { file: `art-src/edited/${a.asset_id}.png`, sha256: e.edited_sha256, spec: `scripts/art/modest/${a.asset_id}.json` } };
}

// Per-kind output sizes: keep enough resolution for a 1280px stage at 2x DPR
// where practical, while keeping the shipped site light.
const PLAN = {
  background: { width: 1672, quality: 80 },
  expression_sprite: { width: 768, quality: 84 },
  midpoint_CG: { width: 1448, quality: 82 },
  character_sheet: { width: 1600, quality: 82 },
};

if (process.argv.includes('--check')) {
  if (!existsSync(MANIFEST)) fail('derived_manifest.json missing; run npm run art');
  const derived = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  let n = 0;
  for (const a of source) {
    if (NOT_SHIPPED.has(a.kind)) {
      if (existsSync(join(OUT, `${a.asset_id}.webp`))) fail(`${a.asset_id} must not be shipped`);
      continue;
    }
    const d = derived.assets.find((x) => x.asset_id === a.asset_id);
    if (!d) fail(`no derived copy for ${a.asset_id}`);
    if (d.source_sha256 !== a.sha256) fail(`derived ${a.asset_id} was made from a different original`);
    const { edit } = inputFor(a);
    if ((edit?.sha256 ?? null) !== (d.edited_sha256 ?? null)) fail(`derived ${a.asset_id} was not made from the current edited source`);
    const p = join(OUT, d.file);
    if (!existsSync(p)) fail(`derived file missing: ${d.file}`);
    if (sha(readFileSync(p)) !== d.sha256) fail(`derived file changed: ${d.file}`);
    n++;
  }
  for (const r of routeArt) {
    const d = derived.assets.find((x) => x.asset_id === r.asset.asset_id);
    if (!d) fail(`no derived copy for ${r.asset.asset_id}`);
    if (d.source_sha256 !== r.asset.sha256 || d.route_status !== r.status) fail(`derived ${r.asset.asset_id} is out of date with ${r.path}`);
    if (!existsSync(join(OUT, d.file)) || sha(readFileSync(join(OUT, d.file))) !== d.sha256) fail(`derived file changed: ${d.file}`);
    n++;
  }
  console.log(`Art check OK: ${n} shipped copies verified against their originals (and all-ages edits, and new-route art); reference sheets not shipped.`);
  process.exit(0);
}

const { default: sharp } = await import('sharp');
mkdirSync(OUT, { recursive: true });
const assets = [];
for (const a of source) {
  if (NOT_SHIPPED.has(a.kind)) {
    rmSync(join(OUT, `${a.asset_id}.webp`), { force: true });
    continue;
  }
  const { buf, edit } = inputFor(a);
  const plan = PLAN[a.kind];
  if (!plan) fail(`unknown asset kind ${a.kind}`);
  const file = `${a.asset_id}.webp`;
  const img = sharp(buf, { failOn: 'error' });
  const meta = await img.metadata();
  const out = await img
    .resize({ width: Math.min(plan.width, meta.width), withoutEnlargement: true })
    .webp({ quality: plan.quality, alphaQuality: 90, effort: 5, smartSubsample: true })
    .toBuffer({ resolveWithObject: true });
  writeFileSync(join(OUT, file), out.data);
  assets.push({
    asset_id: a.asset_id,
    kind: a.kind,
    file,
    width: out.info.width,
    height: out.info.height,
    bytes: out.data.length,
    sha256: sha(out.data),
    source_path: a.path,
    source_sha256: a.sha256,
    source_archive: a.source_archive,
    source_member: a.archive_member,
    ...(edit ? { edited_from: edit.file, edited_sha256: edit.sha256, edit_spec: edit.spec } : {}),
  });
  console.log(`${file}  ${out.info.width}x${out.info.height}  ${(out.data.length / 1024).toFixed(0)} KiB`);
}
for (const r of routeArt) {
  const plan = PLAN[r.asset.kind];
  if (!plan) fail(`unknown asset kind ${r.asset.kind}`);
  const file = `${r.asset.asset_id}.webp`;
  const img = sharp(r.buf, { failOn: 'error' });
  const meta = await img.metadata();
  const out = await img
    .resize({ width: Math.min(plan.width, meta.width), withoutEnlargement: true })
    .webp({ quality: plan.quality, alphaQuality: 90, effort: 5, smartSubsample: true })
    .toBuffer({ resolveWithObject: true });
  writeFileSync(join(OUT, file), out.data);
  assets.push({
    asset_id: r.asset.asset_id,
    kind: r.asset.kind,
    file,
    width: out.info.width,
    height: out.info.height,
    bytes: out.data.length,
    sha256: sha(out.data),
    source_path: r.path,
    source_sha256: r.asset.sha256,
    route: r.route,
    route_status: r.status,
  });
  console.log(`${file}  ${out.info.width}x${out.info.height}  ${(out.data.length / 1024).toFixed(0)} KiB  (${r.route} ${r.status})`);
}
writeFileSync(
  MANIFEST,
  JSON.stringify(
    {
      note: 'Derived deployment copies (WebP). Originals are unchanged in handoff/02_ART_ASSETS and remain the identity authority. Character images ship from their all-ages edits (edited_from); reference sheets are not shipped.',
      encoder: `sharp ${sharp.versions?.sharp ?? 'unknown'} / libvips ${sharp.versions?.vips ?? 'unknown'}`,
      assets,
    },
    null,
    2,
  ) + '\n',
);
const total = assets.reduce((s, a) => s + a.bytes, 0);
console.log(`Wrote ${assets.length} derived images, ${(total / 1024 / 1024).toFixed(1)} MiB total.`);

function fail(msg) {
  console.error('FAIL', msg);
  process.exit(1);
}
