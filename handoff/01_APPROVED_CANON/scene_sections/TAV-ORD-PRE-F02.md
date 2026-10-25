#### TAV-ORD-PRE-F02 — The Ribbon Question

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-F02-L01` NARRATOR: Tavri studies a ribbon fastened neatly around a stack of routine papers.
- `TAV-ORD-PRE-F02-L02` TAVRI [PLAYFUL]: “Someone declared the ribbon a symbol of my extraordinary taste. I picked the only one available.”
- `TAV-ORD-PRE-F02-L03` PLAYER: “A heroic decision under pressure.”
- `TAV-ORD-PRE-F02-L04` TAVRI [NEUTRAL]: “The chronicles will be unbearable.”

**Choice point `TAV-ORD-PRE-F02-C1` (choose exactly one):**

1. `TAV-ORD-PRE-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “The papers matter more than the ribbon; let the compliment pass.”
   - `TAV-ORD-PRE-F02-R-YES-01` TAVRI [PLAYFUL]: “A quiet victory. Nobody needs to write a ballad.”
   - **Outcome:** `TAV-ORD-PRE-F02-O-YES`.
2. `TAV-ORD-PRE-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Ask for a more expensive ribbon next time.”
   - `TAV-ORD-PRE-F02-R-NO-01` TAVRI [WORRIED]: “I fear you have mistaken me for a ribbon merchant.”
   - **Outcome:** `TAV-ORD-PRE-F02-O-NO`.

**END `TAV-ORD-PRE-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
