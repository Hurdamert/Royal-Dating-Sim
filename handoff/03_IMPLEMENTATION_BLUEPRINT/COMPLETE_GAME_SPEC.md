# Complete game implementation contract — Royal Exceptions

**Authority:** This document consolidates confirmed canon from the included frozen sources and identifies new build defaults. It resolves routine engineering decisions so an independent programmer need not invent behavior. If a locked original expressly contradicts this document, the locked source wins; raise the discrepancy in a BLOCKER report. Do not assert that missing historical Gate 1 decision texts were recovered.

Terminology: **CONFIRMED** = supported by approved content and history. **DEFAULT** = new v1.0 engineering resolution for executable behavior, not an earlier recorded decision. Defaults are deliberately conservative and cannot add major gameplay features.

## 1. User experience and product contract

* Player starts from title screen: New Run, Continue (if valid saved run), Endings Gallery (persistent unlocked routes), Import Backup, Options, Credits/Asset Licenses.
* **New Run:** choose exactly one Tavri / Nerelle / Kaedra route and an optional player name, max 24 user-visible Unicode grapheme clusters, whitespace trimmed, fallback `Traveler`. Confirm replacement if a run is active; offer export beforehand. Start at approved shared prologue `CORE-PRO-01` without spending a slot, then enter **Day 1, Monday morning** with all four stats zero, hearts zero and no completed milestones. Route cannot change until explicitly starting a new run. **DEFAULT:** route and name selection occur immediately before shared prologue.
* Show a **seven-location town hub**: Home, Town Square, Royal Library, Adventurers' Guild, Palace Court, Royal Gardens, Moonwater Quay. A read-only map/navigation selection is free. Browsing a location/help/stats/journal/gallery/calendar never advances time or rewards. There is **no eighth canal location**; Gardens canal is an internal story positioning cue.
* Day calendar repeats Monday through Sunday four times. `weekday = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][(day-1)%7]`. Every day has morning→afternoon→evening, a total of **84 slots**; a valid cost-bearing action takes exactly **one slot**. Time advances only upon successfully committed actions. **DEFAULT:** add a clearly labeled `Rest / Pass this slot` action to let players advance time without training, princess reward, or mystery cost. It consumes one slot, produces one journal record, and works on every slot.
* Day 28 evening action is fully adjudicated first. If not successful after that committed action, mark terminal failed and play approved `CORE-FAIL-01`, preserve journal; do not generate a playable Day 29. Restart requires a separate confirmation. After success, show approved marriage epilogue then ending gallery/explicit new run; epilogue does not spend time.
* A successful princess-specific ending adds only that route to gallery. Older unlocked endings survive replay/import unless explicit replacement of gallery was confirmed. **DEFAULT:** on import, offer replace-active-run and keep-galleries-by-union choices; default preserves union and never subtracts previously unlocked endings.
* No audio in version one, no generative text, no runtime social/AI network calls; the magical AI oracle is static prose. Cloudflare Pages static hosting; no backend/users/cloud save. Hosted initial startup may require network; local IndexedDB gameplay storage is offline-capable after page resources load, but full offline bootstrap is NOT guaranteed.

## 2. Exact state variables and data constraints

`schemaVersion: 1`, `saveRevision: uint>=0`, `runId: UUID`, `route: 'TAV'|'NER'|'KAE'`, `playerName: string`, `day: 1..28`, `slot: 'morning'|'afternoon'|'evening'`, `heartsHalf: integer 0..20`, `stats:{charisma,intelligence,strength,kindness}: int 0..10`, `trainingPartial:{each stat}:0|1`, `midpointStatus:'locked'|'pending'|'retry_pending'|'completed'`, `midpointFirstSeen:boolean`, `proposalStatus:'locked'|'retry_pending'|'completed'`, `proposalFirstSeen:boolean`, `optionalsExperienced:{six scene IDs:boolean}`, `dailyEncounterUsed:boolean`, `ordinaryNext:{TAV,NER,KAE:{PRE,POST}:int>=0}`, `journal: ordered array of <=84 committed player-action records`, `outcome:'active'|'won'|'failed'`, `winnerRoute: route|null`, `completedGallery: subset of routes` (prefer separate persistent record), `committedActionIds: unique list or journal IDs`, `pendingEncounter: nullable resumable staged UI action` (stored separately from committed revision). Use exact `sceneId`, `choiceId`, `outcomeId` from source; do not rename them.

**DEFAULT:** The canonical durable committed state and gallery are in one versioned IndexedDB envelope. Pending dialogue navigation is a separately stored, non-reward-bearing draft; must never be confused with a committed action. Include `idempotencyKey` for each begun action. Add required `startRevision`, stage index, pending branch choices and creation time to draft. Do not persist any staged hearts or award to the committed run before all consequential choices and linked final response resolve. The current revision is checked on resume/commit.

**State invariants:** No negative hearts/stats or values above cap; no partial training for stat level <5 or already 10; no `midpointStatus=completed` reverting due to heart loss; no post-midpoint ordinary pool before completion; no normal ordinary at hearts 20 / proposal retry pending; no princess twice in a day; no time beyond Day 28; terminal state cannot perform cost-bearing actions. Save schema validation rejects impossible combinations rather than silently sanitizing gameplay achievements.

## 3. Player actions and costs

| Action | Validity | Effect/cost |
|---|---|---|
| Free navigate/open menu/calendar/help/journal/stats | Any state, including terminal | No time, heart, encounter, cursor or journal increment |
| Train(activity ID) | Active, correct location, stat <10, no pending choice | One slot, selected stat progress only, one journal action |
| Meet princess (ordinary) | Active, scheduled route+location+slot, day interaction unused, midpoint not pending, hearts <stage cap | One slot and one daily encounter; 1 approved static ordinary scene; net heart change |
| Optional event | Active, scheduled princess, matching stage, threshold met, not experienced, daily unused | Explicit menu choice, one slot/encounter, mark seen whatever result |
| Mandatory midpoint | At five hearts, incomplete, scheduled princess, required stats 6/4, daily unused | One slot/encounter; correct completes, wrong queues abbreviated retry; no hearts change |
| Proposal retry | At ten hearts, first proposal seen, pending, scheduled princess, daily unused | One slot/encounter; win or remain pending; no hearts change |
| Rest / Pass | Any active free slot with no unresolved encounter | One slot, one journal record, zero reward |
| Unavailable/invalid attempt | Wrong location/time, prerequisite absent, stat capped, already met today, terminal, bad choice | No state mutation, no time, no journal, visible explanatory feedback |

**DEFAULT:** Actively choosing another town location is free at any time; a cost-bearing action commits at the destination currently selected. Do not make the user pay for movement. A blocked stat-capped training click is free (never consume a session at max). A pending dialogue holds interaction/navigation choices until resolved or explicitly *abandoned*; DEFAULT abandonment clears draft with zero cost and restores committed state; it cannot save a selected response or partial reward.

## 4. Exact schedule and encounter gating

The accompanying `route_schedules_and_training.json` is machine-readable. `day` and `slot` select exactly one known weekly meeting cell and location per princess; all other cells are unavailable. Meeting eligibility requires player currently at that location. At most one of two daily scheduled slots can be used to meet her. The princess is not available on other weekdays or in the third slot. The four-week calendar repeats identically.

* Tavri primary charisma 6, secondary intelligence 4. Mon A/E Gardens; Tue M/A Square; Thu A/E Court; Sat M/A Library; Sun A/E Gardens.
* Nerelle primary kindness 6, secondary charisma 4. Mon A/E Quay; Wed M/A Gardens canal; Fri A/E Quay; Sat M/A Gardens canal; Sun A/E Quay. She **never becomes human or has legs**.
* Kaedra primary strength 6, secondary intelligence 4. Tue M/A Guild; Wed A/E Court; Thu M/A Guild; Sat A/E Gardens; Sun A/E Court.

At `heartsHalf==10` while midpoint not completed, the next *scheduled eligible* encounter is necessarily midpoint, not ordinary. If stats insufficient, talking is disabled cost-free with explicit requirement display; user can train or wait. A midpoint failure consumes one encounter/slot, retries the **short** source scene on a **later eligible day**, never the same day, retaining heartsHalf 10. A successfully completed midpoint is permanent even if later offensive dialogue drops hearts under five. Stage thereafter is POST.

At `heartsHalf==20` and a failed proposal, only abbreviated proposal retry can be selected as the day's encounter. Correct wins, wrong waits for later eligible day; never replay full proposal. This cannot require new training/rewards.

**DEFAULT event priority:** midpoint and pending proposal retry are mandatory and suppress ordinary/optionals. Otherwise if eligible optional event and ordinary both exist, show two distinct `Meet` and `Special moment` options with descriptions **not exposing hidden stat thresholds**; player selects one, and the other remains available on a later eligible day while stage still qualifies. `optionalsExperienced` is set after completed scene even for rude/wrong response; unchosen event remains untouched. Never auto-trigger a special event merely because its prerequisite becomes met. One-time optional event can be missed at midpoint/season end.

Pre optional: Tavri Fantasygram Catastrophe (charisma>=3), Nerelle Surface Souvenir Swap (kindness>=3), Kaedra Prince's Fashion Challenge (strength>=3). Post optional: Tavri Unscripted Comedy (kindness>=3), Nerelle Moonwater Festival (intelligence>=3), Kaedra Monster Reputation Rumor (kindness>=3). No optional is a required marriage prerequisite. No new reputation, clothing, economy or combat stats.

## 5. Training math — exact

All stats start zero and cap at ten. If current level 0..4, one training session immediately increases it to level+1. If level 5..9, first session sets its partial progress to one and does not raise level, second session resets progress to zero and increases level by one. Thus level 0→6 requires **seven sessions**; level 0→4 requires four; 6+4 milestone requires eleven total sessions. This remains true for either activity belonging to same stat; there is no activity-specific bonus. Training in other stats never resets partial progress. There are exactly two activities per stat at listed locations; narrative descriptions in `01_APPROVED_CANON/support.md` are authoritative.

## 6. Hearts — exact integer half-units

`heartsHalf` counts half-hearts; show visually 0.0,0.5,...,10.0. For an ordinary or optional resolved choice use the **single net reward** from its approved branch: correct `+2`, ordinary wrong `+1`, explicitly offensive `-1`. Values already INCLUDE meeting attendance; never apply a separate meeting bonus. Always clamp `max(0,min(stageCap,heartsHalf+delta))` where stageCap=10 before midpoint success, else 20. When stage cap is reached, excess gain is lost (no carry). A wrong answer still earns +0.5 unless specifically authored offensive. Midpoint outcome alters only flag/status, no hearts. Proposal answer alters only outcome/status, no additional heart reward or penalty.

When midpoint incomplete and a completed earning encounter newly reaches `heartsHalf=10`, set pending milestone; the current earning encounter concludes without an immediate midpoint. The next scheduled eligible encounter is the trial.

When post-midpoint earning encounter's **projected** result reaches 20 half-units (including a +1 ordinary-wrong/optional-wrong choice), append the **full approved proposal scene immediately as a second stage of the SAME uncommitted encounter**. No intermediate committed hearts=20 state, slot or journal entry. If proposal correct: commit that parent action, heartsHalf=20, `outcome=won`, gallery route and show epilogue read-only. If proposal incorrect: commit heartsHalf=20, `proposalStatus=retry_pending`, slot/daily used and ONE journal entry; retry only on later scheduled day. A failed first proposal on Day 28 evening resolves to terminal failure after its action commits. A proposal retry does not add hearts. **DEFAULT:** any positive outcome reaching exactly 20 triggers the first proposal, because the frozen pivotal content says “projected reward reaches ten hearts,” not only a “correct” choice; this resolves wording ambiguity in the older preliminary contract.

## 7. Scene renderer and deterministic ordinary pool

Exactly 54 ordinary scenes: for each route and stage PRE/POST, first-use ordered `U01..U06` once, followed by repeating `F01,F02,F03,F01,...` forever as long as legal. Persist an integer `ordinaryNext` cursor per route/stage, initialized 0. On successful ordinary encounter *commit*: choose U01..U06 if cursor 0..5, else F index `(cursor-6)%3`, then increment cursor by 1. Do **not** increment on merely opening, revisiting, cancelling draft, or a failed commit. If it triggers marriage, increment exactly once in the combined final parent transaction. Midpoint success unlocks POST U01; pre cursor is retained but never selected again. Ordinary conversation text is self-contained and may be skipped through progression.

Static content should be compiled into a typechecked registry with canonical stable IDs. For each line preserve speaker, expression cue, text, and order. Render introductory lines, one always-visible choice point (two guaranteed options and occasional explicit offensive third), selected branch lines only, approved outcome and END transition. Pivotal scenes use the same authored branch parsing; prologue, epilogue and failure are display-only. Never replace authored lines with generated AI or let custom player text inject HTML.

**DEFAULT:** Dialogue click/Enter/Space advances one line when no interactive choice is focused. Show choices in documented order, with visible focus and buttons; disable double-click action while committing. No auto-advance or autoplay required. No character voice or sound.

## 8. Encounter selection and atomicity

**Pure read function:** compute valid actions from committed state, current route/week/slot/location and flags; never alter state by checking eligibility or drawing the UI.

**Start (draft only):** acquire sole writer before any mutable action; snapshot committed `saveRevision`; create durable draft containing `actionId`, selected scene, stage, line cursor, chosen branch IDs and possible linked proposal stage. Showing/canceling draft is non-cost-bearing. No heart/clock/stat/journal changes committed yet.

**Resolve:** parse selected authored outcome ID; if ordinary/optional, calculate reward and projected hearts once; append linked full proposal if 20. Show that proposal before committing; collect exact final choice. For milestone/standalone proposal retry, stage its status outcome. Validate prerequisites and `saveRevision` once more before commit. **One IndexedDB readwrite transaction** atomically updates committed run, used-daily marker (or next-day reset after evening), training/cursor/optionals, one journal record, saveRevision+1, gallery if success, and previous-good rollback snapshot. Abort transaction on any error; display storage failure and retain precommit state. Commit idempotently by `actionId` to avoid duplicate awards even if a UI event is retried. Clear pending draft only with/after transaction; stale draft references are discarded on reload if actionId already exists in journal.

**Advance:** after action outcome applied, advance `morning→afternoon→evening→next morning`, day+1 and dailyEncounterUsed=false on rollover. On Day28 evening, if still active mark failure and preserve final day/slot as `day=28, slot=evening`, do not set day29; if won terminal, no further time advancement is required, preserve source day/slot as the victory time (journal has action time). No winner means fail on final evening after action. Any action may be last, including Rest and training. On other days when evening causes a next day, accept only days<=28.

**DEFAULT journal record:** `{actionId, dayBefore, slotBefore, route, kind, location, sceneIdOrActivityId, selectedChoiceId|null, linkedProposalChoiceId|null, heartsBeforeHalf, heartsAfterHalf, statBeforeAfterOrNull, midpointBeforeAfter, proposalBeforeAfter, outcomeAfter, atRevision}`. Exactly one per committed cost-bearing action; no journal for free UI, read-only epilogue or intermediate proposal stage. No fixed clock timestamp requirement.

## 9. Save, import/export, recovery, tab ownership

Read `SAVE_RECOVERY_AND_FAILURES.md` as part of this specification. IndexedDB, no server. All writes single logical revision transaction. JSON export includes only committed state+gallery, never a transient draft. Data validation and error outcomes are explicit. Last-good snapshot and rollback survive reload. Second tab read-only; if Web Locks unsupported, gameplay writes are disabled with clear notice rather than risking divergent saves. Lock handover requires reloading newest committed revision. One active playthrough; gallery independent.

## 10. UI and assets

Use approved original PNGs from `02_ART_ASSETS/` as identity authority; derived optimizations may change codec/size but NEVER rewrite originals. Asset names and SHA-256 recorded. The seven backgrounds are exact route locators. Portrait expression cues map NEUTRAL→neutral, PLAYFUL→playful, WORRIED→worried, ANNOYED→annoyed, SURPRISED→surprised. The three midpoint CGs are presented on corresponding midpoint first-attempt scenes (not ordinary conversation). No CG is gameplay-affecting. Display appropriate character sheet in read-only profile UI only if designed without new features. Do not canonize the male shown incidentally in Kaedra's Royal Trial CG.

**Nerelle waterborne special case:** render her in visibly water-accessible Garden canal at screen-right on desktop and 320px. Do not paste her full sprite upright on dry terrace. `UX_ACCESSIBILITY.md` includes deterministic layout/test criteria and a non-diegetic close-up contingency that avoids falsely depicting legs/standing. Approved daylight background remains cinematic in evening; HUD clock always authoritative.

## 11. Acceptance and release discipline

All 39 candidate criteria in historical acceptance draft are now treated as baseline test topics, expanded by `04_ACCEPTANCE_AND_FIXTURES/TEST_MATRIX.md`. Implement actual unit/integration/E2E tests covering every route/stage, rewards, cost and save transition. Six supplied scheduling witnesses are only **abstract lower-bound demonstrations**; execute the real game reducer with real selected actions/IDs (including eleven training actions) to verify same days. If a witness cannot be reproduced in the actual transition graph, report, investigate and correct technical defaults without changing original approved story or making an unapproved balance decision. Do not claim the tests passed until run.

## 12. Build, deploy, and forbidden expansions

Preferred target: React 18+ with TypeScript strict mode, Vite, static Cloudflare Pages. Test using common desktop Chrome/Firefox/Safari and mobile 320px viewports; CI build/typecheck/lint/unit/E2E checks. Ensure no copyrighted third-party runtime API images, no new monetization, live social platform, AI model, sound files, server, combat, inventory, travel actions, romance routes, children stat, or economic systems. All content created for this version is provided; implementer supplies *software only*.
