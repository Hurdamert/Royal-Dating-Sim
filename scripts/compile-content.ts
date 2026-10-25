// Static content compiler.
//
// Reads the approved story text directly out of the frozen source archives in
// handoff/00_SOURCE_ORIGINALS (never rewriting them), applies the approved
// four-string Tavri overlay to a derived in-memory copy only, parses every
// scene into structured data preserving all authored IDs and exact text, runs
// the validation required by CONTENT_INTEGRATION.md, cross-checks the result
// against the readable per-scene extracts, and writes
// src/content/generated/content.json (checked in).
//
//   npx tsx scripts/compile-content.ts          # (re)generate
//   npx tsx scripts/compile-content.ts --check  # fail if checked-in output is stale

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// @ts-expect-error -- plain ESM helper without type declarations
import { openZip } from './lib/zip.mjs';
import { applyRevision } from './lib/revision.ts';
import type {
  ContentBundle,
  Scene,
  SceneKind,
  ScriptLine,
  ChoiceOption,
  OutcomeClass,
  Expression,
  Route,
  Stage,
  SupportCopy,
  HelpEntry,
  Activity,
} from '../src/content/types.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const H = join(root, 'handoff');
const ORIG = join(H, '00_SOURCE_ORIGINALS');
const CANON = join(H, '01_APPROVED_CANON');
const OUT_DIR = join(root, 'src/content/generated');
const OUT = join(OUT_DIR, 'content.json');
const REPORT = join(OUT_DIR, 'content-report.json');
// Owner-requested dialogue revision applied on top of the frozen base text.
// CONTENT_REVISION=none compiles the frozen base only (rollback / comparison).
const REVISION_ID = process.env.CONTENT_REVISION ?? 'dialogue-v2';
const REVISION_DIR = join(root, 'content/revisions', REVISION_ID);
const COMPARISON = join(root, 'docs/writing/DIALOGUE_REVISION_COMPARISON.md');

const errors: string[] = [];
const err = (m: string) => errors.push(m);
const sha = (b: Buffer | string) => createHash('sha256').update(b).digest('hex');

// ---------------------------------------------------------------------------
// 1. Source archives (hash-verified) and the members we read.
const checksums: Record<string, string> = JSON.parse(
  readFileSync(join(H, '05_AUDIT_AND_PROVENANCE/Original_Archive_Checksums.json'), 'utf8'),
);
for (const [name, want] of Object.entries(checksums)) {
  if (sha(readFileSync(join(ORIG, name))) !== want) err(`archive hash mismatch: ${name}`);
}
if (errors.length) fail();

const SRC = {
  tavri: {
    archive: 'Tavri_Gate2_Review_Candidate_v1.0.zip',
    member: 'narrative/Tavri_Gate2_Narrative_Package_v0.1.md',
  },
  overlay: {
    archive: 'Gate2_Combined_Pivotal_Content_Freeze_Review_v1.0.zip',
    member: 'Tavri_Approved_Time_Neutral_Overlay.json',
  },
  nerelle: {
    archive: 'Nerelle_Gate2_Review_Candidate_v1.0.zip',
    member: 'narrative/Nerelle_Gate2_Narrative_Package_v0.1.md',
  },
  kaedra: {
    archive: 'Kaedra_Gate2_Review_Candidate_v1.0.zip',
    member: 'Kaedra_Gate2_Review_Candidate_v1.0/narrative/Kaedra_Gate2_Narrative_Package_v0.1.md',
  },
  shared: {
    archive: 'Gate2_Combined_Approval_Addendum_v0.2.zip',
    member: 'Gate2_Combined_Approval_Addendum_v0.2/Shared_Prologue_and_Failure_APPROVED_Verbatim.md',
  },
  routine: {
    archive: 'Gate2_Routine_Approval_and_Handoff_Audit_v1.0.zip',
    member: 'approved_source_copies/Ordinary_Conversations_54_CANDIDATE_v0.1.md',
  },
  support: {
    archive: 'Gate2_Routine_Approval_and_Handoff_Audit_v1.0.zip',
    member: 'approved_source_copies/Routine_Support_Copy_CANDIDATE_v0.1.md',
  },
} as const;

const zipCache = new Map<string, { read: (n: string) => Buffer }>();
function member(ref: { archive: string; member: string }): Buffer {
  let z = zipCache.get(ref.archive);
  if (!z) {
    z = openZip(join(ORIG, ref.archive)) as { read: (n: string) => Buffer };
    zipCache.set(ref.archive, z);
  }
  return z.read(ref.member);
}

// ---------------------------------------------------------------------------
// 2. Derive the effective Tavri text with exactly the four approved replacements.
interface Overlay {
  source_file_sha256: string;
  effective_source_sha256_after_overlay: string;
  replacements: { target: string; old: string; new: string; line_id: string | null }[];
  assertions: { replacement_count: number };
}
const overlayBuf = member(SRC.overlay);
const overlay: Overlay = JSON.parse(overlayBuf.toString('utf8'));
const tavriOriginal = member(SRC.tavri);
if (sha(tavriOriginal) !== overlay.source_file_sha256) err('Tavri original does not match overlay source hash');
let tavriEffective = tavriOriginal.toString('utf8');
if (overlay.replacements.length !== 4 || overlay.assertions.replacement_count !== 4)
  err('Tavri overlay must contain exactly four replacements');
for (const r of overlay.replacements) {
  const count = tavriEffective.split(r.old).length - 1;
  if (count !== 1) err(`Tavri overlay target "${r.target}" occurs ${count} times (expected 1)`);
  tavriEffective = tavriEffective.replace(r.old, r.new);
}
if (sha(tavriEffective) !== overlay.effective_source_sha256_after_overlay)
  err('Derived effective Tavri text does not match the overlay-declared hash');
const handoffEffective = readFileSync(join(CANON, 'tavri_EFFECTIVE_overlay_applied.md'), 'utf8');
if (handoffEffective !== tavriEffective) err('Derived effective Tavri text differs from handoff convenience copy');

// ---------------------------------------------------------------------------
// 3. Scene parser.
const LINE_RE = /^- `([A-Z0-9-]+)` ([A-Z][A-Z ]*?)(?: \[([A-Z]+)\])?: (.*)$/;
const BRANCH_RE = /^\s+- `([A-Z0-9-]+)` ([A-Z][A-Z ]*?)(?: \[([A-Z]+)\])?: (.*)$/;
const OPTION_RE = /^(\d+)\. `([A-Z0-9-]+)`(?: —)? \*\*(.+?)\*\*(.*)$/;
const OUTCOME_RE = /^\s+- \*\*(Narrative outcome ID|Narrative outcome|Outcome):\*\* `([A-Z0-9-]+)`(.*)$/;
const PLAYER_CONT_RE = /^\s+PLAYER: (.*)$/;
const META_RE = /^\*\*([A-Za-z ]+):\*\*\s*(.*)$/;
const CHOICE_RE = /^\*\*Choice point `([A-Z0-9-]+)`/;
const END_RE = /^\*\*END `([A-Z0-9-]+)`:\*\*\s*(.*)$/;
const SCENE_ID_RE = /^\*\*Scene ID:\*\* `([A-Z0-9-]+)`/;
const ROUTINE_HEAD_RE = /^#### ((?:TAV|NER|KAE)-ORD-(?:PRE|POST)-[UF]\d\d) — (.+)$/;
const HEADING_RE = /^(#{1,4}) (.+)$/;
const EXPRESSIONS = new Set(['NEUTRAL', 'PLAYFUL', 'WORRIED', 'ANNOYED', 'SURPRISED']);

interface RawScene {
  id: string;
  title: string;
  lines: string[];
}

/** Split a document into raw scene blocks. */
function splitScenes(text: string, docName: string): RawScene[] {
  const lines = text.split('\n');
  const out: RawScene[] = [];
  let cur: RawScene | null = null;
  let lastHeading = '';
  const close = () => {
    if (cur) out.push(cur);
    cur = null;
  };
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    const rh = ROUTINE_HEAD_RE.exec(line);
    if (rh) {
      close();
      cur = { id: rh[1]!, title: rh[2]!, lines: [] };
      continue;
    }
    const sid = SCENE_ID_RE.exec(line);
    if (sid) {
      close();
      cur = { id: sid[1]!, title: lastHeading, lines: [] };
      continue;
    }
    const h = HEADING_RE.exec(line);
    if (h) {
      close();
      lastHeading = h[2]!;
      continue;
    }
    if (line === '---') {
      close();
      continue;
    }
    if (cur) (cur as RawScene).lines.push(line);
  }
  close();
  if (!out.length) err(`${docName}: no scenes found`);
  return out;
}

function sceneTitle(rawTitle: string, id: string): string {
  // "C. Scene 2 — The Private Confession (first full midpoint attempt)" -> title part after the dash.
  // "I-1. Shared prologue" -> "Shared prologue".
  let t = rawTitle;
  const dash = t.indexOf(' — ');
  if (dash >= 0 && /Scene \d/.test(t.slice(0, dash))) t = t.slice(dash + 3);
  t = t.replace(/^[A-Z]-\d+\.\s+/, '');
  if (!t) err(`${id}: empty title`);
  return t;
}

function classify(id: string): { kind: SceneKind; route: Route | null; stage: Stage | null } {
  if (id === 'CORE-PRO-01' || id === 'CORE-FAIL-01') return { kind: 'shared', route: null, stage: null };
  const route = id.slice(0, 3) as Route;
  if (!['TAV', 'NER', 'KAE'].includes(route)) throw new Error(`Unknown route prefix in ${id}`);
  let m: RegExpExecArray | null;
  if ((m = /^(?:TAV|NER|KAE)-ORD-(PRE|POST)-[UF]\d\d$/.exec(id))) return { kind: 'ordinary', route, stage: m[1] as Stage };
  if ((m = /^(?:TAV|NER|KAE)-EVT-(PRE|POST)-01$/.exec(id))) return { kind: 'optional', route, stage: m[1] as Stage };
  if (/-MID-01$/.test(id)) return { kind: 'midpoint', route, stage: 'PRE' };
  if (/-MID-RETRY-01$/.test(id)) return { kind: 'midpoint_retry', route, stage: 'PRE' };
  if (/-FIN-01$/.test(id)) return { kind: 'marriage', route, stage: 'POST' };
  if (/-FIN-RETRY-01$/.test(id)) return { kind: 'marriage_retry', route, stage: 'POST' };
  if (/-EPI-01$/.test(id)) return { kind: 'epilogue', route, stage: 'POST' };
  throw new Error(`Cannot classify scene ${id}`);
}

function toLine(m: RegExpExecArray, ctx: string): ScriptLine {
  const expr = m[3] ?? null;
  if (expr !== null && !EXPRESSIONS.has(expr)) err(`${ctx}: unknown expression [${expr}] on ${m[1]}`);
  return { id: m[1]!, speaker: m[2]!, expression: expr as Expression | null, text: m[4]! };
}

function outcomeClassOf(label: string, ctx: string): OutcomeClass {
  if (/^Correct\b/.test(label)) return 'correct';
  if (/^Ordinary (incorrect|wrong)\b/.test(label)) return 'wrong';
  if (/^Explicitly offensive\b/.test(label)) return 'offensive';
  if (/^(Wrong|Incorrect)\b/.test(label)) return 'wrong';
  err(`${ctx}: cannot classify option label "${label}"`);
  return 'wrong';
}

function netOf(label: string): number | null {
  const m = /net ([+−-])(\d) half-heart/.exec(label);
  if (!m) return null;
  return (m[1] === '+' ? 1 : -1) * Number(m[2]);
}

function parseScene(raw: RawScene, source: Scene['source']): Scene {
  const { kind, route, stage } = classify(raw.id);
  const ctx = raw.id;
  const meta: Record<string, string> = {};
  const intro: ScriptLine[] = [];
  const options: ChoiceOption[] = [];
  let choicePointId: string | null = null;
  let opt: ChoiceOption | null = null;
  let choicePoints = 0;

  for (const line of raw.lines) {
    if (line.trim() === '') continue;
    let m: RegExpExecArray | null;
    if ((m = END_RE.exec(line))) {
      if (m[1] !== raw.id) err(`${ctx}: END marker for ${m[1]}`);
      meta['END'] = m[2]!;
      opt = null;
      continue;
    }
    if ((m = CHOICE_RE.exec(line))) {
      choicePoints++;
      choicePointId = m[1]!;
      continue;
    }
    if ((m = OPTION_RE.exec(line))) {
      if (!choicePointId) err(`${ctx}: option before choice point`);
      const label = m[3]!.replace(/[.:]$/, '');
      const rest = m[4]!.replace(/^[.:]/, '').trim();
      let labelText = '';
      if (rest.startsWith('PLAYER: ')) labelText = rest.slice('PLAYER: '.length);
      else if (rest !== '') err(`${ctx}: unexpected text after option label: "${rest}"`);
      const outcomeClass = outcomeClassOf(label, `${ctx}/${m[2]}`);
      let netHalfHearts = 0;
      if (kind === 'ordinary' || kind === 'optional') {
        const n = netOf(label);
        const expected = outcomeClass === 'correct' ? 2 : outcomeClass === 'wrong' ? 1 : -1;
        if (n !== expected) err(`${ctx}/${m[2]}: label net ${n} does not match class ${outcomeClass}`);
        netHalfHearts = expected;
      }
      opt = {
        choiceId: m[2]!,
        labelLineSpeaker: 'PLAYER',
        labelText,
        outcomeId: '',
        outcomeClass,
        netHalfHearts,
        branchLines: [],
        internalLabel: label,
      };
      options.push(opt);
      continue;
    }
    if ((m = PLAYER_CONT_RE.exec(line))) {
      if (!opt || opt.labelText) err(`${ctx}: stray PLAYER continuation line`);
      else opt.labelText = m[1]!;
      continue;
    }
    if ((m = OUTCOME_RE.exec(line))) {
      if (!opt) err(`${ctx}: outcome outside an option`);
      else {
        if (opt.outcomeId) err(`${ctx}/${opt.choiceId}: second outcome`);
        opt.outcomeId = m[2]!;
      }
      continue;
    }
    if ((m = BRANCH_RE.exec(line))) {
      if (!opt) err(`${ctx}: indented line outside an option: ${m[1]}`);
      else opt.branchLines.push(toLine(m, ctx));
      continue;
    }
    if ((m = LINE_RE.exec(line))) {
      if (choicePointId) err(`${ctx}: unindented dialogue line after choice point: ${m[1]}`);
      intro.push(toLine(m, ctx));
      continue;
    }
    if ((m = META_RE.exec(line))) {
      meta[m[1]!] = m[2]!;
      continue;
    }
    if ((m = /^\*\*([^*]+)\*\*$/.exec(line))) {
      // Standalone authored note such as "**No consequential choices.**" (internal metadata).
      meta['Note'] = m[1]!;
      continue;
    }
    err(`${ctx}: unrecognized line: ${line.slice(0, 160)}`);
  }

  const displayOnly = kind === 'shared' || kind === 'epilogue';
  if (choicePoints > 1) err(`${ctx}: ${choicePoints} choice points`);
  if (displayOnly && (choicePoints !== 0 || options.length)) err(`${ctx}: display-only scene has choices`);
  if (!displayOnly && choicePoints !== 1) err(`${ctx}: expected exactly one choice point`);
  if (!displayOnly && options.length < 2) err(`${ctx}: fewer than two options`);
  for (const o of options) {
    if (!o.labelText) err(`${ctx}/${o.choiceId}: missing PLAYER line`);
    if (!o.outcomeId) err(`${ctx}/${o.choiceId}: missing outcome ID`);
    if (!o.branchLines.length) err(`${ctx}/${o.choiceId}: no branch lines`);
  }
  if (!intro.length) err(`${ctx}: no intro lines`);
  if (!displayOnly && !options.some((o) => o.outcomeClass === 'correct')) err(`${ctx}: no correct option`);

  return {
    sceneId: raw.id,
    kind,
    route,
    stage,
    title: sceneTitle(raw.title, raw.id),
    introLines: intro,
    choicePointId,
    options,
    displayOnly,
    costOneSlot: !displayOnly,
    source,
    meta,
  };
}

// ---------------------------------------------------------------------------
// 4. Parse all narrative sources.
const docs: { name: string; text: string; source: Scene['source']; skip?: Set<string> }[] = [
  {
    name: 'tavri',
    text: tavriEffective,
    source: {
      originalArchive: SRC.tavri.archive,
      originalMember: SRC.tavri.member,
      effectiveOverlay: `${SRC.overlay.archive}::${SRC.overlay.member}`,
    },
    // Section I of the Tavri package holds the shared drafts; the approved
    // verbatim shared record is the authority for those two scenes.
    skip: new Set(['CORE-PRO-01', 'CORE-FAIL-01']),
  },
  { name: 'nerelle', text: member(SRC.nerelle).toString('utf8'), source: { originalArchive: SRC.nerelle.archive, originalMember: SRC.nerelle.member } },
  { name: 'kaedra', text: member(SRC.kaedra).toString('utf8'), source: { originalArchive: SRC.kaedra.archive, originalMember: SRC.kaedra.member } },
  { name: 'shared', text: member(SRC.shared).toString('utf8'), source: { originalArchive: SRC.shared.archive, originalMember: SRC.shared.member } },
  { name: 'routine', text: member(SRC.routine).toString('utf8'), source: { originalArchive: SRC.routine.archive, originalMember: SRC.routine.member } },
];

const scenes: Record<string, Scene> = {};
const skippedTavriShared: Record<string, Scene> = {};
for (const d of docs) {
  for (const raw of splitScenes(d.text, d.name)) {
    const s = parseScene(raw, d.source);
    if (d.skip?.has(s.sceneId)) {
      skippedTavriShared[s.sceneId] = s;
      continue;
    }
    if (scenes[s.sceneId]) err(`duplicate scene ${s.sceneId}`);
    scenes[s.sceneId] = s;
  }
}

// The approved shared record says its lines are copied verbatim from Tavri
// section I; confirm that claim line by line.
for (const id of ['CORE-PRO-01', 'CORE-FAIL-01']) {
  const a = scenes[id]?.introLines;
  const b = skippedTavriShared[id]?.introLines;
  if (!a || !b || JSON.stringify(a) !== JSON.stringify(b)) err(`${id}: approved shared lines differ from Tavri section I`);
}

// ---------------------------------------------------------------------------
// 5. Global validation (CONTENT_INTEGRATION.md "Validation after conversion").
const all = Object.values(scenes);
const count = (f: (s: Scene) => boolean) => all.filter(f).length;
if (all.length !== 77) err(`expected 77 scenes, got ${all.length}`);
if (count((s) => s.kind === 'shared') !== 2) err('expected 2 shared scenes');
if (count((s) => s.kind === 'ordinary') !== 54) err('expected 54 ordinary scenes');
if (count((s) => s.kind !== 'shared' && s.kind !== 'ordinary') !== 21) err('expected 21 pivotal scenes');
for (const r of ['TAV', 'NER', 'KAE'] as const) {
  const piv = all.filter((s) => s.route === r && s.kind !== 'ordinary');
  if (piv.length !== 7) err(`${r}: expected 7 pivotal scenes`);
  if (piv.filter((s) => s.choicePointId).length !== 6) err(`${r}: expected 6 pivotal choice points`);
  for (const st of ['PRE', 'POST'] as const) {
    const pool = all.filter((s) => s.route === r && s.kind === 'ordinary' && s.stage === st).map((s) => s.sceneId.slice(-3)).sort();
    const want = ['F01', 'F02', 'F03', 'U01', 'U02', 'U03', 'U04', 'U05', 'U06'];
    if (JSON.stringify(pool) !== JSON.stringify(want)) err(`${r}-${st}: ordinary pool is ${pool.join(',')}`);
  }
}
const ids = new Map<string, string>();
const claim = (id: string, where: string) => {
  if (ids.has(id)) err(`duplicate ID ${id} (${ids.get(id)} and ${where})`);
  ids.set(id, where);
};
for (const s of all) {
  claim(s.sceneId, 'scene');
  if (s.choicePointId) claim(s.choicePointId, `${s.sceneId} choice point`);
  for (const l of s.introLines) claim(l.id, s.sceneId);
  for (const o of s.options) {
    claim(o.choiceId, `${s.sceneId} option`);
    for (const l of o.branchLines) claim(l.id, s.sceneId);
  }
  if (s.kind === 'ordinary') {
    const classes = s.options.map((o) => o.outcomeClass);
    if (classes[0] !== 'correct' || classes[1] !== 'wrong') err(`${s.sceneId}: ordinary options must be correct, then ordinary wrong`);
    if (classes.length === 3 && classes[2] !== 'offensive') err(`${s.sceneId}: third ordinary option must be offensive`);
    if (classes.length > 3) err(`${s.sceneId}: too many options`);
  }
}

// Round-trip: every compiled line must exist verbatim in its source document.
const sourceTextById: Record<string, string> = {};
for (const d of docs) for (const raw of splitScenes(d.text, d.name)) if (!d.skip?.has(raw.id)) sourceTextById[raw.id] = d.text;
const render = (l: ScriptLine) => `\`${l.id}\` ${l.speaker}${l.expression ? ` [${l.expression}]` : ''}: ${l.text}`;
let roundTripped = 0;
for (const s of all) {
  const src = sourceTextById[s.sceneId]!;
  const check = (needle: string, what: string) => {
    if (!src.includes(needle)) err(`${s.sceneId}: round-trip failed for ${what}`);
    else roundTripped++;
  };
  for (const l of s.introLines) check(render(l), l.id);
  for (const o of s.options) {
    check(`PLAYER: ${o.labelText}`, `${o.choiceId} label`);
    for (const l of o.branchLines) check(render(l), l.id);
  }
}

// Cross-check against the readable per-scene extracts (they must agree).
const sectionDir = join(CANON, 'scene_sections');
let extractsCompared = 0;
for (const f of readdirSync(sectionDir).filter((f) => f.endsWith('.md'))) {
  const text = readFileSync(join(sectionDir, f), 'utf8');
  for (const raw of splitScenes(text, f)) {
    const s = parseScene(raw, scenes[raw.id]?.source ?? { originalArchive: '', originalMember: '' });
    const ref = scenes[raw.id];
    if (!ref) {
      err(`extract ${f} has unknown scene ${raw.id}`);
      continue;
    }
    const strip = (x: Scene) => JSON.stringify({ ...x, meta: undefined, source: undefined });
    if (strip(s) !== strip(ref)) err(`extract ${f} disagrees with archive source for ${raw.id}`);
    extractsCompared++;
  }
}
if (extractsCompared !== 77) err(`compared ${extractsCompared} extracts (expected 77)`);

// Tavri overlay effect: exactly the four approved strings differ from the original.
{
  const origScenes = splitScenes(tavriOriginal.toString('utf8'), 'tavri-original')
    .filter((r) => r.id.startsWith('TAV-'))
    .map((r) => parseScene(r, docs[0]!.source));
  let diffs = 0;
  for (const o of origScenes) {
    const e = scenes[o.sceneId]!;
    if (o.title !== e.title) diffs++;
    const ol = [...o.introLines, ...o.options.flatMap((x) => x.branchLines)];
    const el = [...e.introLines, ...e.options.flatMap((x) => x.branchLines)];
    ol.forEach((l, i) => {
      if (l.text !== el[i]!.text) diffs++;
      if (l.id !== el[i]!.id) err(`overlay changed a line ID in ${o.sceneId}`);
    });
    if (JSON.stringify(o.options.map((x) => [x.choiceId, x.outcomeId, x.labelText])) !== JSON.stringify(e.options.map((x) => [x.choiceId, x.outcomeId, x.labelText])))
      err(`overlay changed options in ${o.sceneId}`);
  }
  if (diffs !== 4) err(`Tavri overlay produced ${diffs} differences (expected exactly 4)`);
  if (scenes['TAV-EVT-POST-01']?.title !== 'Unscripted Comedy') err('TAV-EVT-POST-01 effective title must be "Unscripted Comedy"');
}

// ---------------------------------------------------------------------------
// 6. Supporting copy.
function parseSupport(text: string): SupportCopy {
  const lines = text.split('\n').map((l) => l.replace(/\s+$/, ''));
  const help: HelpEntry[] = [];
  const squareQuips: ScriptLine[] = [];
  const activities: Activity[] = [];
  const strings: Record<string, string> = {};
  let curHelp: HelpEntry | null = null;
  let curAct: Activity | null = null;
  for (const line of lines) {
    let m: RegExpExecArray | null;
    if ((m = /^### (HD-HELP-[A-Z_]+) — (.+)$/.exec(line))) {
      curHelp = { id: m[1]!, title: m[2]!, text: '' };
      help.push(curHelp);
      curAct = null;
      continue;
    }
    if ((m = /^### (ACT-[A-Z]+-[A-Z]+) — (.+)$/.exec(line))) {
      curAct = { id: m[1]!, title: m[2]!, location: '', stat: '', lines: [] };
      activities.push(curAct);
      curHelp = null;
      continue;
    }
    if (/^#{1,3} /.test(line)) {
      curHelp = null;
      curAct = null;
      continue;
    }
    if (curHelp && (m = /^> (.*)$/.exec(line))) {
      curHelp.text = curHelp.text ? `${curHelp.text} ${m[1]}` : m[1]!;
      continue;
    }
    if (curAct && (m = /^\*\*Location:\*\* (.+?); \*\*stat:\*\* (.+?)\.$/.exec(line))) {
      curAct.location = m[1]!;
      curAct.stat = m[2]!;
      continue;
    }
    if (curAct && (m = /^- `(ACT-[A-Z]+-[A-Z]+-L\d\d)` (NARRATOR): (.*)$/.exec(line))) {
      curAct.lines.push({ id: m[1]!, speaker: m[2]!, expression: null, text: m[3]! });
      continue;
    }
    if ((m = /^- `(HD-SQUARE-TS\d\d)` (HUMPTY): (.*)$/.exec(line))) {
      squareQuips.push({ id: m[1]!, speaker: m[2]!, expression: null, text: m[3]! });
      continue;
    }
    if ((m = /^- `((?:TXT|UI)-[A-Z0-9_-]+)`: (.*)$/.exec(line))) {
      if (strings[m[1]!]) err(`duplicate support string ${m[1]}`);
      strings[m[1]!] = m[2]!;
      continue;
    }
  }
  if (help.length !== 14 || help.some((h) => !h.text)) err(`expected 14 help passages with text, got ${help.length}`);
  if (squareQuips.length !== 12) err(`expected 12 Town Square quips, got ${squareQuips.length}`);
  if (activities.length !== 8 || activities.some((a) => a.lines.length !== 2 || !a.location)) err('expected 8 activities with 2 lines each');
  const txt = Object.keys(strings).filter((k) => k.startsWith('TXT-')).length;
  const ui = Object.keys(strings).filter((k) => k.startsWith('UI-')).length;
  if (txt !== 12) err(`expected 12 TXT strings, got ${txt}`);
  if (ui !== 14) err(`expected 14 UI strings, got ${ui}`);
  return { help, squareQuips, activities, strings };
}
const supportText = member(SRC.support).toString('utf8');
const support = parseSupport(supportText);
for (const a of support.activities) for (const l of a.lines) if (!supportText.includes(`\`${l.id}\` ${l.speaker}: ${l.text}`)) err(`support round-trip ${l.id}`);

// Activity locations/stats must agree with the machine-readable schedule.
const schedule = JSON.parse(readFileSync(join(H, '03_IMPLEMENTATION_BLUEPRINT/route_schedules_and_training.json'), 'utf8')) as {
  activities: { id: string; location: string; stat: string }[];
};
const locName: Record<string, string> = {
  Home: 'home',
  'Town Square': 'town_square',
  'Royal Library': 'royal_library',
  'Adventurers’ Guild': 'adventurers_guild',
  'Royal Gardens': 'royal_gardens',
};
for (const a of schedule.activities) {
  const s = support.activities.find((x) => x.id === a.id);
  if (!s) err(`activity ${a.id} missing from support copy`);
  else {
    if (locName[s.location] !== a.location) err(`activity ${a.id} location mismatch (${s.location} vs ${a.location})`);
    if (s.stat.toLowerCase() !== a.stat) err(`activity ${a.id} stat mismatch`);
  }
}

if (errors.length) fail();

// ---------------------------------------------------------------------------
// 7. Apply the owner-requested revision (words only) and re-check the result.
let finalScenes: Record<string, Scene> = scenes;
let finalSupport: SupportCopy = support;
let revision: ReturnType<typeof applyRevision> = null;
if (REVISION_ID !== 'none') {
  revision = applyRevision(scenes, support, REVISION_DIR, errors);
  if (!revision && !errors.length) err(`revision directory not found: content/revisions/${REVISION_ID}`);
  if (revision) {
    finalScenes = revision.scenes;
    finalSupport = revision.support;
    const seen = new Set<string>();
    for (const sc of Object.values(finalScenes))
      for (const l of [...sc.introLines, ...sc.options.flatMap((o) => o.branchLines)]) {
        if (seen.has(l.id)) err(`revision: line ID ${l.id} is not globally unique`);
        seen.add(l.id);
        if (sc.choicePointId === l.id || sc.options.some((o) => o.choiceId === l.id)) err(`revision: line ID ${l.id} collides with a choice ID`);
      }
    // Mechanics must be untouched.
    for (const [id, b] of Object.entries(scenes)) {
      const a = finalScenes[id]!;
      const mech = (x: Scene) => JSON.stringify([x.sceneId, x.kind, x.route, x.stage, x.choicePointId, x.displayOnly, x.costOneSlot, x.options.map((o) => [o.choiceId, o.outcomeId, o.outcomeClass, o.netHalfHearts])]);
      if (mech(a) !== mech(b)) err(`revision changed mechanics of ${id}`);
    }
  }
}
if (errors.length) fail();

// ---------------------------------------------------------------------------
// 8. Emit.
const sortedScenes: Record<string, Scene> = {};
for (const id of Object.keys(finalScenes).sort()) sortedScenes[id] = finalScenes[id]!;
const bundle: ContentBundle = {
  generatedFrom: {
    archives: Object.fromEntries(
      Object.values(SRC)
        .map((s) => s.archive)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort()
        .map((a) => [a, checksums[a]!]),
    ),
    tavriOverlaySha256: sha(overlayBuf),
    effectiveTavriSha256: sha(tavriEffective),
    revision: revision ? { ...revision.meta, filesSha256: revision.stats.filesSha256 } : null,
  },
  scenes: sortedScenes,
  support: finalSupport,
};
const json = JSON.stringify(bundle, null, 2) + '\n';
const report = {
  scenes: all.length,
  byKind: Object.fromEntries(['shared', 'ordinary', 'optional', 'midpoint', 'midpoint_retry', 'marriage', 'marriage_retry', 'epilogue'].map((k) => [k, count((s) => s.kind === k)])),
  linesRoundTripped: roundTripped,
  extractsCrossChecked: extractsCompared,
  tavriOverlayDifferences: 4,
  revision: revision ? { ...revision.stats, removedLineIds: revision.removedLineIds } : null,
  helpPassages: support.help.length,
  squareQuips: support.squareQuips.length,
  activities: support.activities.length,
  strings: Object.keys(support.strings).length,
  contentSha256: sha(json),
};
if (process.argv.includes('--print-base')) {
  // For tests and audits: write the base (un-revised) scenes to the given file.
  writeFileSync(process.argv[process.argv.indexOf('--print-base') + 1]!, JSON.stringify(scenes));
  process.exit(0);
}
const reportJson = JSON.stringify(report, null, 2) + '\n';

if (process.argv.includes('--check')) {
  let stale = false;
  try {
    stale =
      readFileSync(OUT, 'utf8') !== json ||
      readFileSync(REPORT, 'utf8') !== reportJson ||
      (revision !== null && readFileSync(COMPARISON, 'utf8') !== revision.comparison);
  } catch {
    stale = true;
  }
  if (stale) {
    console.error('Checked-in content is stale. Run: npx tsx scripts/compile-content.ts');
    process.exit(1);
  }
  console.log('Content check OK:', JSON.stringify(report));
} else {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT, json);
  writeFileSync(REPORT, reportJson);
  if (revision) {
    mkdirSync(dirname(COMPARISON), { recursive: true });
    writeFileSync(COMPARISON, revision.comparison);
  }
  console.log('Wrote', OUT);
  console.log(reportJson);
}

function fail(): never {
  console.error(`Content compilation failed with ${errors.length} error(s):`);
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}
