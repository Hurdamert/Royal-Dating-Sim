## B. Scene 1 — Surface Souvenir Swap

**Scene ID:** `NER-EVT-PRE-01`  
**Type:** Optional, pre-midpoint, once per route.  
**Eligibility:** Nerelle is the chosen route; milestone incomplete; committed hearts < 5; **Kindness ≥ 3**; event unexperienced; Nerelle is scheduled in the current slot; today's princess interaction unused; no encounter pending. The optional event is lost when the pre-midpoint stage ends or the five-heart milestone takes priority.  
**Location:** Nerelle's scheduled **Moonwater Quay** or **Royal Gardens canal**, directly beside accessible water. No inventory, trading, shopping, or collectibles system.  
**Dramatic objective:** Nerelle and the protagonist learn to respect each other's world without reducing it to curiosities. Her unusual questions show intelligence, not ignorance.

- `NER-PRE-001` NARRATOR: A line of small waterproof parcels floats beside the canal railing, each tied to a ribbon so precisely that a court clerk might weep with envy.
- `NER-PRE-002` NERELLE [PLAYFUL]: "Do you have a moment? I've been conducting an extremely unscientific study of surface souvenirs. The findings are troubling."
- `NER-PRE-003` PLAYER: "How troubling?"
- `NER-PRE-004` NERELLE [NEUTRAL]: "You sell seashells to people who already live beside the sea. Then you charge extra if someone has written *Authentic Ocean* on them."
- `NER-PRE-005` PLAYER: "That's the advertising industry. I used to live in a world with an advanced version."
- `NER-PRE-006` NERELLE [SURPRISED]: "Advanced? Can it convince a fish it needs to buy water?"
- `NER-PRE-007` PLAYER: "Give it a few fiscal quarters."
- `NER-PRE-008` NARRATOR: Nerelle laughs, then nudges one parcel toward the stone lip of the quay. Inside is a polished bit of sea glass beside a neatly folded sketch of a harbor lantern.
- `NER-PRE-009` NERELLE [NEUTRAL]: "A child in the tide villages gave me the glass. She said it looked like the surface lights when the water is calm. I wanted to understand what she meant."
- `NER-PRE-010` PLAYER: "Did you ask her?"
- `NER-PRE-011` NERELLE [WORRIED]: "I did. She was shy when she recognized me. Sometimes a crown makes an ordinary question feel like an examination."
- `NER-PRE-012` NERELLE [PLAYFUL]: "So I'm trying to learn how to be curious without turning people into a royal research project. My current theory involves fewer official seals."
- `NER-PRE-013` NARRATOR: She holds out the sketch for your opinion but watches your expression more closely than the paper.

**Choice point `NER-PRE-C1` — choose exactly one:**

1. `NER-PRE-C1-LISTEN` **Correct; net +2 half-hearts.** PLAYER: "Maybe ask what matters to them, then listen without trying to decide what the answer should be. We could start with the lanterns if you'd like."
   - `NER-PRE-S01` NERELLE [SURPRISED]: "The astonishing art of allowing a question to remain a question."
   - `NER-PRE-S02` PLAYER: "They don't teach it in the advanced advertising industry."
   - `NER-PRE-S03` NERELLE [PLAYFUL]: "Their loss."
   - `NER-PRE-S04` NARRATOR: She studies the reflection of a lantern in the water. Her tail fin shifts beneath it, sending the light into a dozen small shapes.
   - `NER-PRE-S05` NERELLE [NEUTRAL]: "The child wasn't explaining the lantern. She was telling me what home looks like from below."
   - `NER-PRE-S06` PLAYER: "That sounds worth remembering."
   - `NER-PRE-S07` NERELLE [PLAYFUL]: "It does. For once, I shall not commission a commemorative plaque."
   - **Narrative outcome ID:** `NER-PRE-O-RESPECTED`.
2. `NER-PRE-C1-EXPLAIN` **Ordinary incorrect; net +1 half-heart.** PLAYER: "The important thing is that souvenirs are symbolic. Let me explain the entire surface economy of sentimental objects."
   - `NER-PRE-W01` NERELLE [NEUTRAL]: "That sounds informative. It's not quite what I was asking."
   - `NER-PRE-W02` PLAYER: "Sorry. I thought more information would help."
   - `NER-PRE-W03` NERELLE [PLAYFUL]: "It may. But if I wanted a lecture, I'd have invited the royal tax assessor."
   - `NER-PRE-W04` NARRATOR: She keeps the child's sketch tucked safely beside her and returns to the water as the conversation ends.
   - **Narrative outcome ID:** `NER-PRE-O-LECTURED`.
3. `NER-PRE-C1-MOCK` **Explicitly offensive; net −1 half-heart.** PLAYER: "How can you be a princess and still need someone to explain ordinary surface things?"
   - `NER-PRE-X01` NERELLE [SURPRISED]: "Because I am a princess of the sea. I rather thought that distinction was visible."
   - `NER-PRE-X02` NERELLE [ANNOYED]: "Not knowing your customs is not the same as lacking sense."
   - `NER-PRE-X03` NARRATOR: She closes the parcel herself. The polite farewell that follows is considerably shorter than the conversation she had hoped for.
   - **Narrative outcome ID:** `NER-PRE-O-DISMISSED`.

**END `NER-EVT-PRE-01`:** Mark event experienced exactly once regardless of branch; apply only the selected net half-heart outcome, capped at five hearts while milestone incomplete; consume one encounter/action slot and append one journal entry. No objects are transferred into a player inventory. If this encounter newly reaches five committed hearts, the mandatory midpoint becomes pending on a **later** eligible encounter. No extra stat or unlock is granted.

---

