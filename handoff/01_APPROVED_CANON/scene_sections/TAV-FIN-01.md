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

