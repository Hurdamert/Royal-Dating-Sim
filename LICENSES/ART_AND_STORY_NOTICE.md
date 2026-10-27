# Art and story notice

All story text, character designs, illustrations, backgrounds, expression
portraits, midpoint illustrations and character reference sheets in this
repository are **original project content for _Royal Exceptions_**, approved by
the project owner and preserved unchanged in `handoff/` (frozen source archives
and art originals with recorded SHA-256 hashes).

- They are not stock imagery and were not sourced from third parties.
- `public/art/*.webp` are re-encoded deployment copies of the approved originals
  (see `public/art/derived_manifest.json`); the originals remain the identity
  authority.
- At the owner's request (2026-10-25) the character images ship in an
  all-ages edit derived from those originals (`art-src/edited/`, made by
  `scripts/art/modest.py`): exposed skin below the chin is repainted as
  clothing, and Kaedra uses the alternate ash-silver hair and violet eyes from
  her bible. The character reference sheets are no longer shipped to players.
- Two midpoint illustrations whose originals show the princess lying down
  (Tavri's *Private Confession*, Nerelle's *Forbidden Journey*) were redrawn in
  seated/upright poses with an AI image editor, FLUX.1 Kontext [dev] by Black
  Forest Labs (Hugging Face Space), using the all-ages edit of each approved
  original as the reference. The editor's raw output, prompt, seed and settings
  are kept (`art-src/redrawn/`, `scripts/art/redraw/`), and `scripts/art/redraw.py`
  applies two small recorded corrections. FLUX [dev] Non-Commercial License v2.0
  §2(d): Black Forest Labs claims no ownership of outputs and permits their use
  "for any purpose (including for commercial purposes)"; §4(a)(i) is worded more
  narrowly, so review the license before any commercial release.
  https://bfl.ai/legal/non-commercial-license-terms
- Senna, the fourth princess, was added at the owner's request (2026-10-25;
  story in `content/routes/SEN/`). At the owner's request her five expression
  portraits were generated with AI image tools on Hugging Face Spaces: the
  neutral portrait with Qwen-Image (Qwen team, Apache-2.0), the other four as
  edits of it with FLUX.1 Kontext [dev] (license as above). Raw outputs,
  prompts, seeds and settings are kept in `art-src/routes/SEN/generated/`;
  `scripts/art/senna.py` removes the background at build time with the
  isnet-anime segmentation model. Her midpoint illustration is still a
  placeholder silhouette (`scripts/art/senna_placeholder.py`), labelled as one in the game.
- Music (`public/audio/`: the start-screen opening and loop, and "Enter the
  Town") was supplied by the project owner on 2026-10-25 and is shipped byte
  for byte; `src/audio/tracks.generated.ts` records each file's SHA-256.
- The shipped dialogue is the owner-requested revision in
  `content/revisions/dialogue-v2/`, layered on the frozen text.
- Rights are held by the project owner. No license to reuse the art or story is
  granted by this repository unless the owner states otherwise.

Fonts and software dependencies carry their own licenses: see
`public/licenses/THIRD_PARTY_NOTICES.txt` and, once fetched, `LICENSES/fonts/`.
