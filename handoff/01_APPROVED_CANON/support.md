# Gate 2 — Routine Supporting Copy, Editorial Candidate v0.1

**Status: UNAPPROVED NEW PLAYER-FACING COPY.** Conforms to the approved ordinary-content bible. Humpty remains a **text-only helper**, never a new sprite, route, quest, action cost, or economy. No technical save-state UX contract is invented by this editorial draft.

## Humpty Dumpty: contextual, free Help snippets

**Read-only trigger proposal:** Use the existing game state to choose the most relevant text (e.g., deadline warning over generic startup), but priority/trigger implementation belongs to the later technical contract. The IDs identify prose only. No hint changes state, uses slots or reveals hidden optional thresholds.

### HD-HELP-START — First Steps

> You have 28 days in the royal courtship season. Each day has morning, afternoon, and evening. A valid action uses one slot; looking at menus and Help does not. Select the princess whose story you want to pursue.

**Editorial scope:** General onboarding; free; no action taken.

### HD-HELP-SCHEDULE — Finding Her

> The princesses have different repeating weekly schedules. Check the calendar before attempting a conversation. An unavailable meeting cannot become an extra visit.

**Editorial scope:** Schedule reference; free.

### HD-HELP-DAILY — One Conversation

> You can speak to your selected princess once on an eligible day. A conversation uses one slot even when you choose an answer she dislikes.

**Editorial scope:** Daily-used encounter reminder; free.

### HD-HELP-TRAIN — Training Basics

> Your four stats are Charisma, Intelligence, Strength, and Kindness. There are two approved training activities for each. Levels one through five require one training session each; levels six through ten require two sessions each.

**Editorial scope:** No implied bonuses.

### HD-HELP-CAP — Five Hearts

> Five hearts is an intentional story gate, not a broken meter. Once your requirements are met, the next eligible princess encounter brings a pivotal conversation. The requirements panel shows what is missing.

**Editorial scope:** Does not grant hearts or time.

### HD-HELP-CAP_BLOCKED — Preparation Needed

> The next pivotal conversation is waiting for preparation. Check the visible primary and secondary stat requirements and train as needed. Looking at this notice costs no slot.

**Editorial scope:** Does not disclose hidden optional events.

### HD-HELP-MID_RETRY — Try Again Later

> That was a consequential answer, not a command error. The midpoint did not complete; hearts were not additionally penalized. Another eligible day offers the shorter follow-up.

**Editorial scope:** Must not suggest replay on same day.

### HD-HELP-TEN_HEARTS — Ten Hearts

> An ordinary or optional encounter that reaches ten hearts continues directly into the approved proposal scene. It is part of the same encounter, not a new day or extra slot.

**Editorial scope:** Read-only guidance; no shortcut.

### HD-HELP-FIN_RETRY — A Better Proposal

> An unsuccessful proposal leaves your relationship at ten hearts and a later-day follow-up pending. Keep an eye on the remaining calendar.

**Editorial scope:** No automatic success.

### HD-HELP-DEADLINE — Last Days

> The 28-day deadline is real. Resolve any pending milestone or proposal while you still have an eligible scheduled encounter. The last evening is playable; there is no playable Day 29.

**Editorial scope:** Displayed only near end; no time travel.

### HD-HELP-OPTIONAL — Unexpected Moments

> Some princess moments are optional and can be missed. Explore naturally; you do not need every optional story to reach marriage.

**Editorial scope:** Do not reveal hidden stat thresholds.

### HD-HELP-SAVING — Saving Progress

> The game keeps local progress and offers explicit backup/export and recovery options. Read the displayed save status before leaving. If saving reports a problem, use the recovery guidance without assuming the progress was safely stored.

**Editorial scope:** No cloud sync or autosave guarantee beyond verified UI.

### HD-HELP-RECOVERY — Recovering a Save

> If a backup import or recovery fails, do not overwrite a working save merely to retry. Read the validation error and choose the recovery option that preserves the most reliable existing state.

**Editorial scope:** Exact recovery UI messages are later technical work.

### HD-HELP-FAILURE — After the Deadline

> A failed courtship ends the run, but the journal remains available until you explicitly confirm a new start. Losing does not silently erase the record of your choices.

**Editorial scope:** Only when terminal failure state.


## Humpty Dumpty: Town Square text-only comments

These are optional read-only quips using the existing Town Square presence; showing a quip must not create a princess encounter, action cost, quest, dialogue scene, map node, or reward. Exact availability/presentation priority is a later contract issue.

- `HD-SQUARE-TS01` HUMPTY: “I once sat on a wall to admire the view. The view was excellent; the wall’s risk assessment was less so.”
- `HD-SQUARE-TS02` HUMPTY: “Royal romance has a deadline. Royal paperwork does not. Consider yourself fortunate.”
- `HD-SQUARE-TS03` HUMPTY: “A schedule is a love letter from the calendar. It is also how one avoids appearing at an empty quay.”
- `HD-SQUARE-TS04` HUMPTY: “In my experience, no one is charmed by a second breakfast arriving as a security audit.”
- `HD-SQUARE-TS05` HUMPTY: “If the court asks whether you know what you are doing, answer only if you have tested that theory.”
- `HD-SQUARE-TS06` HUMPTY: “People keep saying I am difficult to put back together. That is unfair to the very dedicated glue merchants.”
- `HD-SQUARE-TS07` HUMPTY: “Do not confuse a locked milestone with an angry princess. One is a number. The other can tell you exactly what went wrong.”
- `HD-SQUARE-TS08` HUMPTY: “Some conversations are important enough that the cleverest thing you can say is a question.”
- `HD-SQUARE-TS09` HUMPTY: “I am available for free advice. The premium package contains the same advice with a longer introduction.”
- `HD-SQUARE-TS10` HUMPTY: “The palace insists every problem has a committee. I prefer problems that have a chair.”
- `HD-SQUARE-TS11` HUMPTY: “When a mermaid tells you the water is the right place for her, I would recommend believing the expert.”
- `HD-SQUARE-TS12` HUMPTY: “A formidable dragon princess can open her own doors. You may still ask whether she would like company.”

## Eight fixed training activities: flavor only

Activities operate exactly under the approved training rule: stats 0–10; levels 1–5 cost one completed session per increase; levels 6–10 cost two completed sessions per increase. Both activities for a stat have identical numeric effects; their narration differs only in flavor. Valid activity choice and action cost remain governed by Gate 1.

### ACT-CHA-READ — Read Rizz Tactics 101

**Location:** Home; **stat:** Charisma.
- `ACT-CHA-READ-L01` NARRATOR: You study a chapter of improbable introductions, then close the book before it can offer advice about winking at royalty.
- `ACT-CHA-READ-L02` NARRATOR: Practicing a line is not the same thing as listening to the reply.

### ACT-CHA-TALK — Practice conversations with townsfolk

**Location:** Town Square; **stat:** Charisma.
- `ACT-CHA-TALK-L01` NARRATOR: You exchange pleasantries with the townsfolk, learning how often a simple question works better than a polished entrance.
- `ACT-CHA-TALK-L02` NARRATOR: Nobody asks for a performance review, which counts as progress of a different kind.

### ACT-INT-BOOK — Study books

**Location:** Royal Library; **stat:** Intelligence.
- `ACT-INT-BOOK-L01` NARRATOR: You compare two careful accounts of the same obscure custom and notice where the writers disagree.
- `ACT-INT-BOOK-L02` NARRATOR: A useful answer now has room for a better question.

### ACT-INT-ORACLE — Consult the magical AI oracle

**Location:** Royal Library; **stat:** Intelligence.
- `ACT-INT-ORACLE-L01` NARRATOR: The enchanted oracle offers an answer with three footnotes and a warning that its confidence is decorative. You check the references.
- `ACT-INT-ORACLE-L02` NARRATOR: The oracle politely admits that “probably” is not a proof.

### ACT-STR-CAL — Calisthenics

**Location:** Home; **stat:** Strength.
- `ACT-STR-CAL-L01` NARRATOR: You finish a measured set of bodyweight exercises, treating steady form as more important than impressive noises.
- `ACT-STR-CAL-L02` NARRATOR: The floor survives another training session.

### ACT-STR-GUILD — Train at the guild

**Location:** Adventurers’ Guild; **stat:** Strength.
- `ACT-STR-GUILD-L01` NARRATOR: You practice controlled movements using the guild’s ordinary training equipment. Nobody has to fight anyone.
- `ACT-STR-GUILD-L02` NARRATOR: The training target remains intact; this is considered a success.

### ACT-KIN-DOG — Care for dogs

**Location:** Royal Gardens; **stat:** Kindness.
- `ACT-KIN-DOG-L01` NARRATOR: You offer patient attention to the garden dogs and make sure they have water and a comfortable place to rest.
- `ACT-KIN-DOG-L02` NARRATOR: A wagging tail offers an eloquent but entirely nonnumeric review.

### ACT-KIN-LITTER — Pick up litter

**Location:** Town Square; **stat:** Kindness.
- `ACT-KIN-LITTER-L01` NARRATOR: You collect stray scraps around the square, leaving the paths and flowerbeds a little better than you found them.
- `ACT-KIN-LITTER-L02` NARRATOR: The square has one fewer mess and no added parade in your honor.


## General outcome/status strings (not a new action system)

- `TXT-TRAIN-PARTIAL`: Training recorded. This level requires one more completed session. The current level has not increased yet.
- `TXT-TRAIN-LEVEL`: Training complete. Your selected stat advanced by one level.
- `TXT-TRAIN-CAPPED`: This stat is already at its maximum. Check your stat display before choosing another activity.
- `TXT-MEET-CORRECT`: The conversation ends on a warm note. Relationship change: +1 heart (subject to the current cap).
- `TXT-MEET-WRONG`: The conversation feels a little awkward, but you have spent time together. Relationship change: +0.5 heart (subject to the current cap).
- `TXT-MEET-OFFENSIVE`: Your words hurt. Relationship change: −0.5 heart (subject to the current floor).
- `TXT-AT-CAP`: Five hearts reached. Further progress requires the scheduled midpoint event and its visible stat requirements.
- `TXT-FIN-PENDING`: Ten hearts reached. Continue directly into the approved proposal scene without spending another slot.
- `TXT-UNAVAILABLE`: No princess encounter is available in this selected time slot. No action has been consumed.
- `TXT-USED`: You have already spoken to your princess today. No action has been consumed.
- `TXT-SAVE-UNKNOWN`: Progress could not be confirmed as safely stored. Review recovery options before closing the game.
- `TXT-NAME-FALLBACK`: Traveler

## Additional routine UI copy (editorial only)

- `UI-INTRO-01`: You have 28 days to build a sincere connection during the royal courtship season.
- `UI-INTRO-02`: Three princesses, three different stories. Choose one route for this run.
- `UI-INTRO-03`: Each day has morning, afternoon, and evening. Planned actions use one slot.
- `UI-INTRO-04`: Use the calendar to find your princess. A valid conversation uses one slot and the day’s one princess encounter.
- `UI-INTRO-05`: Train Charisma, Intelligence, Strength, or Kindness as preparation. Check visible milestone requirements.
- `UI-INTRO-06`: Menus and Help are free to read. Your journal records completed actions.
- `UI-SAVE-01`: Local save
- `UI-SAVE-02`: Export backup
- `UI-SAVE-03`: Import backup
- `UI-FAIL-01`: Day 28 has ended. The courtship deadline has passed.
- `UI-FAIL-02`: Your journal is still available. Starting over requires your confirmation.
- `UI-CONFIRM-01`: Start a new run? Confirming may replace the current active playthrough; export a backup first if you want to keep it.
- `UI-MOBILE-01`: Continue dialogue
- `UI-MOBILE-02`: Choose one response


## Copy boundaries / editorial questions

- **Save and error strings:** The passages are player guidance only. They do not define precisely when a save commits, whether there is an active-write lock, an import conflict algorithm, or an error-code mapping; these are later formal-technical tasks. A full UI-copy review with implemented error flows is still required.
- **Training caps:** `TXT-TRAIN-CAPPED` expressly avoids inventing an action-cost behavior for already-maxed stats; the formal contract determines validity and costs.
- **Humpty quip placement:** This catalog proposes twelve optional lines, not their presentation frequency or whether selecting a free Town Square view is possible outside an action. Those behaviors cannot be inferred from flavor text.
- **Time-of-day:** None of these paragraphs promises evening-only scheduling or visually literal lighting. Approved BG-PRES-01/02 remain authoritative.
