#### NER-ORD-POST-U05 — A Weather Permit

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U05-L01` NARRATOR: A sheet of official paper has blown into the water. Nerelle retrieves it and squints.
- `NER-ORD-POST-U05-L02` NERELLE [NEUTRAL]: “A surface office has issued permission for favorable weather. That seems ambitious.”
- `NER-ORD-POST-U05-L03` PLAYER: “Does the sea council do anything similar?”
- `NER-ORD-POST-U05-L04` NERELLE [NEUTRAL]: “We issue warnings, not commands to clouds. The distinction saves embarrassment.”

**Choice point `NER-ORD-POST-U05-C1` (choose exactly one):**

1. `NER-ORD-POST-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Useful advice beats pretending you control the weather.”
   - `NER-ORD-POST-U05-R-YES-01` NERELLE [NEUTRAL]: “If only every office believed that.”
   - **Outcome:** `NER-ORD-POST-U05-O-YES`.
2. `NER-ORD-POST-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Perhaps you should claim authority over storms, too.”
   - `NER-ORD-POST-U05-R-NO-01` NERELLE [WORRIED]: “I have no wish to become personally responsible for thunder.”
   - **Outcome:** `NER-ORD-POST-U05-O-NO`.

**END `NER-ORD-POST-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
