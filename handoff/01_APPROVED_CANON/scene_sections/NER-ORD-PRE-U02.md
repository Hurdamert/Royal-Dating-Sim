#### NER-ORD-PRE-U02 — Bells Underwater

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U02-L01` NARRATOR: A distant bell rings above the waterfront. Nerelle lifts her head to listen.
- `NER-ORD-PRE-U02-L02` NERELLE [NEUTRAL]: “That bell sounds quite different beneath the surface. The low notes travel farther.”
- `NER-ORD-PRE-U02-L03` PLAYER: “Do you hear anything else?”
- `NER-ORD-PRE-U02-L04` NERELLE [PLAYFUL]: “Mostly boats. Their owners assume that because I am underwater I cannot complain.”

**Choice point `NER-ORD-PRE-U02-C1` (choose exactly one):**

1. `NER-ORD-PRE-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I’d like to hear how the world sounds from where you are.”
   - `NER-ORD-PRE-U02-R-YES-01` NERELLE [NEUTRAL]: “An excellent question. Listening is more useful than shouting louder.”
   - **Outcome:** `NER-ORD-PRE-U02-O-YES`.
2. `NER-ORD-PRE-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “If the boats are loud, you should just swim somewhere else.”
   - `NER-ORD-PRE-U02-R-NO-01` NERELLE [WORRIED]: “I have responsibilities here. The boats could also show some courtesy.”
   - **Outcome:** `NER-ORD-PRE-U02-O-NO`.
3. `NER-ORD-PRE-U02-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “Maybe people would listen if you stopped being a strange sea creature.”
   - `NER-ORD-PRE-U02-R-OFF-01` NERELLE [ANNOYED]: “My hearing works perfectly, including when someone is deliberately insulting.”
   - **Outcome:** `NER-ORD-PRE-U02-O-OFF`.

**END `NER-ORD-PRE-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
