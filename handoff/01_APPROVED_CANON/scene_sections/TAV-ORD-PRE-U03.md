#### TAV-ORD-PRE-U03 — A Herald’s Breathing Exercise

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U03-L01` NARRATOR: An anxious herald practices Tavri’s introduction with enough adjectives to exhaust an opera company.
- `TAV-ORD-PRE-U03-L02` TAVRI [PLAYFUL]: “I have been called luminous, radiant, and devastating. The herald has not yet said my name.”
- `TAV-ORD-PRE-U03-L03` PLAYER: “Do the adjectives bother you?”
- `TAV-ORD-PRE-U03-L04` TAVRI [NEUTRAL]: “I begin to fear I must look sufficiently devastating to justify the paperwork.”

**Choice point `TAV-ORD-PRE-U03-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Would you like me to ask him to shorten it to simply Tavri?”
   - `TAV-ORD-PRE-U03-R-YES-01` TAVRI [PLAYFUL]: “Simple. Terrifying. I like it.”
   - **Outcome:** `TAV-ORD-PRE-U03-O-YES`.
2. `TAV-ORD-PRE-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “He should add majestic. There is room before he runs out of breath.”
   - `TAV-ORD-PRE-U03-R-NO-01` TAVRI [WORRIED]: “There is room in a herald’s lungs, perhaps. Not in my patience.”
   - **Outcome:** `TAV-ORD-PRE-U03-O-NO`.

**END `TAV-ORD-PRE-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
