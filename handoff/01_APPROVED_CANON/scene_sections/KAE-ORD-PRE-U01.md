#### KAE-ORD-PRE-U01 — The Doorway Debate

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U01-L01` NARRATOR: A nearby attendant looks uncertain whether a stone archway offers Kaedra enough room for her folded wings.
- `KAE-ORD-PRE-U01-L02` KAEDRA [NEUTRAL]: “I appreciate the concern. I have passed through narrower archways than this.”
- `KAE-ORD-PRE-U01-L03` PLAYER: “Are they trying to help?”
- `KAE-ORD-PRE-U01-L04` KAEDRA [NEUTRAL]: “Probably. They have not yet asked me what I need.”

**Choice point `KAE-ORD-PRE-U01-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We could ask you instead of deciding for you.”
   - `KAE-ORD-PRE-U01-R-YES-01` KAEDRA [NEUTRAL]: “Excellent. The answer is that I need the door to remain a door.”
   - **Outcome:** `KAE-ORD-PRE-U01-O-YES`.
2. `KAE-ORD-PRE-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “They should clear the entire building. You look dangerous.”
   - `KAE-ORD-PRE-U01-R-NO-01` KAEDRA [WORRIED]: “There is a difference between making space and making a spectacle.”
   - **Outcome:** `KAE-ORD-PRE-U01-O-NO`.
3. `KAE-ORD-PRE-U01-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “Maybe they fear you because you look monstrous.”
   - `KAE-ORD-PRE-U01-R-OFF-01` KAEDRA [ANNOYED]: “My appearance does not make me less a person.”
   - **Outcome:** `KAE-ORD-PRE-U01-O-OFF`.

**END `KAE-ORD-PRE-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
