#### KAE-ORD-POST-U05 — The Garden Shadow

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U05-L01` NARRATOR: A patch of shade offers space enough for two, and Kaedra shifts without being asked.
- `KAE-ORD-POST-U05-L02` KAEDRA [NEUTRAL]: “A rare architectural achievement: a bench not designed exclusively for narrow shoulders.”
- `KAE-ORD-POST-U05-L03` PLAYER: “Do you want company?”
- `KAE-ORD-POST-U05-L04` KAEDRA [NEUTRAL]: “Yes. I believe I do.”

**Choice point `KAE-ORD-POST-U05-C1` (choose exactly one):**

1. `KAE-ORD-POST-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Then I’ll sit here, if that still suits you.”
   - `KAE-ORD-POST-U05-R-YES-01` KAEDRA [NEUTRAL]: “It does. I rather like being asked.”
   - **Outcome:** `KAE-ORD-POST-U05-O-YES`.
2. `KAE-ORD-POST-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “I’ll sit. You should make room.”
   - `KAE-ORD-POST-U05-R-NO-01` KAEDRA [WORRIED]: “I was already making room. The command was unnecessary.”
   - **Outcome:** `KAE-ORD-POST-U05-O-NO`.

**END `KAE-ORD-POST-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
