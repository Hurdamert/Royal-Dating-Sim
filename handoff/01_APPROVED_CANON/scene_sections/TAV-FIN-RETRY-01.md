## G. Scene 6 — Shared Confession follow-up (marriage retry)

**Scene ID:** `TAV-FIN-RETRY-01`  
**Type:** mandatory brief final retry; repeatable following a wrong final answer.  
**Eligibility:** Midpoint complete; 20 committed half-hearts; final full scene already shown; marriage retry pending; Tavri scheduled and daily encounter unused; no other pending scene.  
**Location:** Tavri's scheduled location, with a brief private exchange.  
**Objective:** Resolve the question without replaying or replacing the full confession.

- `TAV-FR-001` TAVRI [NEUTRAL]: "I haven't forgotten what you asked me. I also haven't forgotten why I couldn't say yes."
- `TAV-FR-002` PLAYER: "You wanted to be a person beside me, not a role I could protect or show off."
- `TAV-FR-003` TAVRI [WORRIED]: "I did. And I still need you to mean it."

**Choice point `TAV-FR-C1`:**

1. `TAV-FR-C1-EQUAL` **Correct; terminal success, gallery unlock, no hearts gained**. PLAYER: "I want to marry you because I love who you are when nobody is watching. We would choose our future together. Would you still like that future with me?"
   - `TAV-FR-S01` TAVRI [SURPRISED]: "That's what I hoped you meant."
   - `TAV-FR-S02` TAVRI [PLAYFUL]: "And not one numbered point. I'm proud of you."
   - `TAV-FR-S03` TAVRI [NEUTRAL]: "Yes, {PLAYER}. Let's choose it together."
   - **Narrative outcome:** `TAV-FIN-O-MARRIED`; proceed to `TAV-EPI-01` without an extra action.
2. `TAV-FR-C1-PROMISE` **Wrong; keep ten hearts, retry pending**. PLAYER: "I promise I'll never let you have another bad day if you marry me."
   - `TAV-FR-W01` TAVRI [WORRIED]: "Then you'd be making a promise no one can keep. I need honesty, even when the answer is difficult."
   - `TAV-FR-W02` NARRATOR: She gives you time to reconsider rather than accepting a promise neither of you believes.
   - **Narrative outcome:** `TAV-FIN-O-PENDING`.

**END `TAV-FIN-RETRY-01`:** Every attempt consumes one slot and daily princess encounter and creates one journal entry. No further heart changes. Successful retry unlocks ending; failed retry remains pending unless deadline expires. The abbreviated retry may repeat, but the full first proposal may not.

---

