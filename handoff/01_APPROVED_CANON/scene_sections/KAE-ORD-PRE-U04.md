#### KAE-ORD-PRE-U04 — Warm Hands, Cold Rumors

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U04-L01` NARRATOR: A nervous passerby steps away when Kaedra warms her hands near a lantern.
- `KAE-ORD-PRE-U04-L02` KAEDRA [NEUTRAL]: “There appears to be a rumor that I set buildings ablaze by sneezing.”
- `KAE-ORD-PRE-U04-L03` PLAYER: “Is it true?”
- `KAE-ORD-PRE-U04-L04` KAEDRA [NEUTRAL]: “Only if buildings are made of exceptionally nervous paper.”

**Choice point `KAE-ORD-PRE-U04-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “That sounds frustrating. How would you like to handle it?”
   - `KAE-ORD-PRE-U04-R-YES-01` KAEDRA [NEUTRAL]: “By correcting it calmly. Thank you for asking first.”
   - **Outcome:** `KAE-ORD-PRE-U04-O-YES`.
2. `KAE-ORD-PRE-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Maybe you should pretend to breathe fire so they respect you.”
   - `KAE-ORD-PRE-U04-R-NO-01` KAEDRA [WORRIED]: “Fear is not a substitute for respect.”
   - **Outcome:** `KAE-ORD-PRE-U04-O-NO`.

**END `KAE-ORD-PRE-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
