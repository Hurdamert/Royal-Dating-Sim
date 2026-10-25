"""All-ages wardrobe edit for the approved character art (owner request 2026-10-25).

Reads the frozen originals in handoff/02_ART_ASSETS (never writes there) and,
following the hand-placed regions in scripts/art/modest/<asset_id>.json, repaints
exposed skin below the chin as garment fabric: high collars, covered shoulders,
chests and arms, long sleeves. Faces, hands, hair, jewellery and the original
line art stay untouched. Optional palette shifts (Kaedra's approved alternate
ash-silver hair and violet eyes) are applied from the same spec.

  python3 scripts/art/modest.py            # write art-src/edited/*.png
  python3 scripts/art/modest.py --preview  # also write side-by-side previews

The edited PNGs are checked in; scripts/optimize-art.mjs derives the shipped
WebP files from them and records both hashes in public/art/derived_manifest.json.
"""
import hashlib, json, os, sys
import numpy as np
import cv2
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SPEC_DIR = os.path.join(ROOT, 'scripts/art/modest')
OUT = os.path.join(ROOT, 'art-src/edited')


def hsv_of(rgb):
    hsv = cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
    return hsv[..., 0] * 360.0 / 256.0, hsv[..., 1] / 255.0, hsv[..., 2] / 255.0


def poly_mask(shape, polys):
    m = np.zeros(shape[:2], np.uint8)
    for p in polys:
        cv2.fillPoly(m, [np.array(p, np.int32)], 255)
    return m > 0


def skin_like(rgb, rule):
    if 'bands' in rule:
        h, s, v = hsv_of(rgb)
        out = np.zeros(h.shape, bool)
        for b in rule['bands']:
            out |= (h >= b['h'][0]) & (h <= b['h'][1]) & (s >= b['s'][0]) & (s <= b['s'][1]) & (v >= b['v'][0]) & (v <= b['v'][1])
        for b in rule.get('not', []):
            out &= ~((h >= b['h'][0]) & (h <= b['h'][1]) & (s >= b['s'][0]) & (s <= b['s'][1]) & (v >= b['v'][0]) & (v <= b['v'][1]))
        return out
    h, s, v = hsv_of(rgb)
    lo, hi = rule.get('hue', [0, 34])
    hue_ok = ((h >= lo) & (h <= hi)) | (h >= rule.get('hueWrap', 338))
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    return hue_ok & (s >= rule.get('sMin', 0.08)) & (s <= rule.get('sMax', 0.5)) & (v >= rule.get('vMin', 0.3)) & (r >= g)


def masked_blur(values, mask, sigma):
    m = mask.astype(np.float32)
    num = cv2.GaussianBlur(values * m, (0, 0), sigma)
    den = cv2.GaussianBlur(m, (0, 0), sigma)
    return np.where(den > 1e-3, num / np.maximum(den, 1e-3), values)


def cover(img, alpha, edit):
    rgb = img.astype(np.float32)
    zone = poly_mask(rgb.shape, edit['zones'])
    if edit.get('keep'):
        zone &= ~poly_mask(rgb.shape, edit['keep'])
    mask = zone & skin_like(rgb, edit.get('skin', {})) & (alpha > 8)
    if edit.get('solid'):
        # Regions painted as fabric whatever their colour (e.g. a sheer drape over skin).
        solid = poly_mask(rgb.shape, edit['solid']) & (alpha > 8)
        if edit.get('keep'):
            solid &= ~poly_mask(rgb.shape, edit['keep'])
        mask |= solid
    m8 = mask.astype(np.uint8)
    m8 = cv2.morphologyEx(m8, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
    ck = edit.get('close', 7)
    if ck:
        m8 = cv2.morphologyEx(m8, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (ck, ck)))
    # Grow one pixel into the anti-aliased rim so no skin-coloured halo remains.
    m8 = cv2.dilate(m8, np.ones((3, 3), np.uint8)) & zone.astype(np.uint8) | m8
    mask = m8 > 0
    lum = 0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]
    broad = masked_blur(lum, mask, edit.get('shadeSigma', 14))
    ref = np.percentile(broad[mask], 90) if mask.any() else 1.0
    shade = np.clip(broad / max(ref, 1.0), 0.0, 1.15)
    base = np.array(edit['fabric'], np.float32) / 255.0
    lo, hi = edit.get('shadeRange', [0.55, 1.0])
    k = lo + (hi - lo) * shade
    fabric = np.clip(base[None, None, :] * k[..., None] * 255.0, 0, 255)
    if edit.get('fold', 0):
        # Faint vertical drape so the new cloth does not read as a flat fill.
        yy, xx = np.mgrid[0:rgb.shape[0], 0:rgb.shape[1]]
        fold = 1 + edit['fold'] * np.sin(xx / 9.0 + np.sin(yy / 40.0) * 2.0)
        fabric = np.clip(fabric * fold[..., None], 0, 255)
    soft = cv2.GaussianBlur(mask.astype(np.float32), (0, 0), 0.8)
    soft = np.where(mask, np.maximum(soft, 0.85), soft)
    # Fade out towards the zone's outer edge so a zone that ends inside existing
    # light-coloured cloth leaves no visible seam (keep-region edges stay hard).
    feather = edit.get('zoneFeather', 16)
    if feather:
        dist = cv2.distanceTransform(poly_mask(rgb.shape, edit['zones']).astype(np.uint8), cv2.DIST_L2, 5)
        soft = soft * np.clip(dist / feather, 0.0, 1.0)
    soft = soft[..., None]
    out = rgb * (1 - soft) + fabric * soft
    if edit.get('trim'):
        # A thin antique-gold edge where the new garment meets uncovered areas above it.
        t = edit['trim']
        top = mask & ~np.roll(mask, t.get('offset', 4), axis=0)
        band = poly_mask(rgb.shape, t['zones']) & top
        band = cv2.dilate(band.astype(np.uint8), np.ones((t.get('width', 3), 1), np.uint8)) > 0
        out[band] = out[band] * 0.25 + np.array(t.get('color', [176, 138, 82]), np.float32) * 0.75
    return out, mask


def irises(img, alpha, rule):
    """Recolour each iris: in every eye box, the largest blob of saturated amber."""
    rgb = img.astype(np.float32)
    h, s, v = hsv_of(rgb)
    lo, hi = rule.get('hue', [18, 50])
    cand = (h >= lo) & (h <= hi) & (s >= rule.get('sMin', 0.66)) & (v >= 0.18)
    sel = np.zeros(cand.shape, bool)
    for x0, y0, x1, y1 in rule['boxes']:
        box = np.zeros(cand.shape, np.uint8)
        box[y0:y1, x0:x1] = cand[y0:y1, x0:x1]
        n, lab, stats, _ = cv2.connectedComponentsWithStats(box, 8)
        if n > 1:
            k = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
            blob = (lab == k).astype(np.uint8)
            blob = cv2.morphologyEx(blob, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
            # Include the darker ring and pupil-side shading inside the blob's hull.
            cnts, _ = cv2.findContours(blob, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            hull = np.zeros_like(blob)
            cv2.fillPoly(hull, [cv2.convexHull(np.vstack(cnts))], 1)
            sel |= (hull > 0) & (h >= 0) & (h <= 60) & (s >= 0.35)
    hsv = cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
    new = hsv.copy()
    new[..., 0] = rule['toHue'] * 256.0 / 360.0
    new[..., 1] = hsv[..., 1] * rule.get('satScale', 0.8)
    shifted = cv2.cvtColor(new.astype(np.uint8), cv2.COLOR_HSV2RGB_FULL).astype(np.float32)
    w = cv2.GaussianBlur(sel.astype(np.float32), (0, 0), 0.6)[..., None]
    return rgb * (1 - w) + shifted * w


def sheer(img, alpha, edit):
    """Make sheer, pale cloth over skin opaque: pale low-saturation pixels inside
    the zones become an opaque tint of the given colour, keeping fine folds."""
    rgb = img.astype(np.float32)
    zone = poly_mask(rgb.shape, edit['zones'])
    if edit.get('keep'):
        zone &= ~poly_mask(rgb.shape, edit['keep'])
    h, s, v = hsv_of(rgb)
    sel = zone & (s <= edit.get('sMax', 0.22)) & (v >= edit.get('vMin', 0.55)) & (alpha > 8)
    lum = 0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]
    fine = masked_blur(lum, sel, edit.get('shadeSigma', 1.2))
    ref = np.percentile(fine[sel], 95) if sel.any() else 1.0
    k = np.clip(0.72 + 0.3 * fine / max(ref, 1.0), 0, 1.05)
    col = np.array(edit['color'], np.float32)[None, None, :] * k[..., None]
    w = cv2.GaussianBlur(sel.astype(np.float32), (0, 0), 0.7)[..., None]
    out = rgb * (1 - w) + col * w
    a = alpha.astype(np.float32)
    a = np.where(sel, np.maximum(a, edit.get('alphaMin', 235)), a)
    return out, a.astype(np.uint8)


def hue_shift(img, alpha, rule):
    rgb = img.astype(np.float32)
    h, s, v = hsv_of(rgb)
    lo, hi = rule['hue']
    sel = ((h >= lo) | (h <= hi)) if lo > hi else ((h >= lo) & (h <= hi))
    sel &= (s >= rule.get('sMin', 0.3)) & (alpha > 8)
    if rule.get('zones'):
        sel &= poly_mask(rgb.shape, rule['zones'])
    if rule.get('keep'):
        sel &= ~poly_mask(rgb.shape, rule['keep'])
    hsv = cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
    new = hsv.copy()
    new[..., 0] = rule['toHue'] * 256.0 / 360.0
    new[..., 1] = hsv[..., 1] * rule.get('satScale', 1.0)
    new[..., 2] = np.clip(hsv[..., 2] * rule.get('valScale', 1.0) + rule.get('valAdd', 0) * 255.0, 0, 255)
    shifted = cv2.cvtColor(new.astype(np.uint8), cv2.COLOR_HSV2RGB_FULL).astype(np.float32)
    w = cv2.GaussianBlur(sel.astype(np.float32), (0, 0), 0.7)[..., None]
    return rgb * (1 - w) + shifted * w


def sha(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()


def main():
    spec = {'assets': {f[:-5]: json.load(open(os.path.join(SPEC_DIR, f))) for f in sorted(os.listdir(SPEC_DIR)) if f.endswith('.json')}}
    manifest = {a['asset_id']: a for a in json.load(open(os.path.join(ROOT, 'handoff/02_ART_ASSETS/asset_manifest.json')))}
    os.makedirs(OUT, exist_ok=True)
    preview = '--preview' in sys.argv
    only = [a for a in sys.argv[1:] if not a.startswith('--')]
    record = {}
    for asset_id, edit in spec['assets'].items():
        if only and asset_id not in only:
            continue
        src = os.path.join(ROOT, 'handoff', manifest[asset_id]['path'])
        if sha(src) != manifest[asset_id]['sha256']:
            sys.exit(f'original hash mismatch: {src}')
        im = Image.open(src)
        has_alpha = im.mode == 'RGBA'
        arr = np.array(im.convert('RGBA'))
        rgb, alpha = arr[..., :3].astype(np.float32), arr[..., 3]
        for rule in edit.get('shifts', []):
            rgb = hue_shift(rgb, alpha, rule)
        if edit.get('irises'):
            rgb = irises(rgb, alpha, edit['irises'])
        for sh in edit.get('sheer', []):
            rgb, alpha = sheer(rgb, alpha, sh)
        covered = None
        for c in edit.get('cover', []):
            rgb, m = cover(rgb, alpha, c)
            covered = m if covered is None else (covered | m)
        if edit.get('cutBelow'):
            # Nerelle is always shown waist-deep in water with the waterline above
            # this row, so nothing below it is ever displayed: ship it transparent.
            alpha = alpha.copy()
            alpha[int(edit['cutBelow']):, :] = 0
        out = np.clip(rgb, 0, 255).astype(np.uint8)
        if has_alpha:
            # Fully transparent pixels carry no colour: never ship hidden original
            # pixels (e.g. below Nerelle's waterline cut) in the colour channels.
            out[alpha == 0] = 0
        res = Image.fromarray(np.dstack([out, alpha]) if has_alpha else out, 'RGBA' if has_alpha else 'RGB')
        dst = os.path.join(OUT, f'{asset_id}.png')
        res.save(dst, optimize=True)
        record[asset_id] = {'source_sha256': manifest[asset_id]['sha256'], 'edited_sha256': sha(dst)}
        if preview:
            a = Image.open(src).convert('RGB')
            b = res.convert('RGB')
            w = 600
            a = a.resize((w, int(a.height * w / a.width)))
            b = b.resize((w, int(b.height * w / b.width)))
            sheet = Image.new('RGB', (w * 2 + 10, a.height), (255, 255, 255))
            sheet.paste(a, (0, 0)); sheet.paste(b, (w + 10, 0))
            os.makedirs(os.path.join(OUT, '..', 'preview'), exist_ok=True)
            sheet.save(os.path.join(OUT, '..', 'preview', f'{asset_id}.jpg'), quality=85)
        print(asset_id, 'covered px' if covered is not None else '', int(covered.sum()) if covered is not None else '')
    if not only:
        json.dump(record, open(os.path.join(OUT, 'EDITS.json'), 'w'), indent=2, sort_keys=True)


if __name__ == '__main__':
    main()
