// Owner-requested dialogue revision layer.
//
// The frozen archives (plus the approved Tavri overlay) remain the BASE text and
// are never modified. A revision directory holds complete rewritten scripts per
// scene and rewritten support flavour lines. This module validates a revision
// against the base and applies it. A revision may change WORDS ONLY:
//   - line text, line speakers (route princess / narrator / player / minor
//     non-romance characters), princess expression cues, number of lines,
//     option label text, scene titles;
//   - it may NOT change scene IDs, choice points, the number/order/IDs of
//     options, outcome IDs or outcome classes (correct / wrong / offensive),
//     heart values, or any mechanic.
// New line IDs must extend the scene's existing ID family and be globally unique.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Expression, Scene, ScriptLine, SupportCopy } from '../../src/content/types.ts';

const EXPRESSIONS = new Set(['NEUTRAL', 'PLAYFUL', 'WORRIED', 'ANNOYED', 'SURPRISED']);
const PRINCESS: Record<string, string> = { TAV: 'TAVRI', NER: 'NERELLE', KAE: 'KAEDRA' };
const ALL_PRINCESSES = new Set(Object.values(PRINCESS));
const MAX_LINE_CHARS = 320;

export interface RevisionMeta {
  id: string;
  authority: string;
  requested: string;
  date: string;
  scope: string;
}

interface RevLine {
  id: string;
  speaker: string;
  expression?: string;
  text: string;
}
interface RevScene {
  sceneId: string;
  title?: string;
  intro: RevLine[];
  options?: { choiceId: string; labelText: string; branch: RevLine[] }[];
}
interface RevSupport {
  squareQuips?: Record<string, string>;
  activities?: Record<string, string>;
}

export interface RevisionResult {
  scenes: Record<string, Scene>;
  support: SupportCopy;
  meta: RevisionMeta;
  stats: {
    id: string;
    scenesRevised: number;
    linesBase: number;
    linesRevised: number;
    lineIdsAdded: number;
    lineIdsRemoved: number;
    supportLinesRevised: number;
    filesSha256: string;
  };
  removedLineIds: string[];
  comparison: string;
}

function familyPrefix(ids: string[]): string {
  const cuts = ids.map((id) => id.slice(0, id.lastIndexOf('-') + 1));
  let p = cuts[0] ?? '';
  for (const c of cuts) while (!c.startsWith(p)) p = p.slice(0, -1);
  return p;
}

const allLines = (s: Scene): ScriptLine[] => [...s.introLines, ...s.options.flatMap((o) => o.branchLines)];

export function applyRevision(base: Record<string, Scene>, baseSupport: SupportCopy, dir: string, errors: string[]): RevisionResult | null {
  if (!existsSync(dir)) return null;
  const err = (m: string) => errors.push(`revision: ${m}`);
  const metaPath = join(dir, 'REVISION.json');
  if (!existsSync(metaPath)) {
    err('REVISION.json missing');
    return null;
  }
  const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as RevisionMeta;
  for (const k of ['id', 'authority', 'requested', 'date', 'scope'] as const) if (typeof meta[k] !== 'string' || !meta[k]) err(`REVISION.json needs "${k}"`);

  const hash = createHash('sha256');
  const files = readdirSync(join(dir, 'scenes'))
    .filter((f) => f.endsWith('.json'))
    .sort();
  const scenes: Record<string, Scene> = structuredClone(base);
  const baseIds = new Set<string>();
  for (const s of Object.values(base)) for (const l of allLines(s)) baseIds.add(l.id);
  const usedIds = new Map<string, string>();
  let linesRevised = 0;
  let added = 0;
  const removed: string[] = [];
  const revisedSceneIds: string[] = [];

  for (const f of files) {
    const raw = readFileSync(join(dir, 'scenes', f));
    hash.update(f).update(raw);
    let r: RevScene;
    try {
      r = JSON.parse(raw.toString('utf8')) as RevScene;
    } catch (e) {
      err(`${f}: invalid JSON (${(e as Error).message})`);
      continue;
    }
    const b = base[r.sceneId];
    if (!b) {
      err(`${f}: unknown scene ${r.sceneId}`);
      continue;
    }
    if (f !== `${r.sceneId}.json`) err(`${f}: file name must be ${r.sceneId}.json`);
    const ctx = r.sceneId;
    const prefix = familyPrefix(allLines(b).map((l) => l.id));
    const princess = b.route ? PRINCESS[b.route]! : null;

    const conv = (lines: RevLine[] | undefined, where: string): ScriptLine[] => {
      if (!Array.isArray(lines) || lines.length === 0) {
        err(`${ctx}: ${where} must be a non-empty array`);
        return [];
      }
      return lines.map((l, i) => {
        const w = `${ctx} ${where}[${i}]`;
        if (typeof l.id !== 'string' || !/^[A-Z0-9-]+$/.test(l.id)) err(`${w}: bad id ${JSON.stringify(l.id)}`);
        else {
          if (!l.id.startsWith(prefix)) err(`${w}: id ${l.id} must start with ${prefix}`);
          if (usedIds.has(l.id)) err(`${w}: duplicate id ${l.id} (also in ${usedIds.get(l.id)})`);
          usedIds.set(l.id, ctx);
          if (!baseIds.has(l.id)) added++;
        }
        if (typeof l.speaker !== 'string' || !/^[A-Z][A-Z ]*$/.test(l.speaker)) err(`${w}: bad speaker`);
        else if (ALL_PRINCESSES.has(l.speaker) && l.speaker !== princess) err(`${w}: ${l.speaker} cannot speak in a ${b.route ?? 'shared'} scene`);
        if (l.expression !== undefined) {
          if (l.speaker !== princess) err(`${w}: only ${princess ?? 'the princess'} lines carry expressions`);
          if (!EXPRESSIONS.has(l.expression)) err(`${w}: unknown expression ${l.expression}`);
        }
        if (typeof l.text !== 'string' || !l.text.trim()) err(`${w}: empty text`);
        else {
          if (l.text !== l.text.trim()) err(`${w}: leading/trailing whitespace`);
          if (l.text.length > MAX_LINE_CHARS) err(`${w}: ${l.text.length} chars (max ${MAX_LINE_CHARS}) — split the line`);
          const tokens = l.text.match(/\{[^}]*\}/g) ?? [];
          for (const t of tokens) if (t !== '{PLAYER}') err(`${w}: unknown token ${t}`);
          if (/<[a-z/][^>]*>/i.test(l.text)) err(`${w}: markup is not allowed`);
        }
        linesRevised++;
        return { id: l.id, speaker: l.speaker, expression: (l.expression as Expression | undefined) ?? null, text: l.text };
      });
    };

    const target = scenes[r.sceneId]!;
    if (r.title !== undefined) {
      if (typeof r.title !== 'string' || !r.title.trim()) err(`${ctx}: bad title`);
      else target.title = r.title;
    }
    target.introLines = conv(r.intro, 'intro');
    if (b.displayOnly) {
      if (r.options && r.options.length) err(`${ctx}: display-only scene cannot have options`);
    } else {
      const opts = r.options ?? [];
      if (opts.length !== b.options.length) err(`${ctx}: must keep exactly ${b.options.length} options (has ${opts.length})`);
      b.options.forEach((bo, i) => {
        const ro = opts[i];
        if (!ro) return;
        if (ro.choiceId !== bo.choiceId) err(`${ctx}: option ${i + 1} must be ${bo.choiceId} (got ${ro.choiceId}); order and IDs are fixed`);
        if (typeof ro.labelText !== 'string' || !ro.labelText.trim()) err(`${ctx}/${bo.choiceId}: empty labelText`);
        else if (ro.labelText.length > MAX_LINE_CHARS) err(`${ctx}/${bo.choiceId}: label too long`);
        const t = target.options[i]!;
        t.labelText = ro.labelText;
        t.branchLines = conv(ro.branch, `${bo.choiceId}.branch`);
        // outcomeId, outcomeClass, netHalfHearts and internalLabel stay exactly as in the base.
      });
    }
    for (const l of allLines(b)) if (!usedIds.has(l.id)) removed.push(l.id);
    revisedSceneIds.push(r.sceneId);
  }

  // Support flavour (Humpty quips, training narration).
  const support: SupportCopy = structuredClone(baseSupport);
  let supportLines = 0;
  const supPath = join(dir, 'support.json');
  if (existsSync(supPath)) {
    const raw = readFileSync(supPath);
    hash.update('support.json').update(raw);
    const s = JSON.parse(raw.toString('utf8')) as RevSupport;
    for (const [id, text] of Object.entries(s.squareQuips ?? {})) {
      const q = support.squareQuips.find((x) => x.id === id);
      if (!q) err(`support: unknown quip ${id}`);
      else if (!text.trim() || text.length > MAX_LINE_CHARS) err(`support: bad text for ${id}`);
      else {
        q.text = text;
        supportLines++;
      }
    }
    for (const [id, text] of Object.entries(s.activities ?? {})) {
      const l = support.activities.flatMap((a) => a.lines).find((x) => x.id === id);
      if (!l) err(`support: unknown activity line ${id}`);
      else if (!text.trim() || text.length > MAX_LINE_CHARS) err(`support: bad text for ${id}`);
      else {
        l.text = text;
        supportLines++;
      }
    }
  }

  // Side-by-side comparison for owner review.
  const md: string[] = [
    `# Dialogue revision ${meta.id} — before / after`,
    '',
    `Requested: ${meta.requested} (${meta.date}). Authority: ${meta.authority}`,
    '',
    'Each scene shows the frozen base text (archives + approved Tavri overlay) and the revised text. Choice IDs, outcomes and heart values are identical; only words changed. Roll back with `CONTENT_REVISION=none npm run content`.',
    '',
  ];
  const fmt = (l: ScriptLine) => `- **${l.speaker}${l.expression ? ` [${l.expression}]` : ''}:** ${l.text}`;
  for (const id of revisedSceneIds.sort()) {
    const b = base[id]!;
    const a = scenes[id]!;
    md.push(`## ${id} — ${a.title}${a.title !== b.title ? ` (was: ${b.title})` : ''}`, '');
    md.push('<table><tr><th>Before</th><th>After</th></tr><tr><td>', '');
    md.push(...b.introLines.map(fmt));
    for (const o of b.options) md.push('', `**Option \`${o.choiceId}\` (${o.outcomeClass}):** PLAYER: ${o.labelText}`, ...o.branchLines.map((l) => `  ${fmt(l)}`));
    md.push('', '</td><td>', '');
    md.push(...a.introLines.map(fmt));
    for (const o of a.options) md.push('', `**Option \`${o.choiceId}\` (${o.outcomeClass}):** PLAYER: ${o.labelText}`, ...o.branchLines.map((l) => `  ${fmt(l)}`));
    md.push('', '</td></tr></table>', '');
  }
  if (supportLines) {
    md.push('## Humpty quips and training flavour', '');
    for (const q of baseSupport.squareQuips) {
      const n = support.squareQuips.find((x) => x.id === q.id)!;
      if (n.text !== q.text) md.push(`- \`${q.id}\`: ~~${q.text}~~ → ${n.text}`);
    }
    for (const a of baseSupport.activities)
      for (const l of a.lines) {
        const n = support.activities.flatMap((x) => x.lines).find((x) => x.id === l.id)!;
        if (n.text !== l.text) md.push(`- \`${l.id}\`: ~~${l.text}~~ → ${n.text}`);
      }
  }

  let linesBase = 0;
  for (const id of revisedSceneIds) linesBase += allLines(base[id]!).length;
  return {
    scenes,
    support,
    meta,
    removedLineIds: removed.sort(),
    stats: {
      id: meta.id,
      scenesRevised: revisedSceneIds.length,
      linesBase,
      linesRevised,
      lineIdsAdded: added,
      lineIdsRemoved: removed.length,
      supportLinesRevised: supportLines,
      filesSha256: hash.digest('hex'),
    },
    comparison: md.join('\n') + '\n',
  };
}
