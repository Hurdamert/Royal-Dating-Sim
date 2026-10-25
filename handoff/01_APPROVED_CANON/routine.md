# Gate 2 — Ordinary Princess Conversations, Editorial Candidate v0.1

**Status: UNAPPROVED NEW ROUTINE TEXT.** The Gate 2 combined pivotal-content freeze and scoped reusable-asset/content-contract freeze are approved and **unchanged**. This document authors 54 new, proposed ordinary conversations under the **approved** `Gate2_Ordinary_Dialogue_Content_Bible_CANDIDATE_v0.1.md` (historical filename retained). It is not an implementation specification or implementation code.

## Global fixed encounter contract

- Content pool: 3 princesses × 2 permanent stages × (6 fixed-order unique entries `U01..U06` followed by cycling fallbacks `F01..F03`) = **54 static authored conversations**. Fallback replay reuses the same authored entry; no randomization.
- Eligibility: princess's route currently selected; princess available in an approved weekly schedule location and slot; exactly one daily princess encounter not yet consumed; no mandatory five-heart midpoint or marriage retry pending; no unfinished encounter. PRE requires midpoint incomplete and hearts below 5. POST requires midpoint completed and hearts below 10. The staged completed midpoint never regresses even if hearts decrease. A scheduled encounter costs **one slot and today's one princess interaction**.
- Each candidate includes two **always-visible** replies (correct and ordinary incorrect). A third **always-visible, explicitly labeled offensive** reply appears in selected scenes. There are no stat-gated optional replies in this v0.1 catalog.
- The **single selected encounter-level effect** is net `+2` half-heart units for correct, `+1` for ordinary incorrect, or `−1` for explicitly offensive. Apply floor 0/cap 20, and cap at 10 while midpoint incomplete; overflow discarded. No independent line-based or visit bonus; these values **already include** the ordinary meeting effect.
- If the projected result reaches ten hearts after the completed midpoint, immediately link the **approved** full route marriage scene in the same atomic encounter. Successful marriage ends play with the approved epilogue; an incorrect marriage response leaves 10 hearts and the approved final retry pending on a later eligible day. Do not append a second slot/encounter or grant additional hearts.
- **Production-agnostic story cues:** Each scene opens in that princess's currently scheduled *approved* location and time slot; the background is selected from the seven approved nodes, with no new destination. The exact backdrop/time-of-day shown is cinematic; the day/slot HUD is authoritative. Nerelle is consistently in directly accessible water at Moonwater Quay or the Royal Gardens canal while the protagonist remains on shore.
- All line, choice, and outcome IDs below are editorial stable candidate IDs, not JSON schema or UI component implementation. Prefixes do not collide with the frozen `*-EVT-*`, `*-MID-*`, `*-FIN-*`, `*-EPI-*`, or `CORE-*` namespaces. `PLAYER` text is the named protagonist; literal `{PLAYER}` is an escaped-as-plain-text player-name substitution, default `Traveler`, never HTML.
- Scene selections are non-dependent: none requires a preceding unique entry, optional event, school/stat specialization, save state, acquired item, social-media account, or character revelation. In particular a perfect route may see fewer than six unique conversations per stage.

## Stage-specific visual reference and schedule

- **Tavri** (`TAV`): Mon afternoon/evening Royal Gardens; Tue morning/afternoon Town Square; Thu afternoon/evening Palace Court; Sat morning/afternoon Royal Library; Sun afternoon/evening Royal Gardens.
- **Nerelle** (`NER`): Mon afternoon/evening Moonwater Quay; Wed morning/afternoon Royal Gardens canal; Fri afternoon/evening Moonwater Quay; Sat morning/afternoon Royal Gardens canal; Sun afternoon/evening Moonwater Quay.
- **Kaedra** (`KAE`): Tue morning/afternoon Adventurers’ Guild; Wed afternoon/evening Palace Court; Thu morning/afternoon Adventurers’ Guild; Sat afternoon/evening Royal Gardens; Sun afternoon/evening Palace Court.


---

## Tavri ordinary conversation catalog


### Pre-midpoint (`TAV-ORD-PRE-*`)


#### TAV-ORD-PRE-U01 — The Applause Problem

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U01-L01` NARRATOR: A passing admirer bows so deeply that their hat rolls away.
- `TAV-ORD-PRE-U01-L02` TAVRI [PLAYFUL]: “I fear I have been applauded for standing near a doorway. The doorway performed most of the work.”
- `TAV-ORD-PRE-U01-L03` PLAYER: “Did you mean to impress them?”
- `TAV-ORD-PRE-U01-L04` TAVRI [NEUTRAL]: “I merely held it open. Apparently that is a daring new court technique.”

**Choice point `TAV-ORD-PRE-U01-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You were considerate. You do not owe anyone a performance afterward.”
   - `TAV-ORD-PRE-U01-R-YES-01` TAVRI [PLAYFUL]: “That is a strangely generous review. I might frame it beside the door.”
   - **Outcome:** `TAV-ORD-PRE-U01-O-YES`.
2. `TAV-ORD-PRE-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “At least bow dramatically so they get their money’s worth.”
   - `TAV-ORD-PRE-U01-R-NO-01` TAVRI [WORRIED]: “I was rather hoping for permission to stop bowing.”
   - **Outcome:** `TAV-ORD-PRE-U01-O-NO`.
3. `TAV-ORD-PRE-U01-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “You only acted kind so people would applaud you. What a fake.”
   - `TAV-ORD-PRE-U01-R-OFF-01` TAVRI [ANNOYED]: “That is a cruel thing to assume about someone trying to help.”
   - **Outcome:** `TAV-ORD-PRE-U01-O-OFF`.

**END `TAV-ORD-PRE-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-PRE-U02 — The Quill Critic

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U02-L01` NARRATOR: A self-writing quill has left an extravagant review of an otherwise ordinary court announcement.
- `TAV-ORD-PRE-U02-L02` TAVRI [PLAYFUL]: “The quill gave my pronunciation five stars and my actual message one. An impressive insult from stationery.”
- `TAV-ORD-PRE-U02-L03` PLAYER: “What did you want people to hear?”
- `TAV-ORD-PRE-U02-L04` TAVRI [NEUTRAL]: “That the servants deserve a day off. The review appears to have missed the subject entirely.”

**Choice point `TAV-ORD-PRE-U02-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Ask them about the day off. That matters more than how charmingly you said it.”
   - `TAV-ORD-PRE-U02-R-YES-01` TAVRI [PLAYFUL]: “I knew there was a reason I preferred you to enchanted stationery.”
   - **Outcome:** `TAV-ORD-PRE-U02-O-YES`.
2. `TAV-ORD-PRE-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Next time give it a more glamorous announcement.”
   - `TAV-ORD-PRE-U02-R-NO-01` TAVRI [WORRIED]: “I suspect glamour is exactly what obscured the point.”
   - **Outcome:** `TAV-ORD-PRE-U02-O-NO`.

**END `TAV-ORD-PRE-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-PRE-U03 — A Herald’s Breathing Exercise

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U03-L01` NARRATOR: An anxious herald practices Tavri’s introduction with enough adjectives to exhaust an opera company.
- `TAV-ORD-PRE-U03-L02` TAVRI [PLAYFUL]: “I have been called luminous, radiant, and devastating. The herald has not yet said my name.”
- `TAV-ORD-PRE-U03-L03` PLAYER: “Do the adjectives bother you?”
- `TAV-ORD-PRE-U03-L04` TAVRI [NEUTRAL]: “I begin to fear I must look sufficiently devastating to justify the paperwork.”

**Choice point `TAV-ORD-PRE-U03-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Would you like me to ask him to shorten it to simply Tavri?”
   - `TAV-ORD-PRE-U03-R-YES-01` TAVRI [PLAYFUL]: “Simple. Terrifying. I like it.”
   - **Outcome:** `TAV-ORD-PRE-U03-O-YES`.
2. `TAV-ORD-PRE-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “He should add majestic. There is room before he runs out of breath.”
   - `TAV-ORD-PRE-U03-R-NO-01` TAVRI [WORRIED]: “There is room in a herald’s lungs, perhaps. Not in my patience.”
   - **Outcome:** `TAV-ORD-PRE-U03-O-NO`.

**END `TAV-ORD-PRE-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-PRE-U04 — The Smile Rehearsal

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U04-L01` NARRATOR: Tavri catches her reflection in a polished surface and tries three immaculate smiles in succession.
- `TAV-ORD-PRE-U04-L02` TAVRI [PLAYFUL]: “There. One for ministers, one for visiting nobles, and one for being asked why I am not smiling.”
- `TAV-ORD-PRE-U04-L03` PLAYER: “Is there one you actually like?”
- `TAV-ORD-PRE-U04-L04` TAVRI [NEUTRAL]: “I have not scheduled a meeting with that smile.”

**Choice point `TAV-ORD-PRE-U04-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You can use whichever expression feels real, including none.”
   - `TAV-ORD-PRE-U04-R-YES-01` TAVRI [PLAYFUL]: “A dangerous suggestion. It might start a scandal of relaxed facial muscles.”
   - **Outcome:** `TAV-ORD-PRE-U04-O-YES`.
2. `TAV-ORD-PRE-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “The third looks best. Use it for everyone.”
   - `TAV-ORD-PRE-U04-R-NO-01` TAVRI [WORRIED]: “How efficient. A single mask for the entire kingdom.”
   - **Outcome:** `TAV-ORD-PRE-U04-O-NO`.

**END `TAV-ORD-PRE-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-PRE-U05 — A Riddle with No Prize

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U05-L01` NARRATOR: A folded riddle card lies beside a royal invitation.
- `TAV-ORD-PRE-U05-L02` TAVRI [PLAYFUL]: “What walks into a court with no title and leaves with more expectations than it arrived with?”
- `TAV-ORD-PRE-U05-L03` PLAYER: “A visiting duke?”
- `TAV-ORD-PRE-U05-L04` TAVRI [NEUTRAL]: “Close. Anyone who was foolish enough to say something clever once.”

**Choice point `TAV-ORD-PRE-U05-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Maybe someone can be clever without being on display all day.”
   - `TAV-ORD-PRE-U05-R-YES-01` TAVRI [PLAYFUL]: “An answer with no punch line. It suits you.”
   - **Outcome:** `TAV-ORD-PRE-U05-O-YES`.
2. `TAV-ORD-PRE-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “A court jester, obviously. You should tell better riddles.”
   - `TAV-ORD-PRE-U05-R-NO-01` TAVRI [WORRIED]: “And there it is: another performance review.”
   - **Outcome:** `TAV-ORD-PRE-U05-O-NO`.

**END `TAV-ORD-PRE-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-PRE-U06 — Curtain Call

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U06-L01` NARRATOR: A sudden burst of applause drifts from an unrelated gathering. Tavri starts to bow, then catches herself.
- `TAV-ORD-PRE-U06-L02` TAVRI [PLAYFUL]: “My reflexes remain impeccable. Someone applauds and my spine performs court protocol.”
- `TAV-ORD-PRE-U06-L03` PLAYER: “You seem tired.”
- `TAV-ORD-PRE-U06-L04` TAVRI [NEUTRAL]: “Apparently my body has a standing subscription to approval.”

**Choice point `TAV-ORD-PRE-U06-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We could simply listen until the applause stops. No bow required.”
   - `TAV-ORD-PRE-U06-R-YES-01` TAVRI [PLAYFUL]: “You make doing nothing sound delightfully rebellious.”
   - **Outcome:** `TAV-ORD-PRE-U06-O-YES`.
2. `TAV-ORD-PRE-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Go on, take a bow. They might be applauding you.”
   - `TAV-ORD-PRE-U06-R-NO-01` TAVRI [WORRIED]: “That uncertainty is not the part I enjoy.”
   - **Outcome:** `TAV-ORD-PRE-U06-O-NO`.

**END `TAV-ORD-PRE-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-PRE-F01 — An Unrequested Encore

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-F01-L01` NARRATOR: Tavri taps two fingers against her sleeve as if hearing invisible stage music.
- `TAV-ORD-PRE-F01-L02` TAVRI [PLAYFUL]: “I nearly delivered a speech about the weather. A full speech. To one cloud.”
- `TAV-ORD-PRE-F01-L03` PLAYER: “Was the cloud impressed?”
- `TAV-ORD-PRE-F01-L04` TAVRI [NEUTRAL]: “It refused to offer constructive criticism.”

**Choice point `TAV-ORD-PRE-F01-C1` (choose exactly one):**

1. `TAV-ORD-PRE-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Perhaps the cloud just wanted company, not a show.”
   - `TAV-ORD-PRE-F01-R-YES-01` TAVRI [PLAYFUL]: “Remarkably mature of it. I shall try the same.”
   - **Outcome:** `TAV-ORD-PRE-F01-O-YES`.
2. `TAV-ORD-PRE-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should have done the speech. I would rate it.”
   - `TAV-ORD-PRE-F01-R-NO-01` TAVRI [WORRIED]: “I was hoping to avoid a second critic today.”
   - **Outcome:** `TAV-ORD-PRE-F01-O-NO`.

**END `TAV-ORD-PRE-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-PRE-F02 — The Ribbon Question

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-F02-L01` NARRATOR: Tavri studies a ribbon fastened neatly around a stack of routine papers.
- `TAV-ORD-PRE-F02-L02` TAVRI [PLAYFUL]: “Someone declared the ribbon a symbol of my extraordinary taste. I picked the only one available.”
- `TAV-ORD-PRE-F02-L03` PLAYER: “A heroic decision under pressure.”
- `TAV-ORD-PRE-F02-L04` TAVRI [NEUTRAL]: “The chronicles will be unbearable.”

**Choice point `TAV-ORD-PRE-F02-C1` (choose exactly one):**

1. `TAV-ORD-PRE-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “The papers matter more than the ribbon; let the compliment pass.”
   - `TAV-ORD-PRE-F02-R-YES-01` TAVRI [PLAYFUL]: “A quiet victory. Nobody needs to write a ballad.”
   - **Outcome:** `TAV-ORD-PRE-F02-O-YES`.
2. `TAV-ORD-PRE-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Ask for a more expensive ribbon next time.”
   - `TAV-ORD-PRE-F02-R-NO-01` TAVRI [WORRIED]: “I fear you have mistaken me for a ribbon merchant.”
   - **Outcome:** `TAV-ORD-PRE-F02-O-NO`.

**END `TAV-ORD-PRE-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-PRE-F03 — The Revised Program

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-F03-L01` NARRATOR: An official program describes Tavri as “effortlessly delightful.”
- `TAV-ORD-PRE-F03-L02` TAVRI [PLAYFUL]: “Effortlessly. That is adorable. It took the clerk three drafts to spell it.”
- `TAV-ORD-PRE-F03-L03` PLAYER: “Do you want it changed?”
- `TAV-ORD-PRE-F03-L04` TAVRI [NEUTRAL]: “I would settle for a word that allows a person a difficult day.”

**Choice point `TAV-ORD-PRE-F03-C1` (choose exactly one):**

1. `TAV-ORD-PRE-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “How about just your name? You can decide the rest.”
   - `TAV-ORD-PRE-F03-R-YES-01` TAVRI [PLAYFUL]: “I think I am growing fond of that radical editorial policy.”
   - **Outcome:** `TAV-ORD-PRE-F03-O-YES`.
2. `TAV-ORD-PRE-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Keep it. People like knowing what to expect.”
   - `TAV-ORD-PRE-F03-R-NO-01` TAVRI [WORRIED]: “I am more than a promise printed on a program.”
   - **Outcome:** `TAV-ORD-PRE-F03-O-NO`.

**END `TAV-ORD-PRE-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


### Post-midpoint (`TAV-ORD-POST-*`)


#### TAV-ORD-POST-U01 — A Comfortable Silence

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U01-L01` NARRATOR: For once, the nearby conversation fades without Tavri racing to fill it.
- `TAV-ORD-POST-U01-L02` TAVRI [PLAYFUL]: “We have reached that notorious stage of friendship where nobody has said anything clever for a full minute.”
- `TAV-ORD-POST-U01-L03` PLAYER: “Should I panic?”
- `TAV-ORD-POST-U01-L04` TAVRI [NEUTRAL]: “Only if you have brought an emergency trumpet.”

**Choice point `TAV-ORD-POST-U01-C1` (choose exactly one):**

1. `TAV-ORD-POST-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can keep the silence. I like being here with you.”
   - `TAV-ORD-POST-U01-R-YES-01` TAVRI [PLAYFUL]: “Good. I had almost forgotten how lovely an unscripted pause can be.”
   - **Outcome:** `TAV-ORD-POST-U01-O-YES`.
2. `TAV-ORD-POST-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “I can invent a joke if you need entertaining.”
   - `TAV-ORD-POST-U01-R-NO-01` TAVRI [WORRIED]: “You see? Even our silence has acquired a stage manager.”
   - **Outcome:** `TAV-ORD-POST-U01-O-NO`.

**END `TAV-ORD-POST-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-POST-U02 — The Badly Drawn Map

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U02-L01` NARRATOR: Tavri unrolls a map of the palace whose hallways have been annotated with tiny jokes.
- `TAV-ORD-POST-U02-L02` TAVRI [PLAYFUL]: “This corridor is labeled “certain doom.” It leads to a linen cupboard.”
- `TAV-ORD-POST-U02-L03` PLAYER: “Did you make this?”
- `TAV-ORD-POST-U02-L04` TAVRI [NEUTRAL]: “Anonymously. The laundry staff deserves their own legend.”

**Choice point `TAV-ORD-POST-U02-C1` (choose exactly one):**

1. `TAV-ORD-POST-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “The jokes are funny, but maybe let the staff decide whether to share them.”
   - `TAV-ORD-POST-U02-R-YES-01` TAVRI [PLAYFUL]: “Fair. I would rather give someone a laugh than make them the punch line.”
   - **Outcome:** `TAV-ORD-POST-U02-O-YES`.
2. `TAV-ORD-POST-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should publish it with everyone’s names beside their mistakes.”
   - `TAV-ORD-POST-U02-R-NO-01` TAVRI [WORRIED]: “That would turn a silly map into a list of targets.”
   - **Outcome:** `TAV-ORD-POST-U02-O-NO`.

**END `TAV-ORD-POST-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-POST-U03 — A Blank Playbill

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U03-L01` NARRATOR: Someone has left a blank playbill near the princess.
- `TAV-ORD-POST-U03-L02` TAVRI [PLAYFUL]: “There are no instructions on it. I find that more intimidating than opening night.”
- `TAV-ORD-POST-U03-L03` PLAYER: “What would you put on the program?”
- `TAV-ORD-POST-U03-L04` TAVRI [NEUTRAL]: “Perhaps one scene in which everyone can be ordinary and nobody leaves.”

**Choice point `TAV-ORD-POST-U03-C1` (choose exactly one):**

1. `TAV-ORD-POST-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We could call it “A Day with No Auditions.””
   - `TAV-ORD-POST-U03-R-YES-01` TAVRI [PLAYFUL]: “A terrible title for ticket sales. A perfect title for us.”
   - **Outcome:** `TAV-ORD-POST-U03-O-YES`.
2. `TAV-ORD-POST-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Your greatest speeches, obviously. People want the highlights.”
   - `TAV-ORD-POST-U03-R-NO-01` TAVRI [WORRIED]: “Perhaps. But I would like a few moments that are not highlights.”
   - **Outcome:** `TAV-ORD-POST-U03-O-NO`.
3. `TAV-ORD-POST-U03-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “You are only worth spending time with when you entertain me.”
   - `TAV-ORD-POST-U03-R-OFF-01` TAVRI [ANNOYED]: “Then our time together will be shorter than you expect.”
   - **Outcome:** `TAV-ORD-POST-U03-O-OFF`.

**END `TAV-ORD-POST-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-POST-U04 — The Unfinished Joke

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U04-L01` NARRATOR: Tavri starts a joke, then stops halfway, smiling at the absurdity.
- `TAV-ORD-POST-U04-L02` TAVRI [PLAYFUL]: “A fox princess walks into a—oh, I have forgotten the ending.”
- `TAV-ORD-POST-U04-L03` PLAYER: “Do you want help remembering?”
- `TAV-ORD-POST-U04-L04` TAVRI [NEUTRAL]: “Not particularly. I am enjoying the fact that nothing terrible has happened.”

**Choice point `TAV-ORD-POST-U04-C1` (choose exactly one):**

1. `TAV-ORD-POST-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Then the joke can stay unfinished.”
   - `TAV-ORD-POST-U04-R-YES-01` TAVRI [PLAYFUL]: “You are dangerously easy to be imperfect around.”
   - **Outcome:** `TAV-ORD-POST-U04-O-YES`.
2. `TAV-ORD-POST-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Try harder. The setup deserves a better ending.”
   - `TAV-ORD-POST-U04-R-NO-01` TAVRI [WORRIED]: “It seems the pressure has returned for an encore.”
   - **Outcome:** `TAV-ORD-POST-U04-O-NO`.

**END `TAV-ORD-POST-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-POST-U05 — Weather Without Metaphors

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U05-L01` NARRATOR: A breeze lifts Tavri’s hair, and she waits as if preparing a grand pronouncement.
- `TAV-ORD-POST-U05-L02` TAVRI [PLAYFUL]: “I was about to compare the wind to the ambitions of kings.”
- `TAV-ORD-POST-U05-L03` PLAYER: “And then?”
- `TAV-ORD-POST-U05-L04` TAVRI [NEUTRAL]: “Then I remembered it is just wind, and it is pleasant.”

**Choice point `TAV-ORD-POST-U05-C1` (choose exactly one):**

1. `TAV-ORD-POST-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can enjoy it without making it mean something.”
   - `TAV-ORD-POST-U05-R-YES-01` TAVRI [PLAYFUL]: “A lovely revolutionary philosophy, {PLAYER}.”
   - **Outcome:** `TAV-ORD-POST-U05-O-YES`.
2. `TAV-ORD-POST-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “A proper princess should turn every moment into a story.”
   - `TAV-ORD-POST-U05-R-NO-01` TAVRI [WORRIED]: “That is exactly the habit I am trying to put down.”
   - **Outcome:** `TAV-ORD-POST-U05-O-NO`.

**END `TAV-ORD-POST-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-POST-U06 — An Ordinary Laugh

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U06-L01` NARRATOR: Tavri laughs suddenly at a minor inconvenience, unpolished and unmistakably sincere.
- `TAV-ORD-POST-U06-L02` TAVRI [PLAYFUL]: “Oh, that was an awful noise. My public image may never recover.”
- `TAV-ORD-POST-U06-L03` PLAYER: “It sounded like you were having fun.”
- `TAV-ORD-POST-U06-L04` TAVRI [NEUTRAL]: “An outrageous accusation.”

**Choice point `TAV-ORD-POST-U06-C1` (choose exactly one):**

1. `TAV-ORD-POST-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I hope I get to hear that laugh again, if you feel like it.”
   - `TAV-ORD-POST-U06-R-YES-01` TAVRI [PLAYFUL]: “You probably will. It keeps escaping when you are around.”
   - **Outcome:** `TAV-ORD-POST-U06-O-YES`.
2. `TAV-ORD-POST-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Practice a more elegant one for the court.”
   - `TAV-ORD-POST-U06-R-NO-01` TAVRI [WORRIED]: “I think I have practiced enough for one lifetime.”
   - **Outcome:** `TAV-ORD-POST-U06-O-NO`.

**END `TAV-ORD-POST-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-POST-F01 — Invitation Without a Script

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-F01-L01` NARRATOR: Tavri holds out a blank scrap of paper like a formal invitation.
- `TAV-ORD-POST-F01-L02` TAVRI [PLAYFUL]: “You are invited to an extremely exclusive occasion: a conversation with no itinerary.”
- `TAV-ORD-POST-F01-L03` PLAYER: “What is the dress code?”
- `TAV-ORD-POST-F01-L04` TAVRI [NEUTRAL]: “Comfortable uncertainty.”

**Choice point `TAV-ORD-POST-F01-C1` (choose exactly one):**

1. `TAV-ORD-POST-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I accept, no agenda required.”
   - `TAV-ORD-POST-F01-R-YES-01` TAVRI [PLAYFUL]: “Splendid. I shall be the least prepared hostess in history.”
   - **Outcome:** `TAV-ORD-POST-F01-O-YES`.
2. `TAV-ORD-POST-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “At least write a few jokes beforehand.”
   - `TAV-ORD-POST-F01-R-NO-01` TAVRI [WORRIED]: “That seems to defeat the purpose of this exclusive event.”
   - **Outcome:** `TAV-ORD-POST-F01-O-NO`.

**END `TAV-ORD-POST-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-POST-F02 — Sensible Shoes

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-F02-L01` NARRATOR: Tavri glances at her elegant shoes with theatrical suspicion.
- `TAV-ORD-POST-F02-L02` TAVRI [PLAYFUL]: “These are excellent for entrances and terrible for leaving a room discreetly.”
- `TAV-ORD-POST-F02-L03` PLAYER: “What would you choose instead?”
- `TAV-ORD-POST-F02-L04` TAVRI [NEUTRAL]: “Something that lets me decide where to go next.”

**Choice point `TAV-ORD-POST-F02-C1` (choose exactly one):**

1. `TAV-ORD-POST-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Then choose what lets you move comfortably.”
   - `TAV-ORD-POST-F02-R-YES-01` TAVRI [PLAYFUL]: “Good. You shall be my adviser in the shocking field of practical decisions.”
   - **Outcome:** `TAV-ORD-POST-F02-O-YES`.
2. `TAV-ORD-POST-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Appearances first. A princess should endure them.”
   - `TAV-ORD-POST-F02-R-NO-01` TAVRI [WORRIED]: “I have endured quite enough for a small pair of shoes.”
   - **Outcome:** `TAV-ORD-POST-F02-O-NO`.

**END `TAV-ORD-POST-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### TAV-ORD-POST-F03 — The Space Between Jokes

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-F03-L01` NARRATOR: Tavri starts to raise an eyebrow, then lets the joke pass.
- `TAV-ORD-POST-F03-L02` TAVRI [PLAYFUL]: “I was going to make fun of that sign, but perhaps I just want to look at it.”
- `TAV-ORD-POST-F03-L03` PLAYER: “You can do that.”
- `TAV-ORD-POST-F03-L04` TAVRI [NEUTRAL]: “You say that as though leisure were legal.”

**Choice point `TAV-ORD-POST-F03-C1` (choose exactly one):**

1. `TAV-ORD-POST-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I like the moments between your jokes, too.”
   - `TAV-ORD-POST-F03-R-YES-01` TAVRI [PLAYFUL]: “Then I will stop trying to make every moment earn its place.”
   - **Outcome:** `TAV-ORD-POST-F03-O-YES`.
2. `TAV-ORD-POST-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You are getting less entertaining.”
   - `TAV-ORD-POST-F03-R-NO-01` TAVRI [WORRIED]: “I would rather be honestly dull than endlessly on command.”
   - **Outcome:** `TAV-ORD-POST-F03-O-NO`.

**END `TAV-ORD-POST-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


---

## Nerelle ordinary conversation catalog


### Pre-midpoint (`NER-ORD-PRE-*`)


#### NER-ORD-PRE-U01 — The Tide Clock

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U01-L01` NARRATOR: A floating marker taps the waterside stone at an even rhythm. Nerelle watches the current carry it back.
- `NER-ORD-PRE-U01-L02` NERELLE [NEUTRAL]: “Surface clocks insist every hour is the same length. The tides are less obedient.”
- `NER-ORD-PRE-U01-L03` PLAYER: “You prefer tidekeeping?”
- `NER-ORD-PRE-U01-L04` NERELLE [NEUTRAL]: “I prefer knowing which clock is answering which question.”

**Choice point `NER-ORD-PRE-U01-C1` (choose exactly one):**

1. `NER-ORD-PRE-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Different measures suit different needs. You know your waters best.”
   - `NER-ORD-PRE-U01-R-YES-01` NERELLE [NEUTRAL]: “Exactly. A good chart does not ask the sea to behave like a hallway.”
   - **Outcome:** `NER-ORD-PRE-U01-O-YES`.
2. `NER-ORD-PRE-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “One clock is simpler. Make the sea match the schedule.”
   - `NER-ORD-PRE-U01-R-NO-01` NERELLE [WORRIED]: “If you discover how, please inform the moon before the council.”
   - **Outcome:** `NER-ORD-PRE-U01-O-NO`.

**END `NER-ORD-PRE-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-PRE-U02 — Bells Underwater

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U02-L01` NARRATOR: A distant bell rings above the waterfront. Nerelle lifts her head to listen.
- `NER-ORD-PRE-U02-L02` NERELLE [NEUTRAL]: “That bell sounds quite different beneath the surface. The low notes travel farther.”
- `NER-ORD-PRE-U02-L03` PLAYER: “Do you hear anything else?”
- `NER-ORD-PRE-U02-L04` NERELLE [PLAYFUL]: “Mostly boats. Their owners assume that because I am underwater I cannot complain.”

**Choice point `NER-ORD-PRE-U02-C1` (choose exactly one):**

1. `NER-ORD-PRE-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I’d like to hear how the world sounds from where you are.”
   - `NER-ORD-PRE-U02-R-YES-01` NERELLE [NEUTRAL]: “An excellent question. Listening is more useful than shouting louder.”
   - **Outcome:** `NER-ORD-PRE-U02-O-YES`.
2. `NER-ORD-PRE-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “If the boats are loud, you should just swim somewhere else.”
   - `NER-ORD-PRE-U02-R-NO-01` NERELLE [WORRIED]: “I have responsibilities here. The boats could also show some courtesy.”
   - **Outcome:** `NER-ORD-PRE-U02-O-NO`.
3. `NER-ORD-PRE-U02-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “Maybe people would listen if you stopped being a strange sea creature.”
   - `NER-ORD-PRE-U02-R-OFF-01` NERELLE [ANNOYED]: “My hearing works perfectly, including when someone is deliberately insulting.”
   - **Outcome:** `NER-ORD-PRE-U02-O-OFF`.

**END `NER-ORD-PRE-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-PRE-U03 — Quayside Etiquette

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U03-L01` NARRATOR: Two nearby visitors struggle to decide whether they should bow to Nerelle or wave.
- `NER-ORD-PRE-U03-L02` NERELLE [NEUTRAL]: “It appears etiquette has reached an impasse. The hand gestures are becoming competitive.”
- `NER-ORD-PRE-U03-L03` PLAYER: “Is there a rule?”
- `NER-ORD-PRE-U03-L04` NERELLE [NEUTRAL]: “For greeting me? A kind word works wonderfully.”

**Choice point `NER-ORD-PRE-U03-C1` (choose exactly one):**

1. `NER-ORD-PRE-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I can ask how you prefer to be greeted.”
   - `NER-ORD-PRE-U03-R-YES-01` NERELLE [NEUTRAL]: “You have just outperformed three ceremonial committees.”
   - **Outcome:** `NER-ORD-PRE-U03-O-YES`.
2. `NER-ORD-PRE-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “People ought to bow. You are royalty.”
   - `NER-ORD-PRE-U03-R-NO-01` NERELLE [WORRIED]: “Some might choose to. I would rather they spoke to me.”
   - **Outcome:** `NER-ORD-PRE-U03-O-NO`.

**END `NER-ORD-PRE-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-PRE-U04 — The Gulls’ Petition

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U04-L01` NARRATOR: A gull steals a bit of ribbon from a mooring post, then drops it back into the water.
- `NER-ORD-PRE-U04-L02` NERELLE [NEUTRAL]: “I think the gulls are petitioning for better harbor decorations.”
- `NER-ORD-PRE-U04-L03` PLAYER: “What does their petition say?”
- `NER-ORD-PRE-U04-L04` NERELLE [PLAYFUL]: “Mostly that they approve of unattended crumbs.”

**Choice point `NER-ORD-PRE-U04-C1` (choose exactly one):**

1. `NER-ORD-PRE-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Perhaps we should keep the quay tidy and let them find food naturally.”
   - `NER-ORD-PRE-U04-R-YES-01` NERELLE [NEUTRAL]: “The harbor birds would protest. The fish would thank you.”
   - **Outcome:** `NER-ORD-PRE-U04-O-YES`.
2. `NER-ORD-PRE-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “We can toss them anything they want.”
   - `NER-ORD-PRE-U04-R-NO-01` NERELLE [WORRIED]: “Please do not train the harbor to expect scraps at every railing.”
   - **Outcome:** `NER-ORD-PRE-U04-O-NO`.

**END `NER-ORD-PRE-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-PRE-U05 — Wave Notation

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U05-L01` NARRATOR: Nerelle draws an elegant curve on the wet stone with one finger.
- `NER-ORD-PRE-U05-L02` NERELLE [NEUTRAL]: “My court records current strength with marks like these. What did your world use?”
- `NER-ORD-PRE-U05-L03` PLAYER: “Usually graphs. And arguments about the graphs.”
- `NER-ORD-PRE-U05-L04` NERELLE [NEUTRAL]: “An argument is a universal scientific instrument.”

**Choice point `NER-ORD-PRE-U05-C1` (choose exactly one):**

1. `NER-ORD-PRE-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Your markings tell the story clearly. Could you show me how to read them?”
   - `NER-ORD-PRE-U05-R-YES-01` NERELLE [NEUTRAL]: “Gladly. Curiosity travels well across borders.”
   - **Outcome:** `NER-ORD-PRE-U05-O-YES`.
2. `NER-ORD-PRE-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “My graphs were probably better. You should switch to them.”
   - `NER-ORD-PRE-U05-R-NO-01` NERELLE [WORRIED]: “Then you have arrived with a verdict before seeing the evidence.”
   - **Outcome:** `NER-ORD-PRE-U05-O-NO`.

**END `NER-ORD-PRE-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-PRE-U06 — Reflections of the City

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U06-L01` NARRATOR: The buildings shimmer upside down in the water beside Nerelle.
- `NER-ORD-PRE-U06-L02` NERELLE [NEUTRAL]: “From down here, your city looks as if it were built beneath mine.”
- `NER-ORD-PRE-U06-L03` PLAYER: “Does that make it stranger?”
- `NER-ORD-PRE-U06-L04` NERELLE [PLAYFUL]: “Only until the next ripple. Then it belongs to both worlds for a moment.”

**Choice point `NER-ORD-PRE-U06-C1` (choose exactly one):**

1. `NER-ORD-PRE-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I like that you see something different without calling either view wrong.”
   - `NER-ORD-PRE-U06-R-YES-01` NERELLE [NEUTRAL]: “A rare compliment: one that does not demand I abandon my own view.”
   - **Outcome:** `NER-ORD-PRE-U06-O-YES`.
2. `NER-ORD-PRE-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “The real city is up here. The reflection is just a copy.”
   - `NER-ORD-PRE-U06-R-NO-01` NERELLE [WORRIED]: “A copy can still teach you what you missed from the shore.”
   - **Outcome:** `NER-ORD-PRE-U06-O-NO`.

**END `NER-ORD-PRE-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-PRE-F01 — A Surface Expression

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-F01-L01` NARRATOR: Nerelle considers a phrase she overheard near the waterfront.
- `NER-ORD-PRE-F01-L02` NERELLE [NEUTRAL]: “Someone said a meeting had “gone swimmingly.” Is that praise or a warning?”
- `NER-ORD-PRE-F01-L03` PLAYER: “Usually praise.”
- `NER-ORD-PRE-F01-L04` NERELLE [NEUTRAL]: “A pity. Swimming is sometimes quite difficult.”

**Choice point `NER-ORD-PRE-F01-C1` (choose exactly one):**

1. `NER-ORD-PRE-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Maybe the phrase borrowed your skill without understanding it.”
   - `NER-ORD-PRE-F01-R-YES-01` NERELLE [NEUTRAL]: “Then I shall submit an extremely polite linguistic complaint.”
   - **Outcome:** `NER-ORD-PRE-F01-O-YES`.
2. `NER-ORD-PRE-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “It means all swimming is easy, obviously.”
   - `NER-ORD-PRE-F01-R-NO-01` NERELLE [WORRIED]: “You may wish to discuss that with a strong current.”
   - **Outcome:** `NER-ORD-PRE-F01-O-NO`.

**END `NER-ORD-PRE-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-PRE-F02 — The Floating Leaf

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-F02-L01` NARRATOR: A leaf circles beside Nerelle without quite moving away.
- `NER-ORD-PRE-F02-L02` NERELLE [NEUTRAL]: “This leaf has been following me for several minutes. I suspect an appointment.”
- `NER-ORD-PRE-F02-L03` PLAYER: “Does it need your signature?”
- `NER-ORD-PRE-F02-L04` NERELLE [PLAYFUL]: “I do not recall issuing permits to leaves.”

**Choice point `NER-ORD-PRE-F02-C1` (choose exactly one):**

1. `NER-ORD-PRE-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Perhaps it simply found a calm place to drift.”
   - `NER-ORD-PRE-F02-R-YES-01` NERELLE [NEUTRAL]: “A reasonable ambition. The council could learn from it.”
   - **Outcome:** `NER-ORD-PRE-F02-O-YES`.
2. `NER-ORD-PRE-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should keep it as proof of your authority.”
   - `NER-ORD-PRE-F02-R-NO-01` NERELLE [WORRIED]: “I doubt a leaf would appreciate being drafted into office.”
   - **Outcome:** `NER-ORD-PRE-F02-O-NO`.

**END `NER-ORD-PRE-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-PRE-F03 — A Knot of Questions

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-F03-L01` NARRATOR: Nerelle examines the knot securing a small floating marker.
- `NER-ORD-PRE-F03-L02` NERELLE [NEUTRAL]: “A sailor taught me that knot, then insisted his grandmother invented it.”
- `NER-ORD-PRE-F03-L03` PLAYER: “Did she?”
- `NER-ORD-PRE-F03-L04` NERELLE [NEUTRAL]: “Possibly. Six other grandmothers have made the same claim.”

**Choice point `NER-ORD-PRE-F03-C1` (choose exactly one):**

1. `NER-ORD-PRE-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Maybe you can admire the knot without settling its ancestry.”
   - `NER-ORD-PRE-F03-R-YES-01` NERELLE [NEUTRAL]: “A relief. Maritime diplomacy is exhausting enough.”
   - **Outcome:** `NER-ORD-PRE-F03-O-YES`.
2. `NER-ORD-PRE-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Tell the sailor he is wrong. Every argument needs a winner.”
   - `NER-ORD-PRE-F03-R-NO-01` NERELLE [WORRIED]: “Not every useful discovery requires a dispute.”
   - **Outcome:** `NER-ORD-PRE-F03-O-NO`.

**END `NER-ORD-PRE-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


### Post-midpoint (`NER-ORD-POST-*`)


#### NER-ORD-POST-U01 — Two Sets of Letters

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U01-L01` NARRATOR: Nerelle unfolds a waterproof letter at water level.
- `NER-ORD-POST-U01-L02` NERELLE [NEUTRAL]: “One letter asks about the shoreline. Another asks about conditions offshore. Both are important.”
- `NER-ORD-POST-U01-L03` PLAYER: “Are they from your court?”
- `NER-ORD-POST-U01-L04` NERELLE [NEUTRAL]: “Yes. They trust me to make careful decisions, not simply choose a side.”

**Choice point `NER-ORD-POST-U01-C1` (choose exactly one):**

1. `NER-ORD-POST-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You can answer both in your own way. I’ll listen if you want to talk it through.”
   - `NER-ORD-POST-U01-R-YES-01` NERELLE [NEUTRAL]: “Thank you. I would prefer a sounding board to a second sovereign.”
   - **Outcome:** `NER-ORD-POST-U01-O-YES`.
2. `NER-ORD-POST-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Leave the sea’s concerns behind. You have enough on the surface.”
   - `NER-ORD-POST-U01-R-NO-01` NERELLE [WORRIED]: “I will not treat people I serve as disposable.”
   - **Outcome:** `NER-ORD-POST-U01-O-NO`.
3. `NER-ORD-POST-U01-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “Abandon the ocean court. Your obligations matter less than being with me.”
   - `NER-ORD-POST-U01-R-OFF-01` NERELLE [ANNOYED]: “I will not trade my responsibilities for anyone’s possession of me.”
   - **Outcome:** `NER-ORD-POST-U01-O-OFF`.

**END `NER-ORD-POST-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-POST-U02 — The Map’s Edge

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U02-L01` NARRATOR: A damp map rests on the stones, its sea lanes drawn more carefully than its roads.
- `NER-ORD-POST-U02-L02` NERELLE [NEUTRAL]: “Mapmakers have a habit of drawing one world in detail and the other as blank space.”
- `NER-ORD-POST-U02-L03` PLAYER: “Which side bothers you more?”
- `NER-ORD-POST-U02-L04` NERELLE [PLAYFUL]: “Whichever someone assumes I cannot understand.”

**Choice point `NER-ORD-POST-U02-C1` (choose exactly one):**

1. `NER-ORD-POST-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “What should a map include to respect both travelers?”
   - `NER-ORD-POST-U02-R-YES-01` NERELLE [NEUTRAL]: “Paths that are real for each of them. That is a much better starting point.”
   - **Outcome:** `NER-ORD-POST-U02-O-YES`.
2. `NER-ORD-POST-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Put roads everywhere. Then nobody will get lost.”
   - `NER-ORD-POST-U02-R-NO-01` NERELLE [WORRIED]: “Roads are rarely an improvement to deep water.”
   - **Outcome:** `NER-ORD-POST-U02-O-NO`.

**END `NER-ORD-POST-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-POST-U03 — A Quiet Current

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U03-L01` NARRATOR: Nerelle listens to the movement of water against the stone instead of speaking at once.
- `NER-ORD-POST-U03-L02` NERELLE [NEUTRAL]: “Sometimes the current tells me more if I wait a moment.”
- `NER-ORD-POST-U03-L03` PLAYER: “We could wait.”
- `NER-ORD-POST-U03-L04` NERELLE [NEUTRAL]: “Are you sure? Surface people seem to fear pauses.”

**Choice point `NER-ORD-POST-U03-C1` (choose exactly one):**

1. `NER-ORD-POST-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I’m in no hurry to fill the silence.”
   - `NER-ORD-POST-U03-R-YES-01` NERELLE [NEUTRAL]: “Then we can have a very good conversation without much talking.”
   - **Outcome:** `NER-ORD-POST-U03-O-YES`.
2. `NER-ORD-POST-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Shouldn’t you decide faster? Your people need answers.”
   - `NER-ORD-POST-U03-R-NO-01` NERELLE [WORRIED]: “They need considered answers. Speed is not always care.”
   - **Outcome:** `NER-ORD-POST-U03-O-NO`.

**END `NER-ORD-POST-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-POST-U04 — Advice and Orders

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U04-L01` NARRATOR: A nearby clerk mistakes Nerelle’s question for an order and begins scribbling.
- `NER-ORD-POST-U04-L02` NERELLE [NEUTRAL]: “I asked whether the lanterns were safe. Apparently that has become a decree.”
- `NER-ORD-POST-U04-L03` PLAYER: “Should we stop the clerk?”
- `NER-ORD-POST-U04-L04` NERELLE [PLAYFUL]: “Please. I would prefer questions to remain possible.”

**Choice point `NER-ORD-POST-U04-C1` (choose exactly one):**

1. `NER-ORD-POST-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Let’s clarify what you meant, and let you decide what happens next.”
   - `NER-ORD-POST-U04-R-YES-01` NERELLE [NEUTRAL]: “Excellent. My voice can survive the translation intact.”
   - **Outcome:** `NER-ORD-POST-U04-O-YES`.
2. `NER-ORD-POST-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “An order would be easier. Let the clerk invent one.”
   - `NER-ORD-POST-U04-R-NO-01` NERELLE [WORRIED]: “Convenience is an unreliable substitute for consent.”
   - **Outcome:** `NER-ORD-POST-U04-O-NO`.

**END `NER-ORD-POST-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-POST-U05 — A Weather Permit

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U05-L01` NARRATOR: A sheet of official paper has blown into the water. Nerelle retrieves it and squints.
- `NER-ORD-POST-U05-L02` NERELLE [NEUTRAL]: “A surface office has issued permission for favorable weather. That seems ambitious.”
- `NER-ORD-POST-U05-L03` PLAYER: “Does the sea council do anything similar?”
- `NER-ORD-POST-U05-L04` NERELLE [NEUTRAL]: “We issue warnings, not commands to clouds. The distinction saves embarrassment.”

**Choice point `NER-ORD-POST-U05-C1` (choose exactly one):**

1. `NER-ORD-POST-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Useful advice beats pretending you control the weather.”
   - `NER-ORD-POST-U05-R-YES-01` NERELLE [NEUTRAL]: “If only every office believed that.”
   - **Outcome:** `NER-ORD-POST-U05-O-YES`.
2. `NER-ORD-POST-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Perhaps you should claim authority over storms, too.”
   - `NER-ORD-POST-U05-R-NO-01` NERELLE [WORRIED]: “I have no wish to become personally responsible for thunder.”
   - **Outcome:** `NER-ORD-POST-U05-O-NO`.

**END `NER-ORD-POST-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-POST-U06 — A Changed Tide

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U06-L01` NARRATOR: The tide has turned, and the mooring ropes hang at a different angle.
- `NER-ORD-POST-U06-L02` NERELLE [NEUTRAL]: “The harbor looks familiar, but every current has shifted since we last looked.”
- `NER-ORD-POST-U06-L03` PLAYER: “Does that trouble you?”
- `NER-ORD-POST-U06-L04` NERELLE [PLAYFUL]: “No. A changing place is still home if I can choose how to move through it.”

**Choice point `NER-ORD-POST-U06-C1` (choose exactly one):**

1. `NER-ORD-POST-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I’m glad you can make those choices without needing my permission.”
   - `NER-ORD-POST-U06-R-YES-01` NERELLE [NEUTRAL]: “And I am glad you keep reminding me it is not a lonely task.”
   - **Outcome:** `NER-ORD-POST-U06-O-YES`.
2. `NER-ORD-POST-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should settle on one route and never change it.”
   - `NER-ORD-POST-U06-R-NO-01` NERELLE [WORRIED]: “A route that never adapts is a danger at sea.”
   - **Outcome:** `NER-ORD-POST-U06-O-NO`.

**END `NER-ORD-POST-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-POST-F01 — The Shore and the Sea

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-F01-L01` NARRATOR: Nerelle watches the surface light fracture over a small wave.
- `NER-ORD-POST-F01-L02` NERELLE [NEUTRAL]: “Someone asked whether I am thinking like a mermaid or a princess today.”
- `NER-ORD-POST-F01-L03` PLAYER: “What did you say?”
- `NER-ORD-POST-F01-L04` NERELLE [NEUTRAL]: “I said the question was missing a few possibilities.”

**Choice point `NER-ORD-POST-F01-C1` (choose exactly one):**

1. `NER-ORD-POST-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You do not have to divide yourself for their convenience.”
   - `NER-ORD-POST-F01-R-YES-01` NERELLE [NEUTRAL]: “That is the most useful answer I have heard all day.”
   - **Outcome:** `NER-ORD-POST-F01-O-YES`.
2. `NER-ORD-POST-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “They have a point. Choose one identity.”
   - `NER-ORD-POST-F01-R-NO-01` NERELLE [WORRIED]: “I have never found myself improved by being halved.”
   - **Outcome:** `NER-ORD-POST-F01-O-NO`.

**END `NER-ORD-POST-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-POST-F02 — Festival Ribbon

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-F02-L01` NARRATOR: A loose decorative ribbon bobs against a waterside post.
- `NER-ORD-POST-F02-L02` NERELLE [NEUTRAL]: “People can make ceremonies complicated enough to scare the tide away.”
- `NER-ORD-POST-F02-L03` PLAYER: “Should we rescue this ribbon?”
- `NER-ORD-POST-F02-L04` NERELLE [PLAYFUL]: “Only if it would otherwise tangle a boat.”

**Choice point `NER-ORD-POST-F02-C1` (choose exactly one):**

1. `NER-ORD-POST-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Let’s keep the water clear, then leave the celebrating to people.”
   - `NER-ORD-POST-F02-R-YES-01` NERELLE [NEUTRAL]: “A sensible ordering of priorities. The fish agree.”
   - **Outcome:** `NER-ORD-POST-F02-O-YES`.
2. `NER-ORD-POST-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “We should decorate every patch of water.”
   - `NER-ORD-POST-F02-R-NO-01` NERELLE [WORRIED]: “The sea already has a rather successful decorating department.”
   - **Outcome:** `NER-ORD-POST-F02-O-NO`.

**END `NER-ORD-POST-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### NER-ORD-POST-F03 — The Shared Horizon

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-F03-L01` NARRATOR: Nerelle traces the far shore with her gaze.
- `NER-ORD-POST-F03-L02` NERELLE [NEUTRAL]: “From this level, I can see the same towers you can. The horizon just frames them differently.”
- `NER-ORD-POST-F03-L03` PLAYER: “I like that.”
- `NER-ORD-POST-F03-L04` NERELLE [NEUTRAL]: “There is room for more than one good vantage point.”

**Choice point `NER-ORD-POST-F03-C1` (choose exactly one):**

1. `NER-ORD-POST-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can keep sharing what each of us notices.”
   - `NER-ORD-POST-F03-R-YES-01` NERELLE [NEUTRAL]: “I would like that very much.”
   - **Outcome:** `NER-ORD-POST-F03-O-YES`.
2. `NER-ORD-POST-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Mine is the proper view, though.”
   - `NER-ORD-POST-F03-R-NO-01` NERELLE [WORRIED]: “A remarkably quick way to stop learning.”
   - **Outcome:** `NER-ORD-POST-F03-O-NO`.

**END `NER-ORD-POST-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


---

## Kaedra ordinary conversation catalog


### Pre-midpoint (`KAE-ORD-PRE-*`)


#### KAE-ORD-PRE-U01 — The Doorway Debate

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U01-L01` NARRATOR: A nearby attendant looks uncertain whether a stone archway offers Kaedra enough room for her folded wings.
- `KAE-ORD-PRE-U01-L02` KAEDRA [NEUTRAL]: “I appreciate the concern. I have passed through narrower archways than this.”
- `KAE-ORD-PRE-U01-L03` PLAYER: “Are they trying to help?”
- `KAE-ORD-PRE-U01-L04` KAEDRA [NEUTRAL]: “Probably. They have not yet asked me what I need.”

**Choice point `KAE-ORD-PRE-U01-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We could ask you instead of deciding for you.”
   - `KAE-ORD-PRE-U01-R-YES-01` KAEDRA [NEUTRAL]: “Excellent. The answer is that I need the door to remain a door.”
   - **Outcome:** `KAE-ORD-PRE-U01-O-YES`.
2. `KAE-ORD-PRE-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “They should clear the entire building. You look dangerous.”
   - `KAE-ORD-PRE-U01-R-NO-01` KAEDRA [WORRIED]: “There is a difference between making space and making a spectacle.”
   - **Outcome:** `KAE-ORD-PRE-U01-O-NO`.
3. `KAE-ORD-PRE-U01-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “Maybe they fear you because you look monstrous.”
   - `KAE-ORD-PRE-U01-R-OFF-01` KAEDRA [ANNOYED]: “My appearance does not make me less a person.”
   - **Outcome:** `KAE-ORD-PRE-U01-O-OFF`.

**END `KAE-ORD-PRE-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-PRE-U02 — The Safety Manual

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U02-L01` NARRATOR: A maintenance notice has been rewritten so often that its margins are full of tiny corrections.
- `KAE-ORD-PRE-U02-L02` KAEDRA [NEUTRAL]: “A committee spent four meetings deciding whether a loose stair counts as an emergency.”
- `KAE-ORD-PRE-U02-L03` PLAYER: “Did they repair it?”
- `KAE-ORD-PRE-U02-L04` KAEDRA [NEUTRAL]: “No. But the report is beautifully bound.”

**Choice point `KAE-ORD-PRE-U02-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “A repair matters more than a perfect report.”
   - `KAE-ORD-PRE-U02-R-YES-01` KAEDRA [NEUTRAL]: “A revolutionary concept. I shall alert the carpenters immediately.”
   - **Outcome:** `KAE-ORD-PRE-U02-O-YES`.
2. `KAE-ORD-PRE-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “At least the paperwork looks professional.”
   - `KAE-ORD-PRE-U02-R-NO-01` KAEDRA [WORRIED]: “The staircase remains unimpressed.”
   - **Outcome:** `KAE-ORD-PRE-U02-O-NO`.

**END `KAE-ORD-PRE-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-PRE-U03 — The Wobbly Display

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U03-L01` NARRATOR: A wooden display stand leans slightly to one side. Kaedra corrects its footing with practiced care.
- `KAE-ORD-PRE-U03-L02` KAEDRA [NEUTRAL]: “Someone suggested I simply smash it to save time.”
- `KAE-ORD-PRE-U03-L03` PLAYER: “Would that help?”
- `KAE-ORD-PRE-U03-L04` KAEDRA [NEUTRAL]: “It would make a satisfying noise and create a new procurement request.”

**Choice point `KAE-ORD-PRE-U03-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Stability seems the better solution.”
   - `KAE-ORD-PRE-U03-R-YES-01` KAEDRA [NEUTRAL]: “I am glad someone appreciates the less dramatic kind of strength.”
   - **Outcome:** `KAE-ORD-PRE-U03-O-YES`.
2. `KAE-ORD-PRE-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Smashing it would prove how powerful you are.”
   - `KAE-ORD-PRE-U03-R-NO-01` KAEDRA [WORRIED]: “Power is not proof of good judgment.”
   - **Outcome:** `KAE-ORD-PRE-U03-O-NO`.

**END `KAE-ORD-PRE-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-PRE-U04 — Warm Hands, Cold Rumors

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U04-L01` NARRATOR: A nervous passerby steps away when Kaedra warms her hands near a lantern.
- `KAE-ORD-PRE-U04-L02` KAEDRA [NEUTRAL]: “There appears to be a rumor that I set buildings ablaze by sneezing.”
- `KAE-ORD-PRE-U04-L03` PLAYER: “Is it true?”
- `KAE-ORD-PRE-U04-L04` KAEDRA [NEUTRAL]: “Only if buildings are made of exceptionally nervous paper.”

**Choice point `KAE-ORD-PRE-U04-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “That sounds frustrating. How would you like to handle it?”
   - `KAE-ORD-PRE-U04-R-YES-01` KAEDRA [NEUTRAL]: “By correcting it calmly. Thank you for asking first.”
   - **Outcome:** `KAE-ORD-PRE-U04-O-YES`.
2. `KAE-ORD-PRE-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Maybe you should pretend to breathe fire so they respect you.”
   - `KAE-ORD-PRE-U04-R-NO-01` KAEDRA [WORRIED]: “Fear is not a substitute for respect.”
   - **Outcome:** `KAE-ORD-PRE-U04-O-NO`.

**END `KAE-ORD-PRE-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-PRE-U05 — The Mountain Proverb

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U05-L01` NARRATOR: Kaedra reads a decorative inscription twice before setting it aside.
- `KAE-ORD-PRE-U05-L02` KAEDRA [NEUTRAL]: ““The strongest mountain never bends.” An inspiring saying written by someone who has never seen an avalanche.”
- `KAE-ORD-PRE-U05-L03` PLAYER: “How would you change it?”
- `KAE-ORD-PRE-U05-L04` KAEDRA [NEUTRAL]: “I would praise the bridge that knows when to flex.”

**Choice point `KAE-ORD-PRE-U05-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Strength can mean adjusting when others need it.”
   - `KAE-ORD-PRE-U05-R-YES-01` KAEDRA [NEUTRAL]: “Precisely. Stone and stubbornness are not identical.”
   - **Outcome:** `KAE-ORD-PRE-U05-O-YES`.
2. `KAE-ORD-PRE-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “The mountain sounds right. Never yield to anyone.”
   - `KAE-ORD-PRE-U05-R-NO-01` KAEDRA [WORRIED]: “Then it is a poor teacher of responsibility.”
   - **Outcome:** `KAE-ORD-PRE-U05-O-NO`.

**END `KAE-ORD-PRE-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-PRE-U06 — A Question of Witnesses

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U06-L01` NARRATOR: Two officials debate who should announce that a routine inspection passed. Kaedra waits patiently.
- `KAE-ORD-PRE-U06-L02` KAEDRA [NEUTRAL]: “I inspected the gate. They are discussing whose voice would sound most heroic announcing it.”
- `KAE-ORD-PRE-U06-L03` PLAYER: “Which matters to you?”
- `KAE-ORD-PRE-U06-L04` KAEDRA [NEUTRAL]: “That the gate is safe. The announcement can survive without a hero.”

**Choice point `KAE-ORD-PRE-U06-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can thank everyone who helped and leave the boasting out.”
   - `KAE-ORD-PRE-U06-R-YES-01` KAEDRA [NEUTRAL]: “Good. A functioning gate is applause enough.”
   - **Outcome:** `KAE-ORD-PRE-U06-O-YES`.
2. `KAE-ORD-PRE-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should take all the credit before someone else does.”
   - `KAE-ORD-PRE-U06-R-NO-01` KAEDRA [WORRIED]: “I would prefer to keep the gate standing.”
   - **Outcome:** `KAE-ORD-PRE-U06-O-NO`.

**END `KAE-ORD-PRE-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-PRE-F01 — Polishing the Horns

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-F01-L01` NARRATOR: Kaedra spots her reflection in polished armor and raises an eyebrow.
- `KAE-ORD-PRE-F01-L02` KAEDRA [NEUTRAL]: “A stylist once recommended gold caps for my horns. For formal occasions, naturally.”
- `KAE-ORD-PRE-F01-L03` PLAYER: “Did you want them?”
- `KAE-ORD-PRE-F01-L04` KAEDRA [NEUTRAL]: “I wanted the stylist to stop measuring my head.”

**Choice point `KAE-ORD-PRE-F01-C1` (choose exactly one):**

1. `KAE-ORD-PRE-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Your horns look fine as they are, if that is what you prefer.”
   - `KAE-ORD-PRE-F01-R-YES-01` KAEDRA [NEUTRAL]: “I shall record that as the first sensible consultation.”
   - **Outcome:** `KAE-ORD-PRE-F01-O-YES`.
2. `KAE-ORD-PRE-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “The caps would make you look more frightening.”
   - `KAE-ORD-PRE-F01-R-NO-01` KAEDRA [WORRIED]: “Then they would fulfill precisely the wrong purpose.”
   - **Outcome:** `KAE-ORD-PRE-F01-O-NO`.

**END `KAE-ORD-PRE-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-PRE-F02 — The Quiet Report

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-F02-L01` NARRATOR: Kaedra folds a routine security report into neat thirds.
- `KAE-ORD-PRE-F02-L02` KAEDRA [NEUTRAL]: “The report says nothing happened. It may be the finest document I have ever signed.”
- `KAE-ORD-PRE-F02-L03` PLAYER: “Why is that?”
- `KAE-ORD-PRE-F02-L04` KAEDRA [NEUTRAL]: “Nobody was hurt. The patrols worked. Peace is rarely dramatic.”

**Choice point `KAE-ORD-PRE-F02-C1` (choose exactly one):**

1. `KAE-ORD-PRE-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “That sounds like excellent work.”
   - `KAE-ORD-PRE-F02-R-YES-01` KAEDRA [NEUTRAL]: “Thank you. It is nice when quiet success is recognized.”
   - **Outcome:** `KAE-ORD-PRE-F02-O-YES`.
2. `KAE-ORD-PRE-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “It would be more impressive if there had been a fight.”
   - `KAE-ORD-PRE-F02-R-NO-01` KAEDRA [WORRIED]: “I am employed to prevent those.”
   - **Outcome:** `KAE-ORD-PRE-F02-O-NO`.

**END `KAE-ORD-PRE-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-PRE-F03 — Room for Wings

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-F03-L01` NARRATOR: A railing leaves just enough room for Kaedra to settle her wings comfortably.
- `KAE-ORD-PRE-F03-L02` KAEDRA [NEUTRAL]: “Furniture designers continue to act surprised by the existence of wings.”
- `KAE-ORD-PRE-F03-L03` PLAYER: “Would a wider path help?”
- `KAE-ORD-PRE-F03-L04` KAEDRA [NEUTRAL]: “Occasionally. I am capable of deciding when.”

**Choice point `KAE-ORD-PRE-F03-C1` (choose exactly one):**

1. `KAE-ORD-PRE-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Then tell me what works for you, and I’ll follow your lead.”
   - `KAE-ORD-PRE-F03-R-YES-01` KAEDRA [NEUTRAL]: “How refreshingly free of unsolicited rearrangement.”
   - **Outcome:** `KAE-ORD-PRE-F03-O-YES`.
2. `KAE-ORD-PRE-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should keep your wings out of sight.”
   - `KAE-ORD-PRE-F03-R-NO-01` KAEDRA [WORRIED]: “They are part of me. I do not intend to apologize for them.”
   - **Outcome:** `KAE-ORD-PRE-F03-O-NO`.

**END `KAE-ORD-PRE-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


### Post-midpoint (`KAE-ORD-POST-*`)


#### KAE-ORD-POST-U01 — A Letter of Praise

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U01-L01` NARRATOR: Kaedra reads a glowing letter of commendation, then sets it aside.
- `KAE-ORD-POST-U01-L02` KAEDRA [NEUTRAL]: “Apparently I possess the courage of a thousand soldiers. A logistical nightmare.”
- `KAE-ORD-POST-U01-L03` PLAYER: “Do compliments always sound this grand?”
- `KAE-ORD-POST-U01-L04` KAEDRA [NEUTRAL]: “In my experience, yes. The sender forgot the names of the actual soldiers.”

**Choice point `KAE-ORD-POST-U01-C1` (choose exactly one):**

1. `KAE-ORD-POST-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You could thank the whole team, in your own words.”
   - `KAE-ORD-POST-U01-R-YES-01` KAEDRA [NEUTRAL]: “I shall. Their courage was real, and far more manageable in number.”
   - **Outcome:** `KAE-ORD-POST-U01-O-YES`.
2. `KAE-ORD-POST-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Frame it prominently. People should be in awe of you.”
   - `KAE-ORD-POST-U01-R-NO-01` KAEDRA [WORRIED]: “I would rather they remember who stood beside me.”
   - **Outcome:** `KAE-ORD-POST-U01-O-NO`.

**END `KAE-ORD-POST-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-POST-U02 — Off Duty, Sort Of

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U02-L01` NARRATOR: Kaedra takes a moment to sit where the ground is clear. Her wings relax.
- `KAE-ORD-POST-U02-L02` KAEDRA [NEUTRAL]: “I am told that sitting down is a respectable activity when nothing is on fire.”
- `KAE-ORD-POST-U02-L03` PLAYER: “Does it feel strange?”
- `KAE-ORD-POST-U02-L04` KAEDRA [NEUTRAL]: “A little. I keep expecting someone to issue a report about my posture.”

**Choice point `KAE-ORD-POST-U02-C1` (choose exactly one):**

1. `KAE-ORD-POST-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You can take a rest because you want to. No permission needed.”
   - `KAE-ORD-POST-U02-R-YES-01` KAEDRA [NEUTRAL]: “Then I shall courageously remain seated for another minute.”
   - **Outcome:** `KAE-ORD-POST-U02-O-YES`.
2. `KAE-ORD-POST-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should stay alert. A guardian cannot afford to relax.”
   - `KAE-ORD-POST-U02-R-NO-01` KAEDRA [WORRIED]: “A tired guardian is not a more useful one.”
   - **Outcome:** `KAE-ORD-POST-U02-O-NO`.

**END `KAE-ORD-POST-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-POST-U03 — The Unremarkable Clasp

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U03-L01` NARRATOR: Kaedra checks a decorative clasp, then leaves it alone.
- `KAE-ORD-POST-U03-L02` KAEDRA [NEUTRAL]: “That one is secure. I may be developing a reputation for noticing tiny problems.”
- `KAE-ORD-POST-U03-L03` PLAYER: “That seems useful.”
- `KAE-ORD-POST-U03-L04` KAEDRA [NEUTRAL]: “It is. I simply wish people noticed when I chose not to make them dramatic.”

**Choice point `KAE-ORD-POST-U03-C1` (choose exactly one):**

1. `KAE-ORD-POST-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I notice. You solve problems without needing an audience.”
   - `KAE-ORD-POST-U03-R-YES-01` KAEDRA [NEUTRAL]: “You are becoming a dangerously attentive companion.”
   - **Outcome:** `KAE-ORD-POST-U03-O-YES`.
2. `KAE-ORD-POST-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should make a show of inspecting it.”
   - `KAE-ORD-POST-U03-R-NO-01` KAEDRA [WORRIED]: “Then the show would become the problem.”
   - **Outcome:** `KAE-ORD-POST-U03-O-NO`.

**END `KAE-ORD-POST-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-POST-U04 — A Question of Praise

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U04-L01` NARRATOR: A passerby thanks Kaedra without flinching. She looks faintly startled.
- `KAE-ORD-POST-U04-L02` KAEDRA [NEUTRAL]: “They said “thank you” instead of “please don’t incinerate me.” A pleasant development.”
- `KAE-ORD-POST-U04-L03` PLAYER: “How did that feel?”
- `KAE-ORD-POST-U04-L04` KAEDRA [NEUTRAL]: “New. And quieter than I expected.”

**Choice point `KAE-ORD-POST-U04-C1` (choose exactly one):**

1. `KAE-ORD-POST-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You deserve ordinary kindness, not a constant demonstration of fear.”
   - `KAE-ORD-POST-U04-R-YES-01` KAEDRA [NEUTRAL]: “I could grow accustomed to that.”
   - **Outcome:** `KAE-ORD-POST-U04-O-YES`.
2. `KAE-ORD-POST-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Fear proves they know you are powerful.”
   - `KAE-ORD-POST-U04-R-NO-01` KAEDRA [WORRIED]: “And misses nearly everything I hope to be.”
   - **Outcome:** `KAE-ORD-POST-U04-O-NO`.
3. `KAE-ORD-POST-U04-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “You scare everyone because you are a monster. They are right to fear you.”
   - `KAE-ORD-POST-U04-R-OFF-01` KAEDRA [ANNOYED]: “I am not interested in earning approval by accepting an insult.”
   - **Outcome:** `KAE-ORD-POST-U04-O-OFF`.

**END `KAE-ORD-POST-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-POST-U05 — The Garden Shadow

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U05-L01` NARRATOR: A patch of shade offers space enough for two, and Kaedra shifts without being asked.
- `KAE-ORD-POST-U05-L02` KAEDRA [NEUTRAL]: “A rare architectural achievement: a bench not designed exclusively for narrow shoulders.”
- `KAE-ORD-POST-U05-L03` PLAYER: “Do you want company?”
- `KAE-ORD-POST-U05-L04` KAEDRA [NEUTRAL]: “Yes. I believe I do.”

**Choice point `KAE-ORD-POST-U05-C1` (choose exactly one):**

1. `KAE-ORD-POST-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Then I’ll sit here, if that still suits you.”
   - `KAE-ORD-POST-U05-R-YES-01` KAEDRA [NEUTRAL]: “It does. I rather like being asked.”
   - **Outcome:** `KAE-ORD-POST-U05-O-YES`.
2. `KAE-ORD-POST-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “I’ll sit. You should make room.”
   - `KAE-ORD-POST-U05-R-NO-01` KAEDRA [WORRIED]: “I was already making room. The command was unnecessary.”
   - **Outcome:** `KAE-ORD-POST-U05-O-NO`.

**END `KAE-ORD-POST-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-POST-U06 — Sentries and Signatures

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U06-L01` NARRATOR: Kaedra finishes reading a roster and passes it to the next official.
- `KAE-ORD-POST-U06-L02` KAEDRA [NEUTRAL]: “The sentries can manage their shifts. Several of them have been doing this longer than I have been alive.”
- `KAE-ORD-POST-U06-L03` PLAYER: “That sounds reassuring.”
- `KAE-ORD-POST-U06-L04` KAEDRA [NEUTRAL]: “I am learning that leadership does not require touching every single decision.”

**Choice point `KAE-ORD-POST-U06-C1` (choose exactly one):**

1. `KAE-ORD-POST-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Trusting capable people is part of protecting them, too.”
   - `KAE-ORD-POST-U06-R-YES-01` KAEDRA [NEUTRAL]: “Exactly. It is an oddly difficult form of courage.”
   - **Outcome:** `KAE-ORD-POST-U06-O-YES`.
2. `KAE-ORD-POST-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “If you want control, check every shift yourself.”
   - `KAE-ORD-POST-U06-R-NO-01` KAEDRA [WORRIED]: “Then I would teach them I do not trust their judgment.”
   - **Outcome:** `KAE-ORD-POST-U06-O-NO`.

**END `KAE-ORD-POST-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-POST-F01 — Quiet Company

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-F01-L01` NARRATOR: Kaedra remains nearby without demanding conversation.
- `KAE-ORD-POST-F01-L02` KAEDRA [NEUTRAL]: “I have discovered that a silence can be companionable instead of threatening.”
- `KAE-ORD-POST-F01-L03` PLAYER: “Shall we keep it?”
- `KAE-ORD-POST-F01-L04` KAEDRA [NEUTRAL]: “If you would like.”

**Choice point `KAE-ORD-POST-F01-C1` (choose exactly one):**

1. `KAE-ORD-POST-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Yes. I like sharing the quiet with you.”
   - `KAE-ORD-POST-F01-R-YES-01` KAEDRA [NEUTRAL]: “So do I, {PLAYER}.”
   - **Outcome:** `KAE-ORD-POST-F01-O-YES`.
2. `KAE-ORD-POST-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Someone ought to say something impressive.”
   - `KAE-ORD-POST-F01-R-NO-01` KAEDRA [WORRIED]: “I was enjoying not needing to be impressive.”
   - **Outcome:** `KAE-ORD-POST-F01-O-NO`.

**END `KAE-ORD-POST-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-POST-F02 — The Crooked Banner

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-F02-L01` NARRATOR: A decorative banner hangs crookedly above the open path.
- `KAE-ORD-POST-F02-L02` KAEDRA [NEUTRAL]: “I could reach that and straighten it. I could also let the custodians handle it.”
- `KAE-ORD-POST-F02-L03` PLAYER: “Which would you prefer?”
- `KAE-ORD-POST-F02-L04` KAEDRA [NEUTRAL]: “Today? Perhaps to let someone else have the satisfaction.”

**Choice point `KAE-ORD-POST-F02-C1` (choose exactly one):**

1. `KAE-ORD-POST-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Sounds like a decision you are entitled to make.”
   - `KAE-ORD-POST-F02-R-YES-01` KAEDRA [NEUTRAL]: “Thank you. I enjoy these surprisingly small freedoms.”
   - **Outcome:** `KAE-ORD-POST-F02-O-YES`.
2. `KAE-ORD-POST-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You are stronger. You should always do the work.”
   - `KAE-ORD-POST-F02-R-NO-01` KAEDRA [WORRIED]: “Strength does not establish an obligation to do everything.”
   - **Outcome:** `KAE-ORD-POST-F02-O-NO`.

**END `KAE-ORD-POST-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.


#### KAE-ORD-POST-F03 — The Courtesy of Disagreement

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-F03-L01` NARRATOR: Kaedra pauses after hearing a minor difference of opinion.
- `KAE-ORD-POST-F03-L02` KAEDRA [NEUTRAL]: “We disagree about something inconsequential. Shall I alert the heralds?”
- `KAE-ORD-POST-F03-L03` PLAYER: “Only if they have nothing better to announce.”
- `KAE-ORD-POST-F03-L04` KAEDRA [NEUTRAL]: “I have never seen a royal bulletin titled “Two People Remain Fond of Each Other.””

**Choice point `KAE-ORD-POST-F03-C1` (choose exactly one):**

1. `KAE-ORD-POST-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can disagree and still listen to one another.”
   - `KAE-ORD-POST-F03-R-YES-01` KAEDRA [NEUTRAL]: “An excellent title for the bulletin, actually.”
   - **Outcome:** `KAE-ORD-POST-F03-O-YES`.
2. `KAE-ORD-POST-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “It is safer if I just agree with whatever you say.”
   - `KAE-ORD-POST-F03-R-NO-01` KAEDRA [WORRIED]: “I prefer a companion who trusts me enough to disagree.”
   - **Outcome:** `KAE-ORD-POST-F03-O-NO`.

**END `KAE-ORD-POST-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
