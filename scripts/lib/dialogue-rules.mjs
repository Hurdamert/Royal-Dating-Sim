// Heuristic patterns for machine-sounding, samey or on-the-nose dialogue.
// Shared by scripts/dialogue-audit.mjs and scripts/check-revision.ts.
// The rationale and sources for every rule are in docs/writing/STYLE_GUIDE.md §6.
// These are prompts for an editor, not a quality score: a flagged line can be
// right (Kaedra's formality is her voice), and an unflagged line can be dead.

const THEME = {
  // Each route's wound, as the frozen text states it out loud. Showing the
  // theme is the job; naming it in every scene is the tell.
  TAV: /\b(?:perform\w*|audience|applau\w+|on ?stage|offstage|the show|spectacle|entertain\w*|curtain call)\b/i,
  NER: /\b(?:autonomy|my own (?:choice|future|life|terms)|(?:you|I) (?:get to |can )?(?:choose|decide)|choices? (?:of my own|are mine|is mine)|permission|your call)\b/i,
  KAE: /\b(?:monster\w*|fear\w*|afraid|frighten\w*|terrif\w*|strength|weapon|dangerous)\b/i,
  // Senna (owner-requested route, 2026-10-25): being wanted versus being useful.
  SEN: /\b(?:useful\w*|usefulness|needed|need(?:s)? me|earn(?:ed|ing)? (?:a|my|your) (?:place|chair|keep)|wanted)\b/i,
};

export const RULES = [
  {
    id: 'negation-pivot',
    desc: '"not X — it\'s Y" / "not because X, because Y" correction of a claim nobody made',
    test: (t) =>
      /\b(?:not|n't)\b[^.!?]{0,60}[.;:,—–-]\s*(?:it|that|this|she|he|you|i|we)(?:'s|’s| is| was| are| were)\b/i.test(t) ||
      /\bnot (?:just|only|merely|even|because)\b[^.!?]{0,80}\b(?:but|it's|it’s|because)\b/i.test(t) ||
      /\bNot [^.!?]{1,40}\.\s+Not [^.!?]{1,40}\./.test(t) ||
      /\bnot (?:as|for) (?:a |an |the )?\w+(?: \w+){0,3},? but (?:as|for)\b/i.test(t),
  },
  { id: 'not-but', desc: '"not X, but Y" antithesis', test: (t) => /\bnot (?:a |an |the |just |only |merely )?\w+(?: \w+){0,4},? but\b/i.test(t) },
  { id: 'emdash', desc: 'em/en dash (keep for real interruptions only)', test: (t) => /[—–]|--/.test(t) },
  {
    id: 'therapy-speak',
    desc: 'therapy / self-help vocabulary',
    test: (t) =>
      /\b(?:boundar(?:y|ies)|validat\w*|safe space|hold(?:ing)? space|I hear you|vulnerab\w*|autonomy|you don['’]t have to|it['’]s okay to|allowed to (?:feel|be)|permission|deserve(?:s|d)?|growth|we['’]re both growing|grown so much|proud of you|heal(?:ing)?|process(?:ing)? (?:this|that|it)|authentic\w*|on (?:your|my|her) (?:own )?terms|keep choosing|that matters|I need you to know|honest(?:y|ly)? (?:is|matters)|space to)\b/i.test(t),
  },
  {
    id: 'stock-phrase',
    desc: 'stock literary phrasing',
    test: (t) =>
      /\b(?:for once|something (?:shifted|stirred|broke|cracked)|a beat\b|the weight of|a testament|(?:a|the) (?:wave|pang|surge|rush) of|didn['’]t know (?:s?he|they|I) (?:was|were) holding|barely above a whisper|ghost of a smile|a knowing (?:smile|look)|couldn['’]t help but|the silence (?:stretched|hung|grew)|hung in the air|for a long moment|a small smile|neither of you (?:needs?|has to|can)|without (?:looking toward|needing|performing)|here['’]s the thing|the truth is|let that sink in|it is better than that|simply home|isn['’]t the point|not the point)\b/i.test(t),
  },
  { id: 'filler-adverb', desc: 'filler intensifier (softly, quietly, gently, truly…)', test: (t) => /\b(?:softly|quietly|gently|deeply|truly|genuinely|simply|surprisingly|remarkably|incredibly)\b/i.test(t) },
  { id: 'aphorism', desc: 'aphoristic generalisation / moral', test: (t) => /\b(?:sometimes (?:people|a person|we|you)|some things|a person can|people (?:can|who) |that['’]s what \w+ (?:is|are|means)|the point is|that is the point|is better than|is not the same as|isn['’]t the same as|is never (?:permitted|allowed))\b/i.test(t) },
  { id: 'triplet', desc: 'tidy list of three', test: (t) => /\b\w+(?: \w+)?, \w+(?: \w+)?,? and \w+/.test(t) },
  {
    id: 'time-of-day',
    desc: 'time-of-day words (scenes can play in any slot; keep copy time-neutral)',
    test: (t) => /\b(?:tonight|this (?:morning|afternoon|evening)|tomorrow (?:morning|night)|sunset|sunrise|midnight|at dawn|at dusk|good (?:morning|evening|night))\b/i.test(t),
  },
  {
    id: 'theme-word',
    desc: 'route theme named outright (performance / choice / fear / usefulness words)',
    test: (t, ctx) => !!(ctx.route && THEME[ctx.route] && THEME[ctx.route].test(t)),
  },
  {
    id: 'formal-no-contraction',
    desc: 'uncontracted phrasing in player/Tavri/Senna speech (Kaedra and Nerelle are exempt by voice)',
    test: (t, ctx) => (ctx.speaker === 'PLAYER' || ctx.speaker === 'TAVRI' || ctx.speaker === 'SENNA') && /\b(?:I am|I will|I would|do not|does not|did not|cannot|it is|that is|you are|I have not|we are|is not|are not)\b/i.test(t),
  },
  { id: 'long-line', desc: 'over 32 words in one text box', test: (t) => t.split(/\s+/).length > 32 },
];

/** Lines of a compiled scene, with choice labels as PLAYER lines. */
export function sceneLines(s) {
  return [...s.introLines, ...s.options.flatMap((o) => [{ id: o.choiceId, speaker: 'PLAYER', text: o.labelText }, ...o.branchLines])];
}

/** Rule ids that flag one line. */
export function flagsFor(line, scene) {
  const ctx = { speaker: line.speaker, route: scene.route ?? null };
  return RULES.filter((r) => r.test(line.text, ctx)).map((r) => r.id);
}
