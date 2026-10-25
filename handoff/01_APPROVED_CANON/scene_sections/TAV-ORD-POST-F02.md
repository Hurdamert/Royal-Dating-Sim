#### TAV-ORD-POST-F02 — Sensible Shoes

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-F02-L01` NARRATOR: Tavri glances at her elegant shoes with theatrical suspicion.
- `TAV-ORD-POST-F02-L02` TAVRI [PLAYFUL]: “These are excellent for entrances and terrible for leaving a room discreetly.”
- `TAV-ORD-POST-F02-L03` PLAYER: “What would you choose instead?”
- `TAV-ORD-POST-F02-L04` TAVRI [NEUTRAL]: “Something that lets me decide where to go next.”

**Choice point `TAV-ORD-POST-F02-C1` (choose exactly one):**

1. `TAV-ORD-POST-F02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Then choose what lets you move comfortably.”
   - `TAV-ORD-POST-F02-R-YES-01` TAVRI [PLAYFUL]: “Good. You shall be my adviser in the shocking field of practical decisions.”
   - **Outcome:** `TAV-ORD-POST-F02-O-YES`.
2. `TAV-ORD-POST-F02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Appearances first. A princess should endure them.”
   - `TAV-ORD-POST-F02-R-NO-01` TAVRI [WORRIED]: “I have endured quite enough for a small pair of shoes.”
   - **Outcome:** `TAV-ORD-POST-F02-O-NO`.

**END `TAV-ORD-POST-F02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
