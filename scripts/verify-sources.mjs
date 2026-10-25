// Source-integrity preflight: verifies the eight frozen archives and the 28
// approved art originals against the handoff's recorded SHA-256 values and
// prints the fixed inventory. Exits non-zero on any mismatch or missing file.
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const H = join(root, 'handoff');
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error('FAIL', msg);
};

const archives = JSON.parse(readFileSync(join(H, '05_AUDIT_AND_PROVENANCE/Original_Archive_Checksums.json'), 'utf8'));
for (const [name, want] of Object.entries(archives)) {
  const p = join(H, '00_SOURCE_ORIGINALS', name);
  if (!existsSync(p)) fail(`missing archive ${name}`);
  else if (sha(p) !== want) fail(`archive hash mismatch ${name}`);
}

const manifest = JSON.parse(readFileSync(join(H, '02_ART_ASSETS/asset_manifest.json'), 'utf8'));
const kinds = {};
for (const a of manifest) {
  const p = join(H, a.path);
  kinds[a.kind] = (kinds[a.kind] ?? 0) + 1;
  if (!existsSync(p)) fail(`missing art ${a.path}`);
  else if (sha(p) !== a.sha256) fail(`art hash mismatch ${a.path}`);
}

const sched = JSON.parse(readFileSync(join(H, '03_IMPLEMENTATION_BLUEPRINT/route_schedules_and_training.json'), 'utf8'));
const sceneManifest = JSON.parse(readFileSync(join(H, '01_APPROVED_CANON/scene_section_manifest.json'), 'utf8'));

const inventory = {
  archives: Object.keys(archives).length,
  artAssets: manifest.length,
  artByKind: kinds,
  scenes: sceneManifest.length,
  trainingActivities: sched.activities.length,
  locations: sched.locations.length,
  routes: Object.keys(sched.routes).length,
};
console.log(JSON.stringify(inventory, null, 2));

if (inventory.archives !== 8) fail('expected 8 archives');
if (inventory.artAssets !== 28) fail('expected 28 art assets');
if (inventory.scenes !== 77) fail('expected 77 scenes');
if (inventory.trainingActivities !== 8) fail('expected 8 training activities');
if (inventory.locations !== 7) fail('expected 7 locations');
if (inventory.routes !== 3) fail('expected 3 routes');

if (failures) {
  console.error(`${failures} source-integrity failure(s)`);
  process.exit(1);
}
console.log('Source integrity OK: 8/8 archives and 28/28 art originals match recorded SHA-256.');
