# Character art redesign brief (for an artist or image tool)

**Owner request (2026-10-25).** The owner asked for three things:

- The art should be "the most conservative it can be", safe for all ages, with all skin covered.
- Kaedra should be more distinct from Tavri.
- The three princesses' face structures should no longer look alike.

**What the game ships today.** It uses an *edited* derivative of the approved art (`scripts/art/modest.py`):

- Skin below the chin is repainted as clothing.
- Kaedra has the alternate ash-silver hair and violet eyes from her bible.
- Nerelle is shown shoulder-deep in water.

Editing can't change face structure. New artwork can. This brief is what to commission.

## Deliverables (same slots as today, so they drop in without code changes)

| Set | Count | Format |
|---|---|---|
| Expression portraits: NEUTRAL, PLAYFUL, WORRIED, ANNOYED, SURPRISED, for each princess | 15 | 1024×1536 PNG, transparent background, waist-up, the same crop and scale for all 15 |
| Midpoint illustrations: Tavri *Private Confession*, Nerelle *Forbidden Journey*, Kaedra *Royal Trial* | 3 | 1448×1086 PNG |
| Character reference sheets | 3 | Any size, for consistency only (not shown in game) |

- Keep a princess's pose and costume identical across her five expressions. Only the face, and optionally the hands, should change.
- Nerelle's portraits only need to be correct down to her collarbone, because the game shows her in water from there down.
- Leave a generous margin at the frame edges.

## Wardrobe (all three)

- High collar to the jaw, and sleeves to the wrist. No bare shoulders, back or midriff, no neckline cut-outs, and no sheer fabric over skin.
- The silhouette is fitted but not tight. Capes, mantles and layered robes are welcome. Hands and face are the only skin shown.
- Nothing wet-look or clinging, including in Nerelle's water scenes. Her clothes are water-friendly: a fitted, long-sleeved royal top in pearl and ocean blue, with shell and pearl details over it.

## Faces: make them readable apart in silhouette and at thumbnail size

| | Tavri (24, fox) | Nerelle (23, mermaid) | Kaedra (26, dragon) |
|---|---|---|---|
| Face shape | Heart-shaped. Small, pointed chin. | Long oval. Soft, rounded jaw. | Angular. Square jaw, high defined cheekbones. Visibly the oldest. |
| Eyes | Large, upturned outer corners, mischievous. Amber. | Round and wide-set, with slightly downturned outer corners. Sea-glass blue. | Narrow and level, with heavy upper lids. Smoky violet. |
| Brows | Thin and very mobile (they do half her acting). | Soft and straight. | Thick, straight, low. |
| Nose and mouth | Small upturned nose. Wide smile that shows teeth when playful. | Small straight nose. Small, closed-mouth smile. | Longer, straight nose bridge. Thin mouth; her smile is mostly in the eyes. |
| Hair | Copper, voluminous, wavy, plus fox ears. | Midnight blue, long, loose, with fin-like ears. | Ash-silver, braided back from the horns. |
| Signature detail | Freckles across the nose (optional, owner to approve). | A pearl clasp, always on the left. | Small matte scales at the temples (optional, owner to approve; her bible places scales on the shoulders and forearms). |
| Default expression | Amused, mid-thought. | Attentive and curious. | Composed, unreadable. Never scowling. |

## Canon to keep

These come from the character bibles in `handoff/01_APPROVED_CANON/`.

- **Tavri:** one large fluffy fox tail, fox ears, and a human face with no muzzle.
- **Nerelle:** always a single continuous fish tail, never legs, and she is always in water.
- **Kaedra:**
  - two dark bronze-black horns, folded membrane wings and one ridged tail;
  - an armoured court gown in charcoal and bronze; the violet and silver can replace the old garnet;
  - no combat poses;
  - in the *Royal Trial* illustration, her magic is a small spark, not a blast.
- **Midpoint illustrations:** the composition notes in each bible still apply, for example the protagonist's figure in the *Royal Trial* is not gendered canon. The owner asked (2026-10-25) that **no illustration shows a princess lying down**; each one sits upright:
  - *Private Confession:* Tavri sits on the rim of the garden fountain at night, upright, one hand at her collar, tail curled beside her.
  - *Forbidden Journey:* Nerelle sits on the bottom canal step under the moon, upright, with her tail in the water.
  - *Royal Trial:* Kaedra stays in the court scene. If she is drawn on the ground, she kneels or sits upright.
  - Until new art arrives, the game shows Tavri's and Nerelle's illustrations as close-ups that leave the lying-down pose out of frame (`reframe` in their specs).

## How to drop new art in

1. The owner approves the new set.
2. Record it as a new approved art revision. Keep the old originals in `handoff/`; they stay frozen.
3. Put the files in `art-src/edited/` under the same asset IDs, and update `art-src/edited/EDITS.json` with the hashes.
4. Run `npm run art`. The stage code needs no changes, apart from re-checking Nerelle's waterline in `src/ui/staging.ts`.
