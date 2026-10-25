#### KAE-ORD-POST-U03 — The Unremarkable Clasp

**Pool:** first-use fixed sequence; **stage:** post; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `KAE-ORD-POST-U03-L01` NARRATOR: Kaedra checks a decorative clasp, then leaves it alone.
- `KAE-ORD-POST-U03-L02` KAEDRA [NEUTRAL]: “That one is secure. I may be developing a reputation for noticing tiny problems.”
- `KAE-ORD-POST-U03-L03` PLAYER: “That seems useful.”
- `KAE-ORD-POST-U03-L04` KAEDRA [NEUTRAL]: “It is. I simply wish people noticed when I chose not to make them dramatic.”

**Choice point `KAE-ORD-POST-U03-C1` (choose exactly one):**

1. `KAE-ORD-POST-U03-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “I notice. You solve problems without needing an audience.”
   - `KAE-ORD-POST-U03-R-YES-01` KAEDRA [NEUTRAL]: “You are becoming a dangerously attentive companion.”
   - **Outcome:** `KAE-ORD-POST-U03-O-YES`.
2. `KAE-ORD-POST-U03-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “You should make a show of inspecting it.”
   - `KAE-ORD-POST-U03-R-NO-01` KAEDRA [WORRIED]: “Then the show would become the problem.”
   - **Outcome:** `KAE-ORD-POST-U03-O-NO`.

**END `KAE-ORD-POST-U03`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `KAE-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
