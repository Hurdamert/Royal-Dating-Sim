// Static content schema. Generated data lives in ./generated/content.json and is
// produced only by scripts/compile-content.ts from the frozen source archives.
// Nothing in this module is authored story text.

/** TAV, NER, KAE: the frozen routes. SEN: Senna, an owner-requested route (2026-10-25, content/routes/SEN). */
export type Route = 'TAV' | 'NER' | 'KAE' | 'SEN';
export type Stage = 'PRE' | 'POST';
export type Expression = 'NEUTRAL' | 'PLAYFUL' | 'WORRIED' | 'ANNOYED' | 'SURPRISED';
export type SceneKind =
  | 'shared'
  | 'ordinary'
  | 'optional'
  | 'midpoint'
  | 'midpoint_retry'
  | 'marriage'
  | 'marriage_retry'
  | 'epilogue';

/** Internal-only classification of an authored option. Never shown to the player. */
export type OutcomeClass = 'correct' | 'wrong' | 'offensive';

export interface ScriptLine {
  /** Authored line ID, e.g. `TAV-ORD-PRE-U01-L01`. */
  id: string;
  /** Authored speaker token, e.g. NARRATOR, PLAYER, TAVRI, HERALD. */
  speaker: string;
  /** Expression cue when authored on this line. */
  expression: Expression | null;
  /** Exact authored text (inline `*emphasis*` markup preserved as authored). */
  text: string;
}

export interface ChoiceOption {
  choiceId: string;
  labelLineSpeaker: 'PLAYER';
  /** The exact PLAYER line the option speaks. */
  labelText: string;
  outcomeId: string;
  outcomeClass: OutcomeClass;
  /** Net heart change in half-units for ordinary/optional options; 0 for pivotal. */
  netHalfHearts: number;
  branchLines: ScriptLine[];
  /** Authored label (internal; contains correctness and must never be rendered). */
  internalLabel: string;
}

export interface SceneSource {
  originalArchive: string;
  originalMember: string;
  effectiveOverlay?: string;
}

export interface Scene {
  sceneId: string;
  kind: SceneKind;
  route: Route | null;
  stage: Stage | null;
  title: string;
  introLines: ScriptLine[];
  choicePointId: string | null;
  options: ChoiceOption[];
  displayOnly: boolean;
  costOneSlot: boolean;
  source: SceneSource;
  /** Authored metadata paragraphs (Type/Eligibility/Location/Objective/Pool/END), internal only. */
  meta: Record<string, string>;
}

export interface HelpEntry {
  id: string;
  title: string;
  text: string;
}

export interface Activity {
  id: string;
  title: string;
  location: string;
  stat: string;
  lines: ScriptLine[];
}

export interface SupportCopy {
  help: HelpEntry[];
  squareQuips: ScriptLine[];
  activities: Activity[];
  /** TXT-* and UI-* strings keyed by their authored IDs. */
  strings: Record<string, string>;
}

export interface ContentBundle {
  generatedFrom: {
    archives: Record<string, string>;
    tavriOverlaySha256: string;
    effectiveTavriSha256: string;
    /** Owner-requested dialogue revision applied on top of the frozen base, if any. */
    revision: null | { id: string; authority: string; requested: string; date: string; scope: string; filesSha256: string };
    /** Owner-requested new routes (content/routes/<ROUTE>), not in the frozen archives. */
    routes: Record<string, { name: string; authority: string; requested: string; date: string; scenes: number; filesSha256: string }>;
  };
  scenes: Record<string, Scene>;
  support: SupportCopy;
}
