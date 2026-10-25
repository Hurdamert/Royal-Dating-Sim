## B. Scene 1 — Prince's Fashion Challenge

**Scene ID:** `KAE-EVT-PRE-01`  
**Type:** Optional pre-midpoint, first completed attempt marks experienced whether successful or not.  
**Eligibility:** Kaedra route selected; milestone incomplete; committed hearts below 5; Strength ≥ 3; unused event flag; today's scheduled Kaedra slot and interaction unused; no pending encounter.  
**Location:** Kaedra's **currently scheduled** Adventurers' Guild, Palace Court, or Royal Gardens location. A royal prince's outfit demonstration travels as a scripted entourage to the scheduled setting; it creates no new destination, battle, outfit item, purchase, or fashion minigame.  
**Objective:** Show that Kaedra can be quietly funny, that courtiers mistake her silence for threat, and that the protagonist can support her without casting her as a spectacle.

- `KAE-PRE-001` NARRATOR: A royal prince has arranged a traveling display of ceremonial cloaks. He is loudly explaining why an embroidered cape should be classified as an emergency public service.
- `KAE-PRE-002` PRINCE: "The garment makes a statement. Ideally, the statement is *behold my significance*."
- `KAE-PRE-003` KAEDRA [NEUTRAL]: "My own cape makes a statement too. It says *someone forgot to account for door handles*."
- `KAE-PRE-004` PLAYER: "You sound experienced."
- `KAE-PRE-005` KAEDRA [PLAYFUL]: "I once disabled an entire banquet by turning around too quickly. The curtains fell. Three ministers interpreted it as a declaration of war."
- `KAE-PRE-006` NARRATOR: The prince freezes in admiration. A guard behind him inches toward a convenient pillar.
- `KAE-PRE-007` PRINCE: "Princess Kaedra! A demonstration from our most formidable guest would lend tremendous prestige. Perhaps you could look terrifying while wearing the silver mantle?"
- `KAE-PRE-008` KAEDRA [ANNOYED]: "Does the mantle require anyone to look terrified, or merely the audience?"
- `KAE-PRE-009` PRINCE: "Whichever photographs better."
- `KAE-PRE-010` NARRATOR: A few spectators wait for Kaedra to explode. She doesn't. One wing settles against her back; the tense silence is otherwise broken only by a tailor dropping a pin.
- `KAE-PRE-011` KAEDRA [NEUTRAL]: "I was invited to assess whether the formal fasteners are safe. They are not. The weight is pulling on the collar."
- `KAE-PRE-012` PLAYER: "And the prince wants you to model it?"
- `KAE-PRE-013` KAEDRA [PLAYFUL]: "He believes my face could frighten the stitching into cooperation."
- `KAE-PRE-014` NARRATOR: Kaedra glances toward you, her expression composed. She has made it clear she would rather be heard than displayed.

**Choice point `KAE-PRE-C1` — select exactly one:**

1. `KAE-PRE-C1-RESPECT` — **Correct; net +2 half-hearts.**  
   PLAYER: "You were asked for your judgment, not to serve as a scary decoration. Want me to help make sure they hear the safety issue?"
   - `KAE-PRE-S01` KAEDRA [SURPRISED]: "You heard the part about the collar."
   - `KAE-PRE-S02` PLAYER: "I also heard the part about the curtains. That's a separate safety issue."
   - `KAE-PRE-S03` KAEDRA [PLAYFUL]: "Correct. We should not confuse the two departments."
   - `KAE-PRE-S04` NARRATOR: Kaedra explains the flawed clasp without raising her voice. The tailor fixes it; the prince announces the resulting adjustment as the latest court trend.
   - `KAE-PRE-S05` KAEDRA [NEUTRAL]: "Thank you. I can speak for myself. It helped that you gave me room to do it."
   - **Narrative outcome ID:** `KAE-PRE-O-RESPECTED`.
2. `KAE-PRE-C1-JOKE` — **Ordinary incorrect; net +1 half-heart.**  
   PLAYER: "You should wear the cape and show them your legendary terrifying pose. At least it would be funny."
   - `KAE-PRE-W01` KAEDRA [NEUTRAL]: "It might be funny for you."
   - `KAE-PRE-W02` PLAYER: "I thought you liked jokes."
   - `KAE-PRE-W03` KAEDRA [WORRIED]: "I do. I prefer knowing I am in on them."
   - `KAE-PRE-W04` NARRATOR: She quietly takes the loose clasp to the tailor herself. The display proceeds, but she offers you no further performance.
   - **Narrative outcome ID:** `KAE-PRE-O-PERFORMED`.
3. `KAE-PRE-C1-FEAR` — **Explicitly offensive; net −1 half-heart.**  
   PLAYER: "They should be afraid of you. Threaten the prince until he does what you say. That's what you're good at."
   - `KAE-PRE-X01` KAEDRA [ANNOYED]: "No. I am good at making sure nobody has to be afraid."
   - `KAE-PRE-X02` PLAYER: "That wasn't what I meant."
   - `KAE-PRE-X03` KAEDRA [NEUTRAL]: "It was what you asked me to do. Please remember the difference."
   - `KAE-PRE-X04` NARRATOR: She turns back to the tailor and ends the conversation without another word.
   - **Narrative outcome ID:** `KAE-PRE-O-FEARED`.

**END `KAE-EVT-PRE-01`:** Mark experienced exactly once regardless of choice; apply exactly one net half-heart result, respecting the five-heart gate; consume one slot and one Kaedra interaction; append one journal entry. The prince, costumes, and clasps are scene dressing only. If hearts reach five, the midpoint becomes pending for a **later eligible day**, not a second encounter immediately.

---

