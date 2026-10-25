// Dialogue audit: counts patterns that make dialogue read as machine-written or
// samey (see docs/writing/STYLE_GUIDE.md). A heuristic aid for editors, not a
// quality score. Usage:
//   node scripts/dialogue-audit.mjs                 # audit the shipped content
//   node scripts/dialogue-audit.mjs --base          # audit the frozen base text
//   node scripts/dialogue-audit.mjs --md out.md     # also write a markdown report
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RULES, sceneLines, flagsFor } from './lib/dialogue-rules.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const useBase = args.includes('--base');
const mdOut = args.includes('--md') ? args[args.indexOf('--md') + 1] : null;

let scenes;
if (useBase) {
  const file = join(mkdtempSync(join(tmpdir(), 're-audit-')), 'base.json');
  execFileSync(process.execPath, ['--import', 'tsx', join(root, 'scripts/compile-content.ts'), '--print-base', file], { cwd: root, env: { ...process.env, CONTENT_REVISION: 'none' } });
  scenes = JSON.parse(readFileSync(file, 'utf8'));
} else scenes = JSON.parse(readFileSync(join(root, 'src/content/generated/content.json'), 'utf8')).scenes;


const counts = Object.fromEntries(RULES.map((r) => [r.id, 0]));
const perScene = [];
const perSpeaker = {};
let lines = 0;
let words = 0;
let flaggedLines = 0;
const lengths = [];
for (const s of Object.values(scenes)) {
  const hits = {};
  for (const l of sceneLines(s)) {
    lines++;
    const w = l.text.split(/\s+/).length;
    words += w;
    lengths.push(w);
    (perSpeaker[l.speaker] ??= []).push(w);
    const f = flagsFor(l, s);
    if (f.length) flaggedLines++;
    for (const id of f) {
      counts[id]++;
      hits[id] = (hits[id] ?? 0) + 1;
    }
  }
  perScene.push({ id: s.sceneId, total: Object.values(hits).reduce((a, b) => a + b, 0), hits });
}
const mean = words / lines;
const sd = Math.sqrt(lengths.reduce((a, x) => a + (x - mean) ** 2, 0) / lengths.length);
const per100 = (n) => ((n / lines) * 100).toFixed(1);

const out = [];
out.push(`# Dialogue audit — ${useBase ? 'frozen base text' : 'shipped content'}`, '');
out.push(`Lines (incl. choice labels): ${lines} · words/line mean ${mean.toFixed(1)}, sd ${sd.toFixed(1)}`, '');
out.push('| Pattern | Lines | per 100 lines |', '|---|---|---|');
for (const r of RULES) out.push(`| ${r.desc} | ${counts[r.id]} | ${per100(counts[r.id])} |`);
const total = Object.values(counts).reduce((a, b) => a + b, 0);
out.push(`| **All pattern hits** | **${total}** | **${per100(total)}** |`);
out.push(`| **Lines with at least one hit** | **${flaggedLines}** | **${per100(flaggedLines)}** |`, '');
out.push('Words per line by speaker (mean / sd / lines):', '');
for (const [sp, ws] of Object.entries(perSpeaker).sort((a, b) => b[1].length - a[1].length)) {
  const m = ws.reduce((a, b) => a + b, 0) / ws.length;
  const d = Math.sqrt(ws.reduce((a, x) => a + (x - m) ** 2, 0) / ws.length);
  out.push(`- ${sp}: ${m.toFixed(1)} / ${d.toFixed(1)} / ${ws.length}`);
}
out.push('');
out.push('Most-flagged scenes:', '');
for (const s of perScene.sort((a, b) => b.total - a.total).slice(0, 12)) out.push(`- ${s.id}: ${s.total} (${Object.entries(s.hits).map(([k, v]) => `${k} ${v}`).join(', ')})`);
const text = out.join('\n') + '\n';
console.log(text);
if (mdOut) {
  mkdirSync(dirname(join(root, mdOut)), { recursive: true });
  writeFileSync(join(root, mdOut), text);
}
