# Acceptance checklist (TEST_MATRIX.md → evidence)

Legend: **Auto ✔** = automated test executed and passing in the authoring environment · **CI** = automated, written, runs in GitHub Actions (could not run in the authoring environment) · **Owner** = needs human review.

## A. Start, schedule, transitions
| ID | Evidence | Status |
|---|---|---|
| A01 | `engine.test.ts` "A01 …", name normalisation test; E2E keyboard flow | Auto ✔ |
| A02 | E2E keyboard flow (replacement confirmation, cancel keeps run); persistence E11/D07 (gallery survives) | Auto ✔ |
| A03 | `engine.test.ts` "A03 …" (84 slots, week rollovers, no Day 29) | Auto ✔ |
| A04 | `engine.test.ts` "A04 …"; E2E moves between all 7 locations without time passing | Auto ✔ |
| A05 | `engine.test.ts` "A05 …" — exhaustive comparison with the spec table for all 28 days × 3 slots × 3 routes | Auto ✔ |
| A06–A08 | `engine.test.ts` "A06/A07/A08 …" (refusals leave state byte-identical) | Auto ✔ |

## B. Training
| ID | Evidence | Status |
|---|---|---|
| B01–B05 | `engine.test.ts` "B01–B05 …" (every level, 7/4/11 sessions, shared partial progress across both activities, location gating, capped training free) | Auto ✔ |

## C. Hearts and ordinary text
| ID | Evidence | Status |
|---|---|---|
| C01–C12 | `engine.test.ts` "C01–C12 …"; `content.test.ts` | Auto ✔ |

## D. Marriage, end, deadline
| ID | Evidence | Status |
|---|---|---|
| D01–D06 | `engine.test.ts` "D01–D06 …"; E2E perfect Tavri route (wins Day 15) and Day 28 failure | Auto ✔ |
| D07 | persistence "E07/E09/D07", "E11/D07", "D02/D07"; E2E gallery | Auto ✔ |
| D08 | Gallery replays are read-only; E2E epilogue/prologue presentation commits nothing | Auto ✔ (owner may spot-check replay) |

## E. Persistence and concurrency
| ID | Evidence | Status |
|---|---|---|
| E01–E11 | `tests/browser/persistence.test.mjs` (real IndexedDB, Web Locks, BroadcastChannel); `backup.test.ts`; E2E draft resume, read-only tab, export/import | Auto ✔ |

## F. Graphics, content, mobile, accessibility
| ID | Evidence | Status |
|---|---|---|
| F01 | `content.test.ts` (28 hashes, kinds); `art:check` | Auto ✔ |
| F02 | `content.test.ts`; `content:check` (compiler round trip from frozen archives; independent parse of all 77 readable extracts). Runtime text is the owner's 2026-10-25 revision; the compiler and a unit test hold every ID, choice order, outcome and heart value to the base | Auto ✔ · **Owner** review of revised text |
| F03 | `content.test.ts` (exactly four approved replacements) | Auto ✔ |
| F04 | `presentation.test.ts` (geometry, water pixels under the waterline, sprite transparent below the cut) + E2E at 1280×850 and 320×740, including a slowed background load + screenshots | Auto ✔ · **Owner** visual sign-off |
| F05 | One portrait per expression, each an all-ages edit of the approved sprite (owner revision): clothing repainted, Kaedra recoloured; horns, wings, tails, ears and fins unchanged (`presentation.test.ts` art policy; `art:check` hashes). No protagonist sprite; CG male figure appears only inside the approved CG | **Owner** |
| F06 | E2E at 320×740 and 640×425 (200 % zoom of 1280×850): no horizontal overflow on title, new run, all 7 hub locations, dialogue, choices, calendar, journal, help, save | Auto ✔ |
| F07 | E2E keyboard-only flow (Tab/Enter/Space/Arrow/Escape, focus return); modal focus trap; live region for dialogue lines | Auto ✔ · **Owner** screen-reader pass |
| F08 | E2E: no external requests; play continues offline after load | Auto ✔ |
| F09 | Font fetch script + OFL notices; fallbacks used until fetched; gold never used as body text (contrast test) | CI (fonts) · **Owner** once fonts render |
| F10 | E2E: every image has alt or is decorative; buttons named; landmarks. Character art is the owner-requested edit of the approved originals, recorded with both hashes | Auto ✔ |

## G. Witnesses
All six reproduced exactly through the real engine (`witnesses.test.ts`); see the report's §5. | Auto ✔

## H. Definition of done
| Item | Status |
|---|---|
| No BLOCKER requiring product invention | ✔ none found |
| Engine unit/integration tests pass with recorded output | ✔ `docs/test-results/` |
| Visual screenshot review: mobile canal and desktop | **Owner** (`docs/screenshots/`) |
| Keyboard / screen-reader audit | keyboard ✔ · screen reader **Owner** |
| Source hashes, licenses, offline assumptions | ✔ |
| Cloudflare Pages static deploy smoke test | **Owner**, after approval ([DEPLOY.md](DEPLOY.md)) |
| Release build, source repo, lockfile | build ✔ (esbuild here, Vite in CI) · lockfile **after first `npm install`** |

## Owner revision (2026-10-25)
| Item | Evidence | Status |
|---|---|---|
| Dialogue rewrite: words only, mechanics unchanged | `content:check`; `content.test.ts` "owner revision changes words only…"; `docs/writing/DIALOGUE_REVISION_COMPARISON.md` | Auto ✔ · **Owner** read-through |
| First-run tutorial: goal, time, finding her, talking, training, saving | E2E keyboard flow and tutorial test (desktop and 320 px, route-specific places and stats); `docs/screenshots/*tutorial*` | Auto ✔ · **Owner** |
| All-ages art; Kaedra ash-silver hair, violet eyes | art policy unit test; `art:check`; screenshots | Auto ✔ · **Owner** visual sign-off |
| Distinct face structures | Needs new artwork: `docs/art/CHARACTER_REDESIGN_BRIEF.md` | **Owner** (commission) |
| Choice order (correct answer listed first in all 72 menus) | report §7 | **Owner decision** |
| Fourth princess, Senna: 25 scenes in the frozen routes' shape; schedule, stats, staging from `content/routes/SEN/ROUTE.json`; winnable (Day 15 perfect, Day 26 impaired); version 1 saves and backups upgrade | `routes.test.ts`, `content.test.ts`, witnesses, `backup.test.ts` (schema 1 imports), E2E "Senna's route" | Auto ✔ · **Owner** read-through · portraits generated; milestone illustration pending (placeholder) |
| Music: title opening then loop through character selection; Enter the Town in the prologue; silence in the game; on/off remembered | `music.test.ts`; E2E "Music: …" (emulates the click-to-start rule) | Auto ✔ · **Owner** listen-through (loop seam, volume) |

