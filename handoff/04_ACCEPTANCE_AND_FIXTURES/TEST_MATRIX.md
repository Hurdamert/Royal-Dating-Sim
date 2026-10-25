# Executable acceptance matrix for coding Goldfish

This is a **requirements-to-tests matrix**, not a claim that engine tests have run. Existing 39 criteria in `Acceptance_Criteria_CANDIDATE.md` are source topics; this expanded list closes practical behavior gaps. Use deterministic fake ID generator and fake time where needed; test with the real reducer/storage adapter and browser E2E. Assertions use canonical IDs and authored choice/outcome classes, not manufactured story branches.

## A. Start, schedule, and transitions

A01. Fresh route selection starts Day1 Monday morning; four stats=0, half-hearts=0, no old encounters; shared prologue consumes no slot.
A02. Different route cannot be selected during active run without explicit replacement confirmation; previous gallery survives.
A03. Four weeks exactly 28 days×3 slots; Sun Day7→Mon Day8 and Sun Day21→Mon Day22; no Day29.
A04. Valid Rest consumes one slot/one journal record/no heart change; navigation to each of seven locations is free.
A05. Schedule exhaustive for each day/slot/route: Tavri only Mon A/E Gardens, Tue M/A Square, Thu A/E Court, Sat M/A Library, Sun A/E Gardens; Nerelle only Mon A/E Quay, Wed M/A Gardens, Fri A/E Quay, Sat M/A Gardens, Sun A/E Quay; Kaedra only Tue M/A Guild, Wed A/E Court, Thu M/A Guild, Sat A/E Gardens, Sun A/E Court.
A06. Princess encounter wrong location/wrong slot/not scheduled/already met today blocks without slot or journal.
A07. After encounter first scheduled slot, second scheduled same-day slot cannot be used for another meeting; next day's first scheduled slot allowed.
A08. No non-selected princess earns hearts or can trigger ending. One route per run.

## B. Training

B01. For each stat at levels 0..4, one session produces level+1, partial0.
B02. Level5 partial0→partial1 without level change; next session 5→6 partial0; same at 6→7..9→10.
B03. Exactly seven training sessions needed for one stat to reach 6, exactly four for another to reach 4; combined eleven to satisfy a route midpoint. Alternate same-stat activities share same partial progress.
B04. Each training activity available only at its authorized location; two per stat exactly, no bonuses, stat other than target unchanged.
B05. Training at level10 unavailable and cost-free; partially completed training carries across days/import until resolved.

## C. Hearts/ordinary text

C01. Ordinary correct net +2 half-units, ordinary wrong +1, explicitly offensive -1; no additional meeting base reward. Validate each authored option maps to its declared outcome.
C02. Clamp at zero; clamp at ten half-units before midpoint; cap at twenty afterwards; never carry overflow or grant fractional double bonus.
C03. Reaching ten half-units makes next eligible princess encounter a midpoint; never auto-invoke same day.
C04. At midpoint, if primary below6 or secondary below4, encounter unavailable cost-free; training/rest still possible.
C05. First midpoint fail consumes one slot, no hearts change, sets next eligible-day short retry; repeated failures never replay first full midpoint.
C06. Midpoint correct permanently changes stage POST, irrespective of later hearts drop; ordinary POST U01 starts on first subsequent ordinary meeting.
C07. Six unique ordinary entries U01..U06 in order then three fallbacks F01..F03 cyclic, per route/stage; after refresh/import no accidental cursor increase. Check all 54 source scripts and names.
C08. Offensive ordinary reply on POST at heart below cap can reduce hearts below five without resetting midpoint.
C09. Optional before/after threshold3, relevant stat, correct stage and scheduled location; missing threshold hides event but not ordinary conversation; post event missable.
C10. Eligible optional and ordinary are explicit separate actions; choosing one uses daily encounter, other is not marked seen. Optional wrong/offensive still marks scene experienced once; never replay.
C11. Optional is never necessary for final marriage in any route, and does not grant inventory/combat/economy bonuses.
C12. Every ordinary always offers correct and normal wrong; only authored offensive options appear. Choices visible without stat gate.

## D. Marriage, end, deadline

D01. With POST hearts19, normal wrong +1 triggers full marriage immediately in same pending action; correct +2 from18 also triggers; no extra slot, journal or daily encounter.
D02. On marriage success, one atomic parent action commits hearts20 + gallery + terminal win; epilogue presentation no further commits.
D03. On wrong first proposal, hearts20 retained, retry pending next eligible day; full first proposal never replayed.
D04. On wrong short retry, hearts unchanged, still pending; on correct retry terminal win; retry uses one slot/encounter.
D05. At Day28 evening, correct linked proposal succeeds BEFORE deadline failure; wrong linked or retry proposal causes terminal failure.
D06. Day28 evening Rest, training, or normal action with no marriage success causes failure and displays CORE-FAIL-01; preserve journal until confirmed restart.
D07. Gallery retains all previously completed distinct route endings across replay, successful export/import, and terminal failure; no duplicate unlocks.
D08. Epilogue and shared prologue do not consume gameplay slots and are replayable read-only from gallery.

## E. Persistence and concurrency

E01. Every cost-bearing action is a single transactional revision with exactly one journal record, predictable action ID and complete field changes.
E02. Force IndexedDB abort between staging and commit: unchanged hearts, slot, training, cursor, journal, gallery, revision; user sees error.
E03. Simulate refresh at opening line, decision menu, branch response, linked marriage stage, and after commit; no duplicate rewards; either resume same draft or restore committed state exactly.
E04. Double-click same choice, press Enter rapidly or retry same `actionId` does not grant two rewards.
E05. Two tabs: second read-only; handoff after writer close reloads latest revision; both cannot commit simultaneously.
E06. Web Locks unsupported or IndexedDB blocked: never enable writable gameplay; explicit error/fallback read-only; do not silently lose progress.
E07. Export/import v1 round-trip preserves exact run, hearts, partial stats, stage cursors, flags, terminal/gallery, journal; export excludes pending draft.
E08. Digest tampering, malformed input, future version, >5MiB, malicious keys, invalid arrays, impossible state reject import without touching existing healthy run.
E09. Import preview/confirmation; cancellation changes nothing; accepted overwrite creates previous-good snapshot; gallery merge keeps existing unlocks.
E10. Malformed active snapshot with valid previous_good shows recovery, not autosuccess/silent reset; accepting previous-good requires explicit confirmation.
E11. Failed run journal can be read without restarting; replacement requires confirmation and export offered.

## F. Graphics, content, mobile, accessibility

F01. Exactly 28 approved art originals present and match `02_ART_ASSETS/asset_manifest.json` hashes: 7 BG, 15 sprites, 3 midpoint CG, 3 character sheets. All seven locations selectable, no eighth canal map node.
F02. 77 scenes accessible and IDs globally unique: 21 character pivotal, 2 global, 54 ordinary. All authored lines, choice IDs, outcome references preserved. Some repeated pivotal outcome IDs are intentional.
F03. Tavri effective Comedy scene contains **exactly four approved text replacements**, no altered outcomes and no modified frozen source archive.
F04. Nerelle never renders with legs or standing on terrace; in Royal Gardens clearly canal-right, at Quay clearly waterborne, on desktop1280x850 and mobile320x740.
F05. Kaedra horns/wings/tail canon; no protagonist gender hardcoded from Royal Trial CG; princess anatomy not modified. One portrait per approved expression state.
F06. At mobile 320px and 200% zoom: no horizontal overflow, no clipped dialog/choice, tab focus order logical, >=16px dialogue, functional scrolling.
F07. Keyboard-only new game→train→meet→choose→save→restart; focus visible, modal trapping, screen reader alerts, reduced-motion/contrast behavior verified. WCAG 2.2 AA targeted.
F08. Full no-network runtime dialogue: disconnect external network after loaded app; narrative choices still use static content; no backend/openAI/social API calls.
F09. App typography uses approved font family names with valid project-licensed bundled files sourced by implementer; legal notices; fallback fonts before load; gold decorative only on parchment.
F10. Every image has sensible non-spoiler alternative text or decorative empty alt; no watermark/mismatched art, no unauthorized character artwork.

## G. Concrete gameplay fixtures to generate as tests

`Abstract_Route_Schedules.csv` and `Abstract_Training_Witnesses.csv` contain six abstract witnesses. Convert each into one **actual legal ordered reducer action stream** including every intervening slot (Rest when needed), route-specific training activities at legitimate locations, correct static choice IDs and committed outcomes. Assert TAV/NER perfect wins Day15 and KAE Day16; all three deliberately impaired scenarios win Day27, after four missed eligible meetings, four wrong ordinary answers, one midpoint failure, and one proposal failure. These are prior **abstract claims** until executed against real reducer; if you cannot reproduce, surface as failure with first divergent state and do not falsify witness or game rules.

A failure test must check final resolution after Day28 evening, including pending milestone/proposal, missed eligibility, full hearts but no proposal success, and last-possible-slot successful proposal before timeout. Test optional branch collision and successful answer at hearts19 separately.

## H. Definition of done

No `BLOCKER` remaining that causes major product/behavior invention. Fresh independent build review accurately reconstructs state and source precedence. All engine unit/integration tests pass with recorded outputs; visual screenshot review for mobile canal and desktop; keyboard/screen reader audit, source hashes, licenses, offline assumptions, Cloudflare Pages static deploy smoke tests. Deliver release build, source repo, reproducible npm lockfile, test reports, agent deviations/issue tracker, asset/license manifest, human acceptance checklist. Never claim previous static 43/43 document validation is a running-game test.
