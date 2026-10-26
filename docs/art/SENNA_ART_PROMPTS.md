# Senna — art prompts

Senna's route ships with placeholder silhouettes (`art-src/routes/SEN/`, status `placeholder`) until her real art is made. These prompts produce the six images her slots need. Use them with the Hugging Face image tools once they're enabled for Claude, or with any image tool.

## Her look

- She must read as clearly different from Tavri, Nerelle and Kaedra. The owner noted the three faces look alike, so give her:
  - a narrower face with straight brows;
  - a small mole under her left eye;
  - round spectacles.
- She is all-ages: fully clothed, high collar, long sleeves.
- She must not resemble any existing franchise character. That rules out freckles and servant's clothes.

## 1. Neutral portrait

Generate from text first, so her face is her own.

> Anime visual-novel character portrait, waist-up, facing the viewer, plain pale background. A young adult princess apothecary with a narrow face, straight brows and a small mole under her left eye; hazel-grey eyes; a calm, slightly unimpressed expression. Honey-blonde hair in a messy low bun with a pencil and a sprig of rosemary pushed through it; round wire spectacles pushed up on top of her head. She wears a high-collared, long-sleeved plum dress under a canvas apothecary's apron with many labelled pockets holding small glass vials, twine and a notebook. Fully clothed, high neckline, long sleeves, wholesome, suitable for all ages. Painterly anime style, soft lighting, clean line art.

## 2. The other four expressions

Edit the neutral portrait, for example with FLUX.1 Kontext, and keep everything else identical:

- **PLAYFUL:** "Change only her expression: a small, dry, amused smile with one eyebrow raised."
- **WORRIED:** "Change only her expression: brows drawn together, lips pressed, a concerned look."
- **ANNOYED:** "Change only her expression: a flat, unimpressed stare, mouth tight."
- **SURPRISED:** "Change only her expression: eyes wide, lips parted, spectacles slipping down her forehead."

Then remove the background (the `not-lain/background-removal` Space), so each portrait has a transparent background. Keep the frame and scale identical across all five.

## 3. Milestone illustration: "Lamplight in the Infirmary"

Edit the neutral portrait into a scene:

> Show her seated at a wooden infirmary worktable in warm lamplight, sorting dried herbs into labelled glass jars, shelves of jars behind her, spectacles on her nose, a small tired smile. Keep her face, hair and clothes the same. Wide 4:3 landscape scene, same painterly anime style. Fully clothed, all ages.

## Checks before swapping in

- **Five portraits:** 1024×1536 or larger, 2:3, transparent background, same crop and scale. The illustration: 1448×1086 (4:3).
- **Coverage:** no exposed skin below the chin apart from her hands.
- **Drawing errors:** none. Five fingers, one face, no stray limbs, no text artefacts.

## Swapping in

1. Put the six PNGs in `art-src/routes/SEN/` under the same file names.
2. Record each file's tool, prompt, seed and hash in `ART.json`, and set `"status": "generated"`.
3. Set `ART_PLACEHOLDER` in `src/ui/labels.ts` to `{}`, and update `CG_ALT.SEN` so it no longer says placeholder.
4. Run `npm run art`. The route test checks that the alt text matches the art status.
