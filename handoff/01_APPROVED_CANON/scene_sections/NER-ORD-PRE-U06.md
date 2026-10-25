#### NER-ORD-PRE-U06 — Reflections of the City

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U06-L01` NARRATOR: The buildings shimmer upside down in the water beside Nerelle.
- `NER-ORD-PRE-U06-L02` NERELLE [NEUTRAL]: “From down here, your city looks as if it were built beneath mine.”
- `NER-ORD-PRE-U06-L03` PLAYER: “Does that make it stranger?”
- `NER-ORD-PRE-U06-L04` NERELLE [PLAYFUL]: “Only until the next ripple. Then it belongs to both worlds for a moment.”

**Choice point `NER-ORD-PRE-U06-C1` (choose exactly one):**

1. `NER-ORD-PRE-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I like that you see something different without calling either view wrong.”
   - `NER-ORD-PRE-U06-R-YES-01` NERELLE [NEUTRAL]: “A rare compliment: one that does not demand I abandon my own view.”
   - **Outcome:** `NER-ORD-PRE-U06-O-YES`.
2. `NER-ORD-PRE-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “The real city is up here. The reflection is just a copy.”
   - `NER-ORD-PRE-U06-R-NO-01` NERELLE [WORRIED]: “A copy can still teach you what you missed from the shore.”
   - **Outcome:** `NER-ORD-PRE-U06-O-NO`.

**END `NER-ORD-PRE-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
