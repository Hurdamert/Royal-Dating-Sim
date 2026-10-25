#### TAV-ORD-PRE-F03 — The Revised Program

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-F03-L01` NARRATOR: An official program describes Tavri as “effortlessly delightful.”
- `TAV-ORD-PRE-F03-L02` TAVRI [PLAYFUL]: “Effortlessly. That is adorable. It took the clerk three drafts to spell it.”
- `TAV-ORD-PRE-F03-L03` PLAYER: “Do you want it changed?”
- `TAV-ORD-PRE-F03-L04` TAVRI [NEUTRAL]: “I would settle for a word that allows a person a difficult day.”

**Choice point `TAV-ORD-PRE-F03-C1` (choose exactly one):**

1. `TAV-ORD-PRE-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “How about just your name? You can decide the rest.”
   - `TAV-ORD-PRE-F03-R-YES-01` TAVRI [PLAYFUL]: “I think I am growing fond of that radical editorial policy.”
   - **Outcome:** `TAV-ORD-PRE-F03-O-YES`.
2. `TAV-ORD-PRE-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Keep it. People like knowing what to expect.”
   - `TAV-ORD-PRE-F03-R-NO-01` TAVRI [WORRIED]: “I am more than a promise printed on a program.”
   - **Outcome:** `TAV-ORD-PRE-F03-O-NO`.

**END `TAV-ORD-PRE-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
