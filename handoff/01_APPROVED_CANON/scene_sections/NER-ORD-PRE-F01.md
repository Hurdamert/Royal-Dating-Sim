#### NER-ORD-PRE-F01 — A Surface Expression

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-F01-L01` NARRATOR: Nerelle considers a phrase she overheard near the waterfront.
- `NER-ORD-PRE-F01-L02` NERELLE [NEUTRAL]: “Someone said a meeting had “gone swimmingly.” Is that praise or a warning?”
- `NER-ORD-PRE-F01-L03` PLAYER: “Usually praise.”
- `NER-ORD-PRE-F01-L04` NERELLE [NEUTRAL]: “A pity. Swimming is sometimes quite difficult.”

**Choice point `NER-ORD-PRE-F01-C1` (choose exactly one):**

1. `NER-ORD-PRE-F01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Maybe the phrase borrowed your skill without understanding it.”
   - `NER-ORD-PRE-F01-R-YES-01` NERELLE [NEUTRAL]: “Then I shall submit an extremely polite linguistic complaint.”
   - **Outcome:** `NER-ORD-PRE-F01-O-YES`.
2. `NER-ORD-PRE-F01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “It means all swimming is easy, obviously.”
   - `NER-ORD-PRE-F01-R-NO-01` NERELLE [WORRIED]: “You may wish to discuss that with a strong current.”
   - **Outcome:** `NER-ORD-PRE-F01-O-NO`.

**END `NER-ORD-PRE-F01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
