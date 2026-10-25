# UI, presentation, accessibility and approved graphics

## Approved direction and source

The final visual direction is the **approved** `01_APPROVED_CANON/visual.md` even though its historic header says candidate. Working/approved title is **Royal Exceptions**. Heading typeface Cormorant Garamond; dialogue and UI Source Sans 3. Palette includes parchment `#F4EEE4`, paper `#FFFCF7`, ink `#262A31`, softened ink `#50545C`, dark glass `#222631E8`, decorative gold `#AD956F`, burgundy `#824C59`, burgundy hover `#693642`, focus teal `#217A89`, route accents Tavri `#B46B47` / Nerelle `#287E88` / Kaedra `#9F4B4B`. These are approval-source tokens; do not use pale gold as ordinary text on parchment (known contrast failure). Font binaries intentionally excluded from user-facing ZIP; implementation obtains licensed sources, packages licenses, adds fallback styles.

Use seven backgrounds exact originals, proportion ~16:9; portraits are transparent 1024×1536 or equivalent as checked in metadata. Main art and princess take stage priority. Dialogue at bottom or below stage is high-contrast near-opaque. No generic dashboard, colorful card grid, overdone glassmorphism, AI-generated in-game prose, animated gradients, gradient-only meaning, or new UI mascot. Humpty is text-only.

## Responsive layout acceptance

**Desktop 1280x850 CSS px:** top HUD (route, Day X/28, weekday, time slot, half-heart counter, four stats and save status) compact 56-76 px. A large landscape scene stage, ideally 16:9, occupies most width. Character portrait contained without severing face/horns/ears; dialogue dock below or overlay at bottom with ~16-18px readable text and speaker label; choices below, buttons >=44 CSS px high. Stable keyboard focus order header→stage dialogue→choices→free navigation. Sticky controls must not occlude all choices. Journal, calendar, save, help and hub accessible by labeled controls.

**320x740 CSS px:** compact two-row HUD, background scene is a separate scroll-safe 16:9-ish stage (not forced full-page crop), princess close-up portrait scaled with face/ear/horn visible. Dialogue and vertically stacked choices placed below stage in document flow (not behind fixed footer), min 16px text; page scrolls normally; no horizontal overflow, no clipped long source dialogue, choices at least 44px touch height; portrait never covers text. At 200% zoom/320 width, the scene may take less space but text remains readable; large UI may scroll vertically. Minimum document 320 px, do not auto-shrink font sizes to fit.

**Fallback breakpoints NEW DEFAULT:** 0–640px phone, 641–1023 tablet, >=1024 desktop. Scene fit `object-fit: cover` for backgrounds only when safe, portrait `contain` or constrained mask; test focus/landmark structure at each. No landscape-only assumption. All seven backgrounds need visible preview by visiting hub. Save/lock/invalid-action alerts announced in accessible live region.

## REQUIRED Nerelle Garden compositing (previous mockups fail)

The Garden art's real canal occupies the far right; the previously included desktop/mobile reference shots made Nerelle look as if standing on **dry terrace**, so **those examples are historical NEGATIVE fixtures**, not shipping reference layouts. Approved BG-PRES-02 binds her to **visible water at screen-right**. Implement one of these equivalent safe renderings without creating or changing source art:

1. Preferred: use a foreground canal-water occlusion mask derived **only from pixels of the approved bg_royal_gardens.png**, stage the approved Nerelle portrait above the canal at far-right, occlude her sprite below its waterline with a foreground water layer, and ensure full displayed lower body does not seem to stand on terrace. At mobile width show the right-side canal in the selected background crop; portrait and canal must be visibly aligned. No new mermaid legs.
2. If responsive geometry makes the above unconvincing, use an explicitly **non-diegetic framed bust close-up** of the approved Nerelle sprite, together with a still-visible canal on the RIGHT and a readable location label 'Royal Gardens — Canal'; this conveys a speaker portrait, not an assertion that she physically stands on dry stone. Her narrative text remains waterborne. Avoid blending the bust's lower boundary with pavement. This fallback is a new v1.0 display-engineering default, *not a new character or story design*.

Both layouts MUST pass a 320x740 and 1280x850 manual visual acceptance review; if the team cannot stage Nerelle waterborne convincingly, mark the build visually blocked and obtain owner approval rather than silently depicting her upright on land. The same Nerelle rule at Moonwater Quay; allow ship-offside canal framing, no animation required. Art daylight and night mismatch is approved as cinematic; actual day/slot HUD authoritative. Kaedra's wings/tail and Nerelle's mermaid anatomy remain canon even if an approved portrait close-up omits them from frame. Do not invent a specific protagonist sprite.

## WCAG 2.2 AA verification

Test text >=4.5:1 normal and >=3:1 large; non-text meaningful boundaries/controls >=3:1 where applicable. Focus ring clearly visible; keyboard navigate all controls with Tab/Shift+Tab, Enter/Space; Escape closes dialogs and returns focus; modal confirmations trap focus. Screen-reader labels for sprite, CG, calendar cells, current day/slot, relationship, active stat training sessions, confirmation and destructive actions; scene text exposed in accessible order and new dialogue lines announced without re-reading complete page. Aria-labels reflect speaker. Reduced motion disables optional transitions; no timed choice pressure; no hover-only controls. No horizontal scroll 320, at 200% zoom, or with OS large text; overflow scrolls vertically. High contrast and forced colors test. Do not rely on gold-only hint for selected answer. Performance: lazy-load images for inactive route; keep dialogue responsive on low-end device; include descriptive alt text without spoiling future scenes.

## Graphics handling and rights

Use `02_ART_ASSETS/asset_manifest.json` for exact source paths and image hashes; never fetch different images at runtime. Build optimized WebP/AVIF deployment copies as needed, but preserve original png files unchanged inside source repository/handoff. Test renders against canonical originals. Provide copyright notices for original generated project art; avoid implying source images came from third-party stock. Font license files must be obtained from the authoritative publisher at implementation time, and packaged with actual fonts. No font binaries in this handoff.

## Acceptance of screen mockups

`04_ACCEPTANCE_AND_FIXTURES/Desktop_1280x850_LAYOUT_CANDIDATE.png` and `Mobile_320x740_LAYOUT_CANDIDATE.png` are historical wireframe candidates and **specifically fail Nerelle placement**. They are included as noncanonical counterexamples to prevent accidental copying, not approval authority. The written constraints above and canon artwork supersede them. Implementer must generate actual final app screenshots for owner review, without requiring full-game programming to prove asset format.
