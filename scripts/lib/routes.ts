// Owner-approved new routes (content/routes/<ROUTE>/), layered on the frozen game.
//
// The frozen archives hold three routes. A new route requested by the project
// owner lives in its own folder: ROUTE.json (authority, schedule, stats, optional
// event thresholds, staging, cast) and scenes/<sceneId>.json (the story text and
// which option is right). This loader checks everything the frozen routes satisfy
// structurally — the exact 25-scene set, ID patterns, speakers, expressions,
// option rules, globally unique IDs — and builds Scene objects in the same shape.
// Mechanics (heart values, costs) are derived from the scene kind and the
// option's class, never typed by hand.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { ChoiceOption, Expression, OutcomeClass, Scene, SceneKind, ScriptLine, Stage } from '../../src/content/types.ts';

const EXPRESSIONS = new Set<Expression>(['NEUTRAL', 'PLAYFUL', 'WORRIED', 'ANNOYED', 'SURPRISED']);
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SLOTS = ['morning', 'afternoon', 'evening'];
const STATS = ['charisma', 'intelligence', 'strength', 'kindness'];
const LOCATIONS = ['home', 'town_square', 'royal_library', 'adventurers_guild', 'palace_court', 'royal_gardens', 'moonwater_quay'];
const ORDINARY_SUFFIXES = ['U01', 'U02', 'U03', 'U04', 'U05', 'U06', 'F01', 'F02', 'F03'];

export interface RouteFile {
  route: string;
  name: string;
  speaker: string;
  cast: string[];
  authority: string;
  requested: string;
  decisions: Record<string, string>;
  date: string;
  primary: string;
  secondary: string;
  meeting: Record<string, Record<string, string>>;
  optional_pre: { scene_id: string; stat: string; at_least: number };
  optional_post: { scene_id: string; stat: string; at_least: number };
  staging: Record<string, { start: string; switches?: { fromLineId: string; location: string }[] }>;
  /** Approved UI strings this route's addition changes (e.g. the New Run intro's princess count). */
  strings?: Record<string, string>;
}

export interface LoadedRoute {
  spec: RouteFile;
  scenes: Record<string, Scene>;
  filesSha256: string;
  lines: number;
}

/** The 25 scene IDs every route has. */
export function routeSceneIds(r: string): string[] {
  const ord = ['PRE', 'POST'].flatMap((st) => ORDINARY_SUFFIXES.map((s) => `${r}-ORD-${st}-${s}`));
  return [...ord, `${r}-EVT-PRE-01`, `${r}-EVT-POST-01`, `${r}-MID-01`, `${r}-MID-RETRY-01`, `${r}-FIN-01`, `${r}-FIN-RETRY-01`, `${r}-EPI-01`];
}

function kindOf(r: string, id: string): { kind: SceneKind; stage: Stage; short: string } {
  const m = new RegExp(`^${r}-ORD-(PRE|POST)-`).exec(id);
  if (m) return { kind: 'ordinary', stage: m[1] as Stage, short: '' };
  const table: Record<string, { kind: SceneKind; stage: Stage; short: string }> = {
    [`${r}-EVT-PRE-01`]: { kind: 'optional', stage: 'PRE', short: 'PRE' },
    [`${r}-EVT-POST-01`]: { kind: 'optional', stage: 'POST', short: 'POST' },
    [`${r}-MID-01`]: { kind: 'midpoint', stage: 'PRE', short: 'MID' },
    [`${r}-MID-RETRY-01`]: { kind: 'midpoint_retry', stage: 'PRE', short: 'MR' },
    [`${r}-FIN-01`]: { kind: 'marriage', stage: 'POST', short: 'FIN' },
    [`${r}-FIN-RETRY-01`]: { kind: 'marriage_retry', stage: 'POST', short: 'FR' },
    [`${r}-EPI-01`]: { kind: 'epilogue', stage: 'POST', short: 'EPI' },
  };
  return table[id]!;
}

const NET: Record<OutcomeClass, number> = { correct: 2, wrong: 1, offensive: -1 };
const LABEL: Record<SceneKind, Partial<Record<OutcomeClass, string>>> = {
  shared: {},
  ordinary: { correct: 'Correct, net +2 half-hearts', wrong: 'Ordinary incorrect, net +1 half-heart', offensive: 'Explicitly offensive, net −1 half-heart' },
  optional: { correct: 'Correct; net +2 half-hearts', wrong: 'Ordinary wrong; net +1 half-heart', offensive: 'Explicitly offensive; net −1 half-heart' },
  midpoint: { correct: 'Correct; milestone completes, no hearts gained', wrong: 'Wrong; midpoint incomplete, no hearts changed' },
  midpoint_retry: { correct: 'Correct; complete milestone, no hearts gained', wrong: 'Wrong; milestone remains pending, no hearts changed' },
  marriage: { correct: 'Correct; terminal success and gallery unlock', wrong: 'Wrong; no new heart penalty; marriage retry pending at ten hearts' },
  marriage_retry: { correct: 'Correct; terminal success, gallery unlock, no hearts gained', wrong: 'Wrong; keep ten hearts, retry pending' },
  epilogue: {},
};

const LOC_NAME: Record<string, string> = {
  home: 'Home',
  town_square: 'Town Square',
  royal_library: 'Royal Library',
  adventurers_guild: 'Adventurers’ Guild',
  palace_court: 'Palace Court',
  royal_gardens: 'Royal Gardens',
  moonwater_quay: 'Moonwater Quay',
};

function metaFor(spec: RouteFile, id: string, kind: SceneKind, objective: string | undefined): Record<string, string> {
  const n = spec.name;
  const cue = spec.staging[id];
  const shown = cue ? [cue.start, ...(cue.switches ?? []).map((s) => s.location)].filter((l) => l !== 'scheduled').map((l) => LOC_NAME[l]) : [];
  const where = shown.length ? `Opens where ${n} is scheduled; presented at the ${shown.join(', then the ')} within the same encounter (not a new map location).` : `${n}'s scheduled location.`;
  const base: Record<string, string> = { Source: `Owner-approved new route (${spec.date}): content/routes/${spec.route}/` };
  switch (kind) {
    case 'ordinary':
      return { ...base, Pool: `${id.includes('-U0') ? 'first-use fixed sequence' : 'cyclic fallback'}; **stage:** ${id.includes('-PRE-') ? 'pre' : 'post'}; **locale:** scheduled location only; **cost:** one slot and the daily encounter`, END: 'Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart change.' };
    case 'optional': {
      const o = id.endsWith('PRE-01') ? spec.optional_pre : spec.optional_post;
      return { ...base, Type: `optional ${n} event, ${id.includes('PRE') ? 'pre' : 'post'}-midpoint, one-time.`, Eligibility: `Current ${n} route; ${o.stat} ≥ ${o.at_least}; correct stage; ${n}'s scheduled slot; unused daily encounter.`, Location: where, Objective: objective ?? '', END: `Mark ${id} experienced regardless of result; commit the one net heart result.` };
    }
    case 'midpoint':
      return { ...base, Type: 'mandatory midpoint, first full attempt (shown once).', Eligibility: `Current ${n} route; five committed hearts; midpoint incomplete; ${spec.primary} ≥ 6 and ${spec.secondary} ≥ 4.`, Location: where, Objective: objective ?? '', END: 'Always one slot, one daily encounter and one journal entry; no hearts change. Correct completes the midpoint; wrong sets a retry.' };
    case 'midpoint_retry':
      return { ...base, Type: 'mandatory midpoint retry; repeatable after a failed first attempt.', Location: where, Objective: objective ?? '', END: 'One slot and one daily encounter, one journal entry, zero heart change; never replay the full midpoint.' };
    case 'marriage':
      return { ...base, Type: 'mandatory first marriage proposal; full scene shown only once.', Location: where, Objective: objective ?? '', END: 'Shares the originating action. Correct: terminal success and gallery unlock. Wrong: retry pending at ten hearts.' };
    case 'marriage_retry':
      return { ...base, Type: 'mandatory brief final retry; repeatable following a wrong final answer.', Location: where, Objective: objective ?? '', END: 'Every attempt consumes one slot and the daily encounter and creates one journal entry.' };
    case 'epilogue':
      return { ...base, Type: `${n} terminal-success epilogue; no extra action or encounter cost.`, Location: where, Objective: objective ?? '', END: 'Display only; must not change any state.' };
    default:
      return base;
  }
}

/**
 * Load and validate content/routes/<route>. `existing` is every scene already in
 * the game (for global ID uniqueness). Problems are pushed to `errors`.
 */
export function loadRoute(dir: string, existing: Record<string, Scene>, errors: string[]): LoadedRoute | null {
  const err = (m: string) => errors.push(`route ${dir.split('/').pop()}: ${m}`);
  if (!existsSync(join(dir, 'ROUTE.json'))) {
    err('ROUTE.json missing');
    return null;
  }
  const hash = createHash('sha256');
  const routeText = readFileSync(join(dir, 'ROUTE.json'), 'utf8');
  hash.update(routeText);
  const spec = JSON.parse(routeText) as RouteFile;
  const R = spec.route;
  if (!/^[A-Z]{3}$/.test(R)) err(`route code ${R} must be three capital letters`);
  if (['TAV', 'NER', 'KAE'].includes(R)) err(`route code ${R} is a frozen route`);
  if (!/^[A-Z]+$/.test(spec.speaker)) err('speaker token must be capitals');
  for (const k of ['name', 'authority', 'requested', 'date'] as const) if (typeof spec[k] !== 'string' || !spec[k]) err(`${k} missing`);
  if (!STATS.includes(spec.primary) || !STATS.includes(spec.secondary) || spec.primary === spec.secondary) err('primary/secondary stats invalid');
  let windows = 0;
  for (const [w, cells] of Object.entries(spec.meeting ?? {})) {
    if (!WEEKDAYS.includes(w)) err(`meeting weekday ${w}`);
    for (const [s, loc] of Object.entries(cells)) {
      if (!SLOTS.includes(s)) err(`meeting slot ${w} ${s}`);
      if (!LOCATIONS.includes(loc)) err(`meeting location ${w} ${s} ${loc}`);
      windows++;
    }
  }
  if (windows !== 10) err(`expected 10 meeting cells (five days × two slots), found ${windows}`);
  for (const [k, o] of [['optional_pre', spec.optional_pre], ['optional_post', spec.optional_post]] as const) {
    if (o?.scene_id !== `${R}-EVT-${k === 'optional_pre' ? 'PRE' : 'POST'}-01`) err(`${k}.scene_id`);
    if (!STATS.includes(o?.stat) || o.at_least !== 3) err(`${k} stat/threshold`);
  }
  const speakers = new Set(['NARRATOR', 'PLAYER', spec.speaker, ...(spec.cast ?? [])]);

  const wanted = routeSceneIds(R);
  const sceneDir = join(dir, 'scenes');
  const files = existsSync(sceneDir) ? readdirSync(sceneDir).filter((f) => f.endsWith('.json')).sort() : [];
  for (const f of files) if (!wanted.includes(f.slice(0, -5))) err(`unexpected scene file ${f}`);
  for (const id of wanted) if (!files.includes(`${id}.json`)) err(`missing scene ${id}`);

  const usedIds = new Set<string>();
  for (const s of Object.values(existing)) {
    if (s.route === R) continue;
    for (const l of [...s.introLines, ...s.options.flatMap((o) => o.branchLines)]) usedIds.add(l.id);
    for (const o of s.options) usedIds.add(o.choiceId);
    if (s.choicePointId) usedIds.add(s.choicePointId);
  }
  const claim = (id: string, where: string) => {
    if (usedIds.has(id)) err(`${where}: ID ${id} is not unique in the game`);
    usedIds.add(id);
  };

  const scenes: Record<string, Scene> = {};
  let lineCount = 0;
  for (const id of wanted) {
    const path = join(sceneDir, `${id}.json`);
    if (!existsSync(path)) continue;
    const text = readFileSync(path, 'utf8');
    hash.update(`\n${id}\n${text}`);
    let raw: Record<string, unknown>;
    try {
      raw = JSON.parse(text);
    } catch (e) {
      err(`${id}: not valid JSON (${String(e)})`);
      continue;
    }
    const at = (m: string) => err(`${id}: ${m}`);
    const allowedKeys = new Set(['sceneId', 'title', 'objective', 'intro', 'choicePointId', 'options']);
    for (const k of Object.keys(raw)) if (!allowedKeys.has(k)) at(`unknown field ${k}`);
    if (raw.sceneId !== id) at('sceneId does not match the file name');
    if (typeof raw.title !== 'string' || !raw.title.trim()) at('title missing');
    const { kind, stage, short } = kindOf(R, id);
    const pivotal = kind !== 'ordinary';
    if (pivotal && kind !== 'epilogue' && (typeof raw.objective !== 'string' || !raw.objective)) at('objective (one sentence) required for pivotal scenes');

    let princessSeen = false;
    const line = (v: unknown, ctx: string, idRe: RegExp): ScriptLine | null => {
      const l = v as Record<string, unknown>;
      if (!l || typeof l !== 'object') return at(`${ctx}: line is not an object`), null;
      for (const k of Object.keys(l)) if (!['id', 'speaker', 'expression', 'text'].includes(k)) at(`${ctx}: unknown line field ${k}`);
      const lid = String(l.id ?? '');
      if (!idRe.test(lid)) at(`${ctx}: line ID ${lid} does not match ${idRe.source}`);
      claim(lid, ctx);
      const sp = String(l.speaker ?? '');
      if (!speakers.has(sp)) at(`${lid}: speaker ${sp} is not allowed in this route`);
      const t = typeof l.text === 'string' ? l.text : '';
      if (!t.trim()) at(`${lid}: empty text`);
      if (sp !== 'NARRATOR' && !(t.startsWith('“') && t.endsWith('”'))) at(`${lid}: spoken lines are wrapped in “curly quotes”`);
      if (sp === 'NARRATOR' && /^[“"]/.test(t)) at(`${lid}: narrator lines are not quoted`);
      if (/["']/.test(t.replace(/’|‘/g, ''))) at(`${lid}: use typographic quotes and apostrophes (“ ” ’)`);
      let expression: Expression | null = null;
      if (l.expression !== undefined) {
        if (sp !== spec.speaker) at(`${lid}: only ${spec.speaker} lines carry an expression`);
        else if (!EXPRESSIONS.has(l.expression as Expression)) at(`${lid}: expression ${String(l.expression)}`);
        else expression = l.expression as Expression;
      }
      if (sp === spec.speaker && !princessSeen) {
        princessSeen = true;
        if (!expression) at(`${lid}: ${spec.speaker}'s first line in a scene needs an expression`);
      }
      lineCount++;
      return { id: lid, speaker: sp, expression, text: t };
    };

    const introRe = pivotal ? (kind === 'epilogue' ? new RegExp(`^${R}-EPI-(\\d{3}|LATER)$`) : new RegExp(`^${R}-${short}-\\d{3}$`)) : new RegExp(`^${id}-L\\d{2}$`);
    const intro = Array.isArray(raw.intro) ? raw.intro.map((v, i) => line(v, `intro[${i}]`, introRe)).filter((x): x is ScriptLine => !!x) : (at('intro must be a list'), []);
    if (!intro.length) at('intro is empty');

    const cp = pivotal ? (kind === 'epilogue' ? null : `${R}-${short}-C1`) : `${id}-C1`;
    if (pivotal && kind !== 'epilogue' && raw.choicePointId !== cp) at(`choicePointId must be ${cp}`);
    if ((!pivotal || kind === 'epilogue') && raw.choicePointId !== undefined) at('choicePointId is set automatically for this scene; remove it');
    if (cp) claim(cp, 'choice point');

    const rawOpts = Array.isArray(raw.options) ? (raw.options as Record<string, unknown>[]) : (at('options must be a list'), []);
    const options: ChoiceOption[] = [];
    const branchLetter: Record<OutcomeClass, string> = { correct: 'S', wrong: 'W', offensive: 'X' };
    let secondWrong = false;
    for (const [i, o] of rawOpts.entries()) {
      const ctx = `options[${i}]`;
      for (const k of Object.keys(o)) if (!['choiceId', 'outcomeId', 'outcomeClass', 'labelText', 'branch'].includes(k)) at(`${ctx}: unknown field ${k}`);
      const cls = o.outcomeClass as OutcomeClass;
      if (!['correct', 'wrong', 'offensive'].includes(cls)) {
        at(`${ctx}: outcomeClass must be correct, wrong or offensive`);
        continue;
      }
      const choiceId = String(o.choiceId ?? '');
      const outcomeId = String(o.outcomeId ?? '');
      let branchRe: RegExp;
      if (!pivotal) {
        const m = new RegExp(`^${id}-C1-(YES|NO|NO2|OFF)$`).exec(choiceId);
        const want = { correct: ['YES'], wrong: ['NO', 'NO2'], offensive: ['OFF'] }[cls];
        if (!m || !want.includes(m[1]!)) at(`${ctx}: choiceId ${choiceId} must be ${id}-C1-${want.join('|')} for a ${cls} option`);
        const suf = m?.[1] ?? 'X';
        if (outcomeId !== `${id}-O-${suf}`) at(`${ctx}: outcomeId must be ${id}-O-${suf}`);
        branchRe = new RegExp(`^${id}-R-${suf}-\\d{2}$`);
      } else {
        if (!new RegExp(`^${R}-${short}-C1-[A-Z]+$`).test(choiceId)) at(`${ctx}: choiceId ${choiceId} must be ${R}-${short}-C1-<WORD>`);
        const fixed: Partial<Record<SceneKind, Partial<Record<OutcomeClass, string>>>> = {
          midpoint: { correct: `${R}-MID-O-TRUST` },
          midpoint_retry: { correct: `${R}-MR-O-TRUST` },
          marriage: { correct: `${R}-FIN-O-YES` },
          marriage_retry: { correct: `${R}-FR-O-YES`, wrong: `${R}-FR-O-STILL-PENDING` },
        };
        const f = fixed[kind]?.[cls];
        if (f ? outcomeId !== f : !new RegExp(`^${R}-${short}-O-[A-Z]+$`).test(outcomeId)) at(`${ctx}: outcomeId ${outcomeId} must be ${f ?? `${R}-${short}-O-<WORD>`}`);
        let letter = branchLetter[cls];
        if (kind === 'midpoint' || kind === 'marriage') {
          if (cls === 'wrong' && secondWrong) letter = 'X';
          if (cls === 'wrong') secondWrong = true;
        }
        branchRe = new RegExp(`^${R}-${short}-${letter}\\d{2}$`);
      }
      claim(choiceId, ctx);
      const label = typeof o.labelText === 'string' ? o.labelText : '';
      if (!(label.startsWith('“') && label.endsWith('”'))) at(`${ctx}: labelText is the PLAYER's spoken line in “curly quotes”`);
      if (/^“(?:Honestly|Actually),/.test(label)) at(`${ctx}: label gives the answer away (“Honestly,” / “Actually,”)`);
      const branch = Array.isArray(o.branch) ? o.branch.map((v, j) => line(v, `${ctx}.branch[${j}]`, branchRe)).filter((x): x is ScriptLine => !!x) : (at(`${ctx}: branch must be a list`), []);
      if (!branch.length) at(`${ctx}: empty branch`);
      options.push({
        choiceId,
        labelLineSpeaker: 'PLAYER',
        labelText: label,
        outcomeId,
        outcomeClass: cls,
        netHalfHearts: kind === 'ordinary' || kind === 'optional' ? NET[cls] : 0,
        branchLines: branch,
        internalLabel: LABEL[kind][cls] ?? '',
      });
    }

    const n = (c: OutcomeClass) => options.filter((o) => o.outcomeClass === c).length;
    const rules: Record<SceneKind, [number, number, string]> = {
      shared: [0, 0, ''],
      ordinary: [2, 3, 'one correct, one or two wrong, at most one offensive'],
      optional: [3, 3, 'exactly one correct, one wrong, one offensive'],
      midpoint: [2, 3, 'one correct and one or two wrong (no offensive)'],
      midpoint_retry: [2, 2, 'one correct and one wrong'],
      marriage: [2, 3, 'one correct and one or two wrong (no offensive)'],
      marriage_retry: [2, 2, 'one correct and one wrong'],
      epilogue: [0, 0, 'no options'],
    };
    const [lo, hi, why] = rules[kind];
    const shapeOk =
      options.length >= lo &&
      options.length <= hi &&
      (kind === 'epilogue' ? options.length === 0 : n('correct') === 1) &&
      (kind === 'optional' ? n('wrong') === 1 && n('offensive') === 1 : true) &&
      (kind === 'ordinary' ? n('wrong') >= 1 && n('offensive') <= 1 : true) &&
      (['midpoint', 'midpoint_retry', 'marriage', 'marriage_retry'].includes(kind) ? n('offensive') === 0 : true);
    if (!shapeOk) at(`options must be ${why} (found ${options.map((o) => o.outcomeClass).join(', ') || 'none'})`);

    scenes[id] = {
      sceneId: id,
      kind,
      route: R as Scene['route'],
      stage,
      title: String(raw.title ?? ''),
      introLines: intro,
      choicePointId: cp,
      options,
      displayOnly: kind === 'epilogue',
      costOneSlot: kind !== 'epilogue',
      source: { originalArchive: `content/routes/${R}`, originalMember: `scenes/${id}.json` },
      meta: metaFor(spec, id, kind, typeof raw.objective === 'string' ? raw.objective : undefined),
    };
  }

  // Staging cues must point at real lines.
  for (const [sid, cue] of Object.entries(spec.staging ?? {})) {
    if (!wanted.includes(sid)) err(`staging for unknown scene ${sid}`);
    if (cue.start !== 'scheduled' && !LOCATIONS.includes(cue.start)) err(`staging ${sid} start ${cue.start}`);
    for (const s of cue.switches ?? []) {
      if (!LOCATIONS.includes(s.location)) err(`staging ${sid} switch location ${s.location}`);
      const sc = scenes[sid];
      if (sc && !sc.introLines.some((l) => l.id === s.fromLineId)) err(`staging ${sid}: line ${s.fromLineId} not found`);
    }
  }
  return { spec, scenes, filesSha256: hash.digest('hex'), lines: lineCount };
}

/** Route folders under content/routes, in code order. */
export function routeDirs(root: string): string[] {
  const base = join(root, 'content/routes');
  return existsSync(base) ? readdirSync(base).filter((d) => existsSync(join(base, d, 'ROUTE.json'))).sort().map((d) => join(base, d)) : [];
}
