#### KAE-ORD-PRE-U03 — The Wobbly Display

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-PRE-U03-L01` NARRATOR: A wooden display stand leans slightly to one side. Kaedra corrects its footing with practiced care.
- `KAE-ORD-PRE-U03-L02` KAEDRA [NEUTRAL]: “Someone suggested I simply smash it to save time.”
- `KAE-ORD-PRE-U03-L03` PLAYER: “Would that help?”
- `KAE-ORD-PRE-U03-L04` KAEDRA [NEUTRAL]: “It would make a satisfying noise and create a new procurement request.”

**Choice point `KAE-ORD-PRE-U03-C1` (choose exactly one):**

1. `KAE-ORD-PRE-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Stability seems the better solution.”
   - `KAE-ORD-PRE-U03-R-YES-01` KAEDRA [NEUTRAL]: “I am glad someone appreciates the less dramatic kind of strength.”
   - **Outcome:** `KAE-ORD-PRE-U03-O-YES`.
2. `KAE-ORD-PRE-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Smashing it would prove how powerful you are.”
   - `KAE-ORD-PRE-U03-R-NO-01` KAEDRA [WORRIED]: “Power is not proof of good judgment.”
   - **Outcome:** `KAE-ORD-PRE-U03-O-NO`.

**END `KAE-ORD-PRE-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
