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

