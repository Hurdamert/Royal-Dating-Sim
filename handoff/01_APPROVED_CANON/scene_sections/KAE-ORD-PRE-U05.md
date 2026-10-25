#### KAE-ORD-PRE-U05 — The Mountain Proverb

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U05-L01` NARRATOR: Kaedra reads a decorative inscription twice before setting it aside.
- `KAE-ORD-PRE-U05-L02` KAEDRA [NEUTRAL]: ““The strongest mountain never bends.” An inspiring saying written by someone who has never seen an avalanche.”
- `KAE-ORD-PRE-U05-L03` PLAYER: “How would you change it?”
- `KAE-ORD-PRE-U05-L04` KAEDRA [NEUTRAL]: “I would praise the bridge that knows when to flex.”

**Choice point `KAE-ORD-PRE-U05-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Strength can mean adjusting when others need it.”
   - `KAE-ORD-PRE-U05-R-YES-01` KAEDRA [NEUTRAL]: “Precisely. Stone and stubbornness are not identical.”
   - **Outcome:** `KAE-ORD-PRE-U05-O-YES`.
2. `KAE-ORD-PRE-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “The mountain sounds right. Never yield to anyone.”
   - `KAE-ORD-PRE-U05-R-NO-01` KAEDRA [WORRIED]: “Then it is a poor teacher of responsibility.”
   - **Outcome:** `KAE-ORD-PRE-U05-O-NO`.

**END `KAE-ORD-PRE-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
