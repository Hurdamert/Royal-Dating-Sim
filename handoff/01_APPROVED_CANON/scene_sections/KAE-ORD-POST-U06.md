#### KAE-ORD-POST-U06 — Sentries and Signatures

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U06-L01` NARRATOR: Kaedra finishes reading a roster and passes it to the next official.
- `KAE-ORD-POST-U06-L02` KAEDRA [NEUTRAL]: “The sentries can manage their shifts. Several of them have been doing this longer than I have been alive.”
- `KAE-ORD-POST-U06-L03` PLAYER: “That sounds reassuring.”
- `KAE-ORD-POST-U06-L04` KAEDRA [NEUTRAL]: “I am learning that leadership does not require touching every single decision.”

**Choice point `KAE-ORD-POST-U06-C1` (choose exactly one):**

1. `KAE-ORD-POST-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Trusting capable people is part of protecting them, too.”
   - `KAE-ORD-POST-U06-R-YES-01` KAEDRA [NEUTRAL]: “Exactly. It is an oddly difficult form of courage.”
   - **Outcome:** `KAE-ORD-POST-U06-O-YES`.
2. `KAE-ORD-POST-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “If you want control, check every shift yourself.”
   - `KAE-ORD-POST-U06-R-NO-01` KAEDRA [WORRIED]: “Then I would teach them I do not trust their judgment.”
   - **Outcome:** `KAE-ORD-POST-U06-O-NO`.

**END `KAE-ORD-POST-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
