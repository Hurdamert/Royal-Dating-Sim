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
