## C. Scene 2 — The Private Confession (first full midpoint attempt)

**Scene ID:** `TAV-MID-01`  
**Type:** mandatory midpoint, first full attempt (shown once).  
**Eligibility:** Current Tavri route; five committed hearts (10 half-heart units), midpoint incomplete; Charisma ≥ 6 and Intelligence ≥ 4; Tavri eligible and interaction unused. If thresholds unmet, block starting any Tavri encounter free of cost.  
**Location:** Begins at Tavri's scheduled location and may move to the Royal Gardens inside the same one-slot encounter.  
**Objective:** Mutual vulnerability; the protagonist admits hiding fear and insecurity behind practiced competence rather than claiming to have used a particular training activity.

- `TAV-MID-001` NARRATOR: Tavri walks beside you until the noise of the court fades behind a hedge. The Royal Gardens are quiet enough to hear the fountain miss a beat.
- `TAV-MID-002` TAVRI [PLAYFUL]: "Congratulations. You've earned the rare privilege of my exclusive, invitation-only silence. Reviews are mixed."
- `TAV-MID-003` PLAYER: "Should I clap?"
- `TAV-MID-004` TAVRI [PLAYFUL]: "Please don't. I've had quite enough clapping for one lifetime."
- `TAV-MID-005` NARRATOR: She studies the reflection in the water. Her tail has gone still.
- `TAV-MID-006` TAVRI [WORRIED]: "Do you know what happens when you're the amusing princess? People don't ask if you're all right. They ask when you're going to be amusing again."
- `TAV-MID-007` PLAYER: "That sounds lonely."
- `TAV-MID-008` TAVRI [NEUTRAL]: "It's comfortable, if you never leave the stage. I can make a court laugh. I can turn a scandal into a story."
- `TAV-MID-009` TAVRI [WORRIED]: "I don't know whether anyone would stay if I had nothing clever left to say."
- `TAV-MID-010` NARRATOR: For once she does not rescue the silence with a joke.

**Choice point `TAV-MID-C1` — one decisive answer:**

1. `TAV-MID-C1-MUTUAL` **Correct; milestone completes, no hearts gained**. PLAYER: "I hide behind being useful. Where I come from, I kept trying to prove I deserved a place. I don't always know who I am when I'm not succeeding. But I'd still want to sit here with you, even if neither of us said anything clever."
   - `TAV-MID-S01` TAVRI [SURPRISED]: "You? The person who can explain an entire disaster as if it were a tidy list?"
   - `TAV-MID-S02` PLAYER: "The lists are how you know I'm panicking."
   - `TAV-MID-S03` TAVRI [WORRIED]: "That is an alarming amount of honesty for one bench."
   - `TAV-MID-S04` PLAYER: "We could stop."
   - `TAV-MID-S05` TAVRI [NEUTRAL]: "No. I think I'd like to try something."
   - `TAV-MID-S06` NARRATOR: Tavri lowers her voice. "I had a miserable day," she says, plainly. Nothing sparkles. No audience applauds.
   - `TAV-MID-S07` PLAYER: "I'm sorry. Want to tell me about it?"
   - `TAV-MID-S08` TAVRI [PLAYFUL]: "Only if you promise not to file a quarterly report on my feelings."
   - `TAV-MID-S09` NARRATOR: You remain by the fountain. The conversation is not impressive. It is better than that.
   - **Narrative outcome:** `TAV-MID-O-TRUST`; set midpoint-completed true when the encounter resolves.
2. `TAV-MID-C1-REASSURE` **Wrong; midpoint incomplete, no hearts changed**. PLAYER: "That's ridiculous. Everyone loves you. You're the funniest person in the kingdom."
   - `TAV-MID-W01` TAVRI [WORRIED]: "That's precisely the part I'm worried about."
   - `TAV-MID-W02` PLAYER: "I meant it kindly."
   - `TAV-MID-W03` TAVRI [NEUTRAL]: "I know. Perhaps we can talk about it when I find better words."
   - **Narrative outcome:** `TAV-MID-O-MISUNDERSTOOD`; first full event flagged seen, midpoint still incomplete, retry later.
3. `TAV-MID-C1-PERFORM` **Wrong; midpoint incomplete, no hearts changed**. PLAYER: "Then never let them see you slip. I can help you write better jokes."
   - `TAV-MID-P01` TAVRI [ANNOYED]: "I asked whether you would stay if I stopped performing. You offered to improve the show."
   - `TAV-MID-P02` PLAYER: "I didn't hear what you were really asking."
   - `TAV-MID-P03` TAVRI [NEUTRAL]: "Maybe next time."
   - **Narrative outcome:** `TAV-MID-O-UNHEARD`; first full event flagged seen, midpoint still incomplete, retry later.

**END `TAV-MID-01`:** Always consume one slot and the daily princess interaction, append one journal entry, and apply no heart change. On correct choice set milestone-completed; on wrong choice keep five-heart gate with a repeatable **short** retry. If a later offense has reduced hearts only after milestone success, the milestone does not reset.

---

