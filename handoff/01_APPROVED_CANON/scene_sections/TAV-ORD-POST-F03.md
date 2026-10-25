#### TAV-ORD-POST-F03 — The Space Between Jokes

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-F03-L01` NARRATOR: Tavri starts to raise an eyebrow, then lets the joke pass.
- `TAV-ORD-POST-F03-L02` TAVRI [PLAYFUL]: “I was going to make fun of that sign, but perhaps I just want to look at it.”
- `TAV-ORD-POST-F03-L03` PLAYER: “You can do that.”
- `TAV-ORD-POST-F03-L04` TAVRI [NEUTRAL]: “You say that as though leisure were legal.”

**Choice point `TAV-ORD-POST-F03-C1` (choose exactly one):**

1. `TAV-ORD-POST-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I like the moments between your jokes, too.”
   - `TAV-ORD-POST-F03-R-YES-01` TAVRI [PLAYFUL]: “Then I will stop trying to make every moment earn its place.”
   - **Outcome:** `TAV-ORD-POST-F03-O-YES`.
2. `TAV-ORD-POST-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You are getting less entertaining.”
   - `TAV-ORD-POST-F03-R-NO-01` TAVRI [WORRIED]: “I would rather be honestly dull than endlessly on command.”
   - **Outcome:** `TAV-ORD-POST-F03-O-NO`.

**END `TAV-ORD-POST-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
