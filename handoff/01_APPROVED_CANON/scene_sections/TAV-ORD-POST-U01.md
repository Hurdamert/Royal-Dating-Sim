#### TAV-ORD-POST-U01 — A Comfortable Silence

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U01-L01` NARRATOR: For once, the nearby conversation fades without Tavri racing to fill it.
- `TAV-ORD-POST-U01-L02` TAVRI [PLAYFUL]: “We have reached that notorious stage of friendship where nobody has said anything clever for a full minute.”
- `TAV-ORD-POST-U01-L03` PLAYER: “Should I panic?”
- `TAV-ORD-POST-U01-L04` TAVRI [NEUTRAL]: “Only if you have brought an emergency trumpet.”

**Choice point `TAV-ORD-POST-U01-C1` (choose exactly one):**

1. `TAV-ORD-POST-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can keep the silence. I like being here with you.”
   - `TAV-ORD-POST-U01-R-YES-01` TAVRI [PLAYFUL]: “Good. I had almost forgotten how lovely an unscripted pause can be.”
   - **Outcome:** `TAV-ORD-POST-U01-O-YES`.
2. `TAV-ORD-POST-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “I can invent a joke if you need entertaining.”
   - `TAV-ORD-POST-U01-R-NO-01` TAVRI [WORRIED]: “You see? Even our silence has acquired a stage manager.”
   - **Outcome:** `TAV-ORD-POST-U01-O-NO`.

**END `TAV-ORD-POST-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
