# Gate 2 — Visual System Candidate v0.1

**Status:** UNAPPROVED REVIEW CANDIDATE. Not canonical, not a game implementation, and not an amendment to any frozen character package.

## Baseline (approved, unchanged)
- Desktop-first, visual-novel-first TypeScript/React/Vite game; 320 CSS px mobile minimum.
- Large illustrated scene, character portrait, restrained top HUD, bottom dialogue/choice region; seven-location town hub.
- Anime-inspired fantasy with clean linework, controlled cel shading, painted fantasy settings and restrained colors; one elegant serif for display and one readable sans for dialogue/interface.
- WCAG 2.2 AA target, visible focus, semantic controls, screen-reader dialogue, motion reduction, no hover-only action.
- All images and fonts bundled; no runtime image/AI/CDN dependency. No audio in v1.
- In-progress encounters persist across read-only navigation. Status shows day/slot/route/hearts/save, with projected versus committed hearts distinguished.

## Proposed visual identity (requires user sign-off)
- **Working title:** *Royal Exceptions* — technical pun for the transported software engineer, with a serious-looking fantasy editorial typographic wordmark. This is a placeholder candidate, NOT new approved canon.
- **Title font:** Cormorant Garamond, semibold display only. **Dialogue/UI font:** Source Sans 3, regular and semibold. Bundle license notices and actual font assets from their authoritative releases before ship. Neither font file is included in this draft.
- **Palette tokens:** parchment `#F4EEE4`, paper `#FFFCF7`, ink `#262A31`, softened ink `#50545C`, dark glass `#222631E8` (for dialogue panels), border gold `#AD956F`, accent burgundy `#824C59`, hover burgundy `#693642`, focus ring `#217A89`. Route-accent overlays, not UI dominance: Tavri `#B46B47`, Nerelle `#287E88`, Kaedra `#9F4B4B`. Colors are candidates; verify text and interaction contrast numerically on actual screens.
- **Composition:** backgrounds fill upper stage; portraits are contained within stage and do not crop eyes/ears/horns at desktop. Dialogue dock is a restrained, legible near-opaque panel; no ornamental scrollwork behind text. No gradients used merely for decoration, glowing cards, generic icon mosaics or dashboard tiles.
- **Responsive candidate:** desktop >= 1024 CSS px, tablet 641-1023, phone 320-640; on phones stack compact HUD, constrained portrait stage, dialogue, then vertically flowing choices. Page horizontal overflow forbidden. Minimum height / landscape handling still require responsive mockup acceptance.
- **Interaction candidate:** 44x44 CSS px targets where practical, minimum 16px dialogue base text, readable line length, persistent error overlays with focus management. Avoid presenting importance by color alone.
- **Wordmark candidate:** typography only, no generated mascot or standalone logo symbol. Keep icon/favicon art out of current approval scope.

## Seven reusable background briefs (D-071 / G2-01)
All backgrounds are **one base painting per location**, landscape 16:9 candidate, with consistent eye-level camera, readable center or side for waist-up sprite overlay, and free of characters, readable signage, UI, text, watermarks, extra locations, or interactive objects. All are DRAFT candidate images pending individual approval.

1. `home` — protagonist’s modest rented fantasy room: books including a plainly decorative plain book without readable text, small desk, rolled exercise mat, old window; visual comedy from a makeshift magical-software-engineer workspace; no distinct extra gym/office/location.
2. `town_square` — friendly old-town civic plaza with cobbles, fountain, marketplace stalls, public noticeboard (unreadable); clear walking lanes and litter-cleaning context, space for text-only Humpty cameo; no extra economic system.
3. `royal_library` — airy palace library of towering shelves, reading desks, grand windows, a magical crystal/oracle orb embedded unobtrusively in a desk; a single room for books, oracle and Tavri visits.
4. `adventurers_guild` — timber and stone guildhall interior, padded training space and nonlethal training equipment, notice board without text; room for strength workouts and Kaedra meetings, no combat.
5. `palace_court` — stately fantasy royal courtyard or chamber with ceremonial dais, warm limestone archways, banners with nontext heraldry; enough free floor for ceremony and Kaedra’s small accidental magic flare; no new location for weddings.
6. `royal_gardens` — planted garden terrace with walkways, shade trees, flowers, accessible **visible canal edge**, wide safe steps and a waterside platform for Nerelle; open garden seating for Tavri/Kaedra and dogs. Canal is part of same location, not an eighth node.
7. `moonwater_quay` — stone public quay with steps/platforms down to broad moonlit water, harbor railings, small boats and distant palace coast; accessible for Nerelle and surface visitors, setting for surface-and-sea wedding, no separate festival location.

## Scene treatment and acceptance criteria
- BG images must share the same hand-painted anime fantasy illustration approach, coherent stone/architecture motifs, scale, perspective and restrained grading; variations in lighting are acceptable. No preplaced princess/protagonist to avoid identity mismatches and keep backgrounds reusable.
- Overlay test using a character sprite and bottom dialogue dock on a standard desktop scene and 320px mobile viewport; central subject remains visible, no critical art detail behind controls.
- Approved midpoint CG time-of-day lighting is cinematic; the game's HUD time remains authoritative.
- Optimize *derived* deployment copies after art approval; keep original image source files and frozen character packages unchanged, with manifest/checksums, readable asset descriptions, and attribution/license records.

## Outstanding approvals
- Working title/wordmark, typography pair, exact palette tokens and representative screen design.
- Each of seven background candidates; possible art refinements prior to freeze.
- No added Humpty sprite: text/help panel only unless separately approved.
- Ordinary content schema and style bible to be produced as a separate contract; all 54 ordinary entries may be authored by coding agent and editorially reviewed before release under D-080.
