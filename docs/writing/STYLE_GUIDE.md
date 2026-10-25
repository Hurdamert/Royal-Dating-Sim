# Royal Exceptions dialogue style guide (revision `dialogue-v2`)

This guide is for anyone writing or editing story text for *Royal Exceptions*. It covers how the game should sound, what the frozen v1 text did wrong, and the rules the `dialogue-v2` rewrite follows.

**Why it exists.** On 2026-10-25 the project owner asked to "make the dialogue funnier and less AI generated (do extensive research on how to write it)". The owner picked two options:

- **Scope:** all story text. That means the 77 scenes, the 12 Humpty quips and the 16 training flavour lines.
- **Humour:** character banter. Each princess gets her own comic voice, the jokes come from personality and teasing, and the sincere moments still land.

The research behind this guide is summarised in §9, and the sources are listed in §10.

**What it does not change.** The frozen archives stay byte-for-byte untouched. The rewrite lives in `content/revisions/dialogue-v2/`, and the content compiler applies it on top of the frozen text. It can change words only. Scene IDs, choice IDs and their order, outcome classes, heart values, stats, schedules, art and endings are all checked against the base and cannot move. To build from the frozen text instead, run `CONTENT_REVISION=none npm run content`. A side-by-side comparison is generated at `docs/writing/DIALOGUE_REVISION_COMPARISON.md`.

---

## 1. What was wrong with the frozen text

The frozen text has good material in it. The best-performing lines are concrete and absurd:

- the express-owl humiliation scroll and the crop tool;
- the rabbit that pulls the wizard back into the hat;
- "inform the moon before the council";
- six grandmothers who all invented the same knot;
- the moss creature whose stolen lunch counts as political commentary;
- "the court is welcome to marry the trumpets".

The rewrite keeps all of these. What drags the rest down is a small set of habits, repeated across almost every scene.

1. **Each route has one theme, and every scene says it out loud.** Tavri's 25 scenes keep returning to performance, applause and the audience. Nerelle's return to choice and permission. Kaedra's return to fear and strength. The audit counts 86 lines that name the theme outright, which is about 9 in every 100 lines. Players get the point by the third scene, and after that each restatement reads as the writer reminding them.
2. **The correct answer sounds like a counsellor.** Examples: "You do not owe anyone a performance afterward." "You can take a rest because you want to. No permission needed." "You do not have to divide yourself for their convenience." The right answer is always the most earnest and therapeutic option, so players learn to pick the gentlest wording instead of paying attention to her.
3. **Reactions explain themselves.** After a wrong answer, the princess usually states the lesson: "Fear is not a substitute for respect." "Convenience is an unreliable substitute for consent." "Power is not proof of good judgment." She becomes a poster instead of a person.
4. **The narrator moralises.** Examples: "The conversation is not impressive. It is better than that." "For once she does not rescue the silence with a joke." "Neither has to become the other to share a future." These are the "not X, it's Y" pivot and the wise closing line, the two most recognisable machine-prose tells (§6).
5. **Every scene has the same shape.** Something small happens. She makes a mild quip and states her feeling. The player gives a wise reply, and she gives a warm closing line. Across 54 ordinary scenes the rhythm becomes predictable.
6. **The voices merge.** Tavri, Nerelle and Kaedra all use the same polished register: no contractions, mild irony, and a closing aphorism. Cover the speaker names and many lines could belong to any of them.
7. **Wrong answers are strawmen.** "Every argument needs a winner." "Make the sea match the schedule." Nobody nice would say these, so there is no temptation in the choice. The research is clear that a good wrong answer is the sincere, well-meant miss (§3).

**Baseline from `node scripts/dialogue-audit.mjs --base`.** The frozen text has 973 lines including choice labels, and 213 of them hit at least one pattern (21.9 per 100). The full table is in `docs/writing/AUDIT_BASE.md`; the same audit of the revised text is in `docs/writing/AUDIT_REVISED.md`. These numbers are prompts for an editor, not a quality score. The real test is reading the comparison document aloud.

---

## 2. Principles

1. **Jokes come from character.** Each person is funny in their own way, so the joke tells you who is talking. If you can swap two speakers and nothing breaks, rewrite [13][7][28].
2. **Be specific.** Use one concrete, visual detail instead of a general word. "Three hours of toasts. Lord Pell toasted the soup. Twice" beats "the banquet was boring" [22][18].
3. **Put the funny word last.** End the line on the word that turns the joke, and trim anything before it [1][18].
4. **Find each scene's game, and escalate it.** Name the scene's odd pattern, then ask: if this is true, what else is true? Raise the stakes each time instead of repeating the joke at the same size [2][3][4].
5. **Play status and understatement.** Shifts in status between characters are funny, and so is a tiny reaction to a big event, or a precise answer to the wrong question [9][19].
6. **Being wrong beats being wise.** Characters chase what they want with confidence they haven't earned. Self-aware, therapised characters kill comedy [21][27].
7. **Show the feeling, don't announce it.** Feelings come out as remarks about objects, dodges, changes of subject and small actions. Nobody says "I feel anxious when…" [F2][F3][V-NFS].
8. **Give the sincere moments room.** At a real confession, slow down and speak plainly. A joke may follow a confession if it confirms the feeling, never if it takes it back [6][35][36][31].
9. **End on a button.** Close on the joke, an action, or a callback, and cut the line that would have explained it. No warm summaries and no morals [14][15][F9].
10. **Trust the click.** In a visual novel the player sets the pace by clicking. Put the setup in one text box and the punchline in the next, and deliver it deadpan [V-Automaton].

---

## 3. Writing choices

Each ordinary scene has one choice point with an authored correct option, an ordinary wrong option and, sometimes, an offensive option. Their outcome classes are fixed. The words are ours.

- **The right answer is right because of this scene.** It responds to something she actually said or did a few lines earlier: a detail, a bit she's running, the thing she asked for without asking. It is not right because it is the gentlest or most therapeutic wording. Attentive players win, so it isn't a guessing game [V-CoG].
- **The right answer can be a joke.** Often the best correct option plays along with her bit and then hands her what she needs. It does not always have to be the longest or most earnest option [V-CoG-forum].
- **The wrong answer is a sincere, nice miss.** It is something a kind person with good intentions would plausibly say. Typical misses:
  - fixing the problem like a bug ticket;
  - making it about the protagonist;
  - matching her energy when she wanted a way out;
  - giving a pep talk when she wanted company;
  - solving the wrong problem.

  Wrong answers are where a lot of the comedy lives [V-Kotaku-DE][V-Hades].
- **The offensive answer is plainly rude to her as a person.** It is short, petty in a human way, and never a slur or anything sexual. Players should never pick it by accident (ordinary bible §4).
- **All three options sound like the same protagonist.** They are the same ex-engineer in three moods, not three different people [V-NITW][V-CoG-sarcasm].
- **Reactions echo the player's words and show the miss.** They do not lecture. After a wrong answer she might:
  - tease;
  - go along with it politely, while the narrator shows what it cost;
  - take the suggestion too literally;
  - just end the conversation.

  An offensive answer gets a short, cold reply, and then she leaves.
- **Reactions run one to three text boxes and end on a button.**
- **Option labels are spoken lines.** Write them in curly quotes, ideally 4 to 20 words and at most about 120 characters, so they fit on two lines at 320 px.

> **Known structural tell (not changed by this revision).** The engine shows options in authored order, and every one of the 77 frozen scenes lists the correct option first. Reordering them is a gameplay change rather than a words-only one, so it is left to the owner. A deterministic per-scene shuffle would remove the tell.

---

## 4. Voices

Each voice entry below lists:

- **Engine:** where that character's comedy comes from.
- **Sound:** how their lines read on the page.
- **Never:** what they never say.
- **Runners:** recurring gags.

A runner may come back at a larger size. Every ordinary scene, though, has to work for a player who never saw its siblings (ordinary bible §4). So a callback must also land as a joke on its own.

### The protagonist (`PLAYER`, shown as `{PLAYER}`)

- **Who.** A software engineer who was turned down for jobs right up until falling into a fantasy kingdom. Earnest, over-prepared, and a little ridiculous. A non-hero in Kaplan's sense: under-equipped, but fully committed [21][38].
- **Engine.**
  - Applies job-hunting and engineering frames to romance and court life: requirements, roadmaps, bug reports, quarterly reports, numbered lists, three-point speeches.
  - Is the straight man to Nerelle and Kaedra, and Tavri's sparring partner.
  - Teases specific habits, never wounds [6].
- **Ration.** At most one engineering or job-market joke per scene, and none in sincere beats [38].
- **Sound.**
  - Contractions.
  - Short, plain lines; fragments are fine.
  - Asks questions.
  - In a sincere beat, says it in one sentence and stops.
- **Never.**
  - Uses gendered self-reference. The player's gender is not canon.
  - Uses therapy vocabulary.
  - Explains the princess to herself.
  - Makes speeches in ordinary scenes.
- **Canon runners.**
  - The lists are how you know they're panicking.
  - The prepared speech that ends up in the fountain.
  - "A hostile deployment environment."

### Tavri (fox princess, 24): honesty under the act

- **Engine.**
  - Quick, theatrical and mock-grand. She frames tiny things as major events ("a daring new court technique").
  - Self-mockery that lands before anyone else's can.
  - The closer a topic gets to the wound, the faster the jokes come [28]. Write that acceleration instead of naming the wound.
  - She teases the protagonist's lists and formatting.
  - After the midpoint she abandons jokes halfway, and is visibly pleased with herself for it.
- **Sound.**
  - Contractions.
  - Varied rhythm, with a flourish and then a plain word.
  - Bits: reviews, headlines, footnotes, encores. Use her bits, not the words *performance*, *audience* or *applause*.
- **Physical tell.** Her ears and tail are terrible liars. The narrator can catch the tail giving away what her face won't. Description only; this adds no new art.
- **Never.**
  - "I feel…"
  - Explaining her own deflection while she does it, except at the midpoint, where saying it plainly *is* the event.
  - More than one performance, audience or applause word per scene, and none in the player's correct option.
- **Runners.**
  - Fantasygram and the express owl.
  - The tail.
  - Her keeping score of the protagonist's jokes.
  - The protagonist's numbered points.

### Nerelle (mermaid princess, 23): between two worlds

- **Engine.**
  - A precise anthropologist of the surface. She reads idioms literally and checks the claim behind them [33].
  - Brings treaty-and-council formality to small things.
  - Compares land and sea, and the sea usually wins. Sometimes she is simply right that a surface custom is absurd.
  - She is never dim. She wins exchanges [21].
  - Her flaw is over-committing to everyone's expectations, so her jokes about the sea court's bureaucracy carry some real weight.
- **Sound.**
  - Measured and complete sentences, with fewer contractions than Tavri but never stiff.
  - Asks oddly specific questions.
  - Dry understatement.
  - Sometimes her literalness is a deliberate diplomatic dodge [V-quirk].
- **Physical.** Always in the water. Her tail, fins, the current and the waterline are her body language.
- **Never.**
  - Legs, walking, dry land, or any transformation.
  - Helplessness.
  - Words like *autonomy*, *permission* or "my own choice" outside the pivotal scenes. Show her deciding instead.
- **Runners.**
  - The gulls, who are petty adversaries with a petition.
  - The sea council's paperwork: informing the moon, six grandmothers, waterproof ink.
  - "Which end of a boat goes in the water."

### Kaedra (dragon-human princess, 26): the feared guardian

- **Engine.**
  - Deadpan.
  - Procedure and safety are her native language: inspections, load ratings, incident reports, page counts.
  - High-status formality applied to tiny things. A decree that is secretly a request [9].
  - Understatement, and a precise answer to the wrong question.
  - People mistake her silence for menace. Often she is deciding whether a joke would land (bible).
  - Tenderness leaks out through small acts and one plain sentence.
- **Sound.**
  - Short declaratives and few contractions; formality is her voice.
  - A slip into a contraction or a plain sentence is an event, so ration them.
- **Physical.** Horns, folded wings, the tail, doorways, furniture and capes. Her magic flare is small, and there is no combat.
- **Never.**
  - Violence played for laughs.
  - Being "tamed" or "cured".
  - More than one *fear*, *monster* or *strength* word per scene outside the pivotal scenes, where they are the subject.
- **Runners.**
  - The trumpets.
  - Speech page counts.
  - Curtains and door handles.
  - The moss creature and unattended sandwiches.
  - Guards inching toward pillars.

### Narrator

- **Role.** The dry watcher [21]. Usually second person ("you").
- **Does.**
  - Concrete physical detail.
  - Lands jokes through understatement. The gold standard is "The rabbit takes one look at the audience and pulls the wizard back inside."
  - Shows how a moment went through an action, such as she pockets the scroll or the guard edges toward a pillar.
- **Never.**
  - States what a moment meant.
  - Moralises.
  - Writes "for once", "neither of you needs to…", "not as a performance but as herself", or "It is better than that".
  - Describes what the portrait already shows [V-itch].
- **Length.** Narration lines are the longest boxes in the frozen text (18.6 words on average). Aim for 8 to 16 words, and split longer lines.

### Humpty and minor cast

- **Humpty.** An egg with far more confidence than his structural integrity justifies. Advice with liability disclaimers, wall-related grudges, and comic pessimism about gravity. He gives general gameplay nudges and never reveals hidden thresholds.
- **Minor cast.** Each gets one comic note:
  - the prince: capes as public service;
  - the herald: adjectives, and losing a shoe;
  - the messenger: rumour inflation;
  - clerks: everything becomes a decree.

---

## 5. Canon locks

These must survive every rewrite.

- **Pivotal scene logic is fixed.** The words change; the logic does not.
  - **Tavri's midpoint:** the correct option *reciprocates vulnerability*. The protagonist admits hiding behind competence.
  - **Nerelle's midpoint:** *co-plan a safe, balanced visit that she authors*. Not a rescue, and not a ban.
  - **Kaedra's midpoint:** *bystander safety first, then private comfort*. Never a bigger flare, and never taking charge of her.
  - **Proposals:** a *reciprocal partnership*. Not worship, caretaking, transformation, sacrifice, or showing her off.
  - **Retries:** a short, plain correction.
- **Every beat listed in a pivotal scene's objective stays in that scene.** The writer briefs list them scene by scene. Keep the good jokes listed in §1.
- **Event titles keep their approved names.** "Fantasygram Catastrophe", "Unscripted Comedy", "Surface Souvenir Swap", "Moonwater Festival", "Prince's Fashion Challenge" and "Monster Reputation Rumor" are fixed, as are the sign name "Royal Comedy Showcase" and the time-neutral fixes in that scene (§6 time words).
- **Time and place.** Scenes can play in any time slot, so copy stays time-neutral: no *tonight*, *this morning*, *sunset*, and so on. Ordinary scenes can play at any of that princess's scheduled locations, so they don't name a location and use only portable props. Nerelle is always next to water.
- **Staging cue line IDs stay put, with the same meaning.**
  - `TAV-EPI-012`, `NER-EPI-017` and `KAE-EPI-012` are where each epilogue moves to the Royal Gardens. They must stay the "Later, in the gardens…" line.
  - `TAV-FIN-01` is staged in the Royal Gardens.
- **Fixed facts.**
  - The fifty-children line stays a gossip rumour and a joke.
  - Nerelle never has legs.
  - Kaedra's flare is small, and there is no combat.
  - The protagonist has no canon gender.
  - `{PLAYER}` is the only token. Names can be up to 24 graphemes long, so don't build a joke that depends on the name's length.
- **Ordinary scenes must stand alone.** Major revelations belong in midpoints and finales, not in ordinary scenes the player might skip.

---

## 6. Tells to cut

The patterns below are the ones `scripts/lib/dialogue-rules.mjs` flags. In the rewritten text, each one should appear only when it is the best line available.

| Tell | Before (frozen) | After (direction) |
|---|---|---|
| **"Not X, it's Y" pivot.** The hardest machine habit to shake. It corrects a claim nobody made [A-Atl][A-tropes]. | "She smiles, not as a performance but as herself." | Show the smile doing something, e.g. it reaches someone it wasn't aimed at. |
| **Therapy-speak** [A-allegedly][V-NFS] | "You can take a rest because you want to. No permission needed." | "Sit. I'll guard your boots." |
| **Theme named outright** | "I would rather be honestly dull than endlessly on command." | A plain line with no flourish, then she notices she did it. |
| **Moral or aphorism ending** [F-StoryScope] | "Fear is not a substitute for respect." | A dry exit line in her voice, or the narrator showing the cost. |
| **Warm summarising button** [A-emkam][F9] | "The conversation is not impressive. It is better than that." | Cut it. End on the quarterly-report joke. |
| **Stock literary phrases** [A-Pry] | "for once", "for a long moment", "the weight of", "neither of you…" | Concrete action or nothing. |
| **Filler adverbs** [A-emkam] | "quietly", "gently", "simply", "surprisingly" | Cut, or replace with a verb that does the work. |
| **Tidy triplets** [A-Shy] | "complicated, beautiful, and unfinished" | Two items, or a third that swerves [10]. |
| **Em dashes** [A-salt] | Dramatic dashes inside narration. | Only for an interruption in speech. |
| **Everyone equally witty and polished** [A-sudo][A-vice] | All three princesses use the same register. | Each uses her own engine (§4). Let someone be wrong, petty or literal. |
| **Conflict raised and resolved within two lines** [A-2407] | Wrong answer → "I know. Perhaps next time." | Leave a mark: a tease, a smaller goodbye, an unanswered line. |

---

## 7. Format

- **Spelling.** Game text uses US spelling (*rumor*, *favorite*, *gray*), matching the frozen text. This guide's own prose is not game text.
- **Quotation marks.** Spoken lines use curly quotes “…” with ’ for apostrophes. Narration has no quotes. *Italics* use `*single asterisks*`. `**Bold**` is reserved for the failure ending's title line.
- **Line length.**
  - Aim for one idea per text box, usually 4 to 20 words.
  - 32 words is the audit's ceiling, and 320 characters is the compiler's hard limit.
  - Vary length: a longer setup, then a short punchline [V-Nami].
  - Don't start two boxes in a row with the same word.
- **Ordinary scene shape.**
  - 3 to 7 setup boxes.
  - One choice.
  - Reactions of 1 to 3 boxes each, ending on a button.
- **Pivotal scenes** may run longer, but each box still carries one idea.
- **Expressions.**
  - One of `NEUTRAL`, `PLAYFUL`, `WORRIED`, `ANNOYED` or `SURPRISED`, on princess lines only.
  - Use contrast as a punchline: a calm face on an outrageous line, or composed words while the face cracks [V-Amai].
  - `WORRIED` means vulnerable, not "mildly disappointed in your answer". Vary the reactions to wrong answers.
- **Speakers.**
  - `NARRATOR`, `PLAYER` and the route's princess.
  - Named minor speakers such as `HERALD`, `PRINCE`, `MESSENGER`, `CLERK` and `HUMPTY` in upper case.
  - No other princess may speak in a route scene.
- **Line IDs.**
  - Keep existing IDs wherever a line keeps its role.
  - New lines extend the scene's ID family (for example `TAV-ORD-PRE-U01-L05` or `TAV-PRE-S05`).
  - IDs never repeat across the game.

---

## 8. Checklist

Run this on every scene. `node --import tsx scripts/check-revision.ts <dir>` checks the mechanics and lists the heuristic flags.

1. Can you name the scene's game in one sentence, and does each beat heighten it [4]?
2. Cover the names: can you still tell who is speaking [7]?
3. Does every line do a job — character, plot or laugh — and are the lines that do none cut [13]?
4. Does she make at least one joke of her own, instead of only reacting [V-own]?
5. Is the correct option justified by something in *this* scene, and is the wrong option something a nice person would say?
6. Do reactions echo the player's words, and do they avoid lecturing?
7. Is there any "not X, it's Y", therapy word, theme word, moral, filler adverb, triplet or em dash? If so, does it earn its place?
8. Does the scene end on a button — a joke, an action or a callback — instead of a summary [14][F9]?
9. In sincere beats, is the rhythm slowed and the speech plain, with no joke that takes it back [36][31]?
10. Is it time-neutral, location-safe, canon-safe and compact at 320 px?
11. Read it aloud [37].

---

## 9. Research summary

Three research passes fed this guide: comedy and banter craft, visual-novel and dating-sim dialogue, and the tells that make fiction read as machine-written. The main findings:

- **Comedy mechanics.**
  - Specificity, trigger word last, misdirection, the rule of three and its break, game and heightening, status play, understatement, callbacks that grow, and buttons [1]–[19].
  - The funniest characters are wrong with conviction, and therapised self-awareness kills comedy [21][27].
  - "Punch up": aim the jokes at pomp and power, never at a character's core wound [20][6].
- **Banter.**
  - Tease habits, not wounds [6].
  - Toppers build on the last joke [32].
  - Drop a truth bomb in the middle of banter, or let an armour-joke land and have the other person not laugh [5][28].
  - Misunderstandings must come from character [34].
- **Visual-novel craft.**
  - One idea per click, and the click is the drumbeat [V-Nami][V-Automaton].
  - The portrait can be the punchline [V-Amai].
  - The correct choice should be readable from the scene but not obvious from its tone or slot [V-CoG][V-CoG-forum].
  - Wrong answers are where the jokes live [V-Kotaku-DE].
  - Love interests need their own wants and their own jokes [V-GD-romance][V-NITW].
  - No therapist love interests [V-NFS][V-GDC].
- **Machine-prose tells.**
  - "Not X, it's Y" is the most persistent [A-Atl][A-tropes][A-slop].
  - Therapy-speak and named feelings [A-allegedly][A-sleuth].
  - One shared voice [A-sudo][A-vice].
  - Tidy triplets [A-Shy].
  - Filler adverbs [A-emkam].
  - Problem → confession → wise reply → warm close, ending on the moral [F-StoryScope].
  - Conflicts that resolve at once [A-2407].
  - Neat summarising buttons [A-emkam].

Two caveats from the researchers. The "k-sound is funny" rule has weak evidence. Some tells in the audit list ("a beat", "for once", "softly") were not named by any source; they are kept because they match documented categories, and because the frozen text overuses them.

---

## 9a. How the revision was made

1. Three research passes (comedy and banter craft, visual-novel dialogue, machine-prose tells) were condensed into this guide.
2. Three writers each rewrote one route against the guide, the character bible and three exemplar scenes, with `scripts/check-revision.ts` enforcing the mechanics. The project editor wrote the prologue, the failure ending, Humpty's quips and the training lines.
3. Every scene was then read in full by the editor and by an independent script editor who had not written any of it; their notes were applied line by line.
4. All-ages pass (owner request, same day): no comments on bodies or looks, affection limited to hand-holding, a hug or a forehead touch, no alcohol, clothing described as fully covering. The art was edited to match (`scripts/art/modest.py`).

---

## 10. Sources

**Comedy and banter**

1. Writer's Digest — How to Write Funny Dialogue. https://writersdigest.com/write-better-fiction/how-to-write-funny-dialogue
2. Wikipedia — Game of the scene. https://en.wikipedia.org/wiki/Game_of_the_scene
3. The Free Association — Easy ways to heighten game. https://www.thefreeassociation.co.uk/blog/easy-ways-to-heighten-game
4. Will Hines — Name the game seven ways. https://willhines.substack.com/p/name-the-game-seven-ways
5. Writer's Digest — 5 Tips for Writing Witty Banter. https://writersdigest.com/write-better-fiction/5-tips-for-writing-witty-banter-your-readers-will-love
6. Writer's Digest — Writing Better Banter (Kerry Rea). https://writersdigest.com/write-better-fiction/writing-better-banter-4-tips-for-making-your-readers-laugh-out-loud
7. Writer's Digest — How to Ruin Good Banter (Emma St. Clair). https://www.writersdigest.com/writing-witty-banter-that-actually-works-by-looking-at-how-to-ruin-good-banter
9. James Clear — *Impro* summary (Keith Johnstone, status). https://jamesclear.com/book-summaries/impro
10. Funny How — The rule of three. https://funnyhow.substack.com/p/the-rule-of-three
11. Backstage — How to Use Callbacks. https://www.backstage.com/magazine/article/callback-comedy-explained-76712/
13. Chortle — James Cary: every line must justify itself. https://www.chortle.co.uk/features/2015/07/15/22830/every_single_line_has_to_justify_its_existence
14. No Film School — What is a button. https://nofilmschool.com/what-is-a-button-in-screenwriting
15. Touch Baseball Improv — Punchline or button? https://touchbaseballimprov.substack.com/p/is-it-a-punchline-or-a-button
16. Game Developer — Story Design Tips: Writing Comedy, Part I. https://www.gamedeveloper.com/design/story-design-tips-writing-comedy-part-i
18. The Situation Room — Writing funny lines for your sitcom. https://thesitutationroom.substack.com/p/writing-funny-lines-for-your-sitcom
19. VFS — Deadpan. https://vfs.edu/node/8659
20. Lyn Miller-Lachmann — Punch up, punch down, punch sideways. https://lynmillerlachmann.com/punch-up-punch-down-punch-sideways/
21. The Story Department — Steve Kaplan's Hidden Tools of Comedy. https://thestorydepartment.com/the-hidden-tools-of-comedy-2/
22. Authentic Comedy — Specificity. https://authenticcomedy.substack.com/p/specificity-the-key-to-originality
27. Script Magazine — Fine-tuning flaws. https://scriptmag.com/comedy-writing/fine-tuning-flaws-to-make-characters-timely
28. Ideas and More — The Humour Shield. https://ideasandmore.substack.com/p/the-humour-shield
31. Writing Codidact — Humor undercutting serious moments. https://writing.codidact.com/posts/38457
32. Fat Pigeons — Clams and toppers. https://fatpigeons.com/2007/05/09/clams-and-toppers/
33. Writer's Digest — 7 Comedy Writing Techniques. https://writersdigest.com/improve-my-writing/comedy-writing-techniques-how-cliches-are-used-in-writing-humor
34. Tessa Dare — The Big Mis. https://tessadare.com/2007/05/24/the-big-mis/
35. The Writer — The Rom-Com Playbook. https://www.writermag.com/improve-your-writing/fiction/write-a-successful-romantic-comedy/3
36. Goodreads blog — Banter & Believability. https://www.goodreads.com/author_blog_posts/26032617-banter-believability-how-rom-coms-build-chemistry-through-dialogue
37. MasterClass — How to write funny dialogue. https://www.masterclass.com/articles/how-to-write-funny-dialogue
38. Save the Cat — Tips on writing comedy. https://savethecat.com/tips-and-tactics/tips-on-writing-comedy

**Visual novels and game dialogue**

- [V-Nami] NomNomNami — Tips for game writers. https://nomnomnami.com/blog/posts/2023-04-18-tips-for-game-writers.html
- [V-read] Game Developer — How to get people to read text in your game. https://www.gamedeveloper.com/design/how-to-get-people-to-read-text-in-your-game
- [V-Automaton] Automaton — How Deltarune and Undertale use manual story progression to make you laugh. https://automaton-media.com/en/news/how-deltarune-and-undertale-use-manual-story-progression-to-make-you-laugh/
- [V-Amai] Amai Works — Sprite dynamics. https://amai-works.itch.io/complex-relations/devlog/201432/sprite-dynamics
- [V-itch] itch.io — How do you write a visual novel effectively. https://itch.io/t/2388254/how-do-you-write-a-visual-novel-effectively-and-in-an-engaging-way
- [V-CoG] Choice of Games — 5 rules for writing interesting choices. https://www.choiceofgames.com/2010/03/5-rules-for-writing-interesting-choices-in-multiple-choice-games/
- [V-CoG-forum] Choice of Games forum — Hiding the right answer in phrasing. https://forum.choiceofgames.com/t/how-many-cyoa-authors-like-to-hide-the-right-answer-in-phrasing/35159
- [V-CoG-sarcasm] Choice of Games forum — Sarcasm in choices. https://forum.choiceofgames.com/t/sarcasm-in-choices/106773
- [V-GD-romance] Game Developer — How do you approach writing romance in games? https://www.gamedeveloper.com/design/how-do-you-approach-writing-romance-in-games-
- [V-NITW] Game Developer — Road to the IGF: Night in the Woods. https://gamedeveloper.com/business/road-to-the-igf-infinite-fall-s-i-night-in-the-woods-i-
- [V-Kotaku-DE] Kotaku — Disco Elysium review. https://kotaku.com/disco-elysium-the-kotaku-review-1839723176
- [V-Hades] GeekDad — Greg Kasavin on Hades. https://geekdad.com/2019/10/narrative-and-early-access-supergiants-greg-kasavin-discusses-hades-development/
- [V-GDC] GDC Narrative Review 2021 (Scott Parker). https://media.gdcvault.com/GDC+2021/Scott+Parker+GDC+Narrative+Review+2021.pdf
- [V-quirk] CGMagazine — Hatoful Boyfriend review. https://www.cgmagonline.com/review/game/hatoful-boyfriend-review/
- [V-own] Game Informer — Dream Daddy review. https://gameinformer.com/games/dream_daddy/b/pc/archive/2017/07/27/game-informer-review-dream-daddy
- [V-NFS] No Film School — On-the-nose dialogue. https://nofilmschool.com/on-the-nose-dialogue
- Game Developer — Exploring what it takes to make a funny game. https://www.gamedeveloper.com/design/exploring-what-it-takes-to-make-a-funny-game
- TheGamer — David Gaider on AI-assisted quests ("something shaped like a quest"). https://www.thegamer.com/dragon-age-bioware-attempt-use-ai-soulless-result/
- Axios — Forspoken dialogue. https://www.axios.com/2023/05/25/forspoken-ai-character-dialogue

**Machine-prose tells and fixes**

- [A-tc] TechCrunch — The best guide to spotting AI writing comes from Wikipedia. https://techcrunch.com/2025/11/20/the-best-guide-to-spotting-ai-writing-comes-from-wikipedia/
- [A-tropes] tropes.fyi — Negative parallelism. https://tropes.fyi/tropes/negative-parallelism
- [A-Atl] AI Weekly — The Atlantic on the "It's not X, it's Y" tic. https://aiweekly.co/alerts/atlantic-ais-its-not-x-its-y-tic-proves-hardest-to-shake
- [A-slop] EQ-Bench — Slop Score. https://eqbench.com/slop-score.html
- [A-sleuth] SleuthSayers — On-the-nose dialogue. https://www.sleuthsayers.org/2026/08/on-nose-dialogue.html
- [A-Pry] E. H. Prybylski — Current AI tells. https://ehprybylski.substack.com/p/current-ai-tells
- [F-StoryScope] Antoine Buteau — AI fiction has a plot fingerprint. https://www.antoinebuteau.com/ai-fiction-has-a-plot-fingerprint/
- [A-2407] arXiv 2407.13248 — LLM stories are positive and low-tension. https://arxiv.org/abs/2407.13248
- [A-emkam] emkam — Claude is cringe. https://emkam.substack.com/p/claude-is-cringe
- [A-salt] Salt Agency — In defence of the em dash. https://salt.agency/blog/in-defence-of-the-em-dash-what-the-ai-writing-debate-gets-wrong/
- [A-Shy] Scroll.in — *Shy Girl* withdrawn over AI concerns. https://scroll.in/article/1092137/shy-girl-a-horror-novel-was-withdrawn-because-of-ai-concerns-what-does-this-mean-for-publishing
- [A-sudo] Sudowrite — Making characters sound human. https://sudowrite.com/blog/best-ai-for-dialogue-writing-make-characters-sound-human/
- [A-vice] Vice — Why does everyone in Netflix's *Cowboy Bebop* talk like that? https://creators.vice.com/en/article/v7deax/why-does-everyone-in-netflixs-cowboy-bebop-talk-like-that
- [A-allegedly] allegedlyiwrite — on therapy-speak in fiction dialogue (as cited by the research pass)
- [F2] Helping Writers Become Authors — On-the-nose dialogue. https://www.helpingwritersbecomeauthors.com/on-the-nose-dialogue/
- [F3] Final Draft — How to write subtext in dialogue. https://www.finaldraft.com/blog/how-to-write-subtext-in-dialogue
- [F9] The Situation Room — How to end your sitcom scenes. https://thesitutationroom.substack.com/p/how-to-end-your-sitcom-scenes
- StoryEmbers — Unmistakable speaking styles. https://storyembers.org/how-to-develop-unmistakable-speaking-styles-for-your-characters/
- Charles Deemer — Enter late, leave early. https://www.ibiblio.org/cdeemer/cfs0401.htm
