#### NER-ORD-POST-U06 — A Changed Tide

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U06-L01` NARRATOR: The tide has turned, and the mooring ropes hang at a different angle.
- `NER-ORD-POST-U06-L02` NERELLE [NEUTRAL]: “The harbor looks familiar, but every current has shifted since we last looked.”
- `NER-ORD-POST-U06-L03` PLAYER: “Does that trouble you?”
- `NER-ORD-POST-U06-L04` NERELLE [PLAYFUL]: “No. A changing place is still home if I can choose how to move through it.”

**Choice point `NER-ORD-POST-U06-C1` (choose exactly one):**

1. `NER-ORD-POST-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I’m glad you can make those choices without needing my permission.”
   - `NER-ORD-POST-U06-R-YES-01` NERELLE [NEUTRAL]: “And I am glad you keep reminding me it is not a lonely task.”
   - **Outcome:** `NER-ORD-POST-U06-O-YES`.
2. `NER-ORD-POST-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should settle on one route and never change it.”
   - `NER-ORD-POST-U06-R-NO-01` NERELLE [WORRIED]: “A route that never adapts is a danger at sea.”
   - **Outcome:** `NER-ORD-POST-U06-O-NO`.

**END `NER-ORD-POST-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
