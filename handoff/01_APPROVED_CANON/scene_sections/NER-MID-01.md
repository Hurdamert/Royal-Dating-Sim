## C. Scene 2 — The Forbidden Journey (first full midpoint attempt)

**Scene ID:** `NER-MID-01`  
**Type:** Mandatory first five-heart midpoint; full scene shown once.  
**Eligibility:** Nerelle route; exactly five committed hearts (`heartsHalf = 10`), midpoint incomplete; **Kindness ≥ 6** and **Charisma ≥ 4**; Nerelle scheduled in this slot; daily encounter unused; no active encounter. If stats insufficient, block all princess interactions free of cost until qualified.  
**Location:** Opens at the scheduled waterside position. The scene may use the approved **Moonwater Quay** and **Royal Gardens canal** as water-accessible narrative settings within this one encounter; Nerelle stays in the water and the protagonist remains on waterside paths or quays. No new geographical connection or travel mechanic is implied. Nothing requires Nerelle to be on land or exposes a new map node.  
**Dramatic objective:** She wants a personally chosen, feasible way to explore the surface-facing waterways while continuing to serve her ocean community. The protagonist must support a **jointly considered plan with Nerelle in control** rather than command her, rescue her, or deny her ambitions.

- `NER-MID-001` NARRATOR: Nerelle is waiting in the water below the quay, unusually quiet. A folded chart rests on a dry ledge within her reach, weighted beneath a smooth stone.
- `NER-MID-002` NERELLE [PLAYFUL]: "Before you ask: no, I have not stolen a map. It belongs to me. The court has simply declared it a terribly inconvenient object for me to own."
- `NER-MID-003` PLAYER: "Is this where the official warning says 'forbidden journey'?"
- `NER-MID-004` NERELLE [NEUTRAL]: "It says 'unsanctioned surface observation.' If you enlarge the lettering enough, it sounds almost respectable."
- `NER-MID-005` NARRATOR: She lifts a hand to the chart. The familiar water-accessible places near Moonwater Quay and the Royal Gardens canal are marked as possible surface-viewing stops: places close enough to hear markets and watch people going about their day.
- `NER-MID-006` NERELLE [WORRIED]: "I know those currents. I know the tides and the places where the barges pass. I've helped guide emergency supplies here. Yet when I ask to visit simply because I want to, the answer changes."
- `NER-MID-007` PLAYER: "Your court doesn't want you to go?"
- `NER-MID-008` NERELLE [NEUTRAL]: "They want me to be safe. They also want me to be available whenever a council member discovers another urgent meeting. Both things are reasonable until there is no time left that belongs to me."
- `NER-MID-009` NARRATOR: A surface courier crosses a nearby bridge carrying a stack of documents taller than his head. The top sheet escapes and lands in the canal. Nerelle catches it before it sinks.
- `NER-MID-010` NERELLE [PLAYFUL]: "The surface, meanwhile, is defending itself with administrative paperwork. I feel at home already."
- `NER-MID-011` PLAYER: "Why tell me about the journey now?"
- `NER-MID-012` NERELLE [WORRIED]: "Because I trust you, and that makes this harder. Everyone has an opinion about what I should do. I wanted to hear yours. I'm afraid you'll give me another order, even if it comes dressed as kindness."
- `NER-MID-013` PLAYER: "What do you want?"
- `NER-MID-014` NERELLE [NEUTRAL]: "I want to learn how people live above the water. I want to remain answerable to the people who rely on me below it. And I want the choice to be mine."
- `NER-MID-015` NARRATOR: She waits beside the quay, tail resting in the steady current. The chart stays between you, open to amendment rather than demanding obedience.

**Choice point `NER-MID-C1` — one decisive answer:**

1. `NER-MID-C1-PLAN` **Correct; complete milestone, no hearts gained.** PLAYER: "Then let's design a visit you actually want. You choose the route and when you're free of court duties. We can plan a safe waterside stop, agree on how you tell your court, and change plans if the tide or your responsibilities need it. I'll help, but it's your call."
   - `NER-MID-S01` NERELLE [SURPRISED]: "You didn't begin by telling me what I was allowed to do."
   - `NER-MID-S02` PLAYER: "You already know these waterways better than I ever will. I can help with the surface part."
   - `NER-MID-S03` NERELLE [NEUTRAL]: "Then here is what I propose. First, I finish my scheduled hearings. Second, I tell the appropriate attendants where I'll be. Third, I explore the garden canal because I want to, not because a task requires it."
   - `NER-MID-S04` PLAYER: "And if someone decides a private afternoon is scandalous?"
   - `NER-MID-S05` NERELLE [PLAYFUL]: "I'll ask whether they prefer their scandals alphabetized."
   - `NER-MID-S06` NARRATOR: She traces the waterway on the map. You suggest where a surface walkway runs alongside it; she corrects you where the current is too swift.
   - `NER-MID-S07` NERELLE [WORRIED]: "I worried you would make this into a daring rescue. I don't need to be carried away from my life. I need space to live it."
   - `NER-MID-S08` PLAYER: "Then we make space, together."
   - `NER-MID-S09` NERELLE [NEUTRAL]: "Together. That sounds less frightening when you say it without deciding the rest for me."
   - `NER-MID-S10` NARRATOR: They follow the familiar canal waterline for a short distance, comparing its sounds and sights. Nothing about the route is new. The novelty is that Nerelle chose to take it.
   - **Narrative outcome ID:** `NER-MID-O-TRUST`. Mark midpoint completed on encounter resolution; no heart award.
2. `NER-MID-C1-RESCUE` **Wrong; midpoint incomplete, no hearts changed.** PLAYER: "You shouldn't have to deal with all this. I'll arrange everything and get you away from the court before anyone can object."
   - `NER-MID-W01` NERELLE [ANNOYED]: "Away from the court? Those are my people. My responsibilities."
   - `NER-MID-W02` PLAYER: "I only meant to free you."
   - `NER-MID-W03` NERELLE [WORRIED]: "Free me to do what you've decided? I wanted you to hear my plan, not replace it."
   - `NER-MID-W04` NARRATOR: She takes back the chart, leaving the conversation unfinished rather than agreeing to a future chosen for her.
   - **Narrative outcome ID:** `NER-MID-O-OVERRIDDEN`. Flag full midpoint scene seen; retry later.
3. `NER-MID-C1-PROHIBIT` **Wrong; midpoint incomplete, no hearts changed.** PLAYER: "Your court has a point. There are risks, so you should stop asking to visit the surface."
   - `NER-MID-P01` NERELLE [NEUTRAL]: "I know the risks. I came because I thought we might discuss them as equals."
   - `NER-MID-P02` PLAYER: "I don't want you hurt."
   - `NER-MID-P03` NERELLE [ANNOYED]: "Concern is welcome. Treating concern as authority over me is not."
   - `NER-MID-P04` NARRATOR: She lets the chart float back against the quay and returns to her duties without agreeing to cancel her hope.
   - **Narrative outcome ID:** `NER-MID-O-UNHEARD`. Flag full midpoint scene seen; retry later.

**END `NER-MID-01`:** Consume exactly one slot and one princess interaction for the day; append one journal entry. Hearts remain exactly five. Correct answer completes midpoint permanently; either wrong answer sets a later eligible retry pending. On failure the complete original scene may not be replayed; use `NER-MID-RETRY-01` instead. The chart and any watery route are storytelling only, not inventory or map content.

---

