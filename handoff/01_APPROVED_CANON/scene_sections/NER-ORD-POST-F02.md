#### NER-ORD-POST-F02 — Festival Ribbon

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-F02-L01` NARRATOR: A loose decorative ribbon bobs against a waterside post.
- `NER-ORD-POST-F02-L02` NERELLE [NEUTRAL]: “People can make ceremonies complicated enough to scare the tide away.”
- `NER-ORD-POST-F02-L03` PLAYER: “Should we rescue this ribbon?”
- `NER-ORD-POST-F02-L04` NERELLE [PLAYFUL]: “Only if it would otherwise tangle a boat.”

**Choice point `NER-ORD-POST-F02-C1` (choose exactly one):**

1. `NER-ORD-POST-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Let’s keep the water clear, then leave the celebrating to people.”
   - `NER-ORD-POST-F02-R-YES-01` NERELLE [NEUTRAL]: “A sensible ordering of priorities. The fish agree.”
   - **Outcome:** `NER-ORD-POST-F02-O-YES`.
2. `NER-ORD-POST-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “We should decorate every patch of water.”
   - `NER-ORD-POST-F02-R-NO-01` NERELLE [WORRIED]: “The sea already has a rather successful decorating department.”
   - **Outcome:** `NER-ORD-POST-F02-O-NO`.

**END `NER-ORD-POST-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
