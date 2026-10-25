#### NER-ORD-POST-U01 — Two Sets of Letters

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `NER-ORD-POST-U01-L01` NARRATOR: Nerelle unfolds a waterproof letter at water level.
- `NER-ORD-POST-U01-L02` NERELLE [NEUTRAL]: “One letter asks about the shoreline. Another asks about conditions offshore. Both are important.”
- `NER-ORD-POST-U01-L03` PLAYER: “Are they from your court?”
- `NER-ORD-POST-U01-L04` NERELLE [NEUTRAL]: “Yes. They trust me to make careful decisions, not simply choose a side.”

**Choice point `NER-ORD-POST-U01-C1` (choose exactly one):**

1. `NER-ORD-POST-U01-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “You can answer both in your own way. I’ll listen if you want to talk it through.”
   - `NER-ORD-POST-U01-R-YES-01` NERELLE [NEUTRAL]: “Thank you. I would prefer a sounding board to a second sovereign.”
   - **Outcome:** `NER-ORD-POST-U01-O-YES`.
2. `NER-ORD-POST-U01-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Leave the sea’s concerns behind. You have enough on the surface.”
   - `NER-ORD-POST-U01-R-NO-01` NERELLE [WORRIED]: “I will not treat people I serve as disposable.”
   - **Outcome:** `NER-ORD-POST-U01-O-NO`.
3. `NER-ORD-POST-U01-C1-OFF` **Explicitly offensive, net −1 half-heart:** PLAYER: “Abandon the ocean court. Your obligations matter less than being with me.”
   - `NER-ORD-POST-U01-R-OFF-01` NERELLE [ANNOYED]: “I will not trade my responsibilities for anyone’s possession of me.”
   - **Outcome:** `NER-ORD-POST-U01-O-OFF`.

**END `NER-ORD-POST-U01`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `NER-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
