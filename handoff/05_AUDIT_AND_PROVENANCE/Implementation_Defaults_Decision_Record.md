# Explicit new v1.0 implementation defaults — NOT retroactively approved Gate 1 decisions

These choices are provided to make a complete *buildable* handoff. They are not represented as original D-001..D-144 approvals. Source of authority is the user's instruction to **make an agent handoff that can be implemented**; conflicts with actual frozen canon remain blockers.

| ID | Explicit engineering default | Why fixed |
|---|---|---|
| NEW-01 | New run route/name chosen before zero-cost prologue, Day1 Monday morning | Deterministic initial state |
| NEW-02 | One-slot `Rest / Pass` action with one journal record, no rewards | Players otherwise cannot advance slots reliably |
| NEW-03 | Location browsing is free and time is spent only on valid actions | Preserves exactly-one-slot costs without hidden travel |
| NEW-04 | Ordinary vs eligible optional offered as explicit alternative; midpoint and marriage retry have priority | Prevents an agent inventing random scene selection |
| NEW-05 | Correct or normal wrong choice with projected post heart count reaching 20 triggers same-slot full proposal | Meets milestone-by-hearts rather than only correct-answer interpretation |
| NEW-06 | Block training stat already at cap at no cost | No fabricated benefit or wasted valid action |
| NEW-07 | One pending draft stored separately from committed state; abandoning draft zero cost; actionId idempotence | Crash/replay correctness |
| NEW-08 | When Web Locks unavailable or storage inaccessible, writable play disabled with explanation | Avoids unsafe dual writers and falsely confirmed saves |
| NEW-09 | v1 export has strict SHA-256 canonical JSON digest; import<=5MiB/depth32 and preserves gallery by union by default | Deterministic backup behavior and safety |
| NEW-10 | Recovery has one previous-good committed snapshot, user confirmation to restore | Atomic rollback, no invisible save rewind |
| NEW-11 | REST/terminal deadline after action; win at Day28 evening takes precedence over fail | Last-slot timing |
| NEW-12 | Ordinary cursor advances only on action commit; stage-specific U01..U06 then cycling F01..F03 | Deterministic replay/no dupes |
| NEW-13 | 320px content flows vertically, no text overlays covering choices; >=44px targets | Concrete mobile contract |
| NEW-14 | Nerelle Gardens: source-based water occlusion at right, or clearly nondiegetic framed close-up alongside visible canal; never a standing sprite on paving | Practical fallback for previously failed staging |
| NEW-15 | Humpty read-only free Help and Town Square quips cycle per session with no gameplay state | No new stat/quest/cost |
| NEW-16 | App uses one active run, gallery persists across reset; no clouds | Respects approved storage model |
| NEW-17 | Source Markdown compiled to static checked-in content module without altering wording, source hashes audited | Reproducible authored story |
| NEW-18 | Save error codes/UI copy from `SAVE_RECOVERY_AND_FAILURES.md`; not newly authored romance content | Avoids silently swallowing failures |
| NEW-19 | Pure schema version1 only at launch; reject nonexistent legacy/future versions; future migrations test-driven | Do not fabricate old saves |
| NEW-20 | Initial font family names approved; implementer obtains actual OFL binaries and notices lawfully, not inside this user artifact | Rights-compliant asset build |

**Owner review is recommended before public release.** Coding agent can implement these predictable defaults without requesting another 144-decision interrogation, but must raise any source conflict instead of overriding canon.
