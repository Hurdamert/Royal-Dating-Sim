# Royal Exceptions

A browser fantasy-romance visual novel. Choose one of three princesses — **Tavri**, **Nerelle** or **Kaedra** — and build a sincere connection over a 28-day royal courtship season: train four stats, find her on her weekly schedule, and choose your words. Static React + TypeScript + Vite single-page app for Cloudflare Pages; progress is saved locally in the browser (IndexedDB). No backend, accounts, sound, or runtime AI.

This repository implements `handoff/` — the **Royal Exceptions Implementation Agent Handoff v1.0**, kept byte-for-byte — as a playable game.

- **Status:** feature-complete against the handoff; 135 automated tests passing (see [docs/IMPLEMENTATION_REPORT.md](docs/IMPLEMENTATION_REPORT.md) for what ran where, deviations and open items).
- **Screenshots:** [docs/screenshots/](docs/screenshots/) (desktop 1280×850 and phone 320×740).
- **Owner checklist:** [docs/ACCEPTANCE_CHECKLIST.md](docs/ACCEPTANCE_CHECKLIST.md).

## Quick start

```bash
npm install          # first time: commit the generated package-lock.json
npm run fonts        # fetch the OFL fonts + licenses (optional; system fonts otherwise)
npm run dev          # http://localhost:5173
```

Production build and preview:

```bash
npm run build        # verifies sources, content and art, type-checks, then vite build → dist/
npm run preview
```

Deploying to Cloudflare Pages: [docs/DEPLOY.md](docs/DEPLOY.md).

## Scripts

| Script | What it does |
|---|---|
| `npm run verify:sources` | SHA-256 check of the 8 frozen source archives and 28 art originals in `handoff/` |
| `npm run content` / `content:check` | Compile approved story text straight from the frozen archives into `src/content/generated/content.json` / verify it is current |
| `npm run art` / `art:check` | Build / verify the WebP deployment copies in `public/art/` from the hash-checked originals |
| `npm run fonts` | Fetch Cormorant Garamond and Source Sans 3 (SIL OFL 1.1) and their license texts |
| `npm run typecheck` | Strict TypeScript for the app, scripts and tests |
| `npm test` | Unit tests: engine rules, all six schedule witnesses replayed through the real engine, save validation, backups, staging geometry, colour contrast |
| `npm run test:browser` | Chromium tests: IndexedDB/Web Locks persistence and end-to-end play of the built site (set `SITE_DIR=dist` to test the Vite build) |
| `npm run build:esbuild` | Fallback production build with esbuild (same output shape) |

## How it is organised

```
handoff/                 the v1.0 handoff, unchanged (source archives, canon, art, blueprint, fixtures, provenance)
scripts/                 source verification, content compiler, art pipeline, font fetcher, fallback build
src/content/             content types + generated content table (checked in, reproducible)
src/core/                pure deterministic engine: schedule, training, hearts, encounters, journal, replay validator
src/persistence/         IndexedDB transactions, Web Locks writer, drafts, backups, recovery, error codes
src/ui/                  HUD, stage compositions, dialogue, hub, encounter player, menus and panels
tests/unit/              node:test suites (run with tsx)
tests/browser/           Playwright-driven suites against real Chromium
docs/                    implementation report, deploy guide, acceptance checklist, test results, screenshots
```

Key rules live in `src/core/engine.ts` (one pure `applyAction` transition, read-only availability functions) and are exercised by `tests/unit/engine.test.ts` and `tests/unit/witnesses.test.ts`. Story text is never edited by hand: it is compiled from the frozen archives, with the approved four-string Tavri overlay applied only to the derived runtime copy.

## Licenses

Story and art: original project content, see [LICENSES/ART_AND_STORY_NOTICE.md](LICENSES/ART_AND_STORY_NOTICE.md). Fonts: SIL OFL 1.1 (installed by `npm run fonts`). Software dependencies: [public/licenses/THIRD_PARTY_NOTICES.txt](public/licenses/THIRD_PARTY_NOTICES.txt). No license has been chosen for this repository's own code; that is the owner's decision.
