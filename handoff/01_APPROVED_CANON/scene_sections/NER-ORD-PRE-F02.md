#### NER-ORD-PRE-F02 — The Floating Leaf

**Pool:** cyclic fallback; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-F02-L01` NARRATOR: A leaf circles beside Nerelle without quite moving away.
- `NER-ORD-PRE-F02-L02` NERELLE [NEUTRAL]: “This leaf has been following me for several minutes. I suspect an appointment.”
- `NER-ORD-PRE-F02-L03` PLAYER: “Does it need your signature?”
- `NER-ORD-PRE-F02-L04` NERELLE [PLAYFUL]: “I do not recall issuing permits to leaves.”

**Choice point `NER-ORD-PRE-F02-C1` (choose exactly one):**

1. `NER-ORD-PRE-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Perhaps it simply found a calm place to drift.”
   - `NER-ORD-PRE-F02-R-YES-01` NERELLE [NEUTRAL]: “A reasonable ambition. The council could learn from it.”
   - **Outcome:** `NER-ORD-PRE-F02-O-YES`.
2. `NER-ORD-PRE-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should keep it as proof of your authority.”
   - `NER-ORD-PRE-F02-R-NO-01` NERELLE [WORRIED]: “I doubt a leaf would appreciate being drafted into office.”
   - **Outcome:** `NER-ORD-PRE-F02-O-NO`.

**END `NER-ORD-PRE-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
