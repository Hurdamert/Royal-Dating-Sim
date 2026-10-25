#### KAE-ORD-PRE-F01 — Polishing the Horns

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-F01-L01` NARRATOR: Kaedra spots her reflection in polished armor and raises an eyebrow.
- `KAE-ORD-PRE-F01-L02` KAEDRA [NEUTRAL]: “A stylist once recommended gold caps for my horns. For formal occasions, naturally.”
- `KAE-ORD-PRE-F01-L03` PLAYER: “Did you want them?”
- `KAE-ORD-PRE-F01-L04` KAEDRA [NEUTRAL]: “I wanted the stylist to stop measuring my head.”

**Choice point `KAE-ORD-PRE-F01-C1` (choose exactly one):**

1. `KAE-ORD-PRE-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Your horns look fine as they are, if that is what you prefer.”
   - `KAE-ORD-PRE-F01-R-YES-01` KAEDRA [NEUTRAL]: “I shall record that as the first sensible consultation.”
   - **Outcome:** `KAE-ORD-PRE-F01-O-YES`.
2. `KAE-ORD-PRE-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “The caps would make you look more frightening.”
   - `KAE-ORD-PRE-F01-R-NO-01` KAEDRA [WORRIED]: “Then they would fulfill precisely the wrong purpose.”
   - **Outcome:** `KAE-ORD-PRE-F01-O-NO`.

**END `KAE-ORD-PRE-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
