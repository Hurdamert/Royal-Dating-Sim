#### KAE-ORD-POST-U04 — A Question of Praise

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U04-L01` NARRATOR: A passerby thanks Kaedra without flinching. She looks faintly startled.
- `KAE-ORD-POST-U04-L02` KAEDRA [NEUTRAL]: “They said “thank you” instead of “please don’t incinerate me.” A pleasant development.”
- `KAE-ORD-POST-U04-L03` PLAYER: “How did that feel?”
- `KAE-ORD-POST-U04-L04` KAEDRA [NEUTRAL]: “New. And quieter than I expected.”

**Choice point `KAE-ORD-POST-U04-C1` (choose exactly one):**

1. `KAE-ORD-POST-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You deserve ordinary kindness, not a constant demonstration of fear.”
   - `KAE-ORD-POST-U04-R-YES-01` KAEDRA [NEUTRAL]: “I could grow accustomed to that.”
   - **Outcome:** `KAE-ORD-POST-U04-O-YES`.
2. `KAE-ORD-POST-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Fear proves they know you are powerful.”
   - `KAE-ORD-POST-U04-R-NO-01` KAEDRA [WORRIED]: “And misses nearly everything I hope to be.”
   - **Outcome:** `KAE-ORD-POST-U04-O-NO`.
3. `KAE-ORD-POST-U04-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “You scare everyone because you are a monster. They are right to fear you.”
   - `KAE-ORD-POST-U04-R-OFF-01` KAEDRA [ANNOYED]: “I am not interested in earning approval by accepting an insult.”
   - **Outcome:** `KAE-ORD-POST-U04-O-OFF`.

**END `KAE-ORD-POST-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
