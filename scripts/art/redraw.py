"""Seated midpoint illustrations (owner request 2026-10-25: "redraw the art to make them seated").

Tavri's *Private Confession* and Nerelle's *Forbidden Journey* originally show the
princess lying on her front. They were repainted in seated/upright poses with the
FLUX.1 Kontext [dev] image editor (Hugging Face Space black-forest-labs/FLUX.1-Kontext-Dev),
using the all-ages edit of each original as the reference picture. The editor's raw
outputs are kept unchanged in art-src/redrawn/*.generated.webp; scripts/art/redraw/<id>.json
records the reference, prompt, seed and settings for each.

This script makes the small corrections the editor could not do in the same session
and writes the final 1448x1086 images to art-src/redrawn/<id>.png:

  * Tavri: the editor drew a second piece of fox tail on her left. Canon gives her one
    tail, so that piece is removed and the pool water and stone rim behind it rebuilt.
  * Nerelle: lilac shell-cup shapes sat on the front of her blouse; they are repainted
    as plain blouse fabric.

  python3 scripts/art/redraw.py      # rewrite art-src/redrawn/*.png and record hashes

scripts/art/modest.py then ships these files verbatim in place of an edit.
"""
import hashlib, json, os, sys
import numpy as np
import cv2
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
REC_DIR = os.path.join(ROOT, 'scripts/art/redraw')
OUT_DIR = os.path.join(ROOT, 'art-src/redrawn')
SLOT = (1448, 1086)   # every midpoint illustration slot


def sha(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()


def channels(im):
    hsv = cv2.cvtColor(im, cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
    return hsv[..., 0] * 360 / 256, hsv[..., 1] / 255, hsv[..., 2] / 255


def tavri_one_tail(im):
    """Remove the stray tail piece left of Tavri's robe; rebuild water and rim behind it."""
    H, W = im.shape[:2]
    h, s, v = channels(im)
    water = (h > 160) & (h < 215) & (s > 0.3)
    refl = (v > 0.5) & (s < 0.55) & (h > 25) & (h < 80)
    # Everything left of this hand-traced robe/sleeve outline is pool, rim or tail.
    outline = [(165, 512), (380, 512), (374, 537), (370, 552), (355, 562), (345, 569), (332, 575), (324, 587),
               (319, 601), (307, 605), (295, 609), (285, 612), (280, 620), (276, 632), (272, 640), (266, 652),
               (256, 664), (250, 676), (244, 690), (165, 690)]
    left = np.zeros((H, W), np.uint8)
    cv2.fillPoly(left, [np.array(outline, np.int32)], 1)
    left = cv2.erode(left, np.ones((3, 3), np.uint8))
    # The pool rim's top edge y = E(x), measured on clean water left of the tail.
    xs, es = [], []
    for x in range(8, 175, 2):
        col = water[600:720, x]
        for y in range(5, 115):
            if col[y - 5:y].all() and not col[y:y + 6].any():
                xs.append(x); es.append(600 + y); break
    coef = np.polyfit(xs, es, 2)
    E = lambda x: np.polyval(coef, x)
    yy, xx = np.mgrid[0:H, 0:W]
    above = yy < E(xx) - 1
    tailc = (h >= 6) & (h <= 26) & (s > 0.45)
    stone = (s < 0.32) & (v > 0.18) & ((h > 290) | (h < 45))
    m = (left > 0) & ((above & ~water & ~refl & ~(stone & (yy < 530))) | (~above & tailc))
    m = cv2.dilate(m.astype(np.uint8), np.ones((3, 3), np.uint8)) & left
    n, lab, st, _ = cv2.connectedComponentsWithStats(m, 8)
    m = np.isin(lab, [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] >= 12]).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    grow = cv2.dilate(m, np.ones((9, 9), np.uint8)) & (above & (left > 0)).astype(np.uint8)
    m = (cv2.dilate(m, np.ones((3, 3), np.uint8)) | grow) & left
    # Refill from plain water just left of the tail, mirrored back and forth (no seams).
    # Rows near the rim follow its curve so the stone edge continues.
    out = im.copy()
    X0, X1 = 140, 182
    span = X1 - X0
    for y, x in zip(*np.nonzero(m)):
        r = y - E(x)
        p = (x - X1) % (2 * span)
        xsrc = X1 - p if p < span else X1 - (2 * span - p)
        follow = float(np.clip((r + 30) / 18, 0, 1))
        ysrc = int(round(y + follow * (E(xsrc) - E(x))))
        out[y, x] = im[min(max(ysrc, 0), H - 1), xsrc]
    # Match the fill's local tone to the surrounding water where enough of both is nearby.
    valid = (water & (m == 0) & (left > 0)).astype(np.float32)
    mf = m.astype(np.float32)
    f = out.astype(np.float32)
    sig = 16
    wv = cv2.GaussianBlur(valid, (0, 0), sig)
    wf = cv2.GaussianBlur(mf, (0, 0), sig)
    tone_o = cv2.GaussianBlur(im.astype(np.float32) * valid[..., None], (0, 0), sig) / np.maximum(wv, 1e-3)[..., None]
    tone_f = cv2.GaussianBlur(f * mf[..., None], (0, 0), sig) / np.maximum(wf, 1e-3)[..., None]
    conf = (np.clip(wv / 0.15, 0, 1) * np.clip(wf / 0.15, 0, 1))[..., None]
    corr = np.clip(tone_o - tone_f, -30, 30) * conf * above[..., None]
    f = np.where(mf[..., None] > 0, f + corr, f)
    out = np.clip(f, 0, 255).astype(np.uint8)
    d = cv2.distanceTransform(m, cv2.DIST_L2, 3)
    blur = cv2.GaussianBlur(out, (0, 0), 1.0)
    w = (np.clip(1 - d / 2.5, 0, 1) * (m > 0))[..., None]
    return (out * (1 - w) + blur * w).astype(np.uint8), int(m.sum())


def local_mean(img, weight, sigmas=(9, 18, 36, 72, 144), min_w=0.05):
    """Weighted local average over pixels where weight>0, widening the radius only
    where too few are nearby (so a large hole never averages to black)."""
    img = img.astype(np.float32); weight = weight.astype(np.float32)
    out = np.zeros_like(img); done = np.zeros(weight.shape, bool)
    for sg in sigmas:
        wb = cv2.GaussianBlur(weight, (0, 0), sg)
        vb = cv2.GaussianBlur(img * weight[..., None], (0, 0), sg)
        ok = (wb > min_w) & ~done
        out[ok] = vb[ok] / wb[ok][..., None]
        done |= ok
    if not done.all():
        out[~done] = (img * weight[..., None]).sum((0, 1)) / max(weight.sum(), 1)
    return out


def nerelle_plain_blouse(im):
    """Repaint the lilac shell shapes on the front of Nerelle's blouse as plain fabric."""
    H, W = im.shape[:2]
    h, s, v = channels(im)
    area = np.zeros((H, W), np.uint8)
    cv2.fillPoly(area, [np.array([(290, 450), (680, 450), (680, 615), (290, 615)], np.int32)], 1)
    lilac = (h >= 232) & (h <= 340) & (s > 0.035) & (v > 0.45)
    keep = ((h < 70) & (s > 0.18) & (v > 0.3)) | ((h > 185) & (h < 232) & (s > 0.22))   # gold, gems, hair
    m = ((area > 0) & lilac & ~keep).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m, 8)
    m = np.isin(lab, [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] >= 6]).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    near = cv2.dilate(m, np.ones((13, 13), np.uint8)) > 0
    highlight = (v > 0.8) & (s < 0.07)
    pink = ((h > 325) | (h < 18)) & (s > 0.04) & (s < 0.35) & (v > 0.6)
    dark = (v < 0.5) & ~((h > 185) & (h < 232) & (s > 0.22))
    m = (m > 0) | (near & (highlight | pink | dark) & ~keep)
    m = cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    m = cv2.dilate(m, np.ones((3, 3), np.uint8)) & area & (~keep).astype(np.uint8)
    blouse = ((h > 155) & (h < 192) & (s > 0.04) & (s < 0.16) & (v > 0.6) & (m == 0)).astype(np.float32)
    avg = local_mean(im, blouse)
    lum = cv2.cvtColor(im, cv2.COLOR_RGB2GRAY).astype(np.float32)
    lum_ref = cv2.cvtColor(np.clip(avg, 0, 255).astype(np.uint8), cv2.COLOR_RGB2GRAY).astype(np.float32)
    shade = np.clip((cv2.GaussianBlur(lum, (0, 0), 6) - lum_ref) * 0.25, -10, 10)
    fill = np.clip(avg + shade[..., None], 0, 255)
    d = cv2.distanceTransform(m, cv2.DIST_L2, 3)
    w = np.clip(d / 1.5, 0, 1)[..., None] * (m[..., None] > 0)
    out = im.astype(np.float32) * (1 - w) + fill * w
    return np.clip(out, 0, 255).astype(np.uint8), int(m.sum())


FIXES = {
    'tavri_tavri_private_confession': tavri_one_tail,
    'nerelle_nerelle_forbidden_journey': nerelle_plain_blouse,
}


def to_slot(im):
    """Trim to exactly 4:3 (centred) and scale to the illustration slot."""
    H, W = im.shape[:2]
    th = round(W * SLOT[1] / SLOT[0])
    top = (H - th) // 2
    return Image.fromarray(im[top:top + th]).resize(SLOT, Image.LANCZOS)


def main():
    for asset_id, fix in FIXES.items():
        rec_path = os.path.join(REC_DIR, f'{asset_id}.json')
        rec = json.load(open(rec_path))
        gen = os.path.join(ROOT, rec['generated']['file'])
        if sha(gen) != rec['generated']['sha256']:
            sys.exit(f'{asset_id}: generated image does not match its recorded hash')
        im = np.array(Image.open(gen).convert('RGB'))
        fixed, px = fix(im)
        dst = os.path.join(OUT_DIR, f'{asset_id}.png')
        to_slot(fixed).save(dst, optimize=True)
        rec['result'] = {'file': os.path.relpath(dst, ROOT), 'sha256': sha(dst), 'size': list(SLOT), 'pixelsCorrected': px}
        with open(rec_path, 'w') as f:
            json.dump(rec, f, indent=2, ensure_ascii=False)
            f.write('\n')
        print(asset_id, 'corrected px', px, '->', rec['result']['sha256'][:12])


if __name__ == '__main__':
    main()
