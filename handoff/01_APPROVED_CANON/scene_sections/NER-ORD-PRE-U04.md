#### NER-ORD-PRE-U04 — The Gulls’ Petition

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U04-L01` NARRATOR: A gull steals a bit of ribbon from a mooring post, then drops it back into the water.
- `NER-ORD-PRE-U04-L02` NERELLE [NEUTRAL]: “I think the gulls are petitioning for better harbor decorations.”
- `NER-ORD-PRE-U04-L03` PLAYER: “What does their petition say?”
- `NER-ORD-PRE-U04-L04` NERELLE [PLAYFUL]: “Mostly that they approve of unattended crumbs.”

**Choice point `NER-ORD-PRE-U04-C1` (choose exactly one):**

1. `NER-ORD-PRE-U04-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Perhaps we should keep the quay tidy and let them find food naturally.”
   - `NER-ORD-PRE-U04-R-YES-01` NERELLE [NEUTRAL]: “The harbor birds would protest. The fish would thank you.”
   - **Outcome:** `NER-ORD-PRE-U04-O-YES`.
2. `NER-ORD-PRE-U04-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “We can toss them anything they want.”
   - `NER-ORD-PRE-U04-R-NO-01` NERELLE [WORRIED]: “Please do not train the harbor to expect scraps at every railing.”
   - **Outcome:** `NER-ORD-PRE-U04-O-NO`.

**END `NER-ORD-PRE-U04`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
