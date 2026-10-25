#### KAE-ORD-PRE-F02 — The Quiet Report

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-F02-L01` NARRATOR: Kaedra folds a routine security report into neat thirds.
- `KAE-ORD-PRE-F02-L02` KAEDRA [NEUTRAL]: “The report says nothing happened. It may be the finest document I have ever signed.”
- `KAE-ORD-PRE-F02-L03` PLAYER: “Why is that?”
- `KAE-ORD-PRE-F02-L04` KAEDRA [NEUTRAL]: “Nobody was hurt. The patrols worked. Peace is rarely dramatic.”

**Choice point `KAE-ORD-PRE-F02-C1` (choose exactly one):**

1. `KAE-ORD-PRE-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “That sounds like excellent work.”
   - `KAE-ORD-PRE-F02-R-YES-01` KAEDRA [NEUTRAL]: “Thank you. It is nice when quiet success is recognized.”
   - **Outcome:** `KAE-ORD-PRE-F02-O-YES`.
2. `KAE-ORD-PRE-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “It would be more impressive if there had been a fight.”
   - `KAE-ORD-PRE-F02-R-NO-01` KAEDRA [WORRIED]: “I am employed to prevent those.”
   - **Outcome:** `KAE-ORD-PRE-F02-O-NO`.

**END `KAE-ORD-PRE-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
