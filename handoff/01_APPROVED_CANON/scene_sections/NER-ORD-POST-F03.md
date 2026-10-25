#### NER-ORD-POST-F03 — The Shared Horizon

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-F03-L01` NARRATOR: Nerelle traces the far shore with her gaze.
- `NER-ORD-POST-F03-L02` NERELLE [NEUTRAL]: “From this level, I can see the same towers you can. The horizon just frames them differently.”
- `NER-ORD-POST-F03-L03` PLAYER: “I like that.”
- `NER-ORD-POST-F03-L04` NERELLE [NEUTRAL]: “There is room for more than one good vantage point.”

**Choice point `NER-ORD-POST-F03-C1` (choose exactly one):**

1. `NER-ORD-POST-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can keep sharing what each of us notices.”
   - `NER-ORD-POST-F03-R-YES-01` NERELLE [NEUTRAL]: “I would like that very much.”
   - **Outcome:** `NER-ORD-POST-F03-O-YES`.
2. `NER-ORD-POST-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Mine is the proper view, though.”
   - `NER-ORD-POST-F03-R-NO-01` NERELLE [WORRIED]: “A remarkably quick way to stop learning.”
   - **Outcome:** `NER-ORD-POST-F03-O-NO`.

**END `NER-ORD-POST-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
