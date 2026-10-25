// Writer's check for a folder of revision scene files (content/revisions/<id>/scenes
// or a draft folder). Validates the files against the frozen base exactly as the
// content compiler does, then lists every line the dialogue heuristics flag.
//   node --import tsx scripts/check-revision.ts <scenesDir> [--quiet]
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { applyRevision } from './lib/revision.ts';
// @ts-expect-error plain ESM module without types
import { flagsFor, sceneLines } from './lib/dialogue-rules.mjs';
import type { Scene, SupportCopy } from '../src/content/types.ts';

const root = resolve(import.meta.dirname, '..');
const dir = resolve(process.argv[2] ?? join(root, 'content/revisions/dialogue-v2/scenes'));
const quiet = process.argv.includes('--quiet');

const tmp = mkdtempSync(join(tmpdir(), 're-check-'));
const baseFile = join(tmp, 'base.json');
execFileSync(process.execPath, ['--import', 'tsx', join(root, 'scripts/compile-content.ts'), '--print-base', baseFile], { cwd: root, env: { ...process.env, CONTENT_REVISION: 'none' } });
const base = JSON.parse(readFileSync(baseFile, 'utf8')) as Record<string, Scene>;
const support = (JSON.parse(readFileSync(join(root, 'src/content/generated/content.json'), 'utf8')) as { support: SupportCopy }).support;

const rev = join(tmp, 'rev');
mkdirSync(rev);
cpSync(dir, join(rev, 'scenes'), { recursive: true });
writeFileSync(join(rev, 'REVISION.json'), JSON.stringify({ id: 'check', authority: 'check', requested: 'check', date: 'check', scope: 'check' }));
const errors: string[] = [];
const result = applyRevision(base, support, rev, errors);
for (const e of errors) console.log(`ERROR ${e}`);

if (result) {
  const revised = new Set<string>();
  for (const f of execFileSync('ls', [join(rev, 'scenes')]).toString().split('\n')) if (f.endsWith('.json')) revised.add(f.slice(0, -5));
  let flagged = 0;
  let total = 0;
  for (const id of [...revised].sort()) {
    const s = result.scenes[id];
    if (!s) continue;
    for (const l of sceneLines(s) as { id: string; speaker: string; text: string }[]) {
      total++;
      const hits = flagsFor(l, s) as string[];
      if (hits.length) {
        flagged++;
        if (!quiet) console.log(`flag ${l.id} [${hits.join(', ')}] ${l.speaker}: ${l.text}`);
      }
    }
  }
  console.log(`\n${revised.size} scene files, ${total} lines, ${flagged} flagged (${((flagged / Math.max(total, 1)) * 100).toFixed(1)} per 100 lines), ${errors.length} errors`);
}
process.exit(errors.length ? 1 : 0);
