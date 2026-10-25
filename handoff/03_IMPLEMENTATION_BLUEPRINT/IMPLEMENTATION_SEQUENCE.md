# Coding agent execution plan — outside this handoff artifact

**No game code is provided here.** These are the implementation phases for a fresh Goldfish.

1. **Unpack and verify** original archive hashes and `02_ART_ASSETS/asset_manifest.json`. Read COMPLETE_GAME_SPEC and approval precedence. Print a fixed inventory: 77 scenes, 28 art assets, eight training activities, seven locations, three routes. Fail setup if missing source.
2. **Project scaffold** strict React + TypeScript + Vite, static route only; lint/typecheck/unit/E2E runners and CI. Configure Cloudflare Pages static output with SPA fallback.
3. **Static content compiler** manually or automatically convert exact authored Markdown and annotations to immutable checked-in structured scene data with ID validation and source diff checks. All lines must survive round trip and some shared outcome IDs may legitimately repeat.
4. **Pure deterministic core** reducer/selector for time, actions, stats, flags, hearts, 54 conversations, special events, mandatory milestone, linked proposal, epilogue, terminal failure. Write reducer unit tests before UI.
5. **Persistence adapter** IndexedDB, transactional actions, revision checks, writer lock, reversible previous-good snapshot, draft recovery, JSON import/export + digest and bad-save errors. Test aborted transactions and competing tabs before connecting UI.
6. **Visual-novel UI** route/title/prologue, illustrated hub/scene/player text, 5-expression portrait map, choice/journal/calendar/help/gallery. Mobile 320px and accessibility from day one. Show save state precisely.
7. **Art integration** seven backgrounds and all original princess image sets. Use approved CG for each midpoint. Solve Nerelle Garden waterborne placement; use manual desktop/mobile screenshot acceptance. Avoid presenting old negative wireframes as canonical.
8. **Fixture execution** replay six witness streams via actual reducer, deterministic stat11-session plans, optional and proposal collision tests. Investigate failures; never edit canon as shortcut.
9. **Release quality** contrast/focus/reduced motion/zoom, browser storage and reload tests, asset optimization from copies, font OFL licenses, build smoke test, Cloudflare Pages manual deploy only after human approval.
10. **Final source+QA report** include exact commit, app screenshots (desktop and mobile), runtime evidence, failed tests, accessibility exceptions and any deviations. Request owner's acceptance before launch.

**Do not implement unapproved expansions**, and never fix a spec contradiction by silently rewriting approved prose. New v1.0 defaults in this package were introduced specifically to avoid arbitrary agent discretion; compare against original frozen sources when ambiguous. If a real contradiction exists, surface BLOCKER with precise file/section; create a small design decision request rather than guessing.
