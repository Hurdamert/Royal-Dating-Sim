# Gate 2 — Nerelle Narrative Package v0.1

**Status:** DRAFT FOR HUMAN EDITORIAL REVIEW — NOT APPROVED.  
**Canonical reference:** User-approved `Nerelle_Gate2_Character_Bible_Candidate_v0.1.md` and illustrated `Nerelle_Gate2_Character_Sheet_Candidate_v0.1.png`, plus Gate 1's 144 accepted design decisions and approved derived rules.  
**Production role:** All seven Nerelle-specific pivotal narrative units, with exact dialogue, stable line and choice IDs, branch effects, and scene-transition expectations. **No shared prologue or shared failure-ending content is newly approved here. No implementation code, new gameplay features, or final sprite assets are included.**  
**Editorial objective:** Nerelle is neither a helpless person to rescue nor someone who must discard the sea to love the protagonist. Her arc is about the freedom to choose an authentic future that includes duty, discovery, and partnership.

## A. Immutable canon and authoring rules

**Identity and visual performance.** Nerelle is a 23-year-old mermaid princess, gentle but decisive, observant, curious about surface customs, and already competent in the ocean court. Her canonical approved appearance is a mature humanoid upper body and **one continuous teal-to-aqua fish tail with translucent fins**, midnight-ocean-blue hair, sea-glass-blue eyes, and a pearl-ivory/ocean-blue court outfit with restrained ornaments. In every scene she **remains in accessible water**. She has no legs, land form, amphibious transformation, walking animation, or shore-based standing pose. Water-level framing may be close-up, but prose must not imply she leaves the water.

**Portrait cues.** The only approved expression state IDs are `NEUTRAL`, `PLAYFUL`, `WORRIED`, `ANNOYED`, and `SURPRISED`. These correspond to the five approved expression categories, not five newly approved production sprites. Non-portrait stage directions (tail movement, wet hair, a hand on a railing) are textual performance notes, not instructions to generate additional art.

**Existing route schedule.** Monday afternoon/evening **Moonwater Quay**; Wednesday morning/afternoon **Royal Gardens canal**; Friday afternoon/evening **Moonwater Quay**; Saturday morning/afternoon **Royal Gardens canal**; Sunday afternoon/evening **Moonwater Quay**. Princess availability repeats across all four weeks. Every encounter begins at its scheduled location and can relocate narratively between the *existing* water-accessible Quay and Gardens canal in the same one-slot encounter. Any boat, railing, bridge, tideway, barge, or floating decoration is scene dressing, never another visitable location, travel action, equipment item, or minigame. Scene prose must remain plausible in either a morning or an evening slot; specific lanterns need not be lit during daylight.

**Route requirements.** Mandatory five-heart milestone `NER-MID-01` requires Kindness ≥ 6 and Charisma ≥ 4. It must be completed before relationship hearts can grow past five. The pre-midpoint optional event requires Kindness ≥ 3; the post-midpoint optional event requires Intelligence ≥ 3. Both are missable, experienced exactly once even on an incorrect answer, and irrelevant to marriage eligibility.

**Game effects.** `heartsHalf` is an integer 0–20. A correct ordinary/optional heart-earning answer nets **+2 half-heart units** (+1 displayed heart); an ordinary incorrect answer nets **+1 half-heart unit** (+0.5 displayed heart); a specifically labeled *offensive* answer nets **−1 half-heart unit** (−0.5 displayed heart). Clamp pre-midpoint gains at `heartsHalf = 10`; discard overflow. The successful or unsuccessful mandatory midpoint attempt makes **no heart change**. A wrong final proposal leaves **10 hearts**, triggers a later eligible final retry, and does not add a heart penalty. A completed optional event has no gameplay effect besides the net hearts and its experienced flag. Narrative outcome IDs may support later references but never add extra stat points, equipment, social reputation, or alternative ending requirements.

**Transaction and visibility.** One encounter consumes one action slot and the day's sole princess interaction, even if its narrative transitions across scenes. All dialogue selections and results are **staged until the parent encounter resolves**. If an optional event or ordinary encounter projects 20 half-heart units, immediately link `NER-FIN-01` within that same parent transaction before committing. A failed final answer commits the originating earned hearts, marks a final retry pending, then advances time; an eligible **later day** is required for the final retry. Winning from Day 28 evening succeeds before expiration; failing at deadline preserves a terminal failure state without playable Day 29. Unfinished encounters resume identically after reload, with no reroll or extra charge. The marriage epilogue is a free presentation after success is committed.

**Player identity and names.** `{PLAYER}` means the protagonist's safely rendered chosen name, or `Traveler` when omitted. Protagonist has an established backstory as a transported software engineer; no script presupposes a specific course taken, skill trained, inventory item found, or optional event completed.

**Authored-line convention.** Each `NER-...` numbered dialogue or narration line has a stable immutable ID. `NERELLE [EXPRESSION]`, `PLAYER`, and `NARRATOR` identify speakers. Nerelle's expression remains until another Nerelle cue appears. Each choice has its own stable ID and branch outcome. Only a consequential authored choice determines the single encounter-level hearts result (or the midpoint/final status). Unchosen branches are never displayed. After a choice's branch lines, apply the stated terminal scene transition; do not continue through other branches. Nothing is voice-acted or audio-dependent in v1.

**Narrative continuity constraints.** First-time mandatory scenes contain the essential emotional information. The six optional events across the game remain nonmandatory; this Nerelle package contains only her two approved optional events. No mandatory line relies on `NER-PRE-...` or `NER-POST-...` having occurred. Consequences of optional event choices can be referenced in later *conditional routine dialogue*, not treated as requirements for midpoint or final scenes. Neither the protagonist nor the narrative decides Nerelle's life on her behalf. The ocean court is a set of legitimate responsibilities, not a villain to defeat.

---

## B. Scene 1 — Surface Souvenir Swap

**Scene ID:** `NER-EVT-PRE-01`  
**Type:** Optional, pre-midpoint, once per route.  
**Eligibility:** Nerelle is the chosen route; milestone incomplete; committed hearts < 5; **Kindness ≥ 3**; event unexperienced; Nerelle is scheduled in the current slot; today's princess interaction unused; no encounter pending. The optional event is lost when the pre-midpoint stage ends or the five-heart milestone takes priority.  
**Location:** Nerelle's scheduled **Moonwater Quay** or **Royal Gardens canal**, directly beside accessible water. No inventory, trading, shopping, or collectibles system.  
**Dramatic objective:** Nerelle and the protagonist learn to respect each other's world without reducing it to curiosities. Her unusual questions show intelligence, not ignorance.

- `NER-PRE-001` NARRATOR: A line of small waterproof parcels floats beside the canal railing, each tied to a ribbon so precisely that a court clerk might weep with envy.
- `NER-PRE-002` NERELLE [PLAYFUL]: "Do you have a moment? I've been conducting an extremely unscientific study of surface souvenirs. The findings are troubling."
- `NER-PRE-003` PLAYER: "How troubling?"
- `NER-PRE-004` NERELLE [NEUTRAL]: "You sell seashells to people who already live beside the sea. Then you charge extra if someone has written *Authentic Ocean* on them."
- `NER-PRE-005` PLAYER: "That's the advertising industry. I used to live in a world with an advanced version."
- `NER-PRE-006` NERELLE [SURPRISED]: "Advanced? Can it convince a fish it needs to buy water?"
- `NER-PRE-007` PLAYER: "Give it a few fiscal quarters."
- `NER-PRE-008` NARRATOR: Nerelle laughs, then nudges one parcel toward the stone lip of the quay. Inside is a polished bit of sea glass beside a neatly folded sketch of a harbor lantern.
- `NER-PRE-009` NERELLE [NEUTRAL]: "A child in the tide villages gave me the glass. She said it looked like the surface lights when the water is calm. I wanted to understand what she meant."
- `NER-PRE-010` PLAYER: "Did you ask her?"
- `NER-PRE-011` NERELLE [WORRIED]: "I did. She was shy when she recognized me. Sometimes a crown makes an ordinary question feel like an examination."
- `NER-PRE-012` NERELLE [PLAYFUL]: "So I'm trying to learn how to be curious without turning people into a royal research project. My current theory involves fewer official seals."
- `NER-PRE-013` NARRATOR: She holds out the sketch for your opinion but watches your expression more closely than the paper.

**Choice point `NER-PRE-C1` — choose exactly one:**

1. `NER-PRE-C1-LISTEN` **Correct; net +2 half-hearts.** PLAYER: "Maybe ask what matters to them, then listen without trying to decide what the answer should be. We could start with the lanterns if you'd like."
   - `NER-PRE-S01` NERELLE [SURPRISED]: "The astonishing art of allowing a question to remain a question."
   - `NER-PRE-S02` PLAYER: "They don't teach it in the advanced advertising industry."
   - `NER-PRE-S03` NERELLE [PLAYFUL]: "Their loss."
   - `NER-PRE-S04` NARRATOR: She studies the reflection of a lantern in the water. Her tail fin shifts beneath it, sending the light into a dozen small shapes.
   - `NER-PRE-S05` NERELLE [NEUTRAL]: "The child wasn't explaining the lantern. She was telling me what home looks like from below."
   - `NER-PRE-S06` PLAYER: "That sounds worth remembering."
   - `NER-PRE-S07` NERELLE [PLAYFUL]: "It does. For once, I shall not commission a commemorative plaque."
   - **Narrative outcome ID:** `NER-PRE-O-RESPECTED`.
2. `NER-PRE-C1-EXPLAIN` **Ordinary incorrect; net +1 half-heart.** PLAYER: "The important thing is that souvenirs are symbolic. Let me explain the entire surface economy of sentimental objects."
   - `NER-PRE-W01` NERELLE [NEUTRAL]: "That sounds informative. It's not quite what I was asking."
   - `NER-PRE-W02` PLAYER: "Sorry. I thought more information would help."
   - `NER-PRE-W03` NERELLE [PLAYFUL]: "It may. But if I wanted a lecture, I'd have invited the royal tax assessor."
   - `NER-PRE-W04` NARRATOR: She keeps the child's sketch tucked safely beside her and returns to the water as the conversation ends.
   - **Narrative outcome ID:** `NER-PRE-O-LECTURED`.
3. `NER-PRE-C1-MOCK` **Explicitly offensive; net −1 half-heart.** PLAYER: "How can you be a princess and still need someone to explain ordinary surface things?"
   - `NER-PRE-X01` NERELLE [SURPRISED]: "Because I am a princess of the sea. I rather thought that distinction was visible."
   - `NER-PRE-X02` NERELLE [ANNOYED]: "Not knowing your customs is not the same as lacking sense."
   - `NER-PRE-X03` NARRATOR: She closes the parcel herself. The polite farewell that follows is considerably shorter than the conversation she had hoped for.
   - **Narrative outcome ID:** `NER-PRE-O-DISMISSED`.

**END `NER-EVT-PRE-01`:** Mark event experienced exactly once regardless of branch; apply only the selected net half-heart outcome, capped at five hearts while milestone incomplete; consume one encounter/action slot and append one journal entry. No objects are transferred into a player inventory. If this encounter newly reaches five committed hearts, the mandatory midpoint becomes pending on a **later** eligible encounter. No extra stat or unlock is granted.

---

## C. Scene 2 — The Forbidden Journey (first full midpoint attempt)

**Scene ID:** `NER-MID-01`  
**Type:** Mandatory first five-heart midpoint; full scene shown once.  
**Eligibility:** Nerelle route; exactly five committed hearts (`heartsHalf = 10`), midpoint incomplete; **Kindness ≥ 6** and **Charisma ≥ 4**; Nerelle scheduled in this slot; daily encounter unused; no active encounter. If stats insufficient, block all princess interactions free of cost until qualified.  
**Location:** Opens at the scheduled waterside position. The scene may use the approved **Moonwater Quay** and **Royal Gardens canal** as water-accessible narrative settings within this one encounter; Nerelle stays in the water and the protagonist remains on waterside paths or quays. No new geographical connection or travel mechanic is implied. Nothing requires Nerelle to be on land or exposes a new map node.  
**Dramatic objective:** She wants a personally chosen, feasible way to explore the surface-facing waterways while continuing to serve her ocean community. The protagonist must support a **jointly considered plan with Nerelle in control** rather than command her, rescue her, or deny her ambitions.

- `NER-MID-001` NARRATOR: Nerelle is waiting in the water below the quay, unusually quiet. A folded chart rests on a dry ledge within her reach, weighted beneath a smooth stone.
- `NER-MID-002` NERELLE [PLAYFUL]: "Before you ask: no, I have not stolen a map. It belongs to me. The court has simply declared it a terribly inconvenient object for me to own."
- `NER-MID-003` PLAYER: "Is this where the official warning says 'forbidden journey'?"
- `NER-MID-004` NERELLE [NEUTRAL]: "It says 'unsanctioned surface observation.' If you enlarge the lettering enough, it sounds almost respectable."
- `NER-MID-005` NARRATOR: She lifts a hand to the chart. The familiar water-accessible places near Moonwater Quay and the Royal Gardens canal are marked as possible surface-viewing stops: places close enough to hear markets and watch people going about their day.
- `NER-MID-006` NERELLE [WORRIED]: "I know those currents. I know the tides and the places where the barges pass. I've helped guide emergency supplies here. Yet when I ask to visit simply because I want to, the answer changes."
- `NER-MID-007` PLAYER: "Your court doesn't want you to go?"
- `NER-MID-008` NERELLE [NEUTRAL]: "They want me to be safe. They also want me to be available whenever a council member discovers another urgent meeting. Both things are reasonable until there is no time left that belongs to me."
- `NER-MID-009` NARRATOR: A surface courier crosses a nearby bridge carrying a stack of documents taller than his head. The top sheet escapes and lands in the canal. Nerelle catches it before it sinks.
- `NER-MID-010` NERELLE [PLAYFUL]: "The surface, meanwhile, is defending itself with administrative paperwork. I feel at home already."
- `NER-MID-011` PLAYER: "Why tell me about the journey now?"
- `NER-MID-012` NERELLE [WORRIED]: "Because I trust you, and that makes this harder. Everyone has an opinion about what I should do. I wanted to hear yours. I'm afraid you'll give me another order, even if it comes dressed as kindness."
- `NER-MID-013` PLAYER: "What do you want?"
- `NER-MID-014` NERELLE [NEUTRAL]: "I want to learn how people live above the water. I want to remain answerable to the people who rely on me below it. And I want the choice to be mine."
- `NER-MID-015` NARRATOR: She waits beside the quay, tail resting in the steady current. The chart stays between you, open to amendment rather than demanding obedience.

**Choice point `NER-MID-C1` — one decisive answer:**

1. `NER-MID-C1-PLAN` **Correct; complete milestone, no hearts gained.** PLAYER: "Then let's design a visit you actually want. You choose the route and when you're free of court duties. We can plan a safe waterside stop, agree on how you tell your court, and change plans if the tide or your responsibilities need it. I'll help, but it's your call."
   - `NER-MID-S01` NERELLE [SURPRISED]: "You didn't begin by telling me what I was allowed to do."
   - `NER-MID-S02` PLAYER: "You already know these waterways better than I ever will. I can help with the surface part."
   - `NER-MID-S03` NERELLE [NEUTRAL]: "Then here is what I propose. First, I finish my scheduled hearings. Second, I tell the appropriate attendants where I'll be. Third, I explore the garden canal because I want to, not because a task requires it."
   - `NER-MID-S04` PLAYER: "And if someone decides a private afternoon is scandalous?"
   - `NER-MID-S05` NERELLE [PLAYFUL]: "I'll ask whether they prefer their scandals alphabetized."
   - `NER-MID-S06` NARRATOR: She traces the waterway on the map. You suggest where a surface walkway runs alongside it; she corrects you where the current is too swift.
   - `NER-MID-S07` NERELLE [WORRIED]: "I worried you would make this into a daring rescue. I don't need to be carried away from my life. I need space to live it."
   - `NER-MID-S08` PLAYER: "Then we make space, together."
   - `NER-MID-S09` NERELLE [NEUTRAL]: "Together. That sounds less frightening when you say it without deciding the rest for me."
   - `NER-MID-S10` NARRATOR: They follow the familiar canal waterline for a short distance, comparing its sounds and sights. Nothing about the route is new. The novelty is that Nerelle chose to take it.
   - **Narrative outcome ID:** `NER-MID-O-TRUST`. Mark midpoint completed on encounter resolution; no heart award.
2. `NER-MID-C1-RESCUE` **Wrong; midpoint incomplete, no hearts changed.** PLAYER: "You shouldn't have to deal with all this. I'll arrange everything and get you away from the court before anyone can object."
   - `NER-MID-W01` NERELLE [ANNOYED]: "Away from the court? Those are my people. My responsibilities."
   - `NER-MID-W02` PLAYER: "I only meant to free you."
   - `NER-MID-W03` NERELLE [WORRIED]: "Free me to do what you've decided? I wanted you to hear my plan, not replace it."
   - `NER-MID-W04` NARRATOR: She takes back the chart, leaving the conversation unfinished rather than agreeing to a future chosen for her.
   - **Narrative outcome ID:** `NER-MID-O-OVERRIDDEN`. Flag full midpoint scene seen; retry later.
3. `NER-MID-C1-PROHIBIT` **Wrong; midpoint incomplete, no hearts changed.** PLAYER: "Your court has a point. There are risks, so you should stop asking to visit the surface."
   - `NER-MID-P01` NERELLE [NEUTRAL]: "I know the risks. I came because I thought we might discuss them as equals."
   - `NER-MID-P02` PLAYER: "I don't want you hurt."
   - `NER-MID-P03` NERELLE [ANNOYED]: "Concern is welcome. Treating concern as authority over me is not."
   - `NER-MID-P04` NARRATOR: She lets the chart float back against the quay and returns to her duties without agreeing to cancel her hope.
   - **Narrative outcome ID:** `NER-MID-O-UNHEARD`. Flag full midpoint scene seen; retry later.

**END `NER-MID-01`:** Consume exactly one slot and one princess interaction for the day; append one journal entry. Hearts remain exactly five. Correct answer completes midpoint permanently; either wrong answer sets a later eligible retry pending. On failure the complete original scene may not be replayed; use `NER-MID-RETRY-01` instead. The chart and any watery route are storytelling only, not inventory or map content.

---

## D. Scene 3 — The Forbidden Journey follow-up (midpoint retry)

**Scene ID:** `NER-MID-RETRY-01`  
**Type:** Mandatory short midpoint retry, repeatable after a failed full attempt.  
**Eligibility:** Full midpoint already seen; five committed hearts; midpoint incomplete; Kindness ≥ 6 and Charisma ≥ 4; new Nerelle-eligible day/slot with unused daily interaction; no pending encounter.  
**Location:** Nerelle's scheduled Moonwater Quay or Royal Gardens canal waterside position. No extra transitions or locations required.

- `NER-MR-001` NERELLE [NEUTRAL]: "I've still been thinking about the route. And about what you said the last time we discussed it."
- `NER-MR-002` PLAYER: "I heard something different from what you were asking."
- `NER-MR-003` NERELLE [WORRIED]: "I didn't need someone to save me or someone to forbid me. I need to know we can make difficult decisions together without either of us vanishing inside the other's plans."
- `NER-MR-004` NARRATOR: The current shifts gently beneath her. She waits for your answer, patient but unwilling to surrender the question.

**Choice point `NER-MR-C1`:**

1. `NER-MR-C1-COAUTHOR` **Correct; midpoint complete; no heart change.** PLAYER: "You get to choose what you explore and when. I can help plan safe meeting points along the waterways, and we can talk honestly about your duties and the risks. I won't make the choice for you."
   - `NER-MR-S01` NERELLE [SURPRISED]: "Yes. Precisely that."
   - `NER-MR-S02` NERELLE [PLAYFUL]: "You may yet become a capable navigator of discussions. Your knowledge of actual water remains a separate matter."
   - `NER-MR-S03` PLAYER: "I know what a boat is."
   - `NER-MR-S04` NERELLE [NEUTRAL]: "Then we have enough to begin."
   - `NER-MR-S05` NARRATOR: She revises her plan in her own hand. The conversation ends with a choice she can recognize as hers.
   - **Narrative outcome:** `NER-MID-O-TRUST`.
2. `NER-MR-C1-DECIDE` **Wrong; midpoint remains incomplete; no heart change.** PLAYER: "I thought it over. The easiest solution is for you to let me arrange it all. No decisions for you to worry about."
   - `NER-MR-W01` NERELLE [ANNOYED]: "You have listened with remarkable care, and somehow missed the center of every sentence."
   - `NER-MR-W02` PLAYER: "That's fair."
   - `NER-MR-W03` NERELLE [NEUTRAL]: "Then perhaps next time we can begin there."
   - **Narrative outcome:** `NER-MID-O-OVERRIDDEN`.

**END `NER-MID-RETRY-01`:** One action slot, one daily Nerelle encounter, one journal entry; no heart change. On wrong answer, schedule another short retry for a later eligible day. On correct, set midpoint complete and permanently unlock post-midpoint relationship progression. Never re-show full `NER-MID-01`.

---
## E. Scene 4 — Moonwater Festival

**Scene ID:** `NER-EVT-POST-01`  
**Type:** Optional post-midpoint festival event, once per route.  
**Eligibility:** Nerelle milestone completed; **Intelligence ≥ 3**; committed hearts < 10; marriage retry not pending; event unexperienced; scheduled Nerelle slot and daily encounter unused; no other pending scene. A completed midpoint flag remains authoritative even if hearts subsequently fall below five.  
**Location:** **Moonwater Quay** or **Royal Gardens canal**, with floating festival decorations extending into the same accessible water. The festival is a scene at an existing location, never an eighth location, commerce mechanic, or minigame.  
**Dramatic objective:** Show a community tradition Nerelle values while she begins articulating how duty and personal choice can coexist. This event must not introduce information needed to comprehend her final scene.

- `NER-POST-001` NARRATOR: Ribbons trail from the quay railing. In the water, little floating lanterns bob beside the canal, bright with painted names and small wishes. In daylight, their patterns catch the sun; at dusk, their lights begin to glow.
- `NER-POST-002` NERELLE [PLAYFUL]: "Welcome to Moonwater Festival. Our official explanation says the lanterns honor those who guided us home. The unofficial explanation is that everyone enjoys making something float and then pretending it is a solemn tradition."
- `NER-POST-003` PLAYER: "Both can be true."
- `NER-POST-004` NERELLE [NEUTRAL]: "Exactly. You are getting dangerously good at this."
- `NER-POST-005` NARRATOR: A group of young sea-dwellers carefully guides a string of lanterns along the water's edge. Nerelle exchanges a practiced greeting and listens to their questions with complete attention.
- `NER-POST-006` PLAYER: "They seem glad you're here."
- `NER-POST-007` NERELLE [WORRIED]: "I love this part of my responsibilities. They come to me with genuine concerns. I can sometimes help."
- `NER-POST-008` PLAYER: "And the parts you don't love?"
- `NER-POST-009` NERELLE [NEUTRAL]: "Those still exist. I used to think the answer was to accept every demand until there was no room left to want anything. Now I'm trying to learn which duties are mine, which I can share, and which are merely habits dressed as laws."
- `NER-POST-010` NARRATOR: A lantern drifts into an eddy, circles twice, and points upstream as if it has decided to attend a different festival.
- `NER-POST-011` NERELLE [PLAYFUL]: "That one has achieved more independence than half the royal council."
- `NER-POST-012` PLAYER: "Does it get to decide where it's going?"
- `NER-POST-013` NERELLE [WORRIED]: "Not entirely. Currents are real. But we still choose how to travel with them."
- `NER-POST-014` NERELLE [NEUTRAL]: "I want to keep serving my people. I also want to keep learning about yours. Sometimes people hear one wish and assume it cancels the other."
- `NER-POST-015` NARRATOR: She watches the lanterns, then turns back to you. She has told you what matters; now she wants to know what you heard.

**Choice point `NER-POST-C1` — choose exactly one:**

1. `NER-POST-C1-ROOM` **Correct; net +2 half-hearts.** PLAYER: "You don't have to abandon your people to make room for your own life. You can decide what duties matter, where help is possible, and which discoveries you want to make. I'll listen to what you choose."
   - `NER-POST-S01` NERELLE [SURPRISED]: "It's a surprisingly large relief to be understood without first providing a twelve-page petition."
   - `NER-POST-S02` PLAYER: "I can provide a form if that would help."
   - `NER-POST-S03` NERELLE [PLAYFUL]: "Don't tempt me. I know several excellent forms."
   - `NER-POST-S04` NARRATOR: She steadies the wayward lantern with a small movement of her tail, turning it back into the shared channel instead of fixing it in place.
   - `NER-POST-S05` NERELLE [NEUTRAL]: "My place in the sea matters to me. So does the part of myself still becoming something new."
   - `NER-POST-S06` PLAYER: "Those both sound like parts of you."
   - `NER-POST-S07` NERELLE [NEUTRAL]: "They are. And I would like anyone close to me to love the whole of that."
   - **Narrative outcome ID:** `NER-POST-O-HEARD`.
2. `NER-POST-C1-SIMPLIFY` **Ordinary incorrect; net +1 half-heart.** PLAYER: "Why not just appoint someone else to do the ceremonies? Then you could spend all your time exploring."
   - `NER-POST-W01` NERELLE [NEUTRAL]: "Some responsibilities can be shared. Others matter to me personally."
   - `NER-POST-W02` PLAYER: "I thought that would make things easier."
   - `NER-POST-W03` NERELLE [WORRIED]: "Perhaps. But I don't want a future that's easier because half of who I am has been removed."
   - `NER-POST-W04` NARRATOR: The festival carries on around you. Nerelle thanks you for trying, though the conversation ends before she can explain everything.
   - **Narrative outcome ID:** `NER-POST-O-SIMPLIFIED`.
3. `NER-POST-C1-SHAME` **Explicitly offensive; net −1 half-heart.** PLAYER: "All these lanterns and speeches seem pointless. Your people would manage without you, so why pretend the duties matter?"
   - `NER-POST-X01` NERELLE [ANNOYED]: "They aren't pointless because you haven't learned why they matter."
   - `NER-POST-X02` PLAYER: "I didn't mean to insult them."
   - `NER-POST-X03` NERELLE [NEUTRAL]: "Then please stop talking as if being important to others means being unimportant to myself."
   - `NER-POST-X04` NARRATOR: She joins the festival-goers in the water. You are not asked to follow the conversation further.
   - **Narrative outcome ID:** `NER-POST-O-HURT`.

**END `NER-EVT-POST-01`:** Mark experienced regardless of outcome; apply exactly one encounter-level net half-heart result, consume one action slot and daily princess encounter, append one journal entry. This scene cannot repeat. No new equipment, duty-reputation metric, festival tokens, skill rewards, or ending prerequisites are created. If its **projected** reward reaches ten hearts, link `NER-FIN-01` immediately *within the same pending parent encounter*, before the heart reward or time advancement commits.

---

## F. Scene 5 — A Future She Chooses (first full final proposal)

**Scene ID:** `NER-FIN-01`  
**Type:** Mandatory first marriage proposal, full version once per run.  
**Eligibility:** Nerelle midpoint complete; a heart-earning ordinary or optional encounter projects 20 half-heart units; full final not previously shown; parent encounter not yet committed. If the previous full proposal failed and 20 hearts are already committed, skip to the retry `NER-FIN-RETRY-01` on a later eligible day instead.  
**Location:** An intimate exchange beside accessible water at the **Moonwater Quay** or **Royal Gardens canal**, reached from the originally scheduled position within the same encounter. The protagonist stays on the quay/walkway; Nerelle remains in water.  
**Dramatic objective:** Nerelle explicitly defines the future she wants *before* the protagonist proposes. Marriage is a mutual choice that preserves her marine identity, relationships, duties, and freedom to explore. Neither a magical leg transformation nor abandonment of ocean royal service is allowed.

- `NER-FIN-001` NARRATOR: As the conversation ends, Nerelle does not swim away. She rests one hand on the waterside stone and looks across the familiar meeting place as though seeing it anew.
- `NER-FIN-002` NERELLE [PLAYFUL]: "You've become rather good company for a surface traveler. That's not a compliment I award lightly. My standards include knowing which end of a boat belongs in the water."
- `NER-FIN-003` PLAYER: "Both ends, ideally."
- `NER-FIN-004` NERELLE [SURPRISED]: "You're improving."
- `NER-FIN-005` NARRATOR: She laughs, but her attention turns serious. Under the water, her fin settles against the current instead of hurrying her away.
- `NER-FIN-006` NERELLE [WORRIED]: "There is something I need to tell you before you say whatever you've been rehearsing."
- `NER-FIN-007` PLAYER: "I might have rehearsed nothing."
- `NER-FIN-008` NERELLE [PLAYFUL]: "Then this may be our most efficient conversation yet."
- `NER-FIN-009` NERELLE [NEUTRAL]: "I have spoken with the people responsible for my duties. I can share some of the work. I will keep the responsibilities I believe are mine. And I'll continue exploring the surface-facing waterways when I choose."
- `NER-FIN-010` PLAYER: "How did that go?"
- `NER-FIN-011` NERELLE [PLAYFUL]: "With many documents. I believe three council members grew new gray hairs during the discussion."
- `NER-FIN-012` NERELLE [WORRIED]: "There will be disagreements. Some days my people will need me. Some days I'll need quiet. None of that makes me less interested in a life with you."
- `NER-FIN-013` NERELLE [NEUTRAL]: "I do not want to leave the ocean to become someone else's idea of a proper bride. Nor do I want to ask you to surrender your life and call it devotion."
- `NER-FIN-014` PLAYER: "What do you want, then?"
- `NER-FIN-015` NERELLE [NEUTRAL]: "A partnership we choose, with honest plans, places to meet where water reaches the shore, and room to keep learning. Not every question has to be solved in advance."
- `NER-FIN-016` NARRATOR: She reaches her hand up from the water, not as someone waiting to be rescued but as someone inviting you to answer as an equal.

**Choice point `NER-FIN-C1` — decisive proposal; choose exactly one:**

1. `NER-FIN-C1-EQUAL` **Correct; terminal success, gallery unlocked, no additional heart bonus.** PLAYER: "Nerelle, I love your curiosity and the way you care for people. I love that you know what matters to you. I don't want to choose your future for you. Would you marry me and keep choosing how we build it together?"
   - `NER-FIN-S01` NERELLE [SURPRISED]: "You really heard every word."
   - `NER-FIN-S02` PLAYER: "I tried. I expect I'll need reminders."
   - `NER-FIN-S03` NERELLE [PLAYFUL]: "Good. I've already prepared several, in alphabetical order."
   - `NER-FIN-S04` NARRATOR: For a moment she looks out to the water, where the tide keeps moving. Then she turns back on her own terms.
   - `NER-FIN-S05` NERELLE [NEUTRAL]: "Yes, {PLAYER}. I would choose that life with you. The ocean is still my home. My duties will still be real. But there's room for us, if we keep making that room honestly."
   - `NER-FIN-S06` PLAYER: "I don't know every part of what comes next."
   - `NER-FIN-S07` NERELLE [WORRIED]: "Neither do I. I used to think that meant I'd failed to plan."
   - `NER-FIN-S08` PLAYER: "And now?"
   - `NER-FIN-S09` NERELLE [PLAYFUL]: "Now I think it means we get to write a few pages together. Please use waterproof ink."
   - `NER-FIN-S10` NARRATOR: She takes your offered hand across the waterside stone. Neither of you needs a transformation or a grand rescue to make the answer real.
   - **Narrative outcome ID:** `NER-FIN-O-MARRIED`; on successful resolution, commit terminal victory and gallery once, then show `NER-EPI-01` without extra gameplay cost.
2. `NER-FIN-C1-TRANSFORM` **Wrong; no new heart loss; ten hearts and marriage retry pending.** PLAYER: "Marry me, and I'll find a spell to give you legs. Then none of these complications will matter."
   - `NER-FIN-W01` NERELLE [SURPRISED]: "Legs?"
   - `NER-FIN-W02` PLAYER: "So we could live together on land."
   - `NER-FIN-W03` NERELLE [ANNOYED]: "You heard me tell you who I am, and answered with a plan to change it."
   - `NER-FIN-W04` PLAYER: "I thought it would be easier."
   - `NER-FIN-W05` NERELLE [WORRIED]: "Easier for whom? I cannot say yes to a future that begins by erasing mine."
   - `NER-FIN-W06` NARRATOR: She does not treat the question as a joke, and she does not agree. The possibility of speaking honestly again remains, but the answer today is no.
   - **Narrative outcome ID:** `NER-FIN-O-PENDING`.
3. `NER-FIN-C1-SACRIFICE` **Wrong; no new heart loss; ten hearts and marriage retry pending.** PLAYER: "I'll abandon everything above the water for you. We'll never have to think about the surface again."
   - `NER-FIN-P01` NERELLE [WORRIED]: "You'd give up your entire life because you think I need you to?"
   - `NER-FIN-P02` PLAYER: "That's what devotion is, isn't it?"
   - `NER-FIN-P03` NERELLE [NEUTRAL]: "No. Not for me. I want both of us to remain people with lives and choices, not to become proof that love requires disappearance."
   - `NER-FIN-P04` NARRATOR: The tide moves softly between the quay stones. She leaves you with an honest refusal and the chance to ask with a different understanding.
   - **Narrative outcome ID:** `NER-FIN-O-PENDING`.

**END `NER-FIN-01`:** This is an *embedded stage of the originating encounter*, not a second encounter. Persist both scene positions and staged choices. On success atomically commit the heart-earning origin's rewards, terminal-success status, ending-gallery unlock, encounter usage, journal, and time/terminal resolution, then show the epilogue. On either wrong choice commit the origin's earned heart outcome to 20 half-heart units, record full final seen and retry pending, use the single action slot/daily encounter, and advance time. If that advance expires Day 28, commit failure instead of offering an impossible future retry. No separate action or second journal entry is permitted for this linked stage. Nerelle stays mermaid in every branch; the proposed transformation is an **incorrect player suggestion, not a possible power or outcome**.

---

## G. Scene 6 — A Future She Chooses follow-up (marriage retry)

**Scene ID:** `NER-FIN-RETRY-01`  
**Type:** Mandatory brief final retry, repeatable.  
**Eligibility:** Midpoint complete; 20 committed half-hearts; first full final already shown; marriage retry pending; currently Nerelle's scheduled eligible slot with unused daily encounter; no other scene pending.  
**Location:** Nerelle's scheduled **Moonwater Quay** or **Royal Gardens canal** waterside position. She is in water throughout.  
**Dramatic objective:** Reaffirm her own future and let the protagonist offer a sincere equal partnership without replaying the full confession.

- `NER-FR-001` NERELLE [NEUTRAL]: "I've thought about what you asked. I don't want you to mistake my answer for a puzzle with a secret password."
- `NER-FR-002` PLAYER: "You wanted us to make a life together without changing who either of us is."
- `NER-FR-003` NERELLE [WORRIED]: "Yes. I can make room for love. I cannot promise that my work, my home, and my own choices will vanish."
- `NER-FR-004` NARRATOR: The water ripples against the quay. She waits, not impatiently, but unwilling to answer a proposal she cannot recognize as hers.

**Choice point `NER-FR-C1`:**

1. `NER-FR-C1-PARTNER` **Correct; terminal success; no heart change.** PLAYER: "I love you as you are. I want to marry you and plan a future we both choose, with room for your home and responsibilities and room for mine. Can we keep making those choices together?"
   - `NER-FR-S01` NERELLE [SURPRISED]: "That's the future I was trying to describe."
   - `NER-FR-S02` PLAYER: "This time I actually listened."
   - `NER-FR-S03` NERELLE [PLAYFUL]: "I'll make a note of this historic event."
   - `NER-FR-S04` NERELLE [NEUTRAL]: "Yes, {PLAYER}. Let's choose it together."
   - `NER-FR-S05` NARRATOR: She holds your hand across the waterline. Nothing needs to change shape for the answer to count.
   - **Narrative outcome ID:** `NER-FIN-O-MARRIED`.
2. `NER-FR-C1-CONTROL` **Wrong; keep ten hearts and pending retry.** PLAYER: "If we marry, I can take responsibility for all the plans. You wouldn't have to worry about making choices anymore."
   - `NER-FR-W01` NERELLE [ANNOYED]: "I appreciate help. I have no intention of retiring from having a will of my own."
   - `NER-FR-W02` PLAYER: "I was trying to spare you stress."
   - `NER-FR-W03` NERELLE [NEUTRAL]: "Then begin by trusting me to say when I need help. Please ask again when you mean that."
   - **Narrative outcome ID:** `NER-FIN-O-PENDING`.

**END `NER-FIN-RETRY-01`:** Each retry is a **new** one-slot, one-daily-encounter action with one journal entry and **zero** heart change. Success records terminal marriage and unlocks `NER-EPI-01`; a wrong retry keeps the pending final state for another eligible day unless expiration ends the run in failure. Never replay `NER-FIN-01` after its first presentation.

---

## H. Scene 7 — Marriage epilogue: A Future She Chooses

**Scene ID:** `NER-EPI-01`  
**Type:** Nerelle terminal-success presentation; no additional action or encounter.  
**Eligibility:** Authoritative Nerelle success transaction committed and Nerelle ending already unlocked in the gallery. Read-only replay may later show the epilogue without any gameplay changes.  
**Location:** **Moonwater Quay**, where sea guests gather in the water and surface guests on the quayside. An optional cut to the **Royal Gardens canal** shows the couple sharing a quiet moment; both are approved existing locations. Nerelle never leaves the water.  
**Dramatic objective:** Show a practical, joyful, chosen partnership without a transformation, abdication, or claim that sea and surface differences are permanently solved.

- `NER-EPI-001` NARRATOR: The quay looks unusually dignified. Pearl-colored ribbons hang above the water; strings of floating lanterns mark the clear channel where ocean guests arrive, while land guests gather safely along the stone railings.
- `NER-EPI-002` NARRATOR: Someone has produced a seating chart for a celebration in which half the attendees do not require seats. It is being revised with increasing desperation.
- `NER-EPI-003` PLAYER: "I think the seating chart has declared war on geometry."
- `NER-EPI-004` NERELLE [PLAYFUL]: "I've told them three times that the currents are not assigned tables."
- `NER-EPI-005` NARRATOR: Nerelle waits at the waterline in the same pearl-and-ocean-blue royal outfit she chose to wear, her single teal tail moving quietly beneath the surface. No spell changes her form, and nobody asks her to leave her home behind.
- `NER-EPI-006` NERELLE [NEUTRAL]: "I have an announcement before we begin. I've arranged my responsibilities with the council. I'll continue to serve the ocean court and to make journeys when I choose."
- `NER-EPI-007` NARRATOR: A murmur rises from the sea guests. A stern-looking court official takes out a list, hesitates, then adds a new heading: *Arrangements Actually Discussed With the Princess.*
- `NER-EPI-008` NERELLE [PLAYFUL]: "I see reform is already spreading."
- `NER-EPI-009` PLAYER: "Should I give a speech about our unprecedented cross-cultural scheduling achievements?"
- `NER-EPI-010` NERELLE [SURPRISED]: "You prepared a speech?"
- `NER-EPI-011` PLAYER: "Only twelve pages. I cut the appendix."
- `NER-EPI-012` NERELLE [PLAYFUL]: "How merciful."
- `NER-EPI-013` NARRATOR: When the formal promises begin, neither speaks about surrender. They speak about asking, listening, remaining honest, and finding each other across the places where land and sea meet.
- `NER-EPI-014` NERELLE [NEUTRAL]: "I choose you, {PLAYER}. I choose my people, my home, and the questions I haven't asked yet. Thank you for never making me pretend those choices cancel one another."
- `NER-EPI-015` PLAYER: "I choose you, Nerelle. And I hope you keep telling me when I'm wrong about a current."
- `NER-EPI-016` NERELLE [PLAYFUL]: "Then we should enjoy a long marriage. You're wrong about currents quite often."
- `NER-EPI-017` NARRATOR: Later, beside the Gardens canal, Nerelle drifts at ease in the water while you sit on the bank. Beyond you the kingdom remains complicated, beautiful, and unfinished.
- `NER-EPI-018` PLAYER: "Do you think we planned enough?"
- `NER-EPI-019` NERELLE [NEUTRAL]: "Enough to begin. We can decide the rest together."
- `NER-EPI-020` NARRATOR: The water carries the reflection of two figures toward the open channel. Neither has to become the other to share a future.

**END `NER-EPI-01`:** Presentation only, with no additional heart change, stat change, encounter usage, journal action, gallery increment, or in-game time advancement. The already committed successful route is the authority. Safe to re-view from the ending gallery. The sea court and surface communities remain part of Nerelle's ongoing life; no transformation, new world map, or future child count is declared canon.

---

## I. Cross-scene continuity and implementation-facing editorial notes (not code)

1. **Scene priority:** If a first or repeat final proposal is pending, it supersedes all other princess interactions. At five hearts with midpoint incomplete, mandatory midpoint supersedes optional/ordinary meetings; insufficient stats make the attempt free-blocked. Otherwise the player may choose a currently eligible optional event instead of an ordinary meeting. No event is automatically required for success.
2. **Pre/post stage boundaries:** `NER-EVT-PRE-01` is missable after the five-heart gate and impossible after milestone completion. `NER-EVT-POST-01` requires the completed midpoint and is unavailable once ten hearts or marriage retry is pending. Completion of optional content never acts as a midpoint/final prerequisite.
3. **Safe staging:** No visible rewards or stat changes are authoritative until the parent action commits. A player refreshing during `NER-FIN-01` after originating from `NER-EVT-POST-01` must resume both the linked final scene and its staged optional-heart outcome; optional event is not re-entered separately.
4. **Nerelle remains aquatic:** Words like *reach*, *turn*, *wait*, *follow a waterway*, or *hold a hand* never imply legs or shore-based locomotion. The protagonist remains on the bank, pier, bridge, or quay. A named location is always the Moonwater Quay or the Royal Gardens canal, with no underwater-palace detour.
5. **No hidden reward system:** Narrative outcome IDs support continuity in later routine dialogue only. They do not grant special items, reputation, money, resources, combat bonuses, extra action slots, time discounts, or alternative success requirements.
6. **Use of authored dialogue:** Individual line IDs remain stable across approved revisions unless a migration is explicitly planned. A player-facing name placeholder is text, not HTML. No runtime AI text generation.
7. **Normal conversations remain separately delegated:** This packet authors the seven pivotal Nerelle scene units. The previously approved six unique plus three fallback ordinary conversations per stage are still outside this package and must be delivered as static authored data under the content bible and editorial review.
8. **No shared-scene approval implied:** `CORE-PRO-01` and `CORE-FAIL-01` are shared cross-route scenes excluded from Tavri's character-specific reference freeze. This package does not edit, replace, or approve either of those scenes.

## J. Editorial review and mechanical acceptance checklist

### Narrative acceptance

- [ ] The seven scenes are complete and Tonally distinct from Tavri's theatrical comedy; Nerelle uses dry observation and thoughtful autonomy.
- [ ] All mandatory story beats are understandable without either optional event.
- [ ] The midpoint correct answer supports Nerelle's own safe, negotiated plan, including her existing court responsibilities.
- [ ] The first final scene permits Nerelle to state her future before the protagonist proposes; the correct response respects it.
- [ ] Incorrect pivotal answers have clear reasons for failure without an unapproved heart penalty.
- [ ] No scene includes land transformation, swimming without water, an additional hub location, or new stat/resource systems.
- [ ] Every Mermaid `NERELLE` line uses one of the five approved expressions.
- [ ] Incomplete scene re-entry and final-triggered optional encounter are fully specified without a second action charge.

### Content-integrity acceptance

- [ ] All seven required scene IDs exist exactly once and are unique.
- [ ] All dialogue/narration line identifiers are unique across the whole package.
- [ ] All choice identifiers are unique, and each choice states a clear branch and consequence.
- [ ] Every branch has terminal or explicit scene-continuation instructions; no fall-through between choices.
- [ ] All referenced narrative outcome IDs and location names are valid.
- [ ] Every completed action produces one journal record, subject to the global game-state spec.
- [ ] Confirm the committed midpoint gate, optional-event flags, final retry state, and gallery changes in independent transition tests later.

### Content approval boundary

This packet is **submitted for review**. It is not canon until approved. Nerelle's canonical visual sheet and bible are *already approved*; this narrative packet's approval is separate. The full production expression sprites and *Forbidden Journey* illustration have **not** been created or approved. No Goldfish implementation is authorized by approval of this document alone.

## K. Specific editorial decisions to review

1. **Forbidden Journey framing:** It is a personally chosen trip along already-established waterways and adjacent surface walkways, not an unauthorized crossing into a new map area. Does this sufficiently convey the sense of a journey and her growing autonomy?
2. **Moonwater Festival:** It takes place at existing water-accessible areas, and its outcome changes only hearts and an experienced flag. Are its festival customs and jokes consistent with the character and setting you want?
3. **Proposal refusal:** The incorrect suggestion that Nerelle acquire legs is explicitly rejected; no transformation mechanic or narrative future is introduced. Is that sufficiently clear without feeling too on-the-nose?
4. **Epilogue:** Marriage is celebrated at Moonwater Quay with land guests and sea guests meeting at the waterline. Nerelle retains royal duties and her permanent mermaid form. Does this resolve the arc without claiming the logistics of their future have been magically solved?

**Review status:** Editorial draft, not an implementation specification. Human approval of the text, identities, and branches is required before content freeze.
