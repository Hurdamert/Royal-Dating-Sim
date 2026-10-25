#### TAV-ORD-POST-U06 — An Ordinary Laugh

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U06-L01` NARRATOR: Tavri laughs suddenly at a minor inconvenience, unpolished and unmistakably sincere.
- `TAV-ORD-POST-U06-L02` TAVRI [PLAYFUL]: “Oh, that was an awful noise. My public image may never recover.”
- `TAV-ORD-POST-U06-L03` PLAYER: “It sounded like you were having fun.”
- `TAV-ORD-POST-U06-L04` TAVRI [NEUTRAL]: “An outrageous accusation.”

**Choice point `TAV-ORD-POST-U06-C1` (choose exactly one):**

1. `TAV-ORD-POST-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I hope I get to hear that laugh again, if you feel like it.”
   - `TAV-ORD-POST-U06-R-YES-01` TAVRI [PLAYFUL]: “You probably will. It keeps escaping when you are around.”
   - **Outcome:** `TAV-ORD-POST-U06-O-YES`.
2. `TAV-ORD-POST-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Practice a more elegant one for the court.”
   - `TAV-ORD-POST-U06-R-NO-01` TAVRI [WORRIED]: “I think I have practiced enough for one lifetime.”
   - **Outcome:** `TAV-ORD-POST-U06-O-NO`.

**END `TAV-ORD-POST-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
