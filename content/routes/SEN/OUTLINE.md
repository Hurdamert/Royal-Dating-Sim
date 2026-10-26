# Senna route — scene outline and file format

Read `BIBLE.md` first, then `docs/writing/STYLE_GUIDE.md` (the house style for all story text). Existing scenes to match for tone and length are in `content/revisions/dialogue-v2/scenes/`; good examples are `TAV-ORD-PRE-U01.json`, `NER-ORD-POST-U03.json` and `KAE-MID-01.json`.

## Rules every scene follows

**Length (match the other routes):**

| Kind | Lines in the scene |
|---|---|
| Ordinary | about 10: intro 4–6, each branch 2–3 |
| Optional event | about 25–32 |
| Midpoint | about 35–45 |
| Midpoint retry | about 10–13 |
| Proposal | about 30–36 |
| Proposal retry | about 10–12 |
| Epilogue | about 20–24 |

**Where and when.** The ordinary conversations are a fixed sequence: PRE U01…U06, then F01, F02, F03 repeating. Each one plays wherever Senna's next meeting happens to be, at any of her five places and in any of the three time slots. So they must be **location-neutral and time-neutral**:

- Use things she carries or does anywhere (her apron pockets, her notebook, her herbal, a patient walking up, a snack someone hands you).
- Never name a place or a time of day, and never say "tonight", "this morning" or "moonlit".

Pivotal scenes have the locations listed below. Even those avoid time-of-day words.

**Lines, speakers and expressions:**

- **Speakers:** `NARRATOR`, `PLAYER`, `SENNA`, and the minor cast from the bible (`PHYSICIAN`, `PIM`, `MERCHANT`, `SAILOR`, `ADVENTURER`). No other princess appears.
- **Expressions** go only on `SENNA` lines: `NEUTRAL`, `PLAYFUL`, `WORRIED`, `ANNOYED` or `SURPRISED`. Her first line in a scene must have one; add one whenever her mood shifts.
- **Speech lines** are wrapped in curly quotes “…”. NARRATOR lines have no quotes. Use ’ for apostrophes.
- **Spelling:** US.
- **Line length:** one thought per line, at most 32 words.
- **The player's name** can appear as `{PLAYER}`. Use it sparingly, once or twice in the whole route.

**Choices:**

- **Ordinary conversations** have 2 or 3 options:
  - exactly one `correct` (+1 heart);
  - one or two `wrong`, which are well-meant misses (+½ heart);
  - optionally one `offensive`, which is rude (−½ heart). About 4 of the 18 ordinary scenes have one.
- **Vary which position the correct option is in.** The older routes always list it first, and players notice.
- **Option labels** are the PLAYER's exact spoken line, in quotes. The label must not give the answer away: no "Honestly,", no "Actually,", and the wrong options should be tempting.
- The branch after each option is 2–3 lines and pays off in Senna's voice. A correct branch should feel earned. A wrong branch is a gentle miss, not a punishment.

## File format

One file per scene: `content/routes/SEN/scenes/<sceneId>.json`.

```json
{
  "sceneId": "SEN-ORD-PRE-U01",
  "title": "Don't Eat That",
  "objective": "(pivotal scenes only) one sentence: what the right answer recognises",
  "intro": [
    { "id": "SEN-ORD-PRE-U01-L01", "speaker": "NARRATOR", "text": "…" },
    { "id": "SEN-ORD-PRE-U01-L02", "speaker": "SENNA", "expression": "ANNOYED", "text": "“Don’t eat that.”" }
  ],
  "choicePointId": "(pivotal scenes only, e.g. SEN-MID-C1)",
  "options": [
    {
      "choiceId": "SEN-ORD-PRE-U01-C1-NO",
      "outcomeId": "SEN-ORD-PRE-U01-O-NO",
      "outcomeClass": "wrong",
      "labelText": "“…”",
      "branch": [{ "id": "SEN-ORD-PRE-U01-R-NO-01", "speaker": "SENNA", "expression": "NEUTRAL", "text": "“…”" }]
    }
  ]
}
```

The epilogue has no `options` (an empty list) and no `choicePointId`.

**ID patterns.** Every line ID must be unique across the whole game.

| Scene | Intro lines | Choice point | Choices | Outcomes | Branch lines |
|---|---|---|---|---|---|
| Ordinary `SEN-ORD-{PRE,POST}-{U01..U06,F01..F03}` | `<scene>-L01…` | `<scene>-C1` (automatic) | `<scene>-C1-YES` (correct), `-NO`, `-NO2`, `-OFF` | `<scene>-O-YES`, `-O-NO`, `-O-NO2`, `-O-OFF` | `<scene>-R-YES-01…`, `-R-NO-01…`, `-R-NO2-01…`, `-R-OFF-01…` |
| `SEN-EVT-PRE-01` | `SEN-PRE-001…` | `SEN-PRE-C1` | `SEN-PRE-C1-<WORD>` | `SEN-PRE-O-<WORD>` | correct `SEN-PRE-S01…`, wrong `SEN-PRE-W01…`, offensive `SEN-PRE-X01…` |
| `SEN-EVT-POST-01` | `SEN-POST-001…` | `SEN-POST-C1` | `SEN-POST-C1-<WORD>` | `SEN-POST-O-<WORD>` | `S/W/X` as above |
| `SEN-MID-01` | `SEN-MID-001…` | `SEN-MID-C1` | `SEN-MID-C1-<WORD>` | correct `SEN-MID-O-TRUST`, wrong `SEN-MID-O-<WORD>` | `SEN-MID-S01…`, `SEN-MID-W01…`, `SEN-MID-X01…` (second wrong) |
| `SEN-MID-RETRY-01` | `SEN-MR-001…` | `SEN-MR-C1` | `SEN-MR-C1-<WORD>` | `SEN-MR-O-TRUST`, `SEN-MR-O-<WORD>` | `SEN-MR-S01…`, `SEN-MR-W01…` |
| `SEN-FIN-01` | `SEN-FIN-001…` | `SEN-FIN-C1` | `SEN-FIN-C1-<WORD>` | correct `SEN-FIN-O-YES`, wrong `SEN-FIN-O-<WORD>` | `SEN-FIN-S01…`, `SEN-FIN-W01…`, `SEN-FIN-X01…` |
| `SEN-FIN-RETRY-01` | `SEN-FR-001…` | `SEN-FR-C1` | `SEN-FR-C1-<WORD>` | `SEN-FR-O-YES`, `SEN-FR-O-STILL-PENDING` | `SEN-FR-S01…`, `SEN-FR-W01…` |
| `SEN-EPI-01` | `SEN-EPI-001…`, plus one line with ID exactly `SEN-EPI-LATER` | none | none | none | none |

In `SEN-EPI-01`, the `SEN-EPI-LATER` line is where the scene moves to the Royal Gardens; it starts with "Later, in the Royal Gardens…". The game switches the background on that line.

`<WORD>` is one capitalised word naming the answer's idea, for example `WANTED`, `USEFUL`, `PLAIN`, `SPEECH`.

**Checking your work.** `node --import tsx scripts/check-route.ts content/routes/SEN` validates every file. It checks:

- format and IDs;
- speakers and expressions;
- the option rules;
- that line IDs are unique against the whole game.

It also lists lines the house-style heuristics flag. Run it until it reports no errors, and treat flagged lines as prompts to rewrite.

---

## Before the milestone (PRE)

She is guarded and dry. The player is new. Every correct answer shows precise attention or honest curiosity.

- **U01 "Don't Eat That".** Someone has handed the player a court snack with a pretty red-berry garnish. Senna knocks it out of their hand: "Don't eat that." Decorative berries, not food; they would make you very sick.
  - Correct: a precise, curious follow-up, such as how she can tell, or what the safe lookalike is.
  - Wrong: gushing thanks and flattery. "I saved your afternoon. Calm down."
  - Offensive: "It's a berry. Relax."
- **U02 "Margin Notes".** She is pencilling corrections into the Royal Physician's own herbal. Dorrance (`PHYSICIAN`) catches her.
  - Correct: back the substance by asking about one specific correction.
  - Wrong: defer to his title ("He's the Royal Physician, maybe go easy").
- **U03 "Small Talk".** The player tries the weather. She answers like a diagnosis.
  - Correct: drop the small talk and ask about what she's actually holding.
  - Wrong: press on with weather, or compliment her dress.
  - Offensive: "Do you ever talk about anything normal?"
- **U04 "For Patients".** A small child (or `PIM`) with a bee sting. She removes it efficiently and produces a boiled sweet "for patients".
  - Correct: help practically, by distracting the child or holding the other hand, and say nothing about her being kind.
  - Wrong: loudly praise how sweet and kind she is. She changes the subject to dosage.
- **U05 "Which One Is Parsley".** Two near-identical sprigs. One is parsley; one would make you very ill. "Which is safe?"
  - Correct: "I have no idea, and I'm not eating either." That is the right answer, and she is delighted.
  - Wrong: a confident guess, which turns out wrong ("You'd be fine. I'd catch you. Still.").
- **U06 "Presentable".** A letter from her mother asks whether she has attended a ball and become "presentable". Senna asks the player what the word even means.
  - Correct: back the life she chose. She seems most herself right where she is, apron and all. Do not praise her usefulness.
  - Wrong: "Maybe go to one ball, to make her happy?"
  - Offensive: "A princess with soil on her gloves? Your mother has a point."
- **F01 "Tea Inspection".** She sniffs the player's tea before they drink it.
  - Correct: offer her a cup too.
  - Wrong: take offence at being inspected.
- **F02 "Spectacles".** She hunts for her spectacles. They are on her head.
  - Correct: tell her, plainly and kindly.
  - Wrong: help her search.
- **F03 "The DO NOT Jar".** Everything in her apron is labelled, including a small jar that says DO NOT.
  - Correct: ask what's in it.
  - Wrong: reach to open it.

**`SEN-EVT-PRE-01` "The Mislabelled Jar".** Optional event, Intelligence ≥ 3. It opens where Senna is scheduled, and she pulls the player to a market stall in the Town Square within the same encounter.

- The stall sells "Grandmother's Sleep Tea". Senna recognises an ingredient that will make people very sick. The `MERCHANT` was fooled by a supplier and is defensive. Buyers are queuing.
- **Correct, `CHECK`:** help her prove it carefully, for example by fetching her herbal and comparing the leaf, while letting the merchant save face, and get the tea off sale now.
- **Wrong, `LATER`:** "Let's report it to the guard tomorrow; don't make a scene." People keep buying.
- **Offensive, `PARANOID`:** "You think everything's poison."
- Objective: protect people with care and evidence, and respect her expertise.

**`SEN-MID-01` "Lamplight in the Infirmary".** The milestone; Intelligence ≥ 6, Kindness ≥ 4. It starts where she is scheduled and moves to the infirmary off the Palace Court within the same encounter. The illustration shows her seated at the worktable in lamplight, sorting herbs into labelled jars.

- The last patient has gone home and Pim is asleep on a cot. A quiet scene with small jokes.
- She reads her mother's latest letter aloud: "Have you found someone who will put up with you?"
- Then she says the real thing. She keeps busy because a useful person can't be sent home, and an infirmary always needs her.
- **Correct, `WANTED`, outcome `SEN-MID-O-TRUST`:** the player says they'd sit with her even if she'd never cured anything. They like her company, not her services.
  - The branch: she goes quiet and labels a jar wrong ("I just labelled feverfew 'feelings'. That's your fault."). Then she lets them stay, without a task.
- **Wrong, `USEFUL`:** "But you're the most useful person in the palace; they'd be lost without you." Kind, and exactly her fear.
- **Wrong, `FIX`:** "I'll write to your mother and tell her how much the court needs you." Managing instead of listening.
- Objective: see her as wanted, not needed.

**`SEN-MID-RETRY-01` "About the Other Night".** At her scheduled place. She checks a cup of something before handing it over, then: "About the other night."

- Correct: say it again, simply.
- Wrong, `REST`: "You should take a night off." Advice instead of the answer.

## After the milestone (POST)

She is warmer, and flirts in her own clinical way. Correct answers meet her sincerity with sincerity, and still with precision.

- **U01 "Pulse".** She takes the player's pulse, unprompted. "Elevated. Either you like me or you took the stairs."
  - Correct: "Both. Mostly the first."
  - Wrong: "Definitely the stairs." "Hm. Disappointing."
- **U02 "Deficiency".** She reports, clinically, that she has been experiencing a deficiency. Of the player. Symptoms: checking the door.
  - Correct: reciprocate plainly.
  - Wrong: deflect it with a joke.
- **U03 "Doctor Leeches Asks for Help".** Dorrance (`PHYSICIAN`) quietly asks her advice on a case. She is tempted to gloat.
  - Correct: "Help him. Then gloat a little. Quietly."
  - Wrong: "Make him ask in front of the whole court." It would be satisfying for nine seconds, and then he'd prescribe leeches out of spite.
- **U04 "The Apprentice".** Pim (`PIM`) wants to learn. She's afraid he'll get hurt.
  - Correct: start him on something safe, such as labels, the sweets inventory or rolling bandages.
  - Wrong: "He's too young; send him back to the stables."
  - Offensive: "Why bother? It's just a stable boy."
- **U05 "The Rota".** She has written the player into the infirmary rota as "Moral support".
  - Correct: accept seriously and ask what moral support involves.
  - Wrong: "Couldn't we do something fun instead?" She hears that the infirmary isn't fun.
- **U06 "Three Years".** She gives the player a seed packet for a plant that takes three years to flower. This foreshadows the proposal.
  - Correct: ask how to care for it.
  - Wrong: "Three years? Got anything faster?"
- **F01 "Pastry Analysis".** She inspects a pastry thoroughly before sharing it.
  - Correct: wait for the verdict.
  - Wrong: eat your half first.
- **F02 "Quiet".** She just wants to sit.
  - Correct: sit quietly with her.
  - Wrong: fill the silence.
- **F03 "Spectacles, Again".** Lost again. This time they are on the player's head, because she put them there.
  - Correct: "I'll guard them."
  - Wrong: hand them straight back with a lecture.
  - Offensive: "How do you lose things on your own head?"

**`SEN-EVT-POST-01` "A Day With Nothing Wrong".** Optional event, Charisma ≥ 3. It opens where she is scheduled.

- The infirmary staff have forced her to take a day off. She has no idea what to do with a day when nobody is ill.
- **Correct, `ENJOY`:** plan something she enjoys for its own sake, such as a slow walk looking at (not picking) mushrooms, then pastries she doesn't have to inspect. Then let her inspect them anyway.
- **Wrong, `TIDY`:** suggest she rest by reorganising the apothecary. It feeds the habit.
- **Offensive, `DULL`:** "You're no fun unless someone's ill."
- Objective: she can have a day that isn't about being useful.

**`SEN-FIN-01` "Planted By".** The proposal, in the Royal Gardens physic beds, reached within the same encounter: "She takes you to the physic beds."

- She is planting the three-year seed. She shows the player the plant label: the name, then "Planted by: S. and —", left blank. She doesn't know what to write and is nervous, so she narrates her own symptoms.
- **Correct, `PLAIN`, outcome `SEN-FIN-O-YES`:** "Write my name. Marry me. I want to be here when it flowers, and every year after." Plain, specific and sincere.
  - The branch: she writes the name, misspells it out of nerves, corrects it. "Yes. Obviously. I've been diagnosing this for weeks."
- **Wrong, `SPEECH`:** a grand, flowery, rehearsed speech. "That was a speech. I asked you a question." Pending.
- **Wrong, `RESCUE`:** "Marry me, and you'll never have to work in an infirmary again." "…Why would I want that?" Pending.
- Objective: a partner, not a rescuer or a performer.

**`SEN-FIN-RETRY-01` "Plainly".** At her scheduled place. She hands the player the blank label again. "Try again. Plainly."

- Correct: plain and specific.
- Wrong, outcome `SEN-FR-O-STILL-PENDING`: a condition or another speech.

**`SEN-EPI-01` "Married, With Labels".** The epilogue; no choices. It starts at the Palace Court, at the wedding, and moves to the Royal Gardens on the `SEN-EPI-LATER` line.

- At the wedding:
  - She inspects the bouquet. "Lily of the valley. Beautiful. Nobody let the palace cat near it."
  - Dorrance (`PHYSICIAN`) gives a toast and cries.
  - Her vows are a numbered list. Item three: she will always tell the player when they are about to eat something they shouldn't.
- **`SEN-EPI-LATER`:** "Later, in the Royal Gardens…" The three-year plant has put up its first tiny leaf, early.
- She says the thing she has learned: "I don't need anything. I want you here. That's different. I checked."
- At most one forehead touch.
