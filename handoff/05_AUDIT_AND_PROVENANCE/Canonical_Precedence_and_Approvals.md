# Historical approvals, canonical precedence, and limits

The original users' approvals in the conversation and their frozen source archives are authoritative; this ledger conveys those approvals to an agent who **will have no chat history**. Do not change immutable originals.

## Approval chronology and canon

- **Gate 1**: D-001 through D-144 were approved across the historic interactive design phase, but their complete primary verbatim register has not been recovered. Do **not** fabricate the original wording or present a reconstructed synopsis as the original decision log.
- **Tavri character-specific Gate 2 v1.0:** approved/frozen bible, 7 pivotal scenes, character sheet, 5 expression sprites, and Private Confession CG. Two originally provisional shared scenes included in Tavri narrative were later separately approved.
- **Nerelle Gate 2 v1.0:** approved/frozen bible, 7 pivotal scenes, character sheet, 5 expression sprites, and Forbidden Journey CG. Approved visual costume supersedes the conflicting practical/modest descriptive adjectives in the unchanged bible; she is permanently aquatic.
- **Kaedra Gate 2 v1.0:** approved/frozen bible v0.2, 7 pivotal scenes, character sheet, 5 expression sprites, Royal Trial CG. Approved artwork governs costume; bible/sheet govern wing and tail anatomy. Male figure in CG is noncanonical staging, NOT protagonist-gender canon.
- **Shared content:** `CORE-PRO-01` and `CORE-FAIL-01` separately approved verbatim, including courtship-season lore; not inserted into or rewriting any route archive.
- **Tavri external amendment:** exactly four changes to `TAV-EVT-POST-01`: `Unscripted Comedy Night`→`Unscripted Comedy`; `Royal Comedy Evening`→`Royal Comedy Showcase`; `brilliant tonight`→`brilliant on command`; `myself for an evening`→`myself for once`. This derives effective text, never alters frozen Tavri ZIP.
- **Cinematic interpretation:** moonlit Nerelle midpoint art, daytime Kaedra CG and static daylight locations may occur at other HUD time slots without changing schedule. Approved source graphics are the same; HUD day/slot is authoritative.
- **Seven backgrounds and Royal Exceptions visual system:** approved/frozen 7 exact original backgrounds, palette and font family names (Cormorant Garamond, Source Sans 3), editorial fantasy VN layout. Nerelle at Gardens **in canal water on right**, not dry terrace. Visual wireframe that shows Nerelle on paving is a failed counterexample.
- **54 ordinary conversations + support:** separately approved editorial v0.1, all content complete despite historic `UNAPPROVED` headings. 14 contextual Humpty Help strings, 12 Town Square quips, 8 training descriptions, 12 generic outcome/status strings, 14 UI strings.

## Precedence order

1. Explicit user approval decisions and narrowly scoped exceptions represented in source approval records; canonical authoring sources included here are frozen and shall not be modified.
2. Frozen source ZIPs `00_SOURCE_ORIGINALS/` for approved narrative/body/asset content; the original ZIP byte-for-byte SHA-256 file names and hashes are in `Original_Archive_Checksums.json`.
3. Approved overlays and shared documents in `01_APPROVED_CANON/` (the Tavri derived file is a faithfully patched **runtime convenience** source, the original archive is still authoritative for all unaffected bytes).
4. `03_IMPLEMENTATION_BLUEPRINT/COMPLETE_GAME_SPEC.md` as operational implementation contract. Its explicitly designated **NEW v1.0 IMPLEMENTATION DEFAULTS** fill specification holes but are NOT claims about absent historical Gate1 approvals.
5. `04_ACCEPTANCE_AND_FIXTURES/TEST_MATRIX.md` and noncanonical acceptance sketches; historical v0.1 candidates can inform tests but must not supersede confirmed canon.

If two pieces of *approved* content directly contradict and these precedence rules do not resolve, **block on the contradiction and report it**; do not use unstated conversation recollections or change character/final scene details. The user has requested a handoff capable of implementation, so routine defaults in the blueprint are specified rather than left to agent invention. The owner retains the right to revise them before deployment.

## Source members

All eight locked ZIPs are included unchanged. Every approved graphic has also been copied into `02_ART_ASSETS/` from its specific archive member, verified by its original SHA-256. All 77 full source scenes also exist in directly readable `01_APPROVED_CANON/scene_sections/`, and the consolidated originals in parent source files. Do not confuse a readable convenience copy with a license to rewrite a frozen archive.

## Explicit provenance limitation

`Gate1_Primary_Register_NOT_RECOVERED.csv` is a **gap ledger** with 144 row IDs, not a substitute for historical decisions. Existing Gate2 stories and technical summaries contain enough operational behavior to assemble a viable baseline, but independent reviewers should report any unreconciled contradictions. Missing historical provenance does **not** justify inventing extra features or treating previous proposals as historical user-approved decisions. If the owner later supplies D-001–D-144, compare it against new defaults, note every difference and request arbitration.
