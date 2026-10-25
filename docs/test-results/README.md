# Recorded test output

Captured in the authoring environment (Node 22, Chromium 153 via Playwright 1.63) on 2026-10-25.

| File | Command | Result |
|---|---|---|
| `preflight.txt` | source hashes, content check, art check, type-checks, esbuild build | all OK (UI type-check used a local React shim — see the report) |
| `unit.tap` | `npm test` | 128 tests, 128 pass, 0 fail |
| `browser.tap` | `npm run test:browser` (persistence + end-to-end on the built site) | 30 tests, 30 pass, 0 fail |

Re-run locally with `npm test` and `npm run test:browser` (after `npx playwright install chromium`).
