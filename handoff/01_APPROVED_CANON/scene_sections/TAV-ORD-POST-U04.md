#### TAV-ORD-POST-U04 — The Unfinished Joke

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U04-L01` NARRATOR: Tavri starts a joke, then stops halfway, smiling at the absurdity.
- `TAV-ORD-POST-U04-L02` TAVRI [PLAYFUL]: “A fox princess walks into a—oh, I have forgotten the ending.”
- `TAV-ORD-POST-U04-L03` PLAYER: “Do you want help remembering?”
- `TAV-ORD-POST-U04-L04` TAVRI [NEUTRAL]: “Not particularly. I am enjoying the fact that nothing terrible has happened.”

**Choice point `TAV-ORD-POST-U04-C1` (choose exactly one):**

1. `TAV-ORD-POST-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Then the joke can stay unfinished.”
   - `TAV-ORD-POST-U04-R-YES-01` TAVRI [PLAYFUL]: “You are dangerously easy to be imperfect around.”
   - **Outcome:** `TAV-ORD-POST-U04-O-YES`.
2. `TAV-ORD-POST-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Try harder. The setup deserves a better ending.”
   - `TAV-ORD-POST-U04-R-NO-01` TAVRI [WORRIED]: “It seems the pressure has returned for an encore.”
   - **Outcome:** `TAV-ORD-POST-U04-O-NO`.

**END `TAV-ORD-POST-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
