# Acceptance Criteria Candidate v0.1 — test plan for a future Goldfish test writer

No executable game tests are included. These descriptions are approval candidates. Use fixed timestamps and injected repository/storage fixtures, not realtime sleeps. Distinguish authored-choice outcome IDs from UI presentation.

## A. Canon/content provenance
1. `CAN-001` assert each of 77 unique effective scene IDs exists exactly once (23 pivotal/shared, 54 routine); shared two appear once globally.
2. `CAN-002` assert 15 approved expression sprite files, three CGs, three character sheets, seven backgrounds exist; original SHA-256 matches registry.
3. `CAN-003` derive Tavri scene by exactly four approved old→new text substitutions; compare exact derived SHA; no other text or IDs changed.
4. `CAN-004` never modify any original ZIP; candidate metadata must not claim to reproduce missing Gate1 D-001–D-144.
5. `CAN-005` verify each authored choice has existing line/option/outcome references, including intentionally reused result IDs, without rejecting legal aliases.

## B. Time and action
6. `CAL-001` every princess schedule matches all four weekly cycles; disallow an ineligible slot without consuming time.
7. `CAL-002` exactly three time slots per day; after Day28 evening resolve action THEN fail if still active, no playable Day29.
8. `CAL-003` two meetings on the same day forbidden even at two scheduled slots; blocked attempt must not spend slot.
9. `CAL-004` navigation and Help are free; allowed training costs exactly one slot; no invented currency/travel costs.
10. `CAL-005` rejected malformed choice or unavailable event is state/journal unchanged.

## C. Hearts, training and scenes
11. `HRT-001` ordinary correct +2, wrong +1, explicitly offensive −1 half-unit net and clamp at 0/20.
12. `HRT-002` pre-midpoint cap at 10 half units discards overflow; later permanent completed midpoint allows >10 even if hearts decrease.
13. `HRT-003` primary stat6 + secondary4 gate; invalid threshold blocks free; first failed attempt consumes a slot but no extra heart penalty; retry on next eligible encounter is short script.
14. `HRT-004` level 0–5 one training session each, >5 two per new level; neither location/activity provides extra bonus.
15. `HRT-005` two separately approved optional events per princess; hidden eligibility, one-time experienced flag regardless outcome, one slot and one daily encounter.
16. `HRT-006` reached ten hearts opens first proposal in SAME transaction, cannot save a committed hearts20 preproposal state as if outcome resolved; failed proposal leaves hearts20 and retry pending, no extra penalty.
17. `HRT-007` victory unlocks only chosen route gallery and terminal state; failure keeps journal until explicit restart.
18. `HRT-008` encounter outcome awards not counted twice from base + answer.

## D. Ordinary pool and story behavior
19. `TXT-001` per princess/pre-post U01→U06 once, F01→F03 cycles in order; refresh/import preserves cursor.
20. `TXT-002` post-midpoint remains selected even after heart loss, and starts at U01.
21. `TXT-003` at least one correct and one wrong option always shown; explicitly offensive only where tagged. Invisible stat-gated options never displace guaranteed correct option.
22. `TXT-004` named substitutions `{PLAYER}` safe for HTML injection and up to 24 graphemes; default Traveler.
23. `TXT-005` all presentation stays water-accessible for Nerelle; Kaedra wings/tail canonical; protagonist appearance not canonized by CG.

## E. Save and concurrency — pending schema approval
24. `SAV-001` one atomic action commit updates state, time, flag/cursor, one journal entry together; fault during write restores previous committed revision.
25. `SAV-002` refresh while pending dialogue displays original stage without duplicating heart gain, slot use or journal entries.
26. `SAV-003` import rejected for invalid schema, unsupported future version, corrupt payload, or invalid array sizes; original current save survives.
27. `SAV-004` versioned migration preserves progress/IDs; explicit handling for missing/removed content with no accidental reset.
28. `SAV-005` second tab read-only; handover reloads committed revision before writes and never creates concurrent dual writers.
29. `SAV-006` export reflects last committed consistent snapshot only and roundtrip restoration is deterministic.

## F. UI/accessibility and release
30. `UI-001` desktop and 320px reference compositions: no clipping of key eyes/ears/horns/tail, all necessary text/choices visible or scrollable, no horizontal overflow.
31. `UI-002` keyboard/screen reader/focus/reduced motion; minimum intended pointer targets, no hover-only controls, WCAG 2.2 AA contrast.
32. `UI-003` gold on parchment decorative only; actual measured text/button contrast >= applicable AA; forced color/zoom checks.
33. `UI-004` Royal Gardens Nerelle in visible water at right; cinematic BG daytime consistent with authoritative HUD time.
34. `UI-005` bundle approved fonts and license notices, no runtime AI or asset CDN; images optimized from unchanged originals.
35. `UI-006` source artwork overlays preserve identity; backgrounds only the approved seven.

## G. Abstract scheduling witnesses (not engine proof)
36. `BAL-001` Tavri and Nerelle reach winning proposals on Day15 under ideal choices; Kaedra on Day16.
37. `BAL-002` all three can win Day27 with 4 missed meetings, 4 wrong ordinary dialogues, one failed midpoint, one failed proposal, subject to eventual exact action model.
38. `BAL-003` Day28 evening terminal failure if still active; successful answer at Day28 evening resolves before failure check.
39. `BAL-004` ensure eligible actions do not require unseen optional event or an exhausted ordinary pool.

**NOT READY TO EXECUTE:** SAV/UI criteria and route balance fixtures are approval candidates pending exact Gate1 primary source, technical decisions and UI acceptance sign-off. Treat these as tests to be produced only after contract approval, not evidence that implementation already passed.
