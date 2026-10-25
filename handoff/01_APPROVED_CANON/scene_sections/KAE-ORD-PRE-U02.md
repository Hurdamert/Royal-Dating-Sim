#### KAE-ORD-PRE-U02 — The Safety Manual

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U02-L01` NARRATOR: A maintenance notice has been rewritten so often that its margins are full of tiny corrections.
- `KAE-ORD-PRE-U02-L02` KAEDRA [NEUTRAL]: “A committee spent four meetings deciding whether a loose stair counts as an emergency.”
- `KAE-ORD-PRE-U02-L03` PLAYER: “Did they repair it?”
- `KAE-ORD-PRE-U02-L04` KAEDRA [NEUTRAL]: “No. But the report is beautifully bound.”

**Choice point `KAE-ORD-PRE-U02-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “A repair matters more than a perfect report.”
   - `KAE-ORD-PRE-U02-R-YES-01` KAEDRA [NEUTRAL]: “A revolutionary concept. I shall alert the carpenters immediately.”
   - **Outcome:** `KAE-ORD-PRE-U02-O-YES`.
2. `KAE-ORD-PRE-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “At least the paperwork looks professional.”
   - `KAE-ORD-PRE-U02-R-NO-01` KAEDRA [WORRIED]: “The staircase remains unimpressed.”
   - **Outcome:** `KAE-ORD-PRE-U02-O-NO`.

**END `KAE-ORD-PRE-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
