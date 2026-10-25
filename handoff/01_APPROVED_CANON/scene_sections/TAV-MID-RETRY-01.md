## D. Scene 3 — Private Confession follow-up (midpoint retry)

**Scene ID:** `TAV-MID-RETRY-01`  
**Type:** mandatory midpoint retry; repeatable after a failed first attempt.  
**Eligibility:** First full midpoint seen; five hearts; midpoint incomplete; required stats retained; new eligible scheduled day with unused encounter; no pending other scene.  
**Location:** Tavri's scheduled location, with a brief private aside. No added cost.

- `TAV-MR-001` TAVRI [NEUTRAL]: "About that conversation by the fountain. I don't need a speech. I think I need to know whether you heard me."
- `TAV-MR-002` PLAYER: "I did. It took me longer than it should have."
- `TAV-MR-003` TAVRI [WORRIED]: "Then tell me what you heard. No flourish, please."

**Choice point `TAV-MR-C1`:**

1. `TAV-MR-C1-LISTEN` **Correct; complete milestone, no hearts gained**. PLAYER: "You're afraid that when the jokes stop, people stop choosing you. I've hidden my own fears behind trying to be useful. I don't want you to have to earn my company."
   - `TAV-MR-S01` TAVRI [SURPRISED]: "That is... exactly it."
   - `TAV-MR-S02` TAVRI [PLAYFUL]: "And I've just heard you say several sentences without accidentally making a presentation. We're both growing."
   - `TAV-MR-S03` NARRATOR: She reaches for your hand, briefly, without looking toward an audience.
   - **Outcome:** `TAV-MID-O-TRUST`; complete midpoint.
2. `TAV-MR-C1-ADVISE` **Wrong; milestone remains pending, no hearts changed**. PLAYER: "You need to stop caring what other people think. Problem solved."
   - `TAV-MR-W01` TAVRI [ANNOYED]: "You make a rather ambitious claim about solving feelings."
   - `TAV-MR-W02` TAVRI [NEUTRAL]: "Perhaps we should try again another day."
   - **Outcome:** `TAV-MID-O-MISUNDERSTOOD`; retry remains available on future eligible days.

**END `TAV-MID-RETRY-01`:** One slot and one daily encounter, one journal entry, zero heart change; never replay the full first midpoint scene. Each further failed retry uses this same short scene.

---

