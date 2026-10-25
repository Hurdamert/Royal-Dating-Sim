#### KAE-ORD-POST-F03 — The Courtesy of Disagreement

**Pool:** cyclic fallback; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-F03-L01` NARRATOR: Kaedra pauses after hearing a minor difference of opinion.
- `KAE-ORD-POST-F03-L02` KAEDRA [NEUTRAL]: “We disagree about something inconsequential. Shall I alert the heralds?”
- `KAE-ORD-POST-F03-L03` PLAYER: “Only if they have nothing better to announce.”
- `KAE-ORD-POST-F03-L04` KAEDRA [NEUTRAL]: “I have never seen a royal bulletin titled “Two People Remain Fond of Each Other.””

**Choice point `KAE-ORD-POST-F03-C1` (choose exactly one):**

1. `KAE-ORD-POST-F03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “We can disagree and still listen to one another.”
   - `KAE-ORD-POST-F03-R-YES-01` KAEDRA [NEUTRAL]: “An excellent title for the bulletin, actually.”
   - **Outcome:** `KAE-ORD-POST-F03-O-YES`.
2. `KAE-ORD-POST-F03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “It is safer if I just agree with whatever you say.”
   - `KAE-ORD-POST-F03-R-NO-01` KAEDRA [WORRIED]: “I prefer a companion who trusts me enough to disagree.”
   - **Outcome:** `KAE-ORD-POST-F03-O-NO`.

**END `KAE-ORD-POST-F03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
