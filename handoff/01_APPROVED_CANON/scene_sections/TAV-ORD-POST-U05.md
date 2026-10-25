#### TAV-ORD-POST-U05 — Weather Without Metaphors

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U05-L01` NARRATOR: A breeze lifts Tavri’s hair, and she waits as if preparing a grand pronouncement.
- `TAV-ORD-POST-U05-L02` TAVRI [PLAYFUL]: “I was about to compare the wind to the ambitions of kings.”
- `TAV-ORD-POST-U05-L03` PLAYER: “And then?”
- `TAV-ORD-POST-U05-L04` TAVRI [NEUTRAL]: “Then I remembered it is just wind, and it is pleasant.”

**Choice point `TAV-ORD-POST-U05-C1` (choose exactly one):**

1. `TAV-ORD-POST-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can enjoy it without making it mean something.”
   - `TAV-ORD-POST-U05-R-YES-01` TAVRI [PLAYFUL]: “A lovely revolutionary philosophy, {PLAYER}.”
   - **Outcome:** `TAV-ORD-POST-U05-O-YES`.
2. `TAV-ORD-POST-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “A proper princess should turn every moment into a story.”
   - `TAV-ORD-POST-U05-R-NO-01` TAVRI [WORRIED]: “That is exactly the habit I am trying to put down.”
   - **Outcome:** `TAV-ORD-POST-U05-O-NO`.

**END `TAV-ORD-POST-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
