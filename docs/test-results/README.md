# Recorded test output

Captured in the authoring environment (Node 22, Chromium 153 via Playwright 1.63) on 2026-10-25.

| File | Command | Result |
|---|---|---|
| `preflight.txt` | source hashes, content check, art check, type-checks, esbuild build | all OK (UI type-check used a local React shim — see the report) |
| `unit.tap` | `npm test` | 112 tests, 112 pass, 0 fail |
| `browser.tap` | `node --test --test-concurrency=1 tests/browser/persistence.test.mjs tests/browser/e2e.test.mjs` | 23 tests, 23 pass, 0 fail |

Re-run locally with `npm test` and `npm run test:browser` (after `npx playwright install chromium`).
