#### TAV-ORD-PRE-F01 — An Unrequested Encore

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-F01-L01` NARRATOR: Tavri taps two fingers against her sleeve as if hearing invisible stage music.
- `TAV-ORD-PRE-F01-L02` TAVRI [PLAYFUL]: “I nearly delivered a speech about the weather. A full speech. To one cloud.”
- `TAV-ORD-PRE-F01-L03` PLAYER: “Was the cloud impressed?”
- `TAV-ORD-PRE-F01-L04` TAVRI [NEUTRAL]: “It refused to offer constructive criticism.”

**Choice point `TAV-ORD-PRE-F01-C1` (choose exactly one):**

1. `TAV-ORD-PRE-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Perhaps the cloud just wanted company, not a show.”
   - `TAV-ORD-PRE-F01-R-YES-01` TAVRI [PLAYFUL]: “Remarkably mature of it. I shall try the same.”
   - **Outcome:** `TAV-ORD-PRE-F01-O-YES`.
2. `TAV-ORD-PRE-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should have done the speech. I would rate it.”
   - `TAV-ORD-PRE-F01-R-NO-01` TAVRI [WORRIED]: “I was hoping to avoid a second critic today.”
   - **Outcome:** `TAV-ORD-PRE-F01-O-NO`.

**END `TAV-ORD-PRE-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
