// Writer's check for a new route folder (content/routes/<ROUTE>): validates every
// scene exactly as the content compiler does, then lists lines the house-style
// heuristics flag and the length of each scene against the other routes.
//   node --import tsx scripts/check-route.ts content/routes/SEN [--quiet]
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { loadRoute } from './lib/routes.ts';
// @ts-expect-error plain ESM module without types
import { flagsFor, sceneLines } from './lib/dialogue-rules.mjs';
import type { Scene } from '../src/content/types.ts';

const root = resolve(import.meta.dirname, '..');
const dir = resolve(process.argv[2] ?? join(root, 'content/routes/SEN'));
const quiet = process.argv.includes('--quiet');
const existing = (JSON.parse(readFileSync(join(root, 'src/content/generated/content.json'), 'utf8')) as { scenes: Record<string, Scene> }).scenes;
const errors: string[] = [];
const r = loadRoute(dir, existing, errors);
for (const e of errors) console.log(`ERROR ${e}`);
if (r) {
  let flagged = 0;
  let total = 0;
  const target: Record<string, [number, number]> = { ordinary: [8, 13], optional: [24, 34], midpoint: [34, 46], midpoint_retry: [9, 14], marriage: [28, 38], marriage_retry: [9, 13], epilogue: [19, 25] };
  for (const s of Object.values(r.scenes)) {
    const lines = sceneLines(s) as { id: string; speaker: string; text: string }[];
    const n = s.introLines.length + s.options.reduce((a, o) => a + o.branchLines.length, 0);
    const [lo, hi] = target[s.kind] ?? [0, 999];
    if (!quiet && (n < lo || n > hi)) console.log(`LENGTH ${s.sceneId}: ${n} lines (other routes: ${lo}–${hi})`);
    for (const l of lines) {
      total++;
      const f = flagsFor(l, s) as string[];
      if (f.length) {
        flagged++;
        if (!quiet) console.log(`FLAG ${l.id} [${f.join(', ')}] ${l.speaker}: ${l.text}`);
      }
    }
  }
  console.log(`${Object.keys(r.scenes).length} scenes, ${total} lines incl. choice labels, ${flagged} flagged (${((100 * flagged) / Math.max(total, 1)).toFixed(1)} per 100; the revised routes run at 2.9)`);
}
console.log(errors.length ? `${errors.length} error(s)` : 'No errors.');
process.exit(errors.length ? 1 : 0);
