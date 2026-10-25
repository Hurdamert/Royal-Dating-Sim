## E. Scene 4 — Monster Reputation Rumor

**Scene ID:** `KAE-EVT-POST-01`  
**Type:** Optional post-midpoint, once per run.  
**Eligibility:** Mandatory midpoint complete, Kindness ≥ 3, committed hearts below 10, no final retry pending, unused event flag, scheduled Kaedra slot/day, and no pending encounter. An already completed midpoint does not reset if later hearts drop below five.  
**Location:** Kaedra's scheduled Guild, Palace Court, or Royal Gardens location; a passerby and a small creature appear as scripted scenery, not new map nodes or combat content.  
**Objective:** Expose how rumors turn her into a monster and show that her protective response is gentle without making her a helpless victim or requiring the player to save her reputation.

- `KAE-POST-001` NARRATOR: A young messenger whispers urgently to a nearby court attendant. Whatever has been seen, the account grows two extra horns by the time it reaches the third listener.
- `KAE-POST-002` MESSENGER: "A monster was seen near the royal paths. Great armored back, enormous claws, impossible stare. The princess was nearby!"
- `KAE-POST-003` KAEDRA [NEUTRAL]: "I have only the usual number of horns. Please keep that part accurate."
- `KAE-POST-004` PLAYER: "What did they actually see?"
- `KAE-POST-005` NARRATOR: A small, moss-backed garden creature emerges from behind a low step, carrying a fallen blossom on its head like a ceremonial crown. It has no weapon and appears mainly interested in a patch of shade.
- `KAE-POST-006` KAEDRA [SURPRISED]: "Oh. There you are."
- `KAE-POST-007` MESSENGER: "You know it?"
- `KAE-POST-008` KAEDRA [NEUTRAL]: "It lives near the gardens. It once stole a judge's lunch and left the plate very clean. The court considers this an act of political commentary."
- `KAE-POST-009` PLAYER: "Is it dangerous?"
- `KAE-POST-010` KAEDRA [PLAYFUL]: "Only to unattended sandwiches."
- `KAE-POST-011` NARRATOR: The creature steps toward a busy walkway. Kaedra calmly asks people to give it room and points out the shaded route back to its usual resting place. Nobody needs to draw a weapon.
- `KAE-POST-012` MESSENGER: "So there was no monster attack."
- `KAE-POST-013` KAEDRA [NEUTRAL]: "There was a rumor. People can be frightened by rumors. That part matters even when the story is foolish."
- `KAE-POST-014` NARRATOR: She watches the small creature amble off, then notices you have stayed beside her rather than joining the speculation.

**Choice point `KAE-POST-C1` — choose exactly one:**

1. `KAE-POST-C1-COMPASSION` — **Correct; net +2 half-hearts.**  
   PLAYER: "You protected the people who were scared and made room for a harmless creature. I wish they'd notice that instead of turning both of you into monsters."
   - `KAE-POST-S01` KAEDRA [SURPRISED]: "That is more or less what I was trying to do."
   - `KAE-POST-S02` PLAYER: "The sandwiches may disagree."
   - `KAE-POST-S03` KAEDRA [PLAYFUL]: "Their concerns have been entered into the record."
   - `KAE-POST-S04` NARRATOR: Kaedra smiles without glancing around to see who is watching.
   - `KAE-POST-S05` KAEDRA [NEUTRAL]: "I cannot control every story about me. But I can choose how I act. It helps to have someone notice the difference."
   - **Narrative outcome ID:** `KAE-POST-O-SEEN`.
2. `KAE-POST-C1-DISMISS` — **Ordinary incorrect; net +1 half-heart.**  
   PLAYER: "It's just a ridiculous rumor. Ignore everyone, and the whole thing will disappear."
   - `KAE-POST-W01` KAEDRA [NEUTRAL]: "It may. The fear people felt does not become unreal because its cause was mistaken."
   - `KAE-POST-W02` PLAYER: "I was trying to make it sound less serious."
   - `KAE-POST-W03` KAEDRA [WORRIED]: "Sometimes I need you to take me seriously without making me a tragedy."
   - `KAE-POST-W04` NARRATOR: She leaves the messenger to straighten the story while she returns to her duties.
   - **Narrative outcome ID:** `KAE-POST-O-DISMISSED`.
3. `KAE-POST-C1-CRUEL` — **Explicitly offensive; net −1 half-heart.**  
   PLAYER: "Why bother reassuring them? You're frightening, and so is the creature. Let the villagers be afraid."
   - `KAE-POST-X01` KAEDRA [ANNOYED]: "Fear is not a service I provide."
   - `KAE-POST-X02` PLAYER: "I didn't expect you to take offense."
   - `KAE-POST-X03` KAEDRA [NEUTRAL]: "Then you have not been paying attention."
   - `KAE-POST-X04` NARRATOR: She sees the little creature safely away and ends the conversation.
   - **Narrative outcome ID:** `KAE-POST-O-CRUEL`.

**END `KAE-EVT-POST-01`:** Mark this optional event experienced after first completed attempt, irrespective of branch. Apply exactly one relationship outcome, one action slot, one daily interaction, and one journal entry. The creature is narrative background, not a monster-fighting mechanic, companion, reward, or alternate ending. If **projected** hearts reach ten, immediately link `KAE-FIN-01` before committing the parent action.

---

