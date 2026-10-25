# Royal Exceptions

A browser fantasy-romance visual novel. Choose one of three princesses — **Tavri**, **Nerelle** or **Kaedra** — and build a sincere connection over a 28-day royal courtship season: train four stats, find her on her weekly schedule, and choose your words. Static React + TypeScript + Vite single-page app for Cloudflare Pages; progress is saved locally in the browser (IndexedDB). No backend, accounts, sound, or runtime AI.

This repository implements `handoff/` — the **Royal Exceptions Implementation Agent Handoff v1.0**, kept byte-for-byte — as a playable game.

- **Status:** feature-complete against the handoff, plus the owner's 2026-10-25 revision: rewritten dialogue, a first-run tutorial, all-ages art and Kaedra's new look. All automated tests pass (see [docs/IMPLEMENTATION_REPORT.md](docs/IMPLEMENTATION_REPORT.md) for what ran where, deviations and open items).
- **Writing:** [docs/writing/STYLE_GUIDE.md](docs/writing/STYLE_GUIDE.md) (how the game sounds, with research sources) and [docs/writing/DIALOGUE_REVISION_COMPARISON.md](docs/writing/DIALOGUE_REVISION_COMPARISON.md) (every scene, before and after).
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
| `npm run content` / `content:check` | Compile story text from the frozen archives, apply the owner-approved dialogue revision (`content/revisions/dialogue-v2/`), write `src/content/generated/content.json` / verify it is current. `CONTENT_REVISION=none` builds the frozen text instead |
| `node --import tsx scripts/check-revision.ts <dir>` | Writer's check for revision scene files: mechanics must match the base; lists lines the dialogue heuristics flag |
| `node scripts/dialogue-audit.mjs [--base]` | Heuristic audit of the shipped (or frozen) dialogue |
| `python3 scripts/art/modest.py <asset_id>…` | All-ages wardrobe edit of a character image from its original, per `scripts/art/modest/<asset_id>.json` → `art-src/edited/` (the two seated midpoint redraws are copied in from `art-src/redrawn/`) |
| `python3 scripts/audio/prepare-music.py [--import OPENING LOOP TOWN]` | Bring in the owner's music (copied byte for byte to `public/audio/<name>.<hash>.mp3`) and regenerate `src/audio/tracks.generated.ts`, which records each track's exact length and a fingerprint so it loops without gaps (needs ffmpeg) |
| `python3 scripts/art/redraw.py` | Re-apply the recorded corrections to the seated midpoint redraws (`scripts/art/redraw/<asset_id>.json` records the reference, prompt, seed and hashes) |
| `npm run art` / `art:check` | Build / verify the WebP deployment copies in `public/art/` from the hash-checked originals (character images from their all-ages edits) |
| `npm run fonts` | Fetch Cormorant Garamond and Source Sans 3 (SIL OFL 1.1) and their license texts |
| `npm run typecheck` | Strict TypeScript for the app, scripts and tests |
| `npm test` | Unit tests: engine rules, all six schedule witnesses replayed through the real engine, save validation, backups, staging geometry, colour contrast |
| `npm run test:browser` | Chromium tests: IndexedDB/Web Locks persistence and end-to-end play of the built site (set `SITE_DIR=dist` to test the Vite build) |
| `npm run build:esbuild` | Fallback production build with esbuild (same output shape) |

## How it is organised

```
handoff/                 the v1.0 handoff, unchanged (source archives, canon, art, blueprint, fixtures, provenance)
content/revisions/       owner-approved dialogue revision layered on the frozen text (words only; mechanics checked)
art-src/edited/          all-ages edits of the character art, derived from the originals by scripts/art/modest.py
public/audio/            the owner's music: title opening + loop, "Enter the Town" (prologue); played by src/audio/
scripts/                 source verification, content compiler, revision checker, dialogue audit, art pipeline, font fetcher, fallback build
src/content/             content types + generated content table (checked in, reproducible)
src/core/                pure deterministic engine: schedule, training, hearts, encounters, journal, replay validator
src/persistence/         IndexedDB transactions, Web Locks writer, drafts, backups, recovery, error codes
src/ui/                  HUD, stage compositions, dialogue, hub, encounter player, menus and panels
tests/unit/              node:test suites (run with tsx)
tests/browser/           Playwright-driven suites against real Chromium
docs/                    implementation report, deploy guide, acceptance checklist, test results, screenshots, writing guide
```

Key rules live in `src/core/engine.ts` (one pure `applyAction` transition, read-only availability functions) and are exercised by `tests/unit/engine.test.ts` and `tests/unit/witnesses.test.ts`. Story text in `handoff/` is never edited: it is compiled from the frozen archives, with the approved four-string Tavri overlay applied only to the derived runtime copy, and the owner's 2026-10-25 dialogue revision applied on top from `content/revisions/dialogue-v2/`. The compiler refuses any revision that changes a scene, choice, outcome or heart value.

## Licenses

Story and art: original project content, see [LICENSES/ART_AND_STORY_NOTICE.md](LICENSES/ART_AND_STORY_NOTICE.md). Fonts: SIL OFL 1.1 (installed by `npm run fonts`). Software dependencies: [public/licenses/THIRD_PARTY_NOTICES.txt](public/licenses/THIRD_PARTY_NOTICES.txt). No license has been chosen for this repository's own code; that is the owner's decision.
