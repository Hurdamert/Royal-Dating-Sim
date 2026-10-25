#### TAV-ORD-POST-F01 — Invitation Without a Script

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-F01-L01` NARRATOR: Tavri holds out a blank scrap of paper like a formal invitation.
- `TAV-ORD-POST-F01-L02` TAVRI [PLAYFUL]: “You are invited to an extremely exclusive occasion: a conversation with no itinerary.”
- `TAV-ORD-POST-F01-L03` PLAYER: “What is the dress code?”
- `TAV-ORD-POST-F01-L04` TAVRI [NEUTRAL]: “Comfortable uncertainty.”

**Choice point `TAV-ORD-POST-F01-C1` (choose exactly one):**

1. `TAV-ORD-POST-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I accept, no agenda required.”
   - `TAV-ORD-POST-F01-R-YES-01` TAVRI [PLAYFUL]: “Splendid. I shall be the least prepared hostess in history.”
   - **Outcome:** `TAV-ORD-POST-F01-O-YES`.
2. `TAV-ORD-POST-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “At least write a few jokes beforehand.”
   - `TAV-ORD-POST-F01-R-NO-01` TAVRI [WORRIED]: “That seems to defeat the purpose of this exclusive event.”
   - **Outcome:** `TAV-ORD-POST-F01-O-NO`.

**END `TAV-ORD-POST-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
