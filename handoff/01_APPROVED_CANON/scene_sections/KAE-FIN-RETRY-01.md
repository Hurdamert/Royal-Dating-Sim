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

