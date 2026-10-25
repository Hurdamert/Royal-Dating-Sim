#### NER-ORD-POST-U03 — A Quiet Current

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U03-L01` NARRATOR: Nerelle listens to the movement of water against the stone instead of speaking at once.
- `NER-ORD-POST-U03-L02` NERELLE [NEUTRAL]: “Sometimes the current tells me more if I wait a moment.”
- `NER-ORD-POST-U03-L03` PLAYER: “We could wait.”
- `NER-ORD-POST-U03-L04` NERELLE [NEUTRAL]: “Are you sure? Surface people seem to fear pauses.”

**Choice point `NER-ORD-POST-U03-C1` (choose exactly one):**

1. `NER-ORD-POST-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I’m in no hurry to fill the silence.”
   - `NER-ORD-POST-U03-R-YES-01` NERELLE [NEUTRAL]: “Then we can have a very good conversation without much talking.”
   - **Outcome:** `NER-ORD-POST-U03-O-YES`.
2. `NER-ORD-POST-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Shouldn’t you decide faster? Your people need answers.”
   - `NER-ORD-POST-U03-R-NO-01` NERELLE [WORRIED]: “They need considered answers. Speed is not always care.”
   - **Outcome:** `NER-ORD-POST-U03-O-NO`.

**END `NER-ORD-POST-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
