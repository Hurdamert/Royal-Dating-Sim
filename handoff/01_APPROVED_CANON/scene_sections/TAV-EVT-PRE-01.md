## B. Scene 1 — Fantasygram Catastrophe

**Scene ID:** `TAV-EVT-PRE-01`  
**Type:** optional Tavri event, pre-midpoint, one-time.  
**Eligibility:** Current Tavri route; milestone incomplete; committed hearts below five; Charisma ≥ 3; scene not already experienced; Tavri scheduled and eligible in current slot; daily princess interaction unused; no other encounter pending.  
**Location:** Opens where Tavri is scheduled; story presentation may move within the same encounter to Town Square or Royal Gardens. No additional location or action cost.  
**Objective:** The protagonist chooses whether to support Tavri's real self in an embarrassing magical social-media incident. No new social-media gameplay is introduced.

- `TAV-PRE-001` NARRATOR: A paper bird lands beside Tavri and unfolds itself into a glowing, aggressively cheerful scroll.
- `TAV-PRE-002` TAVRI [PLAYFUL]: "Fantastic. Fantasygram has delivered this week's public humiliation by express owl."
- `TAV-PRE-003` PLAYER: "You have a magical account?"
- `TAV-PRE-004` TAVRI [ANNOYED]: "The palace has an account. I have a public-relations emergency disguised as a hobby."
- `TAV-PRE-005` NARRATOR: The scroll projects a portrait of Tavri stepping away from a royal banquet. Its caption reads: *Princess flees dinner after losing a battle with a napkin.*
- `TAV-PRE-006` TAVRI [SURPRISED]: "I was helping a servant clean up a spilled tray. How did they manage to remove the servant, the tray, and every trace of context?"
- `TAV-PRE-007` PLAYER: "The crop tool is the most dangerous spell in the kingdom."
- `TAV-PRE-008` TAVRI [PLAYFUL]: "Finally, a scholar who understands modern sorcery."
- `TAV-PRE-009` NARRATOR: Her smile fades when a second scroll appears. This one is titled *Ten Reasons the Princess Is Secretly Unfit for Polite Society.*
- `TAV-PRE-010` TAVRI [WORRIED]: "If I joke about it first, perhaps nobody will notice I'm bothered. That's the usual plan."
- `TAV-PRE-011` PLAYER: "And if the plan isn't working?"
- `TAV-PRE-012` TAVRI [NEUTRAL]: "Then I suppose my heroic companion gets to decide whether I need a joke or a friend."

**Choice point `TAV-PRE-C1` — choose exactly one:**

1. `TAV-PRE-C1-SUPPORT` **Correct; net +2 half-hearts**. PLAYER: "You don't have to perform being unbothered for me. Want help telling the real story—or want to ignore it together?"
   - `TAV-PRE-S01` TAVRI [SURPRISED]: "You'd let me choose? Even if my decision is profoundly unprincesslike?"
   - `TAV-PRE-S02` PLAYER: "Especially then."
   - `TAV-PRE-S03` TAVRI [WORRIED]: "I think I'd like to put the scroll away and be upset for one minute."
   - `TAV-PRE-S04` NARRATOR: The paper bird folds itself into a surprisingly judgmental napkin. Tavri laughs once, this time without performing for anyone.
   - **Narrative outcome ID:** `TAV-PRE-O-SUPPORTED`.
2. `TAV-PRE-C1-DISMISS` **Ordinary wrong; net +1 half-heart**. PLAYER: "It's just a rumor. Tell a better joke and everyone will forget it."
   - `TAV-PRE-W01` TAVRI [NEUTRAL]: "Yes. That's normally what I do."
   - `TAV-PRE-W02` PLAYER: "I was trying to help."
   - `TAV-PRE-W03` TAVRI [WORRIED]: "I know. It's simply exhausting to be offered another performance when I hoped for a moment offstage."
   - `TAV-PRE-W04` NARRATOR: She pockets the scroll. The conversation ends courteously, but the distance between you is noticeable.
   - **Narrative outcome ID:** `TAV-PRE-O-DISMISSED`.
3. `TAV-PRE-C1-CRUEL` **Explicitly offensive; net −1 half-heart**. PLAYER: "Maybe they have a point. A competent princess wouldn't give them material."
   - `TAV-PRE-X01` TAVRI [SURPRISED]: "Oh."
   - `TAV-PRE-X02` TAVRI [ANNOYED]: "Thank you for demonstrating that a cruel comment is much more efficient when delivered in person."
   - `TAV-PRE-X03` NARRATOR: She closes the scroll and ends the conversation herself.
   - **Narrative outcome ID:** `TAV-PRE-O-HURT`.

**END `TAV-EVT-PRE-01`:** Mark `TAV-EVT-PRE-01` experienced, commit the selected net half-heart result (clamped to the appropriate relationship gate), consume exactly one daily princess encounter and one slot, append exactly one action journal entry. Never replay. If this event raises hearts to exactly five before the midpoint, the milestone becomes pending **on a later eligible encounter**, not immediately inside this event.

---

