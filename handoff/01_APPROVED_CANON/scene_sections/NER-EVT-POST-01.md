## E. Scene 4 — Moonwater Festival

**Scene ID:** `NER-EVT-POST-01`  
**Type:** Optional post-midpoint festival event, once per route.  
**Eligibility:** Nerelle milestone completed; **Intelligence ≥ 3**; committed hearts < 10; marriage retry not pending; event unexperienced; scheduled Nerelle slot and daily encounter unused; no other pending scene. A completed midpoint flag remains authoritative even if hearts subsequently fall below five.  
**Location:** **Moonwater Quay** or **Royal Gardens canal**, with floating festival decorations extending into the same accessible water. The festival is a scene at an existing location, never an eighth location, commerce mechanic, or minigame.  
**Dramatic objective:** Show a community tradition Nerelle values while she begins articulating how duty and personal choice can coexist. This event must not introduce information needed to comprehend her final scene.

- `NER-POST-001` NARRATOR: Ribbons trail from the quay railing. In the water, little floating lanterns bob beside the canal, bright with painted names and small wishes. In daylight, their patterns catch the sun; at dusk, their lights begin to glow.
- `NER-POST-002` NERELLE [PLAYFUL]: "Welcome to Moonwater Festival. Our official explanation says the lanterns honor those who guided us home. The unofficial explanation is that everyone enjoys making something float and then pretending it is a solemn tradition."
- `NER-POST-003` PLAYER: "Both can be true."
- `NER-POST-004` NERELLE [NEUTRAL]: "Exactly. You are getting dangerously good at this."
- `NER-POST-005` NARRATOR: A group of young sea-dwellers carefully guides a string of lanterns along the water's edge. Nerelle exchanges a practiced greeting and listens to their questions with complete attention.
- `NER-POST-006` PLAYER: "They seem glad you're here."
- `NER-POST-007` NERELLE [WORRIED]: "I love this part of my responsibilities. They come to me with genuine concerns. I can sometimes help."
- `NER-POST-008` PLAYER: "And the parts you don't love?"
- `NER-POST-009` NERELLE [NEUTRAL]: "Those still exist. I used to think the answer was to accept every demand until there was no room left to want anything. Now I'm trying to learn which duties are mine, which I can share, and which are merely habits dressed as laws."
- `NER-POST-010` NARRATOR: A lantern drifts into an eddy, circles twice, and points upstream as if it has decided to attend a different festival.
- `NER-POST-011` NERELLE [PLAYFUL]: "That one has achieved more independence than half the royal council."
- `NER-POST-012` PLAYER: "Does it get to decide where it's going?"
- `NER-POST-013` NERELLE [WORRIED]: "Not entirely. Currents are real. But we still choose how to travel with them."
- `NER-POST-014` NERELLE [NEUTRAL]: "I want to keep serving my people. I also want to keep learning about yours. Sometimes people hear one wish and assume it cancels the other."
- `NER-POST-015` NARRATOR: She watches the lanterns, then turns back to you. She has told you what matters; now she wants to know what you heard.

**Choice point `NER-POST-C1` — choose exactly one:**

1. `NER-POST-C1-ROOM` **Correct; net +2 half-hearts.** PLAYER: "You don't have to abandon your people to make room for your own life. You can decide what duties matter, where help is possible, and which discoveries you want to make. I'll listen to what you choose."
   - `NER-POST-S01` NERELLE [SURPRISED]: "It's a surprisingly large relief to be understood without first providing a twelve-page petition."
   - `NER-POST-S02` PLAYER: "I can provide a form if that would help."
   - `NER-POST-S03` NERELLE [PLAYFUL]: "Don't tempt me. I know several excellent forms."
   - `NER-POST-S04` NARRATOR: She steadies the wayward lantern with a small movement of her tail, turning it back into the shared channel instead of fixing it in place.
   - `NER-POST-S05` NERELLE [NEUTRAL]: "My place in the sea matters to me. So does the part of myself still becoming something new."
   - `NER-POST-S06` PLAYER: "Those both sound like parts of you."
   - `NER-POST-S07` NERELLE [NEUTRAL]: "They are. And I would like anyone close to me to love the whole of that."
   - **Narrative outcome ID:** `NER-POST-O-HEARD`.
2. `NER-POST-C1-SIMPLIFY` **Ordinary incorrect; net +1 half-heart.** PLAYER: "Why not just appoint someone else to do the ceremonies? Then you could spend all your time exploring."
   - `NER-POST-W01` NERELLE [NEUTRAL]: "Some responsibilities can be shared. Others matter to me personally."
   - `NER-POST-W02` PLAYER: "I thought that would make things easier."
   - `NER-POST-W03` NERELLE [WORRIED]: "Perhaps. But I don't want a future that's easier because half of who I am has been removed."
   - `NER-POST-W04` NARRATOR: The festival carries on around you. Nerelle thanks you for trying, though the conversation ends before she can explain everything.
   - **Narrative outcome ID:** `NER-POST-O-SIMPLIFIED`.
3. `NER-POST-C1-SHAME` **Explicitly offensive; net −1 half-heart.** PLAYER: "All these lanterns and speeches seem pointless. Your people would manage without you, so why pretend the duties matter?"
   - `NER-POST-X01` NERELLE [ANNOYED]: "They aren't pointless because you haven't learned why they matter."
   - `NER-POST-X02` PLAYER: "I didn't mean to insult them."
   - `NER-POST-X03` NERELLE [NEUTRAL]: "Then please stop talking as if being important to others means being unimportant to myself."
   - `NER-POST-X04` NARRATOR: She joins the festival-goers in the water. You are not asked to follow the conversation further.
   - **Narrative outcome ID:** `NER-POST-O-HURT`.

**END `NER-EVT-POST-01`:** Mark experienced regardless of outcome; apply exactly one encounter-level net half-heart result, consume one action slot and daily princess encounter, append one journal entry. This scene cannot repeat. No new equipment, duty-reputation metric, festival tokens, skill rewards, or ending prerequisites are created. If its **projected** reward reaches ten hearts, link `NER-FIN-01` immediately *within the same pending parent encounter*, before the heart reward or time advancement commits.

---

