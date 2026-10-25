#### TAV-ORD-PRE-U06 — Curtain Call

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U06-L01` NARRATOR: A sudden burst of applause drifts from an unrelated gathering. Tavri starts to bow, then catches herself.
- `TAV-ORD-PRE-U06-L02` TAVRI [PLAYFUL]: “My reflexes remain impeccable. Someone applauds and my spine performs court protocol.”
- `TAV-ORD-PRE-U06-L03` PLAYER: “You seem tired.”
- `TAV-ORD-PRE-U06-L04` TAVRI [NEUTRAL]: “Apparently my body has a standing subscription to approval.”

**Choice point `TAV-ORD-PRE-U06-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U06-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We could simply listen until the applause stops. No bow required.”
   - `TAV-ORD-PRE-U06-R-YES-01` TAVRI [PLAYFUL]: “You make doing nothing sound delightfully rebellious.”
   - **Outcome:** `TAV-ORD-PRE-U06-O-YES`.
2. `TAV-ORD-PRE-U06-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Go on, take a bow. They might be applauding you.”
   - `TAV-ORD-PRE-U06-R-NO-01` TAVRI [WORRIED]: “That uncertainty is not the part I enjoy.”
   - **Outcome:** `TAV-ORD-PRE-U06-O-NO`.

**END `TAV-ORD-PRE-U06`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
