#### KAE-ORD-POST-F01 — Quiet Company

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-F01-L01` NARRATOR: Kaedra remains nearby without demanding conversation.
- `KAE-ORD-POST-F01-L02` KAEDRA [NEUTRAL]: “I have discovered that a silence can be companionable instead of threatening.”
- `KAE-ORD-POST-F01-L03` PLAYER: “Shall we keep it?”
- `KAE-ORD-POST-F01-L04` KAEDRA [NEUTRAL]: “If you would like.”

**Choice point `KAE-ORD-POST-F01-C1` (choose exactly one):**

1. `KAE-ORD-POST-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Yes. I like sharing the quiet with you.”
   - `KAE-ORD-POST-F01-R-YES-01` KAEDRA [NEUTRAL]: “So do I, {PLAYER}.”
   - **Outcome:** `KAE-ORD-POST-F01-O-YES`.
2. `KAE-ORD-POST-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Someone ought to say something impressive.”
   - `KAE-ORD-POST-F01-R-NO-01` KAEDRA [WORRIED]: “I was enjoying not needing to be impressive.”
   - **Outcome:** `KAE-ORD-POST-F01-O-NO`.

**END `KAE-ORD-POST-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
