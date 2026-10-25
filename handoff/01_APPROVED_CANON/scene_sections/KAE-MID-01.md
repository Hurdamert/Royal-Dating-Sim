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

