// Build optimized WebP deployment copies of the 28 approved art originals.
// Originals in handoff/02_ART_ASSETS are only ever READ (hash-verified first).
//
//   node scripts/optimize-art.mjs          # (re)generate public/art + manifest
//   node scripts/optimize-art.mjs --check  # verify derived copies match the manifest
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const H = join(root, 'handoff');
const OUT = join(root, 'public/art');
const MANIFEST = join(OUT, 'derived_manifest.json');
const sha = (b) => createHash('sha256').update(b).digest('hex');

const source = JSON.parse(readFileSync(join(H, '02_ART_ASSETS/asset_manifest.json'), 'utf8'));

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
    const d = derived.assets.find((x) => x.asset_id === a.asset_id);
    if (!d) fail(`no derived copy for ${a.asset_id}`);
    if (d.source_sha256 !== a.sha256) fail(`derived ${a.asset_id} was made from a different original`);
    if (sha(readFileSync(join(H, a.path))) !== a.sha256) fail(`original ${a.path} hash mismatch`);
    const p = join(OUT, d.file);
    if (!existsSync(p)) fail(`derived file missing: ${d.file}`);
    if (sha(readFileSync(p)) !== d.sha256) fail(`derived file changed: ${d.file}`);
    n++;
  }
  console.log(`Art check OK: ${n}/28 derived copies verified against originals.`);
  process.exit(0);
}

const { default: sharp } = await import('sharp');
mkdirSync(OUT, { recursive: true });
const assets = [];
for (const a of source) {
  const buf = readFileSync(join(H, a.path));
  if (sha(buf) !== a.sha256) fail(`original ${a.path} hash mismatch`);
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
  });
  console.log(`${file}  ${out.info.width}x${out.info.height}  ${(out.data.length / 1024).toFixed(0)} KiB`);
}
writeFileSync(
  MANIFEST,
  JSON.stringify(
    {
      note: 'Derived deployment copies (WebP). Originals are unchanged in handoff/02_ART_ASSETS and remain the identity authority.',
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
