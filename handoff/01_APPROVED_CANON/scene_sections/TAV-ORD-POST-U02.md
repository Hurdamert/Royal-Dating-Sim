#### TAV-ORD-POST-U02 — The Badly Drawn Map

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-POST-U02-L01` NARRATOR: Tavri unrolls a map of the palace whose hallways have been annotated with tiny jokes.
- `TAV-ORD-POST-U02-L02` TAVRI [PLAYFUL]: “This corridor is labeled “certain doom.” It leads to a linen cupboard.”
- `TAV-ORD-POST-U02-L03` PLAYER: “Did you make this?”
- `TAV-ORD-POST-U02-L04` TAVRI [NEUTRAL]: “Anonymously. The laundry staff deserves their own legend.”

**Choice point `TAV-ORD-POST-U02-C1` (choose exactly one):**

1. `TAV-ORD-POST-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “The jokes are funny, but maybe let the staff decide whether to share them.”
   - `TAV-ORD-POST-U02-R-YES-01` TAVRI [PLAYFUL]: “Fair. I would rather give someone a laugh than make them the punch line.”
   - **Outcome:** `TAV-ORD-POST-U02-O-YES`.
2. `TAV-ORD-POST-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should publish it with everyone’s names beside their mistakes.”
   - `TAV-ORD-POST-U02-R-NO-01` TAVRI [WORRIED]: “That would turn a silly map into a list of targets.”
   - **Outcome:** `TAV-ORD-POST-U02-O-NO`.

**END `TAV-ORD-POST-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
