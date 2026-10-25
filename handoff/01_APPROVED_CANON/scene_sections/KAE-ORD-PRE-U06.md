#### KAE-ORD-PRE-U06 — A Question of Witnesses

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U06-L01` NARRATOR: Two officials debate who should announce that a routine inspection passed. Kaedra waits patiently.
- `KAE-ORD-PRE-U06-L02` KAEDRA [NEUTRAL]: “I inspected the gate. They are discussing whose voice would sound most heroic announcing it.”
- `KAE-ORD-PRE-U06-L03` PLAYER: “Which matters to you?”
- `KAE-ORD-PRE-U06-L04` KAEDRA [NEUTRAL]: “That the gate is safe. The announcement can survive without a hero.”

**Choice point `KAE-ORD-PRE-U06-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can thank everyone who helped and leave the boasting out.”
   - `KAE-ORD-PRE-U06-R-YES-01` KAEDRA [NEUTRAL]: “Good. A functioning gate is applause enough.”
   - **Outcome:** `KAE-ORD-PRE-U06-O-YES`.
2. `KAE-ORD-PRE-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should take all the credit before someone else does.”
   - `KAE-ORD-PRE-U06-R-NO-01` KAEDRA [WORRIED]: “I would prefer to keep the gate standing.”
   - **Outcome:** `KAE-ORD-PRE-U06-O-NO`.

**END `KAE-ORD-PRE-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
