#### NER-ORD-POST-F01 — The Shore and the Sea

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-F01-L01` NARRATOR: Nerelle watches the surface light fracture over a small wave.
- `NER-ORD-POST-F01-L02` NERELLE [NEUTRAL]: “Someone asked whether I am thinking like a mermaid or a princess today.”
- `NER-ORD-POST-F01-L03` PLAYER: “What did you say?”
- `NER-ORD-POST-F01-L04` NERELLE [NEUTRAL]: “I said the question was missing a few possibilities.”

**Choice point `NER-ORD-POST-F01-C1` (choose exactly one):**

1. `NER-ORD-POST-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You do not have to divide yourself for their convenience.”
   - `NER-ORD-POST-F01-R-YES-01` NERELLE [NEUTRAL]: “That is the most useful answer I have heard all day.”
   - **Outcome:** `NER-ORD-POST-F01-O-YES`.
2. `NER-ORD-POST-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “They have a point. Choose one identity.”
   - `NER-ORD-POST-F01-R-NO-01` NERELLE [WORRIED]: “I have never found myself improved by being halved.”
   - **Outcome:** `NER-ORD-POST-F01-O-NO`.

**END `NER-ORD-POST-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
