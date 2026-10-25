#### NER-ORD-PRE-U01 — The Tide Clock

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-PRE-U01-L01` NARRATOR: A floating marker taps the waterside stone at an even rhythm. Nerelle watches the current carry it back.
- `NER-ORD-PRE-U01-L02` NERELLE [NEUTRAL]: “Surface clocks insist every hour is the same length. The tides are less obedient.”
- `NER-ORD-PRE-U01-L03` PLAYER: “You prefer tidekeeping?”
- `NER-ORD-PRE-U01-L04` NERELLE [NEUTRAL]: “I prefer knowing which clock is answering which question.”

**Choice point `NER-ORD-PRE-U01-C1` (choose exactly one):**

1. `NER-ORD-PRE-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Different measures suit different needs. You know your waters best.”
   - `NER-ORD-PRE-U01-R-YES-01` NERELLE [NEUTRAL]: “Exactly. A good chart does not ask the sea to behave like a hallway.”
   - **Outcome:** `NER-ORD-PRE-U01-O-YES`.
2. `NER-ORD-PRE-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “One clock is simpler. Make the sea match the schedule.”
   - `NER-ORD-PRE-U01-R-NO-01` NERELLE [WORRIED]: “If you discover how, please inform the moon before the council.”
   - **Outcome:** `NER-ORD-PRE-U01-O-NO`.

**END `NER-ORD-PRE-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
