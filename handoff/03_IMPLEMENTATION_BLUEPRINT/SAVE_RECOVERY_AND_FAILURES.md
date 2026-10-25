# IndexedDB, recovery, concurrency and errors — binding integration contract

`CONFIRMED` sources require local save, one active run, unlocked ending gallery, JSON backups, atomic commits, migrations, read-only second tabs and no backend. This document supplies explicit **NEW v1.0 IMPLEMENTATION DEFAULTS** so an agent need not choose inconsistent behavior.

## Data layout and guarantees

IndexedDB database `royal-exceptions`, initial database version 1; stores `records` keys `active`, `previous_good`, `gallery` and `draft`, plus `meta` record. Each action commit is one readwrite transaction containing all changed committed data. `schemaVersion=1` is stored inside each exported document independent of IndexedDB database version. `saveRevision` begins zero and increases by precisely one per successful cost-bearing player action (including Rest) and by one per explicit new-run initialization or import replacement. Gallery unlock mutation is in same winning action transaction.

For every action, read and validate revision under the exclusive writer lock. Capture old committed snapshot into `previous_good` in the SAME transaction that replaces `active`. Write journal and other fields together in `active`; do not independently write a second action log that could diverge. On transaction abort, `active` and `previous_good` must remain at the pre-action values and the UI shows an error. If the app crashes between UI and commit, replay committed state and allow read-only draft continuation or discard; revalidate revision before action. Do not count a stored `draft` as a completed action. All action IDs are UUIDs and also journal IDs; applying the same `actionId` twice must be a no-op after first commit, not a second cost.

**Precise draft checkpoint default:** Draft stores `{actionId, startRevision, sceneId, originKind, progressLineIndex, selectedOriginChoiceId?, selectedProposalChoiceId?, stage:'intro'|'branch'|'linked_proposal'|'ready_to_commit', route, day, slot}`; no hearts/slot/journal. On reload if committed revision==startRevision and owner acquired, resume at stage, re-display only the required lines/choice; if newer revision or action ID is committed, clear stale draft and show committed result. If discard chosen, clear draft with no gameplay cost. No automatic reward from merely refreshing. A draft may be saved in its own IndexedDB transaction, since it has zero consequential changes.

## Writer lock

Use browser Web Locks API exclusive lock named `royal-exceptions-writer`. Hold for the active writable tab's lifetime, not just each individual action; other tabs display a clear **READ ONLY** status and can view committed state but not start/continue cost-bearing actions. If `navigator.locks` unsupported or storage access unavailable, show storage/lock diagnostics, allow read-only content/gallery if safe, but DO NOT proceed with writable gameplay or risky best-effort synchronization. User can close the active tab and request takeover; new writer re-reads latest `saveRevision`, validates and only then enables mutations. No cross-tab concurrent writers. A second tab must never overwrite the first tab's progress.

## Export

Export only a **fully committed** envelope as pretty UTF-8 JSON, with `{format:'royal-exceptions-save', schemaVersion:1, exportedAt:ISO8601, activeRun, completedGallery, integrity:{algorithm:'SHA-256', digest}}`. Digest calculation: SHA-256 of UTF-8 bytes of **canonical JSON of the object containing only `format`, `schemaVersion`, `activeRun`, `completedGallery`**, with deterministic recursive sorting of object keys and preserving array order. Exclude `exportedAt` and `integrity` from digest to allow reproducible fixtures. If no committed run exists, export valid empty `activeRun:null` and gallery. Export never includes draft, live lock token, user-external path, or tab-local preferences. Save backups are manual user-owned JSON downloads; no backend.

## Import

User explicitly chooses JSON; limit 5 MiB size, recursion depth <=32, no prototype pollution keys (`__proto__`, `prototype`, `constructor`) anywhere, no invalid float/NaN, no extra unknown top-level fields except `exportedAt`, no future schemaVersion, no negative/max-invalid states. Verify digest byte-for-byte with canonical serializer. Validate route IDs, 28-day range, stat map keys/values, per-stat partial progress, allowed stage/outcome combinations, scene/cursor IDs, journal length<=84, unique action IDs, each journal element consistent with its referenced approved action type and chronological order where possible. Reject invalid backup **without modifying a healthy existing save**; do not coerce an invalid save to a different game outcome. On preview show route, day, hearts, outcome, gallery and replace options. Request explicit `Replace active run` confirmation. Default merge gallery as union of valid existing+imported unlocks (never invent unearned unlocks). Commit new active and gallery atomically; keep current active as `previous_good`. If imported current active run has a different route, it replaces only after confirmation. A backup for newer schema is rejected with non-destructive message.

## Migrations

Only schema version 1 exists at launch. No fabricated legacy v0 content. Provide a registry of **pure schema migration functions** for future versions; on an imported v1 envelope validate before accepting. On future app updates, migrate transactionally with backup and test valid old-version fixtures before announcing support. Unsupported schema displays non-destructive error, not silent reset. If content IDs disappear in later releases, preserve canonical older IDs or implement a documented, tested migration; never reassign IDs.

## Corruption, quota, and rollback

On startup: try current active; if corrupted, do not automatically load corrupt fields, instead inspect `previous_good`. Show a recovery view previewing version and progression of both. Only on explicit user selection of a validated previous-good snapshot may it replace active. Invalid current + valid previous must not erase gallery. If both invalid, offer import or explicit new run after notice. Write/Quota/transaction errors must leave the current commit unchanged, show error code and actionable recovery text. `previous_good` is one prior committed state, not a multiple-slot cheat feature or an in-game rewind action.

## Named errors / UI semantics

| Code | Trigger | User-facing behavior |
|---|---|---|
| `ERR_STORAGE_UNAVAILABLE` | IndexedDB disabled/private quota unavailable | Cannot save progress; writable gameplay disabled; offer browser guidance |
| `ERR_LOCK_READ_ONLY` | Another tab holds writer lock | Read-only view; close writer and reload/take over safely |
| `ERR_LOCK_UNSUPPORTED` | Web Locks unavailable | Writable actions disabled rather than risk multiwriter |
| `ERR_SAVE_TRANSACTION` | Exception/abort on commit | No action awarded or time advanced; retry after storage health check |
| `ERR_SAVE_QUOTA` | Quota exceeded | Preserve existing save; suggest freeing browser storage/export last committed backup |
| `ERR_DRAFT_CONFLICT` | Resumed draft has stale revision | Return to new committed state; never double-award |
| `ERR_IMPORT_FORMAT` | Invalid JSON/type/size/depth | Reject backup without modifying current progress |
| `ERR_IMPORT_DIGEST` | Integrity digest mismatch | Reject backup, do not repair silently |
| `ERR_IMPORT_VERSION` | Future/unsupported schema | Reject backup with explanation |
| `ERR_IMPORT_STATE` | Invalid invariants/IDs | Reject backup with details but no stack trace |
| `ERR_IMPORT_CANCELED` | User cancels preview/confirmation | No persistent changes |
| `ERR_ASSET_LOAD` | Missing/corrupt static asset | Display accessible fallback label; don't invent alternative artwork |
| `ERR_CONTENT_MISSING` | Required canonical scene/branch cannot resolve | Block encounter action cost-free, log developer diagnostic, preserve save |

Map error codes to localized/safe plain-text strings authored by implementation (these are technical UI errors, not romantic narrative). All success/error alerts accessible through `role=alert` or equivalent live region. Never claim action saved unless transaction completed. On an error after the user picked a meaningful answer, the game must either resume uncommitted draft or safely replay, never silently consume slot without a journal.

## Confirmation boundaries

Requires confirmation: replace new run, import overwrite, restore previous_good, delete/wipe save, restart after failure. Gallery is independent of failed journal; failed run remains readable until confirmed replacement. Success ending gallery persists. No automatic recovery, no automatic new run, no server sync.
