#### KAE-ORD-POST-F02 — The Crooked Banner

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-F02-L01` NARRATOR: A decorative banner hangs crookedly above the open path.
- `KAE-ORD-POST-F02-L02` KAEDRA [NEUTRAL]: “I could reach that and straighten it. I could also let the custodians handle it.”
- `KAE-ORD-POST-F02-L03` PLAYER: “Which would you prefer?”
- `KAE-ORD-POST-F02-L04` KAEDRA [NEUTRAL]: “Today? Perhaps to let someone else have the satisfaction.”

**Choice point `KAE-ORD-POST-F02-C1` (choose exactly one):**

1. `KAE-ORD-POST-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Sounds like a decision you are entitled to make.”
   - `KAE-ORD-POST-F02-R-YES-01` KAEDRA [NEUTRAL]: “Thank you. I enjoy these surprisingly small freedoms.”
   - **Outcome:** `KAE-ORD-POST-F02-O-YES`.
2. `KAE-ORD-POST-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You are stronger. You should always do the work.”
   - `KAE-ORD-POST-F02-R-NO-01` KAEDRA [WORRIED]: “Strength does not establish an obligation to do everything.”
   - **Outcome:** `KAE-ORD-POST-F02-O-NO`.

**END `KAE-ORD-POST-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
