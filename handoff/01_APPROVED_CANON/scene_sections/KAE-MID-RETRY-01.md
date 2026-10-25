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

