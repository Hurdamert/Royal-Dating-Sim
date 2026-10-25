#### TAV-ORD-PRE-U01 — The Applause Problem

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U01-L01` NARRATOR: A passing admirer bows so deeply that their hat rolls away.
- `TAV-ORD-PRE-U01-L02` TAVRI [PLAYFUL]: “I fear I have been applauded for standing near a doorway. The doorway performed most of the work.”
- `TAV-ORD-PRE-U01-L03` PLAYER: “Did you mean to impress them?”
- `TAV-ORD-PRE-U01-L04` TAVRI [NEUTRAL]: “I merely held it open. Apparently that is a daring new court technique.”

**Choice point `TAV-ORD-PRE-U01-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You were considerate. You do not owe anyone a performance afterward.”
   - `TAV-ORD-PRE-U01-R-YES-01` TAVRI [PLAYFUL]: “That is a strangely generous review. I might frame it beside the door.”
   - **Outcome:** `TAV-ORD-PRE-U01-O-YES`.
2. `TAV-ORD-PRE-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “At least bow dramatically so they get their money’s worth.”
   - `TAV-ORD-PRE-U01-R-NO-01` TAVRI [WORRIED]: “I was rather hoping for permission to stop bowing.”
   - **Outcome:** `TAV-ORD-PRE-U01-O-NO`.
3. `TAV-ORD-PRE-U01-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “You only acted kind so people would applaud you. What a fake.”
   - `TAV-ORD-PRE-U01-R-OFF-01` TAVRI [ANNOYED]: “That is a cruel thing to assume about someone trying to help.”
   - **Outcome:** `TAV-ORD-PRE-U01-O-OFF`.

**END `TAV-ORD-PRE-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
