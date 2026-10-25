#### NER-ORD-POST-U02 — The Map’s Edge

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U02-L01` NARRATOR: A damp map rests on the stones, its sea lanes drawn more carefully than its roads.
- `NER-ORD-POST-U02-L02` NERELLE [NEUTRAL]: “Mapmakers have a habit of drawing one world in detail and the other as blank space.”
- `NER-ORD-POST-U02-L03` PLAYER: “Which side bothers you more?”
- `NER-ORD-POST-U02-L04` NERELLE [PLAYFUL]: “Whichever someone assumes I cannot understand.”

**Choice point `NER-ORD-POST-U02-C1` (choose exactly one):**

1. `NER-ORD-POST-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “What should a map include to respect both travelers?”
   - `NER-ORD-POST-U02-R-YES-01` NERELLE [NEUTRAL]: “Paths that are real for each of them. That is a much better starting point.”
   - **Outcome:** `NER-ORD-POST-U02-O-YES`.
2. `NER-ORD-POST-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Put roads everywhere. Then nobody will get lost.”
   - `NER-ORD-POST-U02-R-NO-01` NERELLE [WORRIED]: “Roads are rarely an improvement to deep water.”
   - **Outcome:** `NER-ORD-POST-U02-O-NO`.

**END `NER-ORD-POST-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
