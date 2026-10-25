#### TAV-ORD-PRE-U04 — The Smile Rehearsal

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U04-L01` NARRATOR: Tavri catches her reflection in a polished surface and tries three immaculate smiles in succession.
- `TAV-ORD-PRE-U04-L02` TAVRI [PLAYFUL]: “There. One for ministers, one for visiting nobles, and one for being asked why I am not smiling.”
- `TAV-ORD-PRE-U04-L03` PLAYER: “Is there one you actually like?”
- `TAV-ORD-PRE-U04-L04` TAVRI [NEUTRAL]: “I have not scheduled a meeting with that smile.”

**Choice point `TAV-ORD-PRE-U04-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You can use whichever expression feels real, including none.”
   - `TAV-ORD-PRE-U04-R-YES-01` TAVRI [PLAYFUL]: “A dangerous suggestion. It might start a scandal of relaxed facial muscles.”
   - **Outcome:** `TAV-ORD-PRE-U04-O-YES`.
2. `TAV-ORD-PRE-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “The third looks best. Use it for everyone.”
   - `TAV-ORD-PRE-U04-R-NO-01` TAVRI [WORRIED]: “How efficient. A single mask for the entire kingdom.”
   - **Outcome:** `TAV-ORD-PRE-U04-O-NO`.

**END `TAV-ORD-PRE-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
