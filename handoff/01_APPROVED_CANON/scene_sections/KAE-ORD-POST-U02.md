#### KAE-ORD-POST-U02 — Off Duty, Sort Of

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U02-L01` NARRATOR: Kaedra takes a moment to sit where the ground is clear. Her wings relax.
- `KAE-ORD-POST-U02-L02` KAEDRA [NEUTRAL]: “I am told that sitting down is a respectable activity when nothing is on fire.”
- `KAE-ORD-POST-U02-L03` PLAYER: “Does it feel strange?”
- `KAE-ORD-POST-U02-L04` KAEDRA [NEUTRAL]: “A little. I keep expecting someone to issue a report about my posture.”

**Choice point `KAE-ORD-POST-U02-C1` (choose exactly one):**

1. `KAE-ORD-POST-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You can take a rest because you want to. No permission needed.”
   - `KAE-ORD-POST-U02-R-YES-01` KAEDRA [NEUTRAL]: “Then I shall courageously remain seated for another minute.”
   - **Outcome:** `KAE-ORD-POST-U02-O-YES`.
2. `KAE-ORD-POST-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should stay alert. A guardian cannot afford to relax.”
   - `KAE-ORD-POST-U02-R-NO-01` KAEDRA [WORRIED]: “A tired guardian is not a more useful one.”
   - **Outcome:** `KAE-ORD-POST-U02-O-NO`.

**END `KAE-ORD-POST-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
