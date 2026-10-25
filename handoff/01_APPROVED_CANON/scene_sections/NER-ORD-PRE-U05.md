#### NER-ORD-PRE-U05 — Wave Notation

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U05-L01` NARRATOR: Nerelle draws an elegant curve on the wet stone with one finger.
- `NER-ORD-PRE-U05-L02` NERELLE [NEUTRAL]: “My court records current strength with marks like these. What did your world use?”
- `NER-ORD-PRE-U05-L03` PLAYER: “Usually graphs. And arguments about the graphs.”
- `NER-ORD-PRE-U05-L04` NERELLE [NEUTRAL]: “An argument is a universal scientific instrument.”

**Choice point `NER-ORD-PRE-U05-C1` (choose exactly one):**

1. `NER-ORD-PRE-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Your markings tell the story clearly. Could you show me how to read them?”
   - `NER-ORD-PRE-U05-R-YES-01` NERELLE [NEUTRAL]: “Gladly. Curiosity travels well across borders.”
   - **Outcome:** `NER-ORD-PRE-U05-O-YES`.
2. `NER-ORD-PRE-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “My graphs were probably better. You should switch to them.”
   - `NER-ORD-PRE-U05-R-NO-01` NERELLE [WORRIED]: “Then you have arrived with a verdict before seeing the evidence.”
   - **Outcome:** `NER-ORD-PRE-U05-O-NO`.

**END `NER-ORD-PRE-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
