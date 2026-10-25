## E. Scene 4 — Unscripted Comedy

**Scene ID:** `TAV-EVT-POST-01`  
**Type:** optional post-midpoint event, one-time.  
**Eligibility:** Tavri milestone completed; Kindness ≥ 3; fewer than ten committed hearts; marriage retry not pending; event not experienced; Tavri eligible in this slot with unused daily encounter.  
**Location:** Begins where Tavri is scheduled; temporary performance is represented as an existing Town Square or Palace Court setting, not a newly selectable location or comedy minigame.  
**Objective:** Let Tavri choose imperfection without treating humor as something she must always provide.

- `TAV-POST-001` NARRATOR: Someone in the Town Square has erected a tiny stage. A hand-painted sign announces: *Royal Comedy Showcase: Participation Voluntary, Embarrassment Inevitable.*
- `TAV-POST-002` TAVRI [PLAYFUL]: "Excellent. Finally, an event whose organizers understand their audience."
- `TAV-POST-003` PLAYER: "Are you performing?"
- `TAV-POST-004` TAVRI [NEUTRAL]: "I volunteered yesterday. Today I'm thinking I'd rather be a person in the crowd."
- `TAV-POST-005` NARRATOR: Onstage, a wizard pulls a rabbit from a hat. The rabbit takes one look at the audience and pulls the wizard back inside.
- `TAV-POST-006` PLAYER: "Tough act to follow."
- `TAV-POST-007` TAVRI [WORRIED]: "The court expects me to be effortlessly brilliant. I don't want to be brilliant on command. But I don't want to disappoint everyone, either."
- `TAV-POST-008` PLAYER: "What do you actually want?"
- `TAV-POST-009` TAVRI [SURPRISED]: "That is becoming a rather dangerous question around you."

**Choice point `TAV-POST-C1`:**

1. `TAV-POST-C1-CHOICE` **Correct; net +2 half-hearts**. PLAYER: "Then don't perform. We can watch terrible jokes together. If you decide to go onstage, I'll cheer. If not, I'll still be here."
   - `TAV-POST-S01` TAVRI [WORRIED]: "I think I'd like to stay. Just stay."
   - `TAV-POST-S02` NARRATOR: The next comedian announces that his act is entirely improvised and immediately reads from a scroll marked *Entirely Improvised Act.*
   - `TAV-POST-S03` TAVRI [PLAYFUL]: "I may have found the only performer in the kingdom less spontaneous than you."
   - `TAV-POST-S04` PLAYER: "That was spontaneous and hurtful."
   - `TAV-POST-S05` TAVRI [NEUTRAL]: "And I didn't need a whole stage for it."
   - **Narrative outcome ID:** `TAV-POST-O-CHOSE`.
2. `TAV-POST-C1-PUSH` **Ordinary wrong; net +1 half-heart**. PLAYER: "You always make people laugh. You'll feel better as soon as you're onstage."
   - `TAV-POST-W01` TAVRI [NEUTRAL]: "Maybe. But it would have been nice to decide that myself."
   - `TAV-POST-W02` NARRATOR: She delivers a competent routine. Everyone applauds. Tavri thanks them, and her smile fades as the crowd disperses.
   - **Narrative outcome ID:** `TAV-POST-O-PUSHED`.
3. `TAV-POST-C1-SHAME` **Explicitly offensive; net −1 half-heart**. PLAYER: "Backing out makes you look weak. A real princess wouldn't disappoint her audience."
   - `TAV-POST-X01` TAVRI [ANNOYED]: "I was hoping I could be myself for once. Now I have another audience to disappoint."
   - `TAV-POST-X02` NARRATOR: She steps away from you and joins the crowd alone.
   - **Narrative outcome ID:** `TAV-POST-O-HURT`.

**END `TAV-EVT-POST-01`:** Mark event experienced regardless of result; commit the one net heart result (maximum 20 half-heart units), one slot, one daily encounter, and one journal entry. **If the projected reward reaches ten hearts, immediately link the first full final scene `TAV-FIN-01` inside this same parent encounter before committing anything.** No additional slot or daily encounter is consumed. No optional completion is required for marriage.

---

