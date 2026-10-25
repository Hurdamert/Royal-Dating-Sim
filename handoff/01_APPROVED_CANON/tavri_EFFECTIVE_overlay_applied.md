# Gate 2 — Tavri Narrative Package v0.1

**Status:** DRAFT FOR HUMAN REVIEW — NOT APPROVED.  
**Reference:** The approved Tavri character-bible and illustrated character sheet (Gate 2), along with D-001–D-144 and the approved G1-derived rules.  
**Purpose:** Author all seven Tavri-specific pivotal scene units; provide provisional shared prologue and failure-ending scripts. **This is a narrative content packet, not an implementation specification or code.**

## A. Immutable canon for this review

Tavri is a 24-year-old adult fox princess with a human face and body, prominent fox ears and a fluffy tail (no muzzle or full-body fur), auburn/copper hair, amber eyes, and a burgundy/ivory/antique-gold court outfit. She is mischievous, observant, theatrical and privately insecure about being loved only for her performing persona. Her route is **honesty beneath performance**, progressing through mutual vulnerability to an awkward, genuinely unscripted proposal. She is neither a prize owed to the protagonist nor a passive spectator in the romance. The protagonist is a software engineer transported to a comic fantasy world, addressed by the chosen name. Approved game rules supersede this draft if any conflict is discovered.

**Expression codes:** `NEUTRAL`, `PLAYFUL`, `WORRIED`, `ANNOYED`, `SURPRISED` are the five approved expression states. No other expression artwork is assumed. Descriptive gestures, ear movement, and tail behavior are narrative text only.

**Existing approved schedule (Tavri):** Mon afternoon/evening Royal Gardens; Tue morning/afternoon Town Square; Thu afternoon/evening Palace Court; Sat morning/afternoon Royal Library; Sun afternoon/evening Royal Gardens. Scene transitions between approved existing locations, when authorized, are part of the same encounter and cost no extra slot.

**Relationship semantics for this package:** `heartsHalf` counts half-hearts, clamped 0–20. Ordinary and optional heart-earning encounters normally net +2 (correct), +1 (ordinary wrong), or −1 (specifically labeled offensive). Before the mandatory milestone, gains clamp at 10 half-hearts (five hearts), with overflow discarded. The mandatory midpoint and its retry grant no hearts. Once the midpoint is completed, hearts may advance above five. A pending marriage retry freezes normal heart-earning encounters at 20 half-hearts. An optional event is marked experienced upon the resolution of its first completed attempt regardless of outcome. All effects are staged until the entire parent encounter, including an immediately linked final scene, commits. This packet does not invent bonus affinity points, new training actions, costs, equipment, or gameplay systems.

**Player-name substitution:** `{PLAYER}` is rendered as the safely stored protagonist name. The default, when the name was skipped, is `Traveler`. Script display and narration render it as ordinary text, never markup.

**Authoring conventions:** Every numbered line ID is an immutable content identifier. Choices have immutable IDs and exactly described branches/outcomes. `LINE`/`PLAYER`/`TAVRI`/`HUMPTY` identify speaker; each Tavri line includes an approved expression code. `NARRATOR` lines are text feedback, not voiced (v1 has no audio). A line's expression remains until the next Tavri expression cue. Following the chosen branch, execute the specified `END` or `CONTINUE` instruction; never silently present other branches. Read-only dialogue pages may be persisted, and only a consequential choice determines the encounter-level heart result.

---

## B. Scene 1 — Fantasygram Catastrophe

**Scene ID:** `TAV-EVT-PRE-01`  
**Type:** optional Tavri event, pre-midpoint, one-time.  
**Eligibility:** Current Tavri route; milestone incomplete; committed hearts below five; Charisma ≥ 3; scene not already experienced; Tavri scheduled and eligible in current slot; daily princess interaction unused; no other encounter pending.  
**Location:** Opens where Tavri is scheduled; story presentation may move within the same encounter to Town Square or Royal Gardens. No additional location or action cost.  
**Objective:** The protagonist chooses whether to support Tavri's real self in an embarrassing magical social-media incident. No new social-media gameplay is introduced.

- `TAV-PRE-001` NARRATOR: A paper bird lands beside Tavri and unfolds itself into a glowing, aggressively cheerful scroll.
- `TAV-PRE-002` TAVRI [PLAYFUL]: "Fantastic. Fantasygram has delivered this week's public humiliation by express owl."
- `TAV-PRE-003` PLAYER: "You have a magical account?"
- `TAV-PRE-004` TAVRI [ANNOYED]: "The palace has an account. I have a public-relations emergency disguised as a hobby."
- `TAV-PRE-005` NARRATOR: The scroll projects a portrait of Tavri stepping away from a royal banquet. Its caption reads: *Princess flees dinner after losing a battle with a napkin.*
- `TAV-PRE-006` TAVRI [SURPRISED]: "I was helping a servant clean up a spilled tray. How did they manage to remove the servant, the tray, and every trace of context?"
- `TAV-PRE-007` PLAYER: "The crop tool is the most dangerous spell in the kingdom."
- `TAV-PRE-008` TAVRI [PLAYFUL]: "Finally, a scholar who understands modern sorcery."
- `TAV-PRE-009` NARRATOR: Her smile fades when a second scroll appears. This one is titled *Ten Reasons the Princess Is Secretly Unfit for Polite Society.*
- `TAV-PRE-010` TAVRI [WORRIED]: "If I joke about it first, perhaps nobody will notice I'm bothered. That's the usual plan."
- `TAV-PRE-011` PLAYER: "And if the plan isn't working?"
- `TAV-PRE-012` TAVRI [NEUTRAL]: "Then I suppose my heroic companion gets to decide whether I need a joke or a friend."

**Choice point `TAV-PRE-C1` — choose exactly one:**

1. `TAV-PRE-C1-SUPPORT` **Correct; net +2 half-hearts**. PLAYER: "You don't have to perform being unbothered for me. Want help telling the real story—or want to ignore it together?"
   - `TAV-PRE-S01` TAVRI [SURPRISED]: "You'd let me choose? Even if my decision is profoundly unprincesslike?"
   - `TAV-PRE-S02` PLAYER: "Especially then."
   - `TAV-PRE-S03` TAVRI [WORRIED]: "I think I'd like to put the scroll away and be upset for one minute."
   - `TAV-PRE-S04` NARRATOR: The paper bird folds itself into a surprisingly judgmental napkin. Tavri laughs once, this time without performing for anyone.
   - **Narrative outcome ID:** `TAV-PRE-O-SUPPORTED`.
2. `TAV-PRE-C1-DISMISS` **Ordinary wrong; net +1 half-heart**. PLAYER: "It's just a rumor. Tell a better joke and everyone will forget it."
   - `TAV-PRE-W01` TAVRI [NEUTRAL]: "Yes. That's normally what I do."
   - `TAV-PRE-W02` PLAYER: "I was trying to help."
   - `TAV-PRE-W03` TAVRI [WORRIED]: "I know. It's simply exhausting to be offered another performance when I hoped for a moment offstage."
   - `TAV-PRE-W04` NARRATOR: She pockets the scroll. The conversation ends courteously, but the distance between you is noticeable.
   - **Narrative outcome ID:** `TAV-PRE-O-DISMISSED`.
3. `TAV-PRE-C1-CRUEL` **Explicitly offensive; net −1 half-heart**. PLAYER: "Maybe they have a point. A competent princess wouldn't give them material."
   - `TAV-PRE-X01` TAVRI [SURPRISED]: "Oh."
   - `TAV-PRE-X02` TAVRI [ANNOYED]: "Thank you for demonstrating that a cruel comment is much more efficient when delivered in person."
   - `TAV-PRE-X03` NARRATOR: She closes the scroll and ends the conversation herself.
   - **Narrative outcome ID:** `TAV-PRE-O-HURT`.

**END `TAV-EVT-PRE-01`:** Mark `TAV-EVT-PRE-01` experienced, commit the selected net half-heart result (clamped to the appropriate relationship gate), consume exactly one daily princess encounter and one slot, append exactly one action journal entry. Never replay. If this event raises hearts to exactly five before the midpoint, the milestone becomes pending **on a later eligible encounter**, not immediately inside this event.

---

## C. Scene 2 — The Private Confession (first full midpoint attempt)

**Scene ID:** `TAV-MID-01`  
**Type:** mandatory midpoint, first full attempt (shown once).  
**Eligibility:** Current Tavri route; five committed hearts (10 half-heart units), midpoint incomplete; Charisma ≥ 6 and Intelligence ≥ 4; Tavri eligible and interaction unused. If thresholds unmet, block starting any Tavri encounter free of cost.  
**Location:** Begins at Tavri's scheduled location and may move to the Royal Gardens inside the same one-slot encounter.  
**Objective:** Mutual vulnerability; the protagonist admits hiding fear and insecurity behind practiced competence rather than claiming to have used a particular training activity.

- `TAV-MID-001` NARRATOR: Tavri walks beside you until the noise of the court fades behind a hedge. The Royal Gardens are quiet enough to hear the fountain miss a beat.
- `TAV-MID-002` TAVRI [PLAYFUL]: "Congratulations. You've earned the rare privilege of my exclusive, invitation-only silence. Reviews are mixed."
- `TAV-MID-003` PLAYER: "Should I clap?"
- `TAV-MID-004` TAVRI [PLAYFUL]: "Please don't. I've had quite enough clapping for one lifetime."
- `TAV-MID-005` NARRATOR: She studies the reflection in the water. Her tail has gone still.
- `TAV-MID-006` TAVRI [WORRIED]: "Do you know what happens when you're the amusing princess? People don't ask if you're all right. They ask when you're going to be amusing again."
- `TAV-MID-007` PLAYER: "That sounds lonely."
- `TAV-MID-008` TAVRI [NEUTRAL]: "It's comfortable, if you never leave the stage. I can make a court laugh. I can turn a scandal into a story."
- `TAV-MID-009` TAVRI [WORRIED]: "I don't know whether anyone would stay if I had nothing clever left to say."
- `TAV-MID-010` NARRATOR: For once she does not rescue the silence with a joke.

**Choice point `TAV-MID-C1` — one decisive answer:**

1. `TAV-MID-C1-MUTUAL` **Correct; milestone completes, no hearts gained**. PLAYER: "I hide behind being useful. Where I come from, I kept trying to prove I deserved a place. I don't always know who I am when I'm not succeeding. But I'd still want to sit here with you, even if neither of us said anything clever."
   - `TAV-MID-S01` TAVRI [SURPRISED]: "You? The person who can explain an entire disaster as if it were a tidy list?"
   - `TAV-MID-S02` PLAYER: "The lists are how you know I'm panicking."
   - `TAV-MID-S03` TAVRI [WORRIED]: "That is an alarming amount of honesty for one bench."
   - `TAV-MID-S04` PLAYER: "We could stop."
   - `TAV-MID-S05` TAVRI [NEUTRAL]: "No. I think I'd like to try something."
   - `TAV-MID-S06` NARRATOR: Tavri lowers her voice. "I had a miserable day," she says, plainly. Nothing sparkles. No audience applauds.
   - `TAV-MID-S07` PLAYER: "I'm sorry. Want to tell me about it?"
   - `TAV-MID-S08` TAVRI [PLAYFUL]: "Only if you promise not to file a quarterly report on my feelings."
   - `TAV-MID-S09` NARRATOR: You remain by the fountain. The conversation is not impressive. It is better than that.
   - **Narrative outcome:** `TAV-MID-O-TRUST`; set midpoint-completed true when the encounter resolves.
2. `TAV-MID-C1-REASSURE` **Wrong; midpoint incomplete, no hearts changed**. PLAYER: "That's ridiculous. Everyone loves you. You're the funniest person in the kingdom."
   - `TAV-MID-W01` TAVRI [WORRIED]: "That's precisely the part I'm worried about."
   - `TAV-MID-W02` PLAYER: "I meant it kindly."
   - `TAV-MID-W03` TAVRI [NEUTRAL]: "I know. Perhaps we can talk about it when I find better words."
   - **Narrative outcome:** `TAV-MID-O-MISUNDERSTOOD`; first full event flagged seen, midpoint still incomplete, retry later.
3. `TAV-MID-C1-PERFORM` **Wrong; midpoint incomplete, no hearts changed**. PLAYER: "Then never let them see you slip. I can help you write better jokes."
   - `TAV-MID-P01` TAVRI [ANNOYED]: "I asked whether you would stay if I stopped performing. You offered to improve the show."
   - `TAV-MID-P02` PLAYER: "I didn't hear what you were really asking."
   - `TAV-MID-P03` TAVRI [NEUTRAL]: "Maybe next time."
   - **Narrative outcome:** `TAV-MID-O-UNHEARD`; first full event flagged seen, midpoint still incomplete, retry later.

**END `TAV-MID-01`:** Always consume one slot and the daily princess interaction, append one journal entry, and apply no heart change. On correct choice set milestone-completed; on wrong choice keep five-heart gate with a repeatable **short** retry. If a later offense has reduced hearts only after milestone success, the milestone does not reset.

---

## D. Scene 3 — Private Confession follow-up (midpoint retry)

**Scene ID:** `TAV-MID-RETRY-01`  
**Type:** mandatory midpoint retry; repeatable after a failed first attempt.  
**Eligibility:** First full midpoint seen; five hearts; midpoint incomplete; required stats retained; new eligible scheduled day with unused encounter; no pending other scene.  
**Location:** Tavri's scheduled location, with a brief private aside. No added cost.

- `TAV-MR-001` TAVRI [NEUTRAL]: "About that conversation by the fountain. I don't need a speech. I think I need to know whether you heard me."
- `TAV-MR-002` PLAYER: "I did. It took me longer than it should have."
- `TAV-MR-003` TAVRI [WORRIED]: "Then tell me what you heard. No flourish, please."

**Choice point `TAV-MR-C1`:**

1. `TAV-MR-C1-LISTEN` **Correct; complete milestone, no hearts gained**. PLAYER: "You're afraid that when the jokes stop, people stop choosing you. I've hidden my own fears behind trying to be useful. I don't want you to have to earn my company."
   - `TAV-MR-S01` TAVRI [SURPRISED]: "That is... exactly it."
   - `TAV-MR-S02` TAVRI [PLAYFUL]: "And I've just heard you say several sentences without accidentally making a presentation. We're both growing."
   - `TAV-MR-S03` NARRATOR: She reaches for your hand, briefly, without looking toward an audience.
   - **Outcome:** `TAV-MID-O-TRUST`; complete midpoint.
2. `TAV-MR-C1-ADVISE` **Wrong; milestone remains pending, no hearts changed**. PLAYER: "You need to stop caring what other people think. Problem solved."
   - `TAV-MR-W01` TAVRI [ANNOYED]: "You make a rather ambitious claim about solving feelings."
   - `TAV-MR-W02` TAVRI [NEUTRAL]: "Perhaps we should try again another day."
   - **Outcome:** `TAV-MID-O-MISUNDERSTOOD`; retry remains available on future eligible days.

**END `TAV-MID-RETRY-01`:** One slot and one daily encounter, one journal entry, zero heart change; never replay the full first midpoint scene. Each further failed retry uses this same short scene.

---

## E. Scene 4 — Unscripted Comedy

**Scene ID:** `TAV-EVT-POST-01`  
**Type:** optional post-midpoint event, one-time.  
**Eligibility:** Tavri milestone completed; Kindness ≥ 3; fewer than ten committed hearts; marriage retry not pending; event not experienced; Tavri eligible in this slot with unused daily encounter.  
**Location:** Begins where Tavri is scheduled; temporary performance is represented as an existing Town Square or Palace Court setting, not a newly selectable location or comedy minigame.  
**Objective:** Let Tavri choose imperfection without treating humor as something she must always provide.

- `TAV-POST-001` NARRATOR: Someone in the Town Square has erected a tiny stage. A hand-painted sign announces: *Royal Comedy Showcase: Participation Voluntary, Embarrassment Inevitable.*
- `TAV-POST-002` TAVRI [PLAYFUL]: "Excellent. Finally, an event whose organizers understand their audience."
- `TAV-POST-003` PLAYER: "Are you performing?"
- `TAV-POST-004` TAVRI [NEUTRAL]: "I volunteered yesterday. Today I'm thinking I'd rather be a person in the crowd."
- `TAV-POST-005` NARRATOR: Onstage, a wizard pulls a rabbit from a hat. The rabbit takes one look at the audience and pulls the wizard back inside.
- `TAV-POST-006` PLAYER: "Tough act to follow."
- `TAV-POST-007` TAVRI [WORRIED]: "The court expects me to be effortlessly brilliant. I don't want to be brilliant on command. But I don't want to disappoint everyone, either."
- `TAV-POST-008` PLAYER: "What do you actually want?"
- `TAV-POST-009` TAVRI [SURPRISED]: "That is becoming a rather dangerous question around you."

**Choice point `TAV-POST-C1`:**

1. `TAV-POST-C1-CHOICE` **Correct; net +2 half-hearts**. PLAYER: "Then don't perform. We can watch terrible jokes together. If you decide to go onstage, I'll cheer. If not, I'll still be here."
   - `TAV-POST-S01` TAVRI [WORRIED]: "I think I'd like to stay. Just stay."
   - `TAV-POST-S02` NARRATOR: The next comedian announces that his act is entirely improvised and immediately reads from a scroll marked *Entirely Improvised Act.*
   - `TAV-POST-S03` TAVRI [PLAYFUL]: "I may have found the only performer in the kingdom less spontaneous than you."
   - `TAV-POST-S04` PLAYER: "That was spontaneous and hurtful."
   - `TAV-POST-S05` TAVRI [NEUTRAL]: "And I didn't need a whole stage for it."
   - **Narrative outcome ID:** `TAV-POST-O-CHOSE`.
2. `TAV-POST-C1-PUSH` **Ordinary wrong; net +1 half-heart**. PLAYER: "You always make people laugh. You'll feel better as soon as you're onstage."
   - `TAV-POST-W01` TAVRI [NEUTRAL]: "Maybe. But it would have been nice to decide that myself."
   - `TAV-POST-W02` NARRATOR: She delivers a competent routine. Everyone applauds. Tavri thanks them, and her smile fades as the crowd disperses.
   - **Narrative outcome ID:** `TAV-POST-O-PUSHED`.
3. `TAV-POST-C1-SHAME` **Explicitly offensive; net −1 half-heart**. PLAYER: "Backing out makes you look weak. A real princess wouldn't disappoint her audience."
   - `TAV-POST-X01` TAVRI [ANNOYED]: "I was hoping I could be myself for once. Now I have another audience to disappoint."
   - `TAV-POST-X02` NARRATOR: She steps away from you and joins the crowd alone.
   - **Narrative outcome ID:** `TAV-POST-O-HURT`.

**END `TAV-EVT-POST-01`:** Mark event experienced regardless of result; commit the one net heart result (maximum 20 half-heart units), one slot, one daily encounter, and one journal entry. **If the projected reward reaches ten hearts, immediately link the first full final scene `TAV-FIN-01` inside this same parent encounter before committing anything.** No additional slot or daily encounter is consumed. No optional completion is required for marriage.

---

## F. Scene 5 — Shared Confession (first full final marriage scene)

**Scene ID:** `TAV-FIN-01`  
**Type:** mandatory first marriage proposal; full scene shown only once.  
**Eligibility:** Midpoint complete; encounter's projected hearts reach 20 half-heart units from a heart-earning encounter; first full final not yet shown. If 10 hearts are already committed after a failed first proposal, use the retry scene instead.  
**Location:** Royal Gardens, reached within the originating encounter as an event transition.  
**Objective:** The protagonist rejects rehearsed charm and sincerely asks to build a shared future; Tavri acts as an equal participant in that choice.

- `TAV-FIN-001` NARRATOR: The last of your conversation gives way to a rare, comfortable silence. Tavri looks at you for a long moment.
- `TAV-FIN-002` TAVRI [PLAYFUL]: "Careful. That face says you're about to deliver a speech."
- `TAV-FIN-003` PLAYER: "I prepared one. It's probably a mistake."
- `TAV-FIN-004` TAVRI [SURPRISED]: "You prepared a speech? For me?"
- `TAV-FIN-005` PLAYER: "It has a beginning, three key points, and a conclusion."
- `TAV-FIN-006` TAVRI [PLAYFUL]: "My heart trembles before the power of your formatting."
- `TAV-FIN-007` NARRATOR: You take out the folded paper. Suddenly every neatly arranged sentence seems like a place to hide.
- `TAV-FIN-008` PLAYER: "Actually... I don't want to read it."
- `TAV-FIN-009` TAVRI [WORRIED]: "You can take your time. You don't have to be clever with me."
- `TAV-FIN-010` PLAYER: "That's the point. I came here trying to become the sort of person who could win a princess's affection. You kept showing me that I don't need a perfect line to care about someone."
- `TAV-FIN-011` TAVRI [NEUTRAL]: "And you showed me that someone can stay when the show is over."
- `TAV-FIN-012` NARRATOR: Tavri's tail flicks once. She waits. This time neither of you can blame the silence on a failed joke.

**Choice point `TAV-FIN-C1` — decisive final answer:**

1. `TAV-FIN-C1-PARTNERS` **Correct; terminal success and gallery unlock**. PLAYER: "Tavri, I love the clever things you say. I love the moments you don't know what to say, too. Would you choose to marry me—and keep figuring things out together, as equals?"
   - `TAV-FIN-S01` TAVRI [SURPRISED]: "That was disastrously unscripted."
   - `TAV-FIN-S02` PLAYER: "I know."
   - `TAV-FIN-S03` TAVRI [WORRIED]: "You didn't promise I'd never be frightened again."
   - `TAV-FIN-S04` PLAYER: "I couldn't promise that honestly."
   - `TAV-FIN-S05` TAVRI [PLAYFUL]: "Good. Because I'd have asked for references."
   - `TAV-FIN-S06` NARRATOR: She takes your hand.
   - `TAV-FIN-S07` TAVRI [NEUTRAL]: "Yes, {PLAYER}. I choose you. And I would like us both to keep choosing."
   - `TAV-FIN-S08` NARRATOR: Your carefully prepared speech slips into the fountain. Neither of you retrieves it.
   - **Narrative outcome:** `TAV-FIN-O-MARRIED`; link to marriage epilogue `TAV-EPI-01` as a consequence of the successful terminal resolution, with no extra action cost.
2. `TAV-FIN-C1-ROLE` **Wrong; no new heart penalty; marriage retry pending at ten hearts**. PLAYER: "Marry me, and I'll make sure you're always everyone's favorite princess. You'll never have to disappoint them again."
   - `TAV-FIN-W01` TAVRI [WORRIED]: "That's a lovely-sounding cage."
   - `TAV-FIN-W02` PLAYER: "I wanted to make you happy."
   - `TAV-FIN-W03` TAVRI [NEUTRAL]: "Then please hear me: I don't want to be a flawless princess in your care. I want to be a person beside you."
   - `TAV-FIN-W04` NARRATOR: She doesn't close the door on your future, but she cannot answer yes to those words.
   - **Narrative outcome:** `TAV-FIN-O-PENDING`; commit ten hearts and set marriage retry pending after this encounter resolves, unless the deadline triggers failure.
3. `TAV-FIN-C1-PERFORM` **Wrong; no new heart penalty; marriage retry pending at ten hearts**. PLAYER: "If you say yes, we'll be the most entertaining royal couple in history. Just imagine the applause."
   - `TAV-FIN-P01` TAVRI [ANNOYED]: "I can imagine it. I can also imagine us becoming strangers the moment the curtain falls."
   - `TAV-FIN-P02` TAVRI [WORRIED]: "Please ask me because you want a life with me. Not because you want an audience."
   - **Narrative outcome:** `TAV-FIN-O-PENDING`; commit ten hearts and set marriage retry pending after this encounter resolves, unless the deadline triggers failure.

**END `TAV-FIN-01`:** This final scene shares the originating action, even if that action was an optional event. Stage the original heart reward and all final outcomes, then commit once: hearts, completion or retry-pending, daily encounter use, journal, time/terminal state, and gallery on success. On a wrong answer the pending retry must wait for a later scheduled eligible day. If the wrong answer resolves on Day 28 evening, commit terminal failure and show the failure ending instead. The first full final scene never repeats.

---

## G. Scene 6 — Shared Confession follow-up (marriage retry)

**Scene ID:** `TAV-FIN-RETRY-01`  
**Type:** mandatory brief final retry; repeatable following a wrong final answer.  
**Eligibility:** Midpoint complete; 20 committed half-hearts; final full scene already shown; marriage retry pending; Tavri scheduled and daily encounter unused; no other pending scene.  
**Location:** Tavri's scheduled location, with a brief private exchange.  
**Objective:** Resolve the question without replaying or replacing the full confession.

- `TAV-FR-001` TAVRI [NEUTRAL]: "I haven't forgotten what you asked me. I also haven't forgotten why I couldn't say yes."
- `TAV-FR-002` PLAYER: "You wanted to be a person beside me, not a role I could protect or show off."
- `TAV-FR-003` TAVRI [WORRIED]: "I did. And I still need you to mean it."

**Choice point `TAV-FR-C1`:**

1. `TAV-FR-C1-EQUAL` **Correct; terminal success, gallery unlock, no hearts gained**. PLAYER: "I want to marry you because I love who you are when nobody is watching. We would choose our future together. Would you still like that future with me?"
   - `TAV-FR-S01` TAVRI [SURPRISED]: "That's what I hoped you meant."
   - `TAV-FR-S02` TAVRI [PLAYFUL]: "And not one numbered point. I'm proud of you."
   - `TAV-FR-S03` TAVRI [NEUTRAL]: "Yes, {PLAYER}. Let's choose it together."
   - **Narrative outcome:** `TAV-FIN-O-MARRIED`; proceed to `TAV-EPI-01` without an extra action.
2. `TAV-FR-C1-PROMISE` **Wrong; keep ten hearts, retry pending**. PLAYER: "I promise I'll never let you have another bad day if you marry me."
   - `TAV-FR-W01` TAVRI [WORRIED]: "Then you'd be making a promise no one can keep. I need honesty, even when the answer is difficult."
   - `TAV-FR-W02` NARRATOR: She gives you time to reconsider rather than accepting a promise neither of you believes.
   - **Narrative outcome:** `TAV-FIN-O-PENDING`.

**END `TAV-FIN-RETRY-01`:** Every attempt consumes one slot and daily princess encounter and creates one journal entry. No further heart changes. Successful retry unlocks ending; failed retry remains pending unless deadline expires. The abbreviated retry may repeat, but the full first proposal may not.

---

## H. Scene 7 — Marriage epilogue

**Scene ID:** `TAV-EPI-01`  
**Type:** Tavri terminal-success epilogue; no extra action/encounter cost.  
**Eligibility:** The authoritative Tavri success transaction has been committed, with gallery unlocked. It may be presented after reload without reapplying any effects.  
**Location:** Palace Court followed by Royal Gardens; presentation-only transition.  
**Objective:** Show that Tavri's honesty remains part of her life after the proposal, and that the protagonist loves her as an equal rather than a carefully maintained persona.

- `TAV-EPI-001` NARRATOR: The palace celebrates a wedding for two people who have been accused, separately and with convincing evidence, of talking too much.
- `TAV-EPI-002` TAVRI [PLAYFUL]: "I was told the guests expected a speech from the bride. Apparently they know nothing about this family."
- `TAV-EPI-003` PLAYER: "I have a spare speech if you need one."
- `TAV-EPI-004` TAVRI [SURPRISED]: "You kept the original?"
- `TAV-EPI-005` PLAYER: "No. This one's titled *Emergency Speech for Someone Who Is Allowed to Feel Awkward.*"
- `TAV-EPI-006` TAVRI [PLAYFUL]: "A bestseller."
- `TAV-EPI-007` NARRATOR: When the guests settle, Tavri steps forward. For a moment, she looks almost nervous.
- `TAV-EPI-008` TAVRI [WORRIED]: "I used to believe that if I stopped making people smile, I'd lose my place among them. Today, I don't know how to make the perfect speech."
- `TAV-EPI-009` NARRATOR: The room is quiet. You catch her eye; she smiles, not as a performance but as herself.
- `TAV-EPI-010` TAVRI [NEUTRAL]: "I think I'll simply say I'm happy to be here, with the person I chose. That's enough."
- `TAV-EPI-011` NARRATOR: It is. The crowd applauds, but this time the applause isn't the point.
- `TAV-EPI-012` NARRATOR: Later in the gardens, a gossip-scroll claims the newlyweds intend to have fifty children.
- `TAV-EPI-013` PLAYER: "That's a surprisingly specific rumor."
- `TAV-EPI-014` TAVRI [PLAYFUL]: "Shall we begin by seeing whether we can keep one houseplant alive?"
- `TAV-EPI-015` PLAYER: "I can write a maintenance schedule."
- `TAV-EPI-016` TAVRI [NEUTRAL]: "And I can remind you that some things thrive without one."
- `TAV-EPI-017` NARRATOR: Your story ends not with a perfect performance, but with a conversation neither of you needs to rehearse.

**END `TAV-EPI-01`:** Display ending and provide read-only gallery/restart controls. This scene must not increment heart values, time, or completion counters, and refreshing during presentation must not replay a success transaction. The fifty-children item is explicitly a joke, not canonical future offspring.

---

## I. Shared content drafts (not yet approved)

The following two scripts are cross-route content **candidates**, included now to expose shared dependencies. They require separate review for whether they suit Nerelle and Kaedra, not merely Tavri.

### I-1. Shared prologue

**Scene ID:** `CORE-PRO-01`  
**Type:** Introductory, no time cost. Played after starting a newly named route, before the first regular gameplay action.  
**No consequential choices.**

- `CORE-PRO-001` NARRATOR: Last night, you were a software engineer staring at another rejection email. The subject line began with *Unfortunately* and ended before your hope did.
- `CORE-PRO-002` PLAYER: "I'm beginning to think the job market has been balanced by a particularly mean game designer."
- `CORE-PRO-003` NARRATOR: Then the world folded like a poorly tested user interface, and you fell into a kingdom with more castles than entry-level openings.
- `CORE-PRO-004` NARRATOR: A public notice welcomes travelers to the royal courtship season. You have twenty-eight days to form a genuine bond with the princess whose path you choose. The season's deadline will not wait for anyone's perfect speech.
- `CORE-PRO-005` PLAYER: "I was hoping for a recruiter, but all right."
- `CORE-PRO-006` NARRATOR: The royal notice offers practical advice: build your skills, watch the weekly schedule, and remember that the person you're trying to impress can say no.
- `CORE-PRO-007` PLAYER: "Finally, an application process with clear requirements."
- `CORE-PRO-008` NARRATOR: The first morning begins. Your chosen route awaits.

**END `CORE-PRO-01`:** No journaled gameplay action, stat reward, relationship gain, or time advancement; transitions to Day 1, morning. The 'courtship season' framing of the deadline is a **proposed new lore detail** requiring approval.

### I-2. Shared failure ending

**Scene ID:** `CORE-FAIL-01`  
**Type:** Terminal failure, shown following expiration of Day 28 without a successful marriage.  
**No choices or rewards.**

- `CORE-FAIL-001` NARRATOR: The twenty-eight-day courtship season ends. Whatever you learned, there is no royal wedding waiting at the end of this attempt.
- `CORE-FAIL-002` NARRATOR: The final day cannot be retrieved with a clever message, an extra training session, or a conveniently timed browser refresh.
- `CORE-FAIL-003` PLAYER: "I would like to appeal the deadline."
- `CORE-FAIL-004` NARRATOR: An official stamps your appeal *RECEIVED* and immediately stamps a second page *DENIED.*
- `CORE-FAIL-005` NARRATOR: It is a disappointing ending, but it does not erase the choices you made. Your journal remains available until you choose to restart or begin a new route.
- `CORE-FAIL-006` NARRATOR: **Ending: The Courtship Window Closes.**

**END `CORE-FAIL-01`:** Preserve terminal failed run and journal. No automatic restart. Offer separately confirmed Restart Current Route / Start New Route and read-only review access. Existing unlocked gallery endings remain intact. No playable Day 29.

---

## J. Editorial and mechanical validation checklist

These checks describe what must be verified before approval. The existence of this checklist is **not** evidence that the game or test validator has been executed.

| Check ID | Requirement | Draft assessment |
|---|---|---|
| `TAV-VAL-01` | Tavri's identity, age, adult humanoid-fox anatomy, wardrobe, and five approved expressions are consistent. | Text reviewed; visual consistency depends on asset production |
| `TAV-VAL-02` | Every authored line and choice has a stable ID with no duplicates. | Manual draft check required before freeze |
| `TAV-VAL-03` | Pre/post optional events are stage- and stat-gated; missed events never block marriage. | Designed accordingly; execution not tested |
| `TAV-VAL-04` | All optional outcomes use only the approved net heart values (+2, +1, or −1 half-hearts), plus experienced and narrative-history flags. | Designed accordingly; execution not tested |
| `TAV-VAL-05` | Midpoint requires five hearts, Charisma 6, Intelligence 4, and a correct pivotal choice; wrong choices permit abbreviated retries. | Designed accordingly; execution not tested |
| `TAV-VAL-06` | Final full scene triggers when staged hearts reach ten, from either ordinary or optional parent encounters. | Designed accordingly; execution not tested |
| `TAV-VAL-07` | Wrong final choices retain ten hearts and require an eligible later-day retry. | Designed accordingly; execution not tested |
| `TAV-VAL-08` | One scene chain consumes at most one slot and one daily princess encounter, with atomic commit and one journal entry. | Designed accordingly; execution not tested |
| `TAV-VAL-09` | All mandatory narrative information is available without optional events. | Draft narrative reviewed; editorial approval pending |
| `TAV-VAL-10` | The epilogue gives Tavri equal agency; the fifty-children gag is not canonical. | Draft reviewed; approval pending |
| `TAV-VAL-11` | Prologue and failure ending introduce no unapproved gameplay costs or resets. | Draft reviewed; shared lore decision pending |
| `TAV-VAL-12` | Production sprite references and midpoint illustration match approved sheet. | Assets not produced |
| `TAV-VAL-13` | Actual route passes Day 18 perfect and Day 28 recovery fixtures and independent reachability analysis. | Not tested |

## K. Outstanding approvals and editorial questions

1. **Pivotal script approval:** Do these seven Tavri scenes preserve her approved arc, humor, and equal romantic agency? This draft has not received approval.
2. **Prologue lore:** Is a twenty-eight-day *royal courtship season* an acceptable narrative explanation for the fixed deadline, or should the deadline have a different fictional explanation? Nothing about the gameplay deadline changes.
3. **Varying appearance cues:** Expression references may change within scenes but must stay within the five approved sprites. Tail and ear movements remain in prose unless later animation is separately authorized.
4. **Final dialogue from optional events:** The current draft explicitly links the final if `TAV-EVT-POST-01` reaches ten hearts. The same shared final must also support ordinary conversation as the parent action.
5. **Approved visual production:** The character sheet is already canonical. The actual production sprite states and midpoint illustration have not been generated or approved.
6. **Validation evidence:** No schema checker, gameplay engine, schedule simulator, browser test, or reachability validator has been run. Marking this entire package validated would be premature.

**Next approval gate:** Tavri pivotal script editorial review, followed by production sprite and midpoint illustration review, narrative/asset validation, then the complete Tavri package approval required by D-140. Nerelle and Kaedra remain separate later packages.
