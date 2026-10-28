# Senna — art record

The owner asked for Senna's art to be made with the Hugging Face image tools ("Use Hugging Face for this", 2026-10-25). This page records how it was made. The exact prompts, seeds, settings and hashes are in `art-src/routes/SEN/generated/SOURCES.json`; the raw outputs sit beside it, unchanged.

| Image | State | Made with |
|---|---|---|
| Five expression portraits | **Generated** (in the game) | Qwen-Image, then FLUX.1 Kontext [dev] edits |
| Milestone illustration "Lamplight in the Infirmary" | **Generated** (in the game) | FLUX.1 Kontext [dev] edit of the neutral portrait |

## Her look

- She is meant to read as clearly different from Tavri, Nerelle and Kaedra:
  - honey-blonde hair, swept back with no fringe, in a low bun;
  - a pencil, a sprig of rosemary and a small red rose in the bun;
  - round gold spectacles pushed up on her head;
  - grey eyes and a narrow face with straight brows.
- Her clothes: a plum velvet gown with a high collar, long puffed sleeves, gold buttons and gold leaf embroidery, under a canvas apron. The apron's pockets hold vials, twine and a notebook.
- She is all-ages: fully clothed, high collar, long sleeves.
- She must not resemble any existing franchise character. That rules out freckles and servant's clothes.

The rose was not asked for. Qwen-Image added it despite the negative prompt, and it is kept because it suits her.

## How the portraits were made

1. **Neutral, from text.** Qwen-Image (Space `mcp-tools/Qwen-Image`), seed 7731, 2:3. The full prompt and negative prompt are in `SOURCES.json`.
2. **The other four, as edits of the neutral.** FLUX.1 Kontext [dev], prompted to change only her expression. This keeps her face, hair and clothes identical. The annoyed and surprised edits were made with Space `mcp-tools/FLUX.1-Kontext-Dev`, with the reference URL and exact prompts recorded. For playful (seed 12) and worried (seed 13), the exact prompt wording and Space name were lost when the working session was summarised; `SOURCES.json` says so rather than guess.
3. **Rejected attempts, and why.** These are listed per image in `SOURCES.json`:
   - A toothy grin for playful.
   - Two near-neutral "annoyed" faces, and one shouting one.
   - Two "surprised" edits that zoomed the framing and thickened the line art.
4. **Cut-out.** `scripts/art/senna.py` does the rest:
   - removes the plain background with the isnet-anime segmentation model (the rembg project's GitHub release, hash-pinned);
   - trims the light fringe on the outline;
   - unmixes edge colours, so nothing cream shows on a dark stage;
   - resizes all five to 832×1248 (the editor's native size), so they share one frame.

Run `python3 scripts/art/senna.py --preview` to rebuild them and write review sheets to `art-src/preview/`, then `npm run art` to ship them.

## Checks made

- **Framing:** same crop and scale on all five. The script requires this; the review sheets show it.
- **Coverage:** nothing below the chin shows except her collar and sleeves.
- **Drawing errors:** none. There is one face, no stray marks, and no text artefacts. Her hands are out of frame.
- **Expressions:** all five are distinct, including annoyed (brows down, mouth closed) against worried (brows up, mouth open).

## How the illustration was made

FLUX.1 Kontext [dev] (Space `mcp-tools/FLUX.1-Kontext-Dev`), seed 31, guidance 2.5, 20 steps. The input was `art-src/routes/SEN/generated/lamplight.input.png`: the neutral portrait on a plain 4:3 canvas, so the editor returns a 4:3 scene. It was public at
`https://raw.githubusercontent.com/Hurdamert/Royal-Dating-Sim/main/art-src/routes/SEN/generated/lamplight.input.png`.

> Show her seated at a wooden infirmary worktable in warm lamplight at night, sorting dried herbs into small glass jars, shelves of jars behind her, her spectacles on her nose, a small tired smile. Keep her face, hair, rose, pencil and clothes the same. Wide 4:3 scene, same painterly anime style, fully clothed.

The first try was kept:

- She sits on a chair at the worktable, packing dried herbs into jars, with a wall lamp and shelves of jars behind her.
- Her face, hair, rose, rosemary, pencil and gold-embroidered plum gown match the portraits.
- Her eyes read amber in the warm light.
- She kept her spectacles pushed up in her hair, as in every portrait, instead of on her nose.

Checks: she is fully clothed; both hands are drawn correctly; the notebook on the table has only faint illegible scribbles, no readable text. The editor's 1168×880 is within 1% of 4:3, so it ships as made.

Before that, FLUX.1 schnell (the quick text-only model) was tried while the editor's free GPU allowance was used up. It was rejected because, without the reference picture, it gave her a fringe, amber or blue eyes and a second pair of glasses.

The illustration took two extra days because of that allowance. Each Kontext edit asks for about 90 seconds of the free account's small daily ZeroGPU allowance.
