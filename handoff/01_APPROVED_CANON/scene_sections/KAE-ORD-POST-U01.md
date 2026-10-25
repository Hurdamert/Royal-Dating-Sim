#### KAE-ORD-POST-U01 — A Letter of Praise

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U01-L01` NARRATOR: Kaedra reads a glowing letter of commendation, then sets it aside.
- `KAE-ORD-POST-U01-L02` KAEDRA [NEUTRAL]: “Apparently I possess the courage of a thousand soldiers. A logistical nightmare.”
- `KAE-ORD-POST-U01-L03` PLAYER: “Do compliments always sound this grand?”
- `KAE-ORD-POST-U01-L04` KAEDRA [NEUTRAL]: “In my experience, yes. The sender forgot the names of the actual soldiers.”

**Choice point `KAE-ORD-POST-U01-C1` (choose exactly one):**

1. `KAE-ORD-POST-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You could thank the whole team, in your own words.”
   - `KAE-ORD-POST-U01-R-YES-01` KAEDRA [NEUTRAL]: “I shall. Their courage was real, and far more manageable in number.”
   - **Outcome:** `KAE-ORD-POST-U01-O-YES`.
2. `KAE-ORD-POST-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Frame it prominently. People should be in awe of you.”
   - `KAE-ORD-POST-U01-R-NO-01` KAEDRA [WORRIED]: “I would rather they remember who stood beside me.”
   - **Outcome:** `KAE-ORD-POST-U01-O-NO`.

**END `KAE-ORD-POST-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
