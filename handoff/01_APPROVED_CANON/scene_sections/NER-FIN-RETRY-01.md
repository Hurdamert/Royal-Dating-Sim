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

