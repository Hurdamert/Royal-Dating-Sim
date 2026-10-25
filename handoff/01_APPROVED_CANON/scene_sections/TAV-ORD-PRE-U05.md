#### TAV-ORD-PRE-U05 — A Riddle with No Prize

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U05-L01` NARRATOR: A folded riddle card lies beside a royal invitation.
- `TAV-ORD-PRE-U05-L02` TAVRI [PLAYFUL]: “What walks into a court with no title and leaves with more expectations than it arrived with?”
- `TAV-ORD-PRE-U05-L03` PLAYER: “A visiting duke?”
- `TAV-ORD-PRE-U05-L04` TAVRI [NEUTRAL]: “Close. Anyone who was foolish enough to say something clever once.”

**Choice point `TAV-ORD-PRE-U05-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U05-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Maybe someone can be clever without being on display all day.”
   - `TAV-ORD-PRE-U05-R-YES-01` TAVRI [PLAYFUL]: “An answer with no punch line. It suits you.”
   - **Outcome:** `TAV-ORD-PRE-U05-O-YES`.
2. `TAV-ORD-PRE-U05-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “A court jester, obviously. You should tell better riddles.”
   - `TAV-ORD-PRE-U05-R-NO-01` TAVRI [WORRIED]: “And there it is: another performance review.”
   - **Outcome:** `TAV-ORD-PRE-U05-O-NO`.

**END `TAV-ORD-PRE-U05`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
