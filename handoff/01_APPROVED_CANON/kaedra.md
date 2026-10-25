# Gate 2 — Kaedra Narrative Package v0.1

**Status:** DRAFT FOR HUMAN EDITORIAL REVIEW — NOT YET APPROVED.  
**Canonical character reference:** User-approved `Kaedra_Gate2_Character_Bible_Candidate_v0.2.md` and `Kaedra_Gate2_Character_Sheet_Candidate_v0.2.png` (the **crimson-haired, horned, winged dragon-human** concept), along with Gate 1's 144 approved numbered decisions and derived rules. The character bible retains its earlier candidate-status header as source history; the user's subsequent approval governs its status.  
**Scope:** Exactly **seven Kaedra-specific pivotal scene units**, containing complete authorial dialogue and narration, stable line IDs, stable choice IDs, unambiguous branch outcomes, and scene-transition rules. There are **no production sprites, implementation code, or shared prologue/failure-ending approvals** in this package.  
**Editorial theme:** The Feared Guardian — a capable, protective princess whom people treat as frightening or invulnerable learns that accepting affection does not require surrendering power. The protagonist's correct choices respect her autonomy, protect other people when necessary, and offer partnership rather than worship or management.

## A. Authoritative continuity and mechanical boundaries

### A1. Identity and visual cues

Kaedra is **26**, a dragon-human princess with **long deep-crimson hair, amber-gold eyes, two curved dark bronze-black horns, matte scales at the shoulders/forearms, one ridged deep-crimson dragon tail, and folded leathery wings**. Her adult build is tall-seeming, athletic, and composed. She wears a **black-and-garnet royal guardian armor-gown with antique bronze details**. This is formal attire, not equippable equipment. She is direct, dryly funny, publicly intimidating, and privately attentive. An outwardly formidable posture may soften; her horns, wings, tail, outfit, species, and abilities do **not** transform over the route.

Use only five approved portrait expression categories, in stable cue tokens: `NEUTRAL`, `PLAYFUL`, `WORRIED`, `ANNOYED`, and `SURPRISED`. These are **references to planned assets**, not new sprite approvals. Optional textual directions about folded wings or tail posture never communicate essential meaning alone; all important meaning must appear in accessible dialogue or narration. No flight, full-dragon form, combat, new magic meter, equippable armor, court reputation system, or new locations are implied.

### A2. Schedule and location restrictions

Kaedra's fixed weekly availability repeats through four Monday–Sunday weeks:

| Day | Scheduled encounter slots | Scheduled encounter location |
|---|---|---|
| Tuesday | Morning / afternoon | Adventurers' Guild |
| Wednesday | Afternoon / evening | Palace Court |
| Thursday | Morning / afternoon | Adventurers' Guild |
| Saturday | Afternoon / evening | Royal Gardens |
| Sunday | Afternoon / evening | Palace Court |

Monday and Friday are unavailable. Only **one princess interaction per day** is allowed. Every encounter costs **one action slot** and the daily princess interaction, with all travel/return included. The Royal Trial is **at the existing Palace Court**; if invoked from a scheduled Guild or Gardens encounter, its event-specific transition to the Palace Court is contained inside the same one-slot encounter under D-074, never an extra trip, slot, or map node. Other scenes use the player's scheduled encounter location or an explicitly noted existing location within the same scripted scene. Scenes must not depend on daylight or nighttime (where lighting matters, descriptions are conditional on the actual slot).

### A3. Stats, hearts, and story gates

- Mandatory midpoint **Strength ≥ 6 and Intelligence ≥ 4**, at exactly **five displayed hearts / `heartsHalf = 10`**; unmet visible requirements block encounters **for free** until met. A wrong midpoint choice consumes one encounter with **zero** heart change and enables a shorter retry on a **later eligible day**. Success permanently sets the milestone flag.
- **Prince's Fashion Challenge**: optional **pre-midpoint**, hidden **Strength ≥ 3** threshold; may be experienced once when committed hearts are below five and midpoint incomplete. It is lost when the five-heart gate takes priority or the story stage ends.
- **Monster Reputation Rumor**: optional **post-midpoint**, hidden **Kindness ≥ 3** threshold; one experience, irrelevant to standard marriage eligibility, can occur while committed hearts are below ten and no final retry is pending.
- Optional events have one net heart outcome only: **correct +2** half-heart units (+1 displayed heart); **ordinary wrong +1** (+0.5 displayed heart); **explicitly offensive −1** (−0.5 displayed heart). Clamp hearts at the correct 0–20 range, and while midpoint incomplete cap gains at 10; excess is discarded. Optional events change no stats, equipment, challenges, ending requirements, or reputations. Their chosen *narrative outcome IDs* may support optional later dialogue callbacks without altering mechanics.
- The first marriage dialogue, **Private Vow**, opens immediately if the projected result of **any eligible heart-earning** ordinary or optional encounter reaches 20 half-heart units after midpoint completion. This is a linked stage of **one pending encounter transaction**, not an additional action or visit.
- The full final scene is shown once. A wrong final choice records 10 committed hearts and final retry pending, **no additional penalty**, consumes the originating encounter, and requires a later eligible day. An incorrect last-evening final choice resolves to terminal failure before creating a playable Day 29. The concise retry may repeat. The wedding epilogue is free presentation of an already committed successful ending.
- All scenes and choices are **static authored content**. No runtime language model, random branching, romance advantage from preferred training activities, or conditional required information from optional events.

### A4. Dialogue and action convention

- Every spoken/narration bullet has an immutable ID starting `KAE-`. `KAEDRA [EXPRESSION]`, `PLAYER`, `NARRATOR`, and named non-romance supporting characters mark speakers. `{PLAYER}` is the safely rendered 1–24-grapheme chosen protagonist name, or `Traveler` if skipped. The protagonist is a transported software engineer with a poor job market; no scene presupposes that any particular training action or optional event occurred.
- Every choice point (`KAE-...-C1`) contains an **explicit** selected option ID and corresponding authored branch lines. Exactly **one** branch plays. The scene terminates at its branch's stated transition; branch content must **not** fall through into other options.
- Only the identified *decisive choice* affects the encounter's net heart result, midpoint outcome, or final result. Other dialogue and line advances do not apply additional rewards or costs.
- Save the current scene/stage position and any staged choices during an unfinished encounter. Commit the complete gameplay result, flags, action-slot advance, daily-usage marker, and **one journal entry** atomically at encounter resolution. The epilogue contributes none of these again.
- Story scenes never introduce standalone action costs. Read-only menus and Humpty Help remain free. An invalid choice ID is rejected without time, relationship, or journal effects; a valid authored incorrect choice is **not** an invalid command.

---

## B. Scene 1 — Prince's Fashion Challenge

**Scene ID:** `KAE-EVT-PRE-01`  
**Type:** Optional pre-midpoint, first completed attempt marks experienced whether successful or not.  
**Eligibility:** Kaedra route selected; milestone incomplete; committed hearts below 5; Strength ≥ 3; unused event flag; today's scheduled Kaedra slot and interaction unused; no pending encounter.  
**Location:** Kaedra's **currently scheduled** Adventurers' Guild, Palace Court, or Royal Gardens location. A royal prince's outfit demonstration travels as a scripted entourage to the scheduled setting; it creates no new destination, battle, outfit item, purchase, or fashion minigame.  
**Objective:** Show that Kaedra can be quietly funny, that courtiers mistake her silence for threat, and that the protagonist can support her without casting her as a spectacle.

- `KAE-PRE-001` NARRATOR: A royal prince has arranged a traveling display of ceremonial cloaks. He is loudly explaining why an embroidered cape should be classified as an emergency public service.
- `KAE-PRE-002` PRINCE: "The garment makes a statement. Ideally, the statement is *behold my significance*."
- `KAE-PRE-003` KAEDRA [NEUTRAL]: "My own cape makes a statement too. It says *someone forgot to account for door handles*."
- `KAE-PRE-004` PLAYER: "You sound experienced."
- `KAE-PRE-005` KAEDRA [PLAYFUL]: "I once disabled an entire banquet by turning around too quickly. The curtains fell. Three ministers interpreted it as a declaration of war."
- `KAE-PRE-006` NARRATOR: The prince freezes in admiration. A guard behind him inches toward a convenient pillar.
- `KAE-PRE-007` PRINCE: "Princess Kaedra! A demonstration from our most formidable guest would lend tremendous prestige. Perhaps you could look terrifying while wearing the silver mantle?"
- `KAE-PRE-008` KAEDRA [ANNOYED]: "Does the mantle require anyone to look terrified, or merely the audience?"
- `KAE-PRE-009` PRINCE: "Whichever photographs better."
- `KAE-PRE-010` NARRATOR: A few spectators wait for Kaedra to explode. She doesn't. One wing settles against her back; the tense silence is otherwise broken only by a tailor dropping a pin.
- `KAE-PRE-011` KAEDRA [NEUTRAL]: "I was invited to assess whether the formal fasteners are safe. They are not. The weight is pulling on the collar."
- `KAE-PRE-012` PLAYER: "And the prince wants you to model it?"
- `KAE-PRE-013` KAEDRA [PLAYFUL]: "He believes my face could frighten the stitching into cooperation."
- `KAE-PRE-014` NARRATOR: Kaedra glances toward you, her expression composed. She has made it clear she would rather be heard than displayed.

**Choice point `KAE-PRE-C1` — select exactly one:**

1. `KAE-PRE-C1-RESPECT` — **Correct; net +2 half-hearts.**  
   PLAYER: "You were asked for your judgment, not to serve as a scary decoration. Want me to help make sure they hear the safety issue?"
   - `KAE-PRE-S01` KAEDRA [SURPRISED]: "You heard the part about the collar."
   - `KAE-PRE-S02` PLAYER: "I also heard the part about the curtains. That's a separate safety issue."
   - `KAE-PRE-S03` KAEDRA [PLAYFUL]: "Correct. We should not confuse the two departments."
   - `KAE-PRE-S04` NARRATOR: Kaedra explains the flawed clasp without raising her voice. The tailor fixes it; the prince announces the resulting adjustment as the latest court trend.
   - `KAE-PRE-S05` KAEDRA [NEUTRAL]: "Thank you. I can speak for myself. It helped that you gave me room to do it."
   - **Narrative outcome ID:** `KAE-PRE-O-RESPECTED`.
2. `KAE-PRE-C1-JOKE` — **Ordinary incorrect; net +1 half-heart.**  
   PLAYER: "You should wear the cape and show them your legendary terrifying pose. At least it would be funny."
   - `KAE-PRE-W01` KAEDRA [NEUTRAL]: "It might be funny for you."
   - `KAE-PRE-W02` PLAYER: "I thought you liked jokes."
   - `KAE-PRE-W03` KAEDRA [WORRIED]: "I do. I prefer knowing I am in on them."
   - `KAE-PRE-W04` NARRATOR: She quietly takes the loose clasp to the tailor herself. The display proceeds, but she offers you no further performance.
   - **Narrative outcome ID:** `KAE-PRE-O-PERFORMED`.
3. `KAE-PRE-C1-FEAR` — **Explicitly offensive; net −1 half-heart.**  
   PLAYER: "They should be afraid of you. Threaten the prince until he does what you say. That's what you're good at."
   - `KAE-PRE-X01` KAEDRA [ANNOYED]: "No. I am good at making sure nobody has to be afraid."
   - `KAE-PRE-X02` PLAYER: "That wasn't what I meant."
   - `KAE-PRE-X03` KAEDRA [NEUTRAL]: "It was what you asked me to do. Please remember the difference."
   - `KAE-PRE-X04` NARRATOR: She turns back to the tailor and ends the conversation without another word.
   - **Narrative outcome ID:** `KAE-PRE-O-FEARED`.

**END `KAE-EVT-PRE-01`:** Mark experienced exactly once regardless of choice; apply exactly one net half-heart result, respecting the five-heart gate; consume one slot and one Kaedra interaction; append one journal entry. The prince, costumes, and clasps are scene dressing only. If hearts reach five, the midpoint becomes pending for a **later eligible day**, not a second encounter immediately.

---

## C. Scene 2 — The Royal Trial (first full midpoint attempt)

**Scene ID:** `KAE-MID-01`  
**Type:** Mandatory five-heart midpoint, first full presentation exactly once.  
**Eligibility:** Milestone incomplete; **committed hearts exactly five**; **Strength ≥ 6 and Intelligence ≥ 4**; Kaedra's scheduled eligible slot; unused daily encounter; no current pending encounter. Inadequate stats cause a free visible lock, never an attempt or time charge.  
**Location:** **Palace Court**, with any event-specific narrative relocation from that day's regular encounter location contained in the same slot. A recessed arch at the Palace Court is a storytelling subsection, not a new selectable map location.  
**Objective:** During a formal demonstration, a **small unexpected magical flare** startles nearby people. The correct choice first ensures bystander safety and then comforts Kaedra privately, acknowledging her competence and her fear of being remembered only as dangerous. No fight, rescue minigame, catastrophe, magic-stat upgrade, or power loss.

- `KAE-MID-001` NARRATOR: The Palace Court has arranged a formal ceremony called the Royal Trial. Its stated purpose is to recognize the kingdom's guardians. Its unofficial purpose appears to be finding out how much bronze can fit on a podium.
- `KAE-MID-002` KAEDRA [NEUTRAL]: "This is the sixth speech praising my ability to stand still. I fear my greatest talent has been misidentified."
- `KAE-MID-003` PLAYER: "Do they know you have others?"
- `KAE-MID-004` KAEDRA [PLAYFUL]: "One day, I may demonstrate sitting."
- `KAE-MID-005` NARRATOR: A herald invites Kaedra to lift a ceremonial warding sigil above the platform. Its light is meant to be symbolic, a brief ceremonial flourish.
- `KAE-MID-006` HERALD: "A gentle flame, Your Highness. Just enough for the audience to admire the court's protection."
- `KAE-MID-007` KAEDRA [NEUTRAL]: "Understood. Keep the aisle clear."
- `KAE-MID-008` NARRATOR: Kaedra raises one hand. A narrow band of amber light traces the sigil—then an unexpected spark snaps sideways and pops against the empty edge of the stone platform.
- `KAE-MID-009` NARRATOR: Nobody is struck. A nearby attendant flinches, and several people crowd toward the same exit, tripping over one another in their hurry. The spark dies before it can reach the banners.
- `KAE-MID-010` HERALD: "Remain calm! Please move away from the platform in an orderly—oh dear, that's my shoe."
- `KAE-MID-011` KAEDRA [SURPRISED]: "That was not the pattern I intended."
- `KAE-MID-012` NARRATOR: Kaedra lowers her hand at once and extinguishes the sigil. Her wings stay folded. You can see that her immediate attention is on the crowded aisle, not her own embarrassment.
- `KAE-MID-013` PLAYER: "The spark is out. People are bunching up by the doorway."
- `KAE-MID-014` KAEDRA [WORRIED]: "Yes. They saw it. They saw me lose control for a moment."
- `KAE-MID-015` NARRATOR: The situation is small but real: frightened people need a clear exit, and Kaedra needs the dignity of being treated as a responsible person rather than a spectacle.

**Choice point `KAE-MID-C1` — mandatory decisive answer:**

1. `KAE-MID-C1-SAFETY` — **Correct; midpoint completed; zero heart change.**  
   PLAYER: "Let's give everyone room and ask the attendants to clear the aisle. Your magic is already stopped. Once they're safe, can we talk somewhere quiet?"
   - `KAE-MID-S01` KAEDRA [SURPRISED]: "Yes. Tell the herald the side aisle is clear. I'll check the platform."
   - `KAE-MID-S02` NARRATOR: You help direct the crowd away from the platform while the attendants open an unobstructed route. Kaedra verifies the sigil is extinguished and that nobody is hurt. The remaining onlookers settle.
   - `KAE-MID-S03` HERALD: "The ceremony has concluded. Perhaps we will resume the speeches after an interval of several years."
   - `KAE-MID-S04` NARRATOR: Later, beneath an arch **within Palace Court**, Kaedra stands with her arms folded, not to threaten anyone but to steady herself.
   - `KAE-MID-S05` KAEDRA [WORRIED]: "When the spark went sideways, I knew how to stop it. I also knew what everyone would think. That I had finally become the danger they expected."
   - `KAE-MID-S06` PLAYER: "The spark was unexpected. You stopped it, checked on people, and took responsibility. You can be shaken by that without it defining you."
   - `KAE-MID-S07` KAEDRA [NEUTRAL]: "They ask me to be a shield. A shield, apparently, is never permitted to be frightened."
   - `KAE-MID-S08` PLAYER: "A person can protect other people and still need somewhere safe to speak honestly."
   - `KAE-MID-S09` KAEDRA [WORRIED]: "I was afraid you'd admire the spectacle. Or come here to tell me I need protecting from myself."
   - `KAE-MID-S10` PLAYER: "I came because I care what you're feeling. You decide what happens next."
   - `KAE-MID-S11` NARRATOR: The muscles around her jaw loosen. She exhales, long and slow, no longer measuring every breath against a watching court.
   - `KAE-MID-S12` KAEDRA [PLAYFUL]: "That is an alarmingly sensible answer. I may be forced to invite you to future ceremonies as a precaution."
   - `KAE-MID-S13` PLAYER: "Does it come with fewer speeches?"
   - `KAE-MID-S14` KAEDRA [NEUTRAL]: "No promises I cannot keep. But I could ask you to stay a little longer."
   - **Narrative outcome ID:** `KAE-MID-O-TRUST`.
2. `KAE-MID-C1-ADMIRE` — **Incorrect; zero heart change; retry later.**  
   PLAYER: "That flare was incredible. Forget the crowd—show them an even bigger one and they'll respect you."
   - `KAE-MID-W01` KAEDRA [ANNOYED]: "No. A frightened crowd is not an audience I need to impress."
   - `KAE-MID-W02` NARRATOR: She asks the attendants to keep people clear and checks the platform herself. When she returns, her voice is cool.
   - `KAE-MID-W03` KAEDRA [NEUTRAL]: "Please don't mistake the power to frighten people for the wish to do it."
   - `KAE-MID-W04` PLAYER: "I was trying to support you."
   - `KAE-MID-W05` KAEDRA [WORRIED]: "Then perhaps next time we could begin by listening."
   - **Narrative outcome ID:** `KAE-MID-O-SPECTACLE`.
3. `KAE-MID-C1-MANAGE` — **Incorrect; zero heart change; retry later.**  
   PLAYER: "You should stand down and let me decide when it's safe for you to use magic again."
   - `KAE-MID-X01` KAEDRA [ANNOYED]: "You do not become responsible for me by declaring yourself in charge."
   - `KAE-MID-X02` NARRATOR: Kaedra turns to the trained court attendants, ensuring the exit is clear and the sigil remains extinguished.
   - `KAE-MID-X03` KAEDRA [NEUTRAL]: "I can account for what happened. You can help people without taking away my decisions."
   - `KAE-MID-X04` PLAYER: "You're right. I spoke for you."
   - `KAE-MID-X05` KAEDRA [WORRIED]: "Then please think about why."
   - **Narrative outcome ID:** `KAE-MID-O-CONTROLLED`.

**END `KAE-MID-01`:** Always one slot, one daily princess interaction, and one action-level journal entry; **no hearts change**. Correct completes the mandatory midpoint permanently and unlocks post-midpoint stage. Either wrong outcome sets midpoint retry pending. The full Royal Trial cannot repeat in the same run. The crowd is settled by the court even on failed player answers; the player does not get an extra safety command or minigame.

---

## D. Scene 3 — The Royal Trial follow-up (midpoint retry)

**Scene ID:** `KAE-MID-RETRY-01`  
**Type:** Mandatory brief retry after a failed first midpoint (or another failed retry).  
**Eligibility:** First Royal Trial experienced but midpoint not complete; hearts remain five; required stats still satisfied; later scheduled day, unused princess encounter and no pending action.  
**Location:** Kaedra's currently scheduled Guild, Palace Court, or Gardens meeting location. No return to the full Royal Trial or re-enactment of the flare.  
**Objective:** Give the protagonist one meaningful opportunity to correct the mistake by acknowledging Kaedra's safety work and respecting her autonomy.

- `KAE-MR-001` NARRATOR: Kaedra recognizes you before you speak. She gives a small nod, then waits. Whatever she wants to hear, she is not going to write it for you.
- `KAE-MR-002` KAEDRA [NEUTRAL]: "The court repaired the sigil. The herald has proposed banning speeches over forty pages. Progress comes in strange forms."
- `KAE-MR-003` PLAYER: "I've been thinking about the trial."
- `KAE-MR-004` KAEDRA [WORRIED]: "So have I. I needed help making space for people to leave—and someone who could see I was frightened without deciding what that made me."
- `KAE-MR-005` NARRATOR: She doesn't look away. This time she is giving you the chance to answer plainly.

**Choice point `KAE-MR-C1`:**

1. `KAE-MR-C1-RECOGNIZE` — **Correct; complete midpoint; zero heart change.**  
   PLAYER: "I missed what mattered. You made the magic safe and cared for everyone, and I should have helped make room for them. I'm sorry I treated your feelings or choices as less important. If you'll let me, I'd like to listen now."
   - `KAE-MR-S01` KAEDRA [SURPRISED]: "You came back to say that without an audience."
   - `KAE-MR-S02` PLAYER: "I thought you'd prefer fewer witnesses."
   - `KAE-MR-S03` KAEDRA [PLAYFUL]: "An excellent first observation. Keep making them."
   - `KAE-MR-S04` NARRATOR: She reaches out and rests her hand lightly against yours. There is strength in the gesture, and deliberate gentleness.
   - `KAE-MR-S05` KAEDRA [NEUTRAL]: "I would like to speak with you again. Not as the court's guardian. As myself."
   - **Narrative outcome ID:** `KAE-MR-O-TRUST`.
2. `KAE-MR-C1-EXCUSE` — **Incorrect; zero heart change; another later retry allowed.**  
   PLAYER: "Everyone overreacted. You shouldn't have felt bad. Can we forget the whole thing?"
   - `KAE-MR-W01` KAEDRA [NEUTRAL]: "I don't need permission to be upset."
   - `KAE-MR-W02` PLAYER: "I thought I was helping."
   - `KAE-MR-W03` KAEDRA [WORRIED]: "Helping might begin with allowing me to tell you what hurt."
   - `KAE-MR-W04` NARRATOR: The conversation ends respectfully, but she is not ready to call the matter settled.
   - **Narrative outcome ID:** `KAE-MR-O-DISMISSED`.

**END `KAE-MID-RETRY-01`:** One action slot, one daily princess interaction, one journal entry, zero heart change. Incorrect replies keep the short retry pending until a later eligible encounter or deadline failure. Correct replies complete the midpoint; never replay the full original Royal Trial.

---

## E. Scene 4 — Monster Reputation Rumor

**Scene ID:** `KAE-EVT-POST-01`  
**Type:** Optional post-midpoint, once per run.  
**Eligibility:** Mandatory midpoint complete, Kindness ≥ 3, committed hearts below 10, no final retry pending, unused event flag, scheduled Kaedra slot/day, and no pending encounter. An already completed midpoint does not reset if later hearts drop below five.  
**Location:** Kaedra's scheduled Guild, Palace Court, or Royal Gardens location; a passerby and a small creature appear as scripted scenery, not new map nodes or combat content.  
**Objective:** Expose how rumors turn her into a monster and show that her protective response is gentle without making her a helpless victim or requiring the player to save her reputation.

- `KAE-POST-001` NARRATOR: A young messenger whispers urgently to a nearby court attendant. Whatever has been seen, the account grows two extra horns by the time it reaches the third listener.
- `KAE-POST-002` MESSENGER: "A monster was seen near the royal paths. Great armored back, enormous claws, impossible stare. The princess was nearby!"
- `KAE-POST-003` KAEDRA [NEUTRAL]: "I have only the usual number of horns. Please keep that part accurate."
- `KAE-POST-004` PLAYER: "What did they actually see?"
- `KAE-POST-005` NARRATOR: A small, moss-backed garden creature emerges from behind a low step, carrying a fallen blossom on its head like a ceremonial crown. It has no weapon and appears mainly interested in a patch of shade.
- `KAE-POST-006` KAEDRA [SURPRISED]: "Oh. There you are."
- `KAE-POST-007` MESSENGER: "You know it?"
- `KAE-POST-008` KAEDRA [NEUTRAL]: "It lives near the gardens. It once stole a judge's lunch and left the plate very clean. The court considers this an act of political commentary."
- `KAE-POST-009` PLAYER: "Is it dangerous?"
- `KAE-POST-010` KAEDRA [PLAYFUL]: "Only to unattended sandwiches."
- `KAE-POST-011` NARRATOR: The creature steps toward a busy walkway. Kaedra calmly asks people to give it room and points out the shaded route back to its usual resting place. Nobody needs to draw a weapon.
- `KAE-POST-012` MESSENGER: "So there was no monster attack."
- `KAE-POST-013` KAEDRA [NEUTRAL]: "There was a rumor. People can be frightened by rumors. That part matters even when the story is foolish."
- `KAE-POST-014` NARRATOR: She watches the small creature amble off, then notices you have stayed beside her rather than joining the speculation.

**Choice point `KAE-POST-C1` — choose exactly one:**

1. `KAE-POST-C1-COMPASSION` — **Correct; net +2 half-hearts.**  
   PLAYER: "You protected the people who were scared and made room for a harmless creature. I wish they'd notice that instead of turning both of you into monsters."
   - `KAE-POST-S01` KAEDRA [SURPRISED]: "That is more or less what I was trying to do."
   - `KAE-POST-S02` PLAYER: "The sandwiches may disagree."
   - `KAE-POST-S03` KAEDRA [PLAYFUL]: "Their concerns have been entered into the record."
   - `KAE-POST-S04` NARRATOR: Kaedra smiles without glancing around to see who is watching.
   - `KAE-POST-S05` KAEDRA [NEUTRAL]: "I cannot control every story about me. But I can choose how I act. It helps to have someone notice the difference."
   - **Narrative outcome ID:** `KAE-POST-O-SEEN`.
2. `KAE-POST-C1-DISMISS` — **Ordinary incorrect; net +1 half-heart.**  
   PLAYER: "It's just a ridiculous rumor. Ignore everyone, and the whole thing will disappear."
   - `KAE-POST-W01` KAEDRA [NEUTRAL]: "It may. The fear people felt does not become unreal because its cause was mistaken."
   - `KAE-POST-W02` PLAYER: "I was trying to make it sound less serious."
   - `KAE-POST-W03` KAEDRA [WORRIED]: "Sometimes I need you to take me seriously without making me a tragedy."
   - `KAE-POST-W04` NARRATOR: She leaves the messenger to straighten the story while she returns to her duties.
   - **Narrative outcome ID:** `KAE-POST-O-DISMISSED`.
3. `KAE-POST-C1-CRUEL` — **Explicitly offensive; net −1 half-heart.**  
   PLAYER: "Why bother reassuring them? You're frightening, and so is the creature. Let the villagers be afraid."
   - `KAE-POST-X01` KAEDRA [ANNOYED]: "Fear is not a service I provide."
   - `KAE-POST-X02` PLAYER: "I didn't expect you to take offense."
   - `KAE-POST-X03` KAEDRA [NEUTRAL]: "Then you have not been paying attention."
   - `KAE-POST-X04` NARRATOR: She sees the little creature safely away and ends the conversation.
   - **Narrative outcome ID:** `KAE-POST-O-CRUEL`.

**END `KAE-EVT-POST-01`:** Mark this optional event experienced after first completed attempt, irrespective of branch. Apply exactly one relationship outcome, one action slot, one daily interaction, and one journal entry. The creature is narrative background, not a monster-fighting mechanic, companion, reward, or alternate ending. If **projected** hearts reach ten, immediately link `KAE-FIN-01` before committing the parent action.

---

## F. Scene 5 — Private Vow (first full marriage proposal)

**Scene ID:** `KAE-FIN-01`  
**Type:** Mandatory first full finale, shown once.  
**Eligibility:** Kaedra's milestone is complete; an eligible ordinary or optional encounter projects `heartsHalf = 20`; no prior full finale completed; first final is a linked stage of that pending parent encounter. A previously failed full finale uses the shorter retry on a later eligible day instead.  
**Location:** The current existing schedule location or the Royal Gardens, within the original one-slot encounter; a private space among existing garden arches or a quiet corner of the Court/Guild is scene dressing, never a new visitable location.  
**Objective:** Kaedra makes clear that she wants a companion, not a worshipper or handler. The protagonist responds with a personal, reciprocal marriage proposal. Her strength and public duties remain hers.

- `KAE-FIN-001` NARRATOR: The conversation should be ending. Kaedra stays anyway. She looks at you with the same level gaze that has silenced entire rooms, but there is no court to impress here.
- `KAE-FIN-002` KAEDRA [PLAYFUL]: "You are remarkably difficult to intimidate for someone who once described this kingdom's employment prospects as 'a hostile deployment environment.'"
- `KAE-FIN-003` PLAYER: "The description remains accurate."
- `KAE-FIN-004` KAEDRA [NEUTRAL]: "And yet you kept returning."
- `KAE-FIN-005` NARRATOR: A comfortable silence follows. Her wings remain folded, her tail resting still, and for once neither of you needs to fill the quiet with a performance.
- `KAE-FIN-006` KAEDRA [WORRIED]: "There is something I want to say before you assemble a ceremonial argument for why I'm supposed to be impressive."
- `KAE-FIN-007` PLAYER: "I had three pages prepared."
- `KAE-FIN-008` KAEDRA [PLAYFUL]: "Then we may still have time to prevent a disaster."
- `KAE-FIN-009` KAEDRA [NEUTRAL]: "I enjoy protecting people. That is not a burden I secretly want someone to lift from me. But sometimes I come home tired. Sometimes I am unsure. I want to be able to say so without a room going silent."
- `KAE-FIN-010` PLAYER: "You should be able to."
- `KAE-FIN-011` KAEDRA [WORRIED]: "I have been called a weapon, a guardian, and a legend. I would rather be someone's equal. A person they can disagree with, laugh with, and trust to make her own decisions."
- `KAE-FIN-012` NARRATOR: Kaedra reaches toward you, then stops a little short. She is not afraid of rejection because she is weak. She is afraid because this answer matters to her.
- `KAE-FIN-013` KAEDRA [NEUTRAL]: "I care for you. More than I expected. I do not need you to be fearless around me. I only need you to see me clearly."
- `KAE-FIN-014` PLAYER: "Kaedra..."
- `KAE-FIN-015` KAEDRA [PLAYFUL]: "If this is a proposal, please do not begin with a list of my strengths. I know most of them already."
- `KAE-FIN-016` NARRATOR: The three carefully rehearsed pages suddenly seem less useful than one honest sentence.

**Choice point `KAE-FIN-C1` — decisive proposal, select exactly one:**

1. `KAE-FIN-C1-EQUAL` — **Correct; terminal success and gallery unlock; zero extra heart change.**  
   PLAYER: "I love your strength, and I love the gentleness you choose when nobody is watching. You don't have to protect me from every uncertainty, and I won't try to take your decisions away. I want to share an ordinary life with you as well as the extraordinary parts. Kaedra, will you marry me—as my equal?"
   - `KAE-FIN-S01` KAEDRA [SURPRISED]: "An ordinary life?"
   - `KAE-FIN-S02` PLAYER: "Well, ordinary by this kingdom's standards. We may have to live with a few royal speeches."
   - `KAE-FIN-S03` KAEDRA [PLAYFUL]: "I can endure them if I am allowed to object to the page count."
   - `KAE-FIN-S04` NARRATOR: Her expression softens. She takes your hand, careful not to treat it as something delicate or something to hold captive.
   - `KAE-FIN-S05` KAEDRA [NEUTRAL]: "Yes, {PLAYER}. Not because you need a guardian, and not because I need someone to command my life. Because I choose you, and you have chosen me."
   - `KAE-FIN-S06` PLAYER: "I think I can live with that."
   - `KAE-FIN-S07` KAEDRA [PLAYFUL]: "Good. Your proposal passed inspection. Barely."
   - **Narrative outcome ID:** `KAE-FIN-O-YES`; **commit victory** then display `KAE-EPI-01`.
2. `KAE-FIN-C1-IDOL` — **Incorrect; no heart penalty; later retry pending.**  
   PLAYER: "You're the greatest guardian who ever lived. I'd worship you every day. Marry me and I'll never question anything you decide."
   - `KAE-FIN-W01` KAEDRA [WORRIED]: "I don't want devotion that makes you disappear."
   - `KAE-FIN-W02` PLAYER: "I thought you would appreciate being admired."
   - `KAE-FIN-W03` KAEDRA [NEUTRAL]: "Being admired is not the same as being known. I want someone who can tell me when I'm wrong."
   - `KAE-FIN-W04` NARRATOR: She gently lets go of your hand. The conversation ends, but not all hope does.
   - **Narrative outcome ID:** `KAE-FIN-O-IDOLIZED`.
3. `KAE-FIN-C1-CARETAKER` — **Incorrect; no heart penalty; later retry pending.**  
   PLAYER: "I can take over your responsibilities and keep you safe from making another mistake. Marry me and you won't have to be strong anymore."
   - `KAE-FIN-X01` KAEDRA [ANNOYED]: "You have misunderstood me. I like being strong."
   - `KAE-FIN-X02` PLAYER: "I wanted to make things easier."
   - `KAE-FIN-X03` KAEDRA [WORRIED]: "I want room to rest, not someone who takes away my life and calls it kindness."
   - `KAE-FIN-X04` NARRATOR: Kaedra steps back. She is not angry at the existence of your feelings, only at the bargain you tried to make with hers.
   - **Narrative outcome ID:** `KAE-FIN-O-MANAGED`.

**END `KAE-FIN-01`:** This finale is a **linked stage of the originating heart-earning encounter**. It uses **zero additional slots, zero additional daily interactions, and zero additional journal entries**. Staged originating hearts reach exactly ten. On correct, atomically commit parent earned hearts, successful terminal status, gallery unlock, daily-usage marker, and one parent journal entry, then present epilogue. On wrong, commit the parent's earned hearts at ten, record first finale seen and final retry pending, and resolve the parent encounter/time. An end-of-Day-28 failed first proposal yields terminal failure instead of an available retry. Never replay the full `KAE-FIN-01` after first attempt.

---

## G. Scene 6 — Private Vow follow-up (marriage retry)

**Scene ID:** `KAE-FIN-RETRY-01`  
**Type:** Mandatory short final retry after any failed marriage dialogue.  
**Eligibility:** Kaedra midpoint completed; committed hearts = ten; full `KAE-FIN-01` already seen and rejected; terminal status still active; a **later scheduled eligible day** with unused daily encounter and one available action slot; no other pending encounter.  
**Location:** Kaedra's scheduled Guild, Palace Court, or Gardens location, with privacy obtained within the same scene.  
**Objective:** Clarify the difference between partnership and idealization or control, then permit the same successful ending without replaying the original confession.

- `KAE-FR-001` NARRATOR: Kaedra greets you without a formal bow. There is relief in the familiarity, but also a question neither of you has answered yet.
- `KAE-FR-002` KAEDRA [NEUTRAL]: "I have thought about your proposal. The answer matters enough that I won't pretend we understood each other."
- `KAE-FR-003` PLAYER: "I've been thinking about it too."
- `KAE-FR-004` KAEDRA [WORRIED]: "I don't want to be a legend you kneel to. And I don't want a guardian appointed to protect me from myself. Can you see a life with the actual person standing here?"
- `KAE-FR-005` NARRATOR: She waits steadily. The silence is not a threat; it is room for you to choose your words.

**Choice point `KAE-FR-C1`:**

1. `KAE-FR-C1-PARTNER` — **Correct; terminal success; zero heart change.**  
   PLAYER: "Yes. I was wrong to make you into a symbol or someone I needed to manage. I love you as you are: capable, sometimes tired, kind, and free to make your own choices. Will you marry me, and let us build a life where we can both speak honestly?"
   - `KAE-FR-S01` KAEDRA [SURPRISED]: "You have learned to make a short speech."
   - `KAE-FR-S02` PLAYER: "I can make it longer if necessary."
   - `KAE-FR-S03` KAEDRA [PLAYFUL]: "Please don't."
   - `KAE-FR-S04` NARRATOR: She clasps your hand, smiling without the guarded formality of court.
   - `KAE-FR-S05` KAEDRA [NEUTRAL]: "Yes, {PLAYER}. I choose you. As an equal, and as myself."
   - **Narrative outcome ID:** `KAE-FR-O-YES`; commit victory and present `KAE-EPI-01`.
2. `KAE-FR-C1-REPEAT` — **Incorrect; zero heart change; repeat retry on later eligible day.**  
   PLAYER: "I can promise never to disagree with you, or I could make every decision for you. Which would you prefer?"
   - `KAE-FR-W01` KAEDRA [ANNOYED]: "Neither."
   - `KAE-FR-W02` PLAYER: "I suppose I still don't understand."
   - `KAE-FR-W03` KAEDRA [WORRIED]: "Then I would rather wait than ask either of us to live in that misunderstanding."
   - `KAE-FR-W04` NARRATOR: She ends the conversation gently. The unanswered proposal remains unanswered.
   - **Narrative outcome ID:** `KAE-FR-O-STILL-PENDING`.

**END `KAE-FIN-RETRY-01`:** Each retry is a new **one-slot, one-daily-interaction** encounter with one journal entry and **zero heart change**. Success sets terminal successful state and gallery unlock atomically, followed by epilogue presentation. Failure leaves ten hearts and retry pending for a later eligible day unless Day 28 expires, in which case terminal failure is committed. The full first proposal never repeats.

---

## H. Scene 7 — Marriage epilogue: Private Vow

**Scene ID:** `KAE-EPI-01`  
**Type:** Free presentation after committed terminal success; safe to revisit via ending gallery.  
**Eligibility:** The Kaedra route is already successful and its completed-ending gallery entry is committed.  
**Location:** Existing **Palace Court**, with a quieter final moment beside the **Royal Gardens**. This is a narrated ceremonial transition **after victory**, no gameplay slot or new map location.  
**Objective:** Conclude Kaedra's willingness to be seen as powerful and tender, preserve her independent guardian responsibilities, and end with a restrained joke.

- `KAE-EPI-001` NARRATOR: The Palace Court has prepared a wedding ceremony with thirteen banners, nine trumpets that nobody will sound today, and a document confirming that both parties consent of their own free will.
- `KAE-EPI-002` KAEDRA [PLAYFUL]: "The consent document is excellent. We should consider removing the trumpets from future events as well."
- `KAE-EPI-003` PLAYER: "The court seems rather proud of them."
- `KAE-EPI-004` KAEDRA [NEUTRAL]: "The court is welcome to marry the trumpets."
- `KAE-EPI-005` NARRATOR: A few guests laugh. Others look surprised that the princess they've feared for years is quietly amused by her own ceremony.
- `KAE-EPI-006` HERALD: "Do you, Princess Kaedra, choose this partnership of your own will?"
- `KAE-EPI-007` KAEDRA [NEUTRAL]: "I do. I remain guardian of the people I serve, and I choose {PLAYER} as my partner—not my subject and not my keeper."
- `KAE-EPI-008` HERALD: "And do you, {PLAYER}, choose Princess Kaedra of your own will?"
- `KAE-EPI-009` PLAYER: "I do. Including the days when she comes home from saving the kingdom and wants five minutes of silence."
- `KAE-EPI-010` KAEDRA [PLAYFUL]: "Ten minutes. I have negotiated the terms."
- `KAE-EPI-011` NARRATOR: The court records your vows. Kaedra keeps her strength, her wings, her duties, and a little more freedom to show the tenderness she has always possessed.
- `KAE-EPI-012` NARRATOR: Later, in the Royal Gardens, she sits close enough for your shoulders to touch. Nobody asks her to stand guard over anything for a moment.
- `KAE-EPI-013` KAEDRA [WORRIED]: "There will still be frightening days. And days when I get things wrong."
- `KAE-EPI-014` PLAYER: "We'll tell each other when we need help. And we'll still be ourselves."
- `KAE-EPI-015` KAEDRA [NEUTRAL]: "That is precisely what I wanted."
- `KAE-EPI-016` NARRATOR: She rests her forehead against yours, a gesture of affection with no audience, no grand magic, and no requirement to be brave about it.
- `KAE-EPI-017` KAEDRA [PLAYFUL]: "For the record, you should know our children will not be permitted to study ceremonial speechwriting until they're old enough to refuse."
- `KAE-EPI-018` PLAYER: "How many children is this hypothetical policy for?"
- `KAE-EPI-019` KAEDRA [SURPRISED]: "I have no intention of approving a figure before the relevant committee has met."
- `KAE-EPI-020` NARRATOR: You both laugh. For once, the silence afterward is neither fear nor duty. It is simply home.

**END `KAE-EPI-01`:** Display-only epilogue. No gameplay cost, stats, heart changes, journal action, new gameplay permissions, or second gallery unlock. Future offspring are a playful hypothetical joke, **not canon-confirmed children or a child-count mechanic**. The source of truth remains the already committed successful route. The ceremony and garden ending do not add locations or actions.

---

## I. Cross-scene continuity and editorial guardrails

1. **Narrative arc:** the optional fashion scene demonstrates dry humor and resistance to being treated as a spectacle; the mandatory Royal Trial establishes agency under pressure, responsible public safety, and the need for honest private comfort; the optional rumor scene extends the compassion theme; the mandatory Private Vow resolves the romance without controlling or idolizing Kaedra. Neither optional event is required to understand or complete the mandatory scenes.
2. **Location invariance:** Kaedra can be met only in approved weekday/slot/location pairs. A scripted Royal Trial relocation from Guild/Gardens to Palace Court is contained in the existing one-slot encounter, not separate travel. All other movements are within existing locations or ceremonial post-success narration.
3. **No moral stat shortcuts:** Ordinary stat training and princess preferences affect no heart affinity by themselves. Strength/Intelligence thresholds gate the midpoint; optional Strength/Kindness thresholds only gate their respective events. The Royal Trial has no combat or magic skill check beyond the already approved requirements.
4. **Potential tone issue:** The approved character design includes folded wings and formal armor-gown; descriptions should retain visual identity without portraying her as violent. `PLAYFUL` signals dry, controlled amusement rather than Tavri-style theatrical banter.
5. **Outcome compatibility:** Optional events mark experienced even on hurtful replies. Narrative outcome IDs are useful for optional future text callbacks but **cannot** alter milestone requirements, final choice correctness, or ending eligibility.
6. **Pivotal retry contracts:** The original midpoint/final scene is shown once; later retries are shorter repeatable conversations on eligible *subsequent days*. Both wrong retries consume their action without additional hearts; the final retry keeps hearts at ten.
7. **No shared approval:** `CORE-PRO-01` and `CORE-FAIL-01` (drafted earlier with Tavri) remain provisional, outside Kaedra's editorial decision, pending cross-route review.
8. **Authoring freeze boundary:** On approval, the exact seven Kaedra scenes and their IDs become canonical narrative references. They are not automatically a passed mechanical validator or final Goldfish handoff until their package receives source, asset, and integration checks.

## J. Editorial and mechanical acceptance checklist

- [ ] Editorial reviewer approves the five-character voice, jokes, emotional beats, and all correct/incorrect/offensive responses.
- [ ] No optional event is required for comprehension of the mandatory midpoint or finale.
- [ ] Approved v0.2 crimson-haired, horned, winged design remains consistent; no full-dragon change or flight mechanic.
- [ ] `KAE-MID-01` depicts **small**, extinguished magic flare, bystander safety, and private comfort, without a battle.
- [ ] Every dialogue branch terminates at its declared scene transition and applies **one** encounter-level outcome, no accidental duplicate rewards.
- [ ] Exactly one journal entry, one action slot, and one daily princess encounter per completed encounter, even with a linked first finale.
- [ ] Every referenced expression belongs to `NEUTRAL`, `PLAYFUL`, `WORRIED`, `ANNOYED`, `SURPRISED`.
- [ ] All line, choice-point, choice-option, scene, and narrative outcome IDs are unique and referenced correctly; no dangling content references.
- [ ] Candidate Day-18 perfect path and Day-28 recovery scenario remain reachable once ordinary dialogue and command contracts are complete; this file alone cannot certify them.
- [ ] Shared prologue and failure ending are explicitly excluded from this character-specific approval.

## K. Specific editorial questions

1. **Royal Trial:** Is the small spark and manageable crowd reaction dramatic enough, or should the *emotional* stakes be intensified without increasing physical danger?
2. **Kaedra's voice:** Does her understated deadpan humor make her meaningfully different from Tavri, while retaining the comedy-first tone?
3. **Proposal mistakes:** Are the incorrect idolization and caretaker options sufficiently clear without making the protagonist seem implausibly cruel?
4. **Epilogue:** Does the royal wedding plus private garden moment feel right, and is the hypothetical-children joke appropriately light rather than canon-confirming a child count?

**Approval requested:** The seven **Kaedra-specific** authored scenes only. No approval of production sprites, Royal Trial illustration, shared content, or game implementation is implied.
