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

