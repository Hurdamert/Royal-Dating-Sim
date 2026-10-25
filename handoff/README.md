# ROYAL EXCEPTIONS — IMPLEMENTATION AGENT HANDOFF v1.0

**Status: IMPLEMENTABLE BUILD INSTRUCTIONS, WITH TRANSPARENT NEW ENGINEERING DEFAULTS.**

This package is self-contained. Its **eight original ZIP archives** are reproduced byte-for-byte in `00_SOURCE_ORIGINALS/`; all **28 approved art PNGs** are available directly in `02_ART_ASSETS/`; all **77 complete authored scenes** and the approved supporting text are available in `01_APPROVED_CANON/` and `01_APPROVED_CANON/scene_sections/`.

**Start here:**
1. Read `05_AUDIT_AND_PROVENANCE/Canonical_Precedence_and_Approvals.md` and `03_IMPLEMENTATION_BLUEPRINT/COMPLETE_GAME_SPEC.md`.
2. Read `03_IMPLEMENTATION_BLUEPRINT/CONTENT_INTEGRATION.md`, `03_IMPLEMENTATION_BLUEPRINT/UX_ACCESSIBILITY.md`, and `03_IMPLEMENTATION_BLUEPRINT/SAVE_RECOVERY_AND_FAILURES.md`.
3. Read `04_ACCEPTANCE_AND_FIXTURES/TEST_MATRIX.md` and six abstract schedule witnesses; create runnable tests that execute the actual state transitions, not merely compare CSV values.
4. Parse the existing human-authored story Markdown into static structured game content, preserving all line/choice/outcome IDs; do not generate dialogue at runtime.
5. Implement a React + TypeScript + Vite static SPA targeted at Cloudflare Pages. Follow the 28-day mechanics, all UI/accessibility acceptance criteria and verifiable save guarantees.

The user asked that this be an actual implementable handoff, not another design round. Accordingly, `03_IMPLEMENTATION_BLUEPRINT/COMPLETE_GAME_SPEC.md` provides **explicit operational defaults** where the previous v0.1 package stopped at `[PROPOSAL]`. These are marked `NEW v1.0 IMPLEMENTATION DEFAULT`, not misrepresented as verbatim historic approval. They authorize a coding agent to proceed *subject to the project owner's ultimate acceptance*; an exact historical D-001–D-144 Gate 1 primary register was **not recovered**, and no historical wording has been fabricated. If a newly discovered original conflicts with these defaults, pause and obtain resolution; do not silently override a frozen scene or asset.

**User-approved, immutable:** princess designs and scenes, shared prologue/failure, Tavri's four-text overlay, all 54 ordinary conversations, all supporting routine copy, the visual direction, seven backgrounds and the accepted cinematic/water-access clarifications. These are the binding canon. The 2026-10-25 requests to create an implementation agent handoff do NOT authorize editing those originals. This package contains no game implementation code. A builder is expected to write code separately.

## Contents
- `00_SOURCE_ORIGINALS/`: eight original ZIPs; never rewrite, replace or flatten *in place*.
- `01_APPROVED_CANON/`: verbatim bibles, verbatim ordinary+support texts, shared text, exactly-four-string Tavri derived narrative and 77 per-scene excerpts; editorial headings still say `CANDIDATE` only because the originals are untouched.
- `02_ART_ASSETS/`: 15 expression portraits, 3 character sheets, 3 midpoint CGs, 7 backgrounds. Metadata and SHA-256 in `asset_manifest.json`. No incidental rejected mood boards.
- `03_IMPLEMENTATION_BLUEPRINT/`: executable behavior contract in prose, literal route/activity JSON, UX, story bindings, persistence, failure behavior, task plan.
- `04_ACCEPTANCE_AND_FIXTURES/`: test matrix; earlier abstract victory and recovery witnesses; historical noncanonical UI wireframes specifically flagged as **failed for Nerelle in canal**.
- `05_AUDIT_AND_PROVENANCE/`: provenance hierarchy, original archive hashes, missing Gate1 record, new-default decisions, QA report and final approval boundaries.

## Nonnegotiable scope
One princess per run; 28 days with three daily slots; exactly seven visitable locations and eight training actions; 54 authored ordinary conversations and 23 pivotal/shared scene units; local-first IndexedDB save; one active run, three ending gallery entries; JSON export/import; read-only secondary tab; accessibility and responsive 320px viewport. No backend, authentication, commerce, achievements, inventory, equipment, combat, real AI dialogue, sound, extra character routes, new endings, or additional map nodes.

## Fonts
The approved **font family names** are Cormorant Garamond and Source Sans 3, but **font binaries are intentionally not distributed** here. Implementer must obtain fonts lawfully from their authoritative OFL sources during the build, preserve the applicable OFL license notices in the deployed app, use system fallbacks until obtained and not substitute proprietary fonts. Never assume fonts are present simply because the names are in this package.

## Acceptance checkpoint
This package is **not a claim that a running game has passed tests**. All gameplay integration, browser, performance, asset placement and accessibility checks must be executed by the coding agent. Agent should report failed checks and deviations, never claim they passed based on previous static-document validators.
