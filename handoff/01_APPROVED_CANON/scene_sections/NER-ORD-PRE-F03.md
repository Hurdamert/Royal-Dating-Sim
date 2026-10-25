#### NER-ORD-PRE-F03 — A Knot of Questions

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-F03-L01` NARRATOR: Nerelle examines the knot securing a small floating marker.
- `NER-ORD-PRE-F03-L02` NERELLE [NEUTRAL]: “A sailor taught me that knot, then insisted his grandmother invented it.”
- `NER-ORD-PRE-F03-L03` PLAYER: “Did she?”
- `NER-ORD-PRE-F03-L04` NERELLE [NEUTRAL]: “Possibly. Six other grandmothers have made the same claim.”

**Choice point `NER-ORD-PRE-F03-C1` (choose exactly one):**

1. `NER-ORD-PRE-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Maybe you can admire the knot without settling its ancestry.”
   - `NER-ORD-PRE-F03-R-YES-01` NERELLE [NEUTRAL]: “A relief. Maritime diplomacy is exhausting enough.”
   - **Outcome:** `NER-ORD-PRE-F03-O-YES`.
2. `NER-ORD-PRE-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Tell the sailor he is wrong. Every argument needs a winner.”
   - `NER-ORD-PRE-F03-R-NO-01` NERELLE [WORRIED]: “Not every useful discovery requires a dispute.”
   - **Outcome:** `NER-ORD-PRE-F03-O-NO`.

**END `NER-ORD-PRE-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
