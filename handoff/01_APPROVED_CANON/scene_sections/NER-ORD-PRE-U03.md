#### NER-ORD-PRE-U03 — Quayside Etiquette

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U03-L01` NARRATOR: Two nearby visitors struggle to decide whether they should bow to Nerelle or wave.
- `NER-ORD-PRE-U03-L02` NERELLE [NEUTRAL]: “It appears etiquette has reached an impasse. The hand gestures are becoming competitive.”
- `NER-ORD-PRE-U03-L03` PLAYER: “Is there a rule?”
- `NER-ORD-PRE-U03-L04` NERELLE [NEUTRAL]: “For greeting me? A kind word works wonderfully.”

**Choice point `NER-ORD-PRE-U03-C1` (choose exactly one):**

1. `NER-ORD-PRE-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I can ask how you prefer to be greeted.”
   - `NER-ORD-PRE-U03-R-YES-01` NERELLE [NEUTRAL]: “You have just outperformed three ceremonial committees.”
   - **Outcome:** `NER-ORD-PRE-U03-O-YES`.
2. `NER-ORD-PRE-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “People ought to bow. You are royalty.”
   - `NER-ORD-PRE-U03-R-NO-01` NERELLE [WORRIED]: “Some might choose to. I would rather they spoke to me.”
   - **Outcome:** `NER-ORD-PRE-U03-O-NO`.

**END `NER-ORD-PRE-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
