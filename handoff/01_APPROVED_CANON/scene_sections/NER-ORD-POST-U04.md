#### NER-ORD-POST-U04 — Advice and Orders

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U04-L01` NARRATOR: A nearby clerk mistakes Nerelle’s question for an order and begins scribbling.
- `NER-ORD-POST-U04-L02` NERELLE [NEUTRAL]: “I asked whether the lanterns were safe. Apparently that has become a decree.”
- `NER-ORD-POST-U04-L03` PLAYER: “Should we stop the clerk?”
- `NER-ORD-POST-U04-L04` NERELLE [PLAYFUL]: “Please. I would prefer questions to remain possible.”

**Choice point `NER-ORD-POST-U04-C1` (choose exactly one):**

1. `NER-ORD-POST-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Let’s clarify what you meant, and let you decide what happens next.”
   - `NER-ORD-POST-U04-R-YES-01` NERELLE [NEUTRAL]: “Excellent. My voice can survive the translation intact.”
   - **Outcome:** `NER-ORD-POST-U04-O-YES`.
2. `NER-ORD-POST-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “An order would be easier. Let the clerk invent one.”
   - `NER-ORD-POST-U04-R-NO-01` NERELLE [WORRIED]: “Convenience is an unreliable substitute for consent.”
   - **Outcome:** `NER-ORD-POST-U04-O-NO`.

**END `NER-ORD-POST-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
