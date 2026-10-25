#### TAV-ORD-PRE-U02 — The Quill Critic

**Pool:** first-use fixed sequence; **stage:** pre; **locale:** scheduled location only; **cost:** one slot + daily encounter.

- `TAV-ORD-PRE-U02-L01` NARRATOR: A self-writing quill has left an extravagant review of an otherwise ordinary court announcement.
- `TAV-ORD-PRE-U02-L02` TAVRI [PLAYFUL]: “The quill gave my pronunciation five stars and my actual message one. An impressive insult from stationery.”
- `TAV-ORD-PRE-U02-L03` PLAYER: “What did you want people to hear?”
- `TAV-ORD-PRE-U02-L04` TAVRI [NEUTRAL]: “That the servants deserve a day off. The review appears to have missed the subject entirely.”

**Choice point `TAV-ORD-PRE-U02-C1` (choose exactly one):**

1. `TAV-ORD-PRE-U02-C1-YES` **Correct, net +2 half-hearts:** PLAYER: “Ask them about the day off. That matters more than how charmingly you said it.”
   - `TAV-ORD-PRE-U02-R-YES-01` TAVRI [PLAYFUL]: “I knew there was a reason I preferred you to enchanted stationery.”
   - **Outcome:** `TAV-ORD-PRE-U02-O-YES`.
2. `TAV-ORD-PRE-U02-C1-NO` **Ordinary incorrect, net +1 half-heart:** PLAYER: “Next time give it a more glamorous announcement.”
   - `TAV-ORD-PRE-U02-R-NO-01` TAVRI [WORRIED]: “I suspect glamour is exactly what obscured the point.”
   - **Outcome:** `TAV-ORD-PRE-U02-O-NO`.

**END `TAV-ORD-PRE-U02`:** Show exactly the selected branch, then resolve one encounter. Apply exactly one net heart outcome (clamped by current stage), one used-daily-princess-interaction marker, one consumed slot and one journal entry. If projected post-midpoint hearts reach 20 half-units, hand off inside the **same** transaction to `TAV-FIN-01` instead of independently committing the conversation; never insert another choice or second journal action.
