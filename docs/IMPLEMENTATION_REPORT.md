# Implementation completeness report — Royal Exceptions v1.0

Built from `handoff/` (Implementation Agent Handoff v1.0, archive SHA-256 `15c72f29…f8d4`), the sole authority. This report separates what was **executed and passed** in the authoring environment from what is **written but not executed there**, and lists every deviation and open item.

## 1. Result

- **Playable game, feature-complete against COMPLETE_GAME_SPEC.md** — 3 routes, 28 days × 3 slots, 7 locations, 8 training activities, Rest/Pass, 54 ordinary conversations, 6 optional events, midpoints and short retries, linked same-encounter proposal, proposal retries, 3 epilogues, shared prologue and failure, journal, calendar, help, gallery, backup export/import, recovery, read-only second tab.
- **No BLOCKER.** No contradiction between preserved canonical sources and the v1.0 defaults was found (§6).
- **135 automated tests pass** (112 unit + 23 browser), run on real code paths. Outputs: [`docs/test-results/`](test-results/).

## 2. Source integrity (executed)

- 8/8 original archives and 28/28 art originals match the recorded SHA-256 values (`npm run verify:sources`).
- Story text is compiled **directly from the frozen archives** (`scripts/compile-content.ts`, a read-only ZIP reader). The approved Tavri overlay is applied in memory: exactly 4 replacements, derived hash equals the overlay's declared effective hash and the handoff's convenience copy. Nothing in `handoff/` is modified.
- Compiler validation: 77 scenes (21 pivotal, 2 shared, 54 ordinary), 6 pivotal choice points per princess, 1 per ordinary, globally unique IDs, 973 authored lines round-tripped verbatim against the source documents, all 77 per-scene extracts parsed and confirmed identical to the archive text, approved shared prologue/failure confirmed identical to Tavri section I, support copy counts (14 help, 12 quips, 8 activities, 12 TXT, 14 UI). `npm run content:check` fails the build if the checked-in table is stale.

## 3. What was built (by stage)

| Stage | Where | Evidence |
|---|---|---|
| Content compiler | `scripts/compile-content.ts`, `src/content/generated/` | `content:check`, `tests/unit/content.test.ts` |
| Pure engine | `src/core/engine.ts` (single `applyAction` transition; read-only availability), `src/core/schedule.ts` | `tests/unit/engine.test.ts` (A–D) |
| Replay validator | `src/core/validate.ts` — structure checks, then the whole journal is replayed through the engine and must reproduce the stored state exactly | `tests/unit/validate.test.ts` (23 tamper classes rejected) |
| Persistence | `src/persistence/` — IndexedDB `royal-exceptions` v1, store `records` (`active`, `previous_good`, `gallery`, `draft`, `meta`); one readwrite transaction per action; idempotent `actionId`; Web Locks writer `royal-exceptions-writer`; BroadcastChannel refresh of read-only tabs; drafts; recovery; backups with canonical SHA-256 digest | `tests/browser/persistence.test.mjs` (E01–E11, D02, D07), `tests/unit/backup.test.ts` |
| UI | `src/ui/`, `src/App.tsx` | `tests/browser/e2e.test.mjs` |
| Art | `scripts/optimize-art.mjs` → `public/art/*.webp` (7 MiB from 75 MB), `derived_manifest.json` records source and derived hashes | `art:check`, F01 test |
| Witnesses | `tests/unit/witness-runner.ts` converts each abstract witness into a legal slot-by-slot action stream | §5 |

## 4. Test evidence (executed in the authoring environment)

| Suite | Runner | Result |
|---|---|---|
| Unit: engine, witnesses, validation, backups, drafts, content, staging geometry, colour contrast | `npm test` (node:test via tsx) | **112/112 pass** |
| Browser persistence (real Chromium IndexedDB + Web Locks + BroadcastChannel) | `node --test tests/browser/persistence.test.mjs` | **12/12 pass** |
| Browser end-to-end on the built site (esbuild build) | `node --test tests/browser/e2e.test.mjs` | **11/11 pass** |

Highlights: keyboard-only play from title to choice to reload to replacement confirmation; a perfect Tavri route played entirely through the UI wins on Day 15 with the midpoint CG and epilogue; Day 28 deadline failure through the UI; draft resume after reload with no award; forced IndexedDB aborts (abort, exception, quota) leave all records untouched; triple-click of the same action awards once; second tab read-only and takeover loads the newest revision; export → import into a fresh browser preserves the run exactly; no external network requests and continued play offline after load; no horizontal overflow at 320 px and at 200 % zoom on every main screen; dialogue ≥ 16 px; choices ≥ 44 px; every text colour pair ≥ 4.5:1.

## 5. Witness replays (TEST_MATRIX G) — reproduced exactly

Each witness was expanded into a legal stream (Rest or real training at the activity's location in every non-meeting slot; real scene and choice IDs) and run through the engine; every row's hearts-before/after matched.

| Fixture | Claimed | Actual win | Actions | Training | Encounters |
|---|---|---|---|---|---|
| TAV_PERFECT | Day 15 | Day 15 afternoon | 44 | 11 | 11 |
| NER_PERFECT | Day 15 | Day 15 afternoon | 44 | 11 | 11 |
| KAE_PERFECT | Day 16 | Day 16 morning | 46 | 11 | 11 |
| TAV_RECOVERY | Day 27 | Day 27 morning | 79 | 11 | 15 |
| NER_RECOVERY | Day 27 | Day 27 morning | 79 | 11 | 15 |
| KAE_RECOVERY | Day 27 | Day 27 afternoon | 80 | 11 | 15 |

Recovery fixtures confirmed: 4 missed eligible meetings, 4 ordinary-wrong answers, 1 failed midpoint, 1 failed first proposal.

## 6. Decisions made within the v1.0 defaults (no new features)

- **Nerelle staging — option 1 (preferred) implemented.** In the Royal Gardens she is placed in the canal at screen-right, waist-deep behind the canal wall; at Moonwater Quay she is waist-deep in open water. Below the waterline she is covered by a copy of the *same approved background image* clipped to a polygon (`src/ui/staging.ts`); no art was created or edited. Desktop and phone use different 16:9 crops of the same background so the water stays visible at 320 px. A label reads "Royal Gardens — Canal". If Nerelle were ever shown at a location without water staging, the code falls back to the non-diegetic framed bust (option 2); this never happens with the approved schedule. Unit tests check geometry (water line at/above the waist across her width, head in frame, screen-right placement); E2E checks the DOM at both sizes. **Owner visual acceptance is still required** (screenshots in `docs/screenshots/`).
- **Sprite edge softening.** The approved portraits are cropped at their own frame edges, which shows as a hard vertical line on stage. A CSS horizontal fade on the left/right 9 % of each portrait softens this. Display-only; files unchanged. Owner may veto.
- **Midpoint CGs** are shown, letterboxed (no cropping), for each `*-MID-01` first attempt only.
- **Scene backgrounds** stay at the encounter's scheduled location, except where a scene's own authored *Location* note and cue lines say otherwise: `TAV-FIN-01` in the Royal Gardens; epilogues start at Palace Court (Tavri, Kaedra) or Moonwater Quay (Nerelle) and move to the Royal Gardens at the authored "Later…" lines (`TAV-EPI-012`, `NER-EPI-017`, `KAE-EPI-012`). Prologue backdrop: Town Square (the public notice); failure backdrop: Palace Court (the official's appeal). These two have no authored location note — presentational choices, easily changed in `src/App.tsx`.
- **Outcome copy.** The approved `TXT-MEET-*` strings are shown verbatim when the applied change equals the nominal one; when a cap clamps the change, the numeric clause is replaced by the true applied amount (as CONTENT_INTEGRATION allows). `TXT-AT-CAP`, `TXT-FIN-PENDING`, `HD-HELP-MID_RETRY`, `HD-HELP-FIN_RETRY`, `UI-FAIL-*`, `UI-CONFIRM-01`, `UI-INTRO-*`, `UI-SAVE-*`, `UI-MOBILE-*` are used where they apply.
- **Implementation-authored text** is limited to technical/UI copy: error messages for the named error codes, button labels and action descriptions, status lines ("Saved locally", "Milestone complete. Your relationship has moved past the five-heart gate.", the rest result), image alt text, and the credits page. No story, lore or character description was written. Optional events are offered as "Special moment" without revealing thresholds.
- **Revision numbering.** `saveRevision` starts at 0 for the first run and increases by exactly 1 per committed action. A new run, an import replacement or a recovery restore sets it to one more than the highest revision previously stored, so it never goes backwards. The journal's `atRevision` is the revision the action produced. Exports round-trip every field; an imported run gets a local revision bump.
- **Import validation** goes beyond the listed checks: the imported journal is replayed through the engine and must reproduce the imported state, so any edited hearts, stats, flags or cursors are rejected (`ERR_IMPORT_STATE`) even if the digest is recomputed. A gallery-only backup (`activeRun: null`) adds endings and leaves the current run alone. "Replace my endings" is offered only as an explicit, warned alternative to the default union.
- **Options** add "Delete current run" (keeps the gallery) and "Erase all data" (both confirmed), per the confirmation boundaries in SAVE_RECOVERY.
- **Help** shows all 14 passages, with the contextually relevant ones first and badged. Town Square quips cycle per browser session and are free.
- **Character sheets** are viewable read-only from the New Run screen.

## 7. Deviations, unresolved items, and checks that could not run here

The authoring environment had **no access to the npm registry or to font/GitHub download hosts**. Only locally preinstalled tools were available (React 19.2.8, TypeScript 6.0.3, esbuild 0.28.2, sharp, tsx, Playwright 1.63 with Chromium). Consequences:

| Item | Status | Affected | What to do |
|---|---|---|---|
| Reproducible lockfile | **Not generated** (no registry access). Exact versions pinned for everything that was available; caret ranges for Vite, `@vitejs/plugin-react`, ESLint, `@types/*`. | `package.json` | Run `npm install` once and commit `package-lock.json`; CI switches to `npm ci` automatically. |
| `vite build` | **Not executed here.** The same entry was built and fully E2E-tested with the esbuild fallback (`scripts/build-esbuild.mjs`). | `vite.config.ts`, `index.html` | CI runs `npm run build` and the browser suites against `dist/` (`SITE_DIR=dist`). |
| Strict type-check of the UI against real `@types/react` | **Not executed here.** Core, persistence, content, scripts and tests were type-checked strictly with real `@types/node`; the UI was type-checked strictly against a minimal local React shim (`types-local/`, not used by the project build). | `src/ui`, `src/App.tsx` | CI `npm run typecheck`. |
| ESLint | **Not executed here.** | `eslint.config.js` | CI `npm run lint`. |
| Fonts (Cormorant Garamond, Source Sans 3) | **Not fetched** — download hosts blocked. The game uses system fallbacks; no proprietary substitutes. `npm run fonts` downloads them from the official Google Fonts OFL repository, verifies them, records SHA-256, installs the OFL texts and generates the `@font-face` rules. | `scripts/fetch-fonts.mjs`, `src/fonts.generated.css` | The Cloudflare build command runs `npm run fonts`. Screenshots in `docs/screenshots` show fallback fonts. |
| Firefox / Safari | **Not tested** (only Chromium available). Web Locks and IndexedDB are supported in current Firefox and Safari. | — | Manual check, or extend CI with `npx playwright install firefox webkit`. |
| Screen-reader audit | **Automated checks only** (names, alt text, landmarks, live regions, focus visibility, modal focus trap, Escape). Not tried with NVDA/VoiceOver/JAWS. | UI | Manual audit before public release. |
| Forced colours / Windows high contrast | CSS provided, **not visually verified**. | `src/styles.css` | Manual check. |
| Phone HUD | At 320 px the HUD is **three compact rows** (time+save, hearts+stats, menu) rather than two; the spec asks for "compact two-row". Menu items collapse behind one button. | `src/ui/components/Hud.tsx` | Owner decision; can drop to two rows by hiding the save chip text. |
| Cloudflare Pages deploy | **Not performed** — the handoff requires owner approval first. | — | [docs/DEPLOY.md](DEPLOY.md). |
| Repository license for the code | **Not chosen** — owner's decision. | — | — |

## 8. Owner acceptance still required

1. Nerelle canal/quay staging on desktop and 320 px (`docs/screenshots/*nerelle*`).
2. Sprite edge softening and CG letterboxing.
3. Prologue (Town Square) and failure (Palace Court) backdrops.
4. Implementation-authored UI/technical copy (§6).
5. Phone HUD layout (§7).
6. Font rendering once fonts are fetched.

See [ACCEPTANCE_CHECKLIST.md](ACCEPTANCE_CHECKLIST.md) for the full TEST_MATRIX mapping.
