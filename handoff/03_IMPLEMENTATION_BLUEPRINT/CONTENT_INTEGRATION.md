# Approved narrative content: exact integration requirements

## Authority and input map

`01_APPROVED_CANON/` holds every necessary story line and all supporting copy. `01_APPROVED_CANON/scene_sections/` contains **77 per-scene textual extracts** for convenience. The full corresponding documents take precedence if an extraction mistakenly trims a branch. All output should be verified against original locked archives in `00_SOURCE_ORIGINALS/`, plus the explicitly approved Tavri external overlay. The derivation must not change any other Tavri text.

* Tavri: read `tavri_EFFECTIVE_overlay_applied.md` for full effective princess narrative; `tavri_original.md` and `tavri_text_overlay.json` prove unchanged original+four approved substitutions. Never treat historic `Unscripted Comedy Night` original text as runtime truth.
* Nerelle: `nerelle.md`; persistent mermaid with no legs, real water at both permitted locations. Approved costume artwork controls visible attire despite differing draft-bible modesty wording.
* Kaedra: `kaedra.md`; approved crimson hair, amber eyes, horns, wings and tail. Existing Royal Trial CG's male supporting figure is **noncanonical** and does not fix selectable protagonist gender or appearance.
* Shared: `shared.md` exactly approved prologue `CORE-PRO-01` and terminal failure `CORE-FAIL-01`. No new lore added.
* Ordinary: `routine.md` exactly 54 entries, six pools of nine; `ordinary_bible.md` binding authoring/voice and choice rules. All 54 texts approved after original document was created: do not interpret old title `UNAPPROVED` as current status.
* Help/activity/UI: `support.md`; show exact 14 HD-HELP passages by state applicability, 12 Town Square HD-SQUARE quips as free/costless content, 8 activity flavor pairs, 12 feedback strings and 14 static UI labels. These may be reused verbatim; error codes in persistence spec require additional purely technical copy.

## Content compiler requirements (agent can author build scripts, not runtime AI)

Create a deterministic checked-in static content table (JSON or TS module) from the approved Markdown. Preserve **every original ID** as authored, render proper typographic punctuation, avoid accidental double quoted dialog display or loss of stage directions. Treat curly quotes and capitalization exactly as source. Fields minimum:
```
sceneId; kind (shared|optional|midpoint|midpoint_retry|marriage|marriage_retry|epilogue|ordinary);
route; stage; title; introLines[]; choicePointId?; options[];
option:{choiceId,labelLineSpeaker:'PLAYER',labelText,outcomeId,outcomeClass,branchLines[]};
source:{originalArchive, originalMember, effectiveOverlay?};
expressionCue per character line; allowedLocationSet; displayOnly; costOneSlot; specialTransition.
```
Branch text may include a `PLAYER` dialogue line in the choice option before a character response. Ensure options are actual line-bearing dialogue, not generic correct/wrong labels. Do not reveal the winning option to the player. In options use outcome class only in internal data. The source document's instruction/metadata `END ...` is implementation control data and is **not** player-facing dialogue.

**Validation after conversion:** Exactly 77 unique scenes (21 route-specific pivotal, 2 shared, 54 ordinary), exactly six choice points across each princess's 7 pivotal scenes (epilogue display-only), one choice point in each ordinary scene, no duplicate scene/line/choice/option IDs; every outcome reference belongs to the current scene; branch text copied with no unapproved edits. Use automated diff/token hashes plus manual proofreading. Some pivotal scenes intentionally reuse the SAME outcome ID for multiple choices that share one logical outcome; this is legal, do not treat as a duplicate definition.

**Encounter metadata map:**
- `TAV-EVT-PRE-01`, `NER-EVT-PRE-01`, `KAE-EVT-PRE-01` = one-time, before midpoint, stat3; +2/+1/-1 nets.
- `TAV-MID-01`, `NER-MID-01`, `KAE-MID-01` = mandatory full midpoint first attempt (0 hearts change); `*-MID-RETRY-01` short retry.
- `*-EVT-POST-01` = one-time, after midpoint, stat3; nets +2/+1/-1.
- `*-FIN-01` = full linked marriage scene the moment projected hearts reach20, not a second slot; `*-FIN-RETRY-01` = later one-slot retry.
- `*-EPI-01` = presentation-only after committed success.
- `CORE-PRO-01` and `CORE-FAIL-01` = display-only global scripts.
- `TAV|NER|KAE-ORD-PRE|POST-U01..U06`, `...F01..F03` = static repeatable/first-use ordinary catalog.

**Name substitution:** Replace only explicit `{PLAYER}` tokens with escaped grapheme-limited name. React must render as text; no innerHTML. Other curly braces in script are literal unless documented. No automatic grammatical/pronoun additions.

**Expression map:** one of NEUTRAL, PLAYFUL, WORRIED, ANNOYED, SURPRISED maps onto approved PNG name; carry latest speaker expression across adjacent lines until next speaker cue. Never invent sixth state, voice lines, animation or tail rig.

**Help wiring NEW DEFAULT:** `HD-HELP-*` entries live in a no-cost Help screen; contextual hints filtered by `outcome`, midpoint, proposal, day>=24, save status etc. Always offer manual Help even when filters empty. Help is not an action or encounter. `HD-SQUARE-TS01..TS12` cycle deterministically across read-only visits to Town Square **within a browser session**; do not persist a new gameplay stat or grant rewards. Repeated free visits are allowed. Accessibility: offer 'Hear Humpty's comment' button if a text-only quote is desired; no separate sprite or map location.

**Activity flavor NEW DEFAULT:** Training action presentation shows the two approved narration lines for that activity plus the appropriate `TXT-TRAIN-LEVEL` or `TXT-TRAIN-PARTIAL`. To avoid silent progression, show resulting stat/partial state. `TXT-TRAIN-CAPPED` on invalid train is free. Feedback strings describing +1 or +0.5 are read-only after committed action and must accurately reflect actual *clamped* award; when at cap use `TXT-AT-CAP`/equivalent and display `+0 applied` instead of falsely claiming +1. The appropriate `TXT-MEET-*` prose may be adapted only to avoid a demonstrably false numerical statement; preserve original line itself in approved source.

**Optional and milestone story locations:** A pivotal script can narratively move from the scheduled location to another *approved* location at zero extra action cost. Use its scene-approved location notes for background transitions; these are not travel purchases or new map nodes. A visual CG can override backdrop for approved midpoint story passage. No real-time weather or clock-based scene art variants.
