# Gate 2 — Ordinary Dialogue and Routine Content Bible, Candidate v0.1

**Approval status:** PROPOSED / NOT YET APPROVED. This is a content-authoring contract for editorial review, **not** implementation code, a game-state specification, or authorization to change frozen canonical scripts.

## 1. Content authority and immutable boundaries
The exact approved canonical sources are Tavri/Nerelle/Kaedra frozen v1.0 packages, external approved shared `CORE-PRO-01` and `CORE-FAIL-01`, four approved time-neutral textual substitutions for Tavri `TAV-EVT-POST-01`, and their external approved visual clarifications. Do not edit these archives or invent alternate endings, mandatory backstory, locations, route requirements, or mechanics. No runtime dialogue generation; all final dialogue must be stored as static authored content.

The game's complete ordinary conversation set must include **54 entries**:
- 3 princesses × 2 permanent narrative stages (pre-midpoint, post-midpoint)
- Each character/stage: **6 original first-use conversations** followed by **3 fallback conversations** cycled deterministically as necessary.
- Exactly **36 one-time first-use entries** and **18 fallback entries**, with no separate repeat pools or extra required scenes.

Each entry is a single valid ordinary princess encounter, costs exactly one slot, and respects one total princess encounter per scheduled day. Its **net** heart change is determined by the one authorized encounter outcome (not one heart award per spoken line). At the five-heart uncompleted midpoint cap, mandatory midpoint rules take precedence; once milestone completed, the post-midpoint stage remains even if hearts regress.

## 2. Stable identifier convention (candidate editorial guidance)
Use approved character prefixes `TAV`, `NER`, `KAE`, and the following proposed stable patterns:
- `TAV-ORD-PRE-U01` through `TAV-ORD-PRE-U06` (six unique before midpoint); `TAV-ORD-PRE-F01` through `F03` (three fallback before midpoint)
- Substitute `POST` for `PRE` after midpoint; analogously `NER` / `KAE`.
- Each encounter contains stable line, choice-point, option and outcome IDs; IDs should incorporate the encounter's stable prefix and an ordinal suffix, never be derived from displayed copy, real time or random seeds.
- Preserve approved `CORE-*` and pivotal `*-EVT-*` namespaces without collision. Content revision must use explicit ID migration mapping if references change.

This names a candidate authoring convention; final data syntax and machine-readable schema belong to the later formal contract gate.

## 3. Dialogue structure and consequences
Every ordinary encounter:
1. Places the player in one of the princess's already-approved, currently scheduled locations and an eligible slot, without additional travel cost.
2. Contains a short, voiced-by-speaker exchange in her approved personality, followed by a consequential player response point.
3. Offers **2–3 always-visible response options**: at least one authored positive/correct option and one ordinary non-offensive incorrect option.
4. May additionally offer stat-gated *correct* options that are **invisible** until their explicit integer threshold is met. Such options do not replace the always-available correct answer or affect the mandatory midpoint requirements.
5. Includes offensive options only if **explicitly labeled as offensive** by the content record; accidental snark is not treated as offensive.
6. Gives one encounter-level outcome: correct **+2 half-heart units** (= +1 heart), ordinary wrong **+1 half-heart unit** (= +0.5 heart), or specifically offensive **−1 half-heart unit** (= −0.5 heart). Hearts remain clamped 0–20; at an uncompleted midpoint clamp at 10 half-heart units. The cap is a rule, not a bonus catch-up system.
7. Specifies corresponding response lines and any **narrative-only** callback identifiers needed for later static continuity. No extra stat, money, affinity, equipment, fashion, combat, or social-media resources may be added.
8. Identifies whether projected outcome reaches ten hearts, in which case the already-approved initial marriage scene follows *within the same atomic encounter*. The ordinary scene must not invent its own new marriage choice.

Incorrect milestone/final answer outcomes are defined exclusively in the frozen pivotal scenes and must not be rewritten as ordinary heart penalties. Normal ordinary conversations cannot occur when pending required midpoint, marriage retry, or any active unfinished encounter forbids them.

## 4. Tone and voice, editorial contract
- **Comedy first, with sincere emotional depth.** Humor may use fish-out-of-water software engineering jokes, magical social media and absurd court bureaucracy, but should not turn every line into internet memes or undermine the emotional stakes.
- **Tavri:** clever, theatrical and teasing; public wit conceals fear of being loved only for performing. Post-midpoint may show more comfortable honesty without making her flat or humourless.
- **Nerelle:** curious, observant, dryly witty, compassionate but decisive; she retains mermaid anatomy and maritime royal obligations and is never written as helpless, transformed, or dependent on the protagonist to decide for her.
- **Kaedra:** intimidating, capable guardian with precise deadpan delivery; subtle private affection; she is not a monster to tame or a helpless person to rescue. Her small magic flare is not an invitation to add combat.
- **Protagonist:** named via safe `{PLAYER}` substitution, a transported software engineer; may have awkward, sincere growth, but no canon fixed appearance, gender presentation, combat career or extra inventory system is implied.
- Every encounter must read intelligibly even when its siblings, optional events, or earlier optional choices were never seen. Major route revelations belong in frozen midpoint and finale scenes, not exclusively in optional ordinary content.
- Offensive choices must be unambiguously authored as personally insulting/disrespectful, with proportional consequences. Avoid degrading, sexualizing or infantilizing characters.
- Keep each encounter compact for readable 320px mobile layouts. Do not use typewriter animation as a source of content or gameplay truth.

## 5. Ordered pool lifecycle (accepted behavior, editorial schema)
- In each permanent stage, play six unique entries **once in fixed order** on successive eligible ordinary encounters.
- After six unique entries are exhausted, cycle the three stage-specific fallback entries in fixed order; retain cursor across autosave, refresh, import and migration.
- Switching from pre- to post-midpoint starts the post pool at unique entry 1; never regress to pre after completion.
- The six unique entries **are not guaranteed to all be seen** on a perfect route. No essential revelation or marriage prerequisite may rely on exhausting a pool.
- If all 10 hearts are earned before six post-stage scenes are viewed, remaining unique entries are legitimately skipped by success.
- No random selection, server generation, procedurally recombined lines, or hidden off-calendar meetings.

## 6. Humpty Dumpty and training-copy boundary
Humpty is a **free**, text-first contextual helper and Town Square commentator, not an additional route or quest. Contextual hints should cover basic stat training, princess availability, the mandatory five-heart block, pending finale, nearing the deadline, save errors, and recovery UI. Hints may give general guidance about optional events but must not reveal hidden optional thresholds verbatim. Hints and comic comments use stable IDs; no new rewards, time costs, or unlockable economy. A standalone Humpty portrait is NOT authorized by the current design.

Eight approved activity descriptions follow two activities per stat and use exactly the existing progression (reaching levels 1–5 takes one session per level, while reaching levels 6–10 takes two sessions per level). Flavor text distinguishes activities, but numerical effect is equal for both activities sharing a stat. Copy must not imply extra boosts from favored activities, combat, clothing, wealth or comedy points.

## 7. Editorial acceptance checklist (all must pass before release)
1. All 54 entries present with unique stable IDs, 18 per princess, 9 per stage.
2. Each entry's dialogue references an approved speaker, expression token, location, stage, and existing game action only.
3. Every entry has its guaranteed correct and ordinary incorrect responses; stat-gated additions are optional and invisible when locked.
4. Exactly one encounter-level heart outcome per valid choice path, with expected half-unit values and no double rewards.
5. Deterministic ordering and 3-fallback cycling after six one-time entries; safe cursor persistence.
6. Critical plot, optional-event knowledge and major conclusion are understandable when the player has seen only the minimum guaranteed scenes.
7. Respect fixed princess schedules and stage priority; no off-calendar availability or more than one princess encounter per day.
8. All `{PLAYER}` uses text-safe, typographically resilient at up to 24 displayed graphemes; authored line markup cannot treat player names as HTML.
9. Humor, characterization, age portrayal, respectful relationships and water-accessible mermaid scenes pass editorial review.
10. Cross-route content audit checks collisions with 23 frozen effective pivotal/shared scene identifiers, and respects approved Tavri time-neutral copy overlay.
11. Final released dialogue is fully STATIC; no network or runtime generative dependencies.
12. Editor sign-off recorded separately from original frozen characters' approval records.

## 8. Current scope/status
- This file is a **candidate content bible and ID convention**; it requires approval to become binding for Goldfish. It contains no authored ordinary conversations and does not change the 23 frozen pivotal/shared scenes.
- Full state, persistence, save and command serialization schema must be formalized later in the implementation specification; this document is not a substitute.
- Art and design system remain under Gate 2 approval; 7 backgrounds have not been frozen.
