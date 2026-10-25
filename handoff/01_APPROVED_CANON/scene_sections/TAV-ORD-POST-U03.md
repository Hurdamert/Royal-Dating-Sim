#### TAV-ORD-POST-U03 — A Blank Playbill

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U03-L01` NARRATOR: Someone has left a blank playbill near the princess.
- `TAV-ORD-POST-U03-L02` TAVRI [PLAYFUL]: “There are no instructions on it. I find that more intimidating than opening night.”
- `TAV-ORD-POST-U03-L03` PLAYER: “What would you put on the program?”
- `TAV-ORD-POST-U03-L04` TAVRI [NEUTRAL]: “Perhaps one scene in which everyone can be ordinary and nobody leaves.”

**Choice point `TAV-ORD-POST-U03-C1` (choose exactly one):**

1. `TAV-ORD-POST-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We could call it “A Day with No Auditions.””
   - `TAV-ORD-POST-U03-R-YES-01` TAVRI [PLAYFUL]: “A terrible title for ticket sales. A perfect title for us.”
   - **Outcome:** `TAV-ORD-POST-U03-O-YES`.
2. `TAV-ORD-POST-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Your greatest speeches, obviously. People want the highlights.”
   - `TAV-ORD-POST-U03-R-NO-01` TAVRI [WORRIED]: “Perhaps. But I would like a few moments that are not highlights.”
   - **Outcome:** `TAV-ORD-POST-U03-O-NO`.
3. `TAV-ORD-POST-U03-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “You are only worth spending time with when you entertain me.”
   - `TAV-ORD-POST-U03-R-OFF-01` TAVRI [ANNOYED]: “Then our time together will be shorter than you expect.”
   - **Outcome:** `TAV-ORD-POST-U03-O-OFF`.

**END `TAV-ORD-POST-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
