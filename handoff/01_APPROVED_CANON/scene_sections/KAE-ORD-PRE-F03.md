#### KAE-ORD-PRE-F03 — Room for Wings

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-F03-L01` NARRATOR: A railing leaves just enough room for Kaedra to settle her wings comfortably.
- `KAE-ORD-PRE-F03-L02` KAEDRA [NEUTRAL]: “Furniture designers continue to act surprised by the existence of wings.”
- `KAE-ORD-PRE-F03-L03` PLAYER: “Would a wider path help?”
- `KAE-ORD-PRE-F03-L04` KAEDRA [NEUTRAL]: “Occasionally. I am capable of deciding when.”

**Choice point `KAE-ORD-PRE-F03-C1` (choose exactly one):**

1. `KAE-ORD-PRE-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Then tell me what works for you, and I’ll follow your lead.”
   - `KAE-ORD-PRE-F03-R-YES-01` KAEDRA [NEUTRAL]: “How refreshingly free of unsolicited rearrangement.”
   - **Outcome:** `KAE-ORD-PRE-F03-O-YES`.
2. `KAE-ORD-PRE-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should keep your wings out of sight.”
   - `KAE-ORD-PRE-F03-R-NO-01` KAEDRA [WORRIED]: “They are part of me. I do not intend to apologize for them.”
   - **Outcome:** `KAE-ORD-PRE-F03-O-NO`.

**END `KAE-ORD-PRE-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
