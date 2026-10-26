"""Senna's art (owner request 2026-10-25: "Use Hugging Face for this").

The raw outputs of the Hugging Face image tools are kept unchanged in
art-src/routes/SEN/generated/*.generated.webp, and generated/SOURCES.json records
the model, Space, prompt, seed and settings of each. This script turns them into
the six game images in art-src/routes/SEN/ and rewrites ART.json:

  * the five expression portraits: the plain cream background is removed with the
    isnet-anime segmentation model (rembg project release on GitHub, hash-pinned),
    the light fringe the cut leaves on the outline is trimmed, and edge colours are
    unmixed from the background so nothing cream shows on a dark stage. All five
    share one size and framing: 832x1248, the image editor's native 2:3 size (the
    text-to-image neutral is downscaled to match, so nothing is upscaled);
  * the midpoint illustration "Lamplight in the Infirmary": centre-cropped to 4:3.

It refuses, and changes nothing, until all six raw images are present and match
their recorded hashes.

  python3 scripts/art/senna.py            # write art-src/routes/SEN/*.png + ART.json
  python3 scripts/art/senna.py --preview  # also write review sheets to art-src/preview/
"""
import hashlib, json, os, sys, urllib.request
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DIR = os.path.join(ROOT, 'art-src/routes/SEN')
RAW = os.path.join(DIR, 'generated')
EXPRESSIONS = ['neutral', 'playful', 'worried', 'annoyed', 'surprised']
SPRITE = (832, 1248)
CG = 'lamplight'

MODEL_URL = 'https://github.com/danielgatis/rembg/releases/download/v0.0.0/isnet-anime.onnx'
MODEL_SHA = 'f15622d853e8260172812b657053460e20806f04b9e05147d49af7bed31a6e99'
MODEL_PATH = os.path.join(os.path.expanduser('~'), '.cache', 'royal-dating-sim', 'isnet-anime.onnx')


def sha_bytes(b):
    return hashlib.sha256(b).hexdigest()


def sha(path):
    with open(path, 'rb') as f:
        return sha_bytes(f.read())


def model():
    if not os.path.exists(MODEL_PATH) or sha(MODEL_PATH) != MODEL_SHA:
        os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
        print('downloading', MODEL_URL)
        with urllib.request.urlopen(MODEL_URL) as r:
            data = r.read()
        if sha_bytes(data) != MODEL_SHA:
            sys.exit('FAIL isnet-anime.onnx does not match its pinned hash')
        with open(MODEL_PATH, 'wb') as f:
            f.write(data)
    import onnxruntime as ort
    return ort.InferenceSession(MODEL_PATH, providers=['CPUExecutionProvider'])


def segment(session, img):
    """Foreground probability 0..1 at the image's size (rembg's isnet-anime recipe)."""
    x = np.asarray(img.convert('RGB').resize((1024, 1024), Image.LANCZOS), np.float32)
    x /= max(float(x.max()), 1e-6)
    x -= np.array([0.485, 0.456, 0.406], np.float32)
    x = x.transpose(2, 0, 1)[None]
    p = session.run(None, {session.get_inputs()[0].name: x})[0][0, 0]
    p = (p - p.min()) / max(float(p.max() - p.min()), 1e-6)
    m = Image.fromarray((p * 255).astype(np.uint8), 'L').resize(img.size, Image.LANCZOS)
    return np.asarray(m, np.float32) / 255


def cutout(session, img):
    rgb = np.asarray(img.convert('RGB'), np.float32)
    m = segment(session, img)
    bg = np.median(rgb[m < 0.02], axis=0)              # the plain cream background
    solid = m > 0.5
    inner = ndi.binary_erosion(solid, iterations=5)
    outer = ndi.binary_dilation(solid, iterations=3)
    band = outer & ~inner                                # a few pixels either side of the outline
    near_bg = np.clip((np.sqrt(((rgb - bg) ** 2).sum(-1)) - 8) / 40, 0, 1)
    a = m.copy()
    a[band] = np.minimum(m[band], near_bg[band])         # trim cream fringe on the outline
    a = ndi.gaussian_filter(a, 0.6) * outer
    a = np.where(inner, 1.0, a)
    A = a[..., None]
    fg = np.clip((rgb - (1 - A) * bg) / np.maximum(A, 1e-3), 0, 255)   # unmix edge colour
    fg = np.where(A > 0.98, rgb, fg)
    return Image.fromarray(np.dstack([fg, a * 255]).round().astype(np.uint8), 'RGBA'), [int(v) for v in bg]


def crop_4x3(img):
    w, h = img.size
    if abs(w / h - 4 / 3) < 0.01:
        return img, None
    if w / h > 4 / 3:
        nw = round(h * 4 / 3)
        box = ((w - nw) // 2, 0, (w - nw) // 2 + nw, h)
    else:
        nh = round(w * 3 / 4)
        box = (0, (h - nh) // 2, w, (h - nh) // 2 + nh)
    return img.crop(box), list(box)


def main():
    src = json.load(open(os.path.join(RAW, 'SOURCES.json')))
    images = src['images']
    missing = [k for k in EXPRESSIONS + [CG] if k not in images or not os.path.exists(os.path.join(RAW, images[k]['file']))]
    if missing:
        sys.exit('Not all of Senna\'s raw images are here yet (missing: ' + ', '.join(missing) + '). Nothing changed.')
    for k in EXPRESSIONS + [CG]:
        if sha(os.path.join(RAW, images[k]['file'])) != images[k]['sha256']:
            sys.exit(f'FAIL generated/{images[k]["file"]} does not match SOURCES.json')

    session = model()
    assets = []
    previews = []
    for e in EXPRESSIONS:
        raw = Image.open(os.path.join(RAW, images[e]['file']))
        if abs(raw.width / raw.height - 2 / 3) > 0.01:
            sys.exit(f'FAIL {e}: raw image is not 2:3')
        raw = raw.convert('RGB').resize(SPRITE, Image.LANCZOS)
        out, bg = cutout(session, raw)
        aid = f'senna_senna_{e}'
        path = os.path.join(DIR, f'{aid}.png')
        out.save(path, optimize=True)
        previews.append(out)
        assets.append({
            'asset_id': aid, 'kind': 'expression_sprite', 'file': f'{aid}.png', 'sha256': sha(path),
            'width': out.width, 'height': out.height,
            'from': f'generated/{images[e]["file"]}', 'from_sha256': images[e]['sha256'],
            'processing': f'resized to {SPRITE[0]}x{SPRITE[1]}; background removed (isnet-anime, edge colours unmixed from background rgb{tuple(bg)})',
        })
    raw = Image.open(os.path.join(RAW, images[CG]['file'])).convert('RGB')
    cg, box = crop_4x3(raw)
    path = os.path.join(DIR, 'senna_senna_lamplight.png')
    cg.save(path, optimize=True)
    assets.append({
        'asset_id': 'senna_senna_lamplight', 'kind': 'midpoint_CG', 'file': 'senna_senna_lamplight.png', 'sha256': sha(path),
        'width': cg.width, 'height': cg.height,
        'from': f'generated/{images[CG]["file"]}', 'from_sha256': images[CG]['sha256'],
        'processing': 'unchanged' if box is None else f'centre-cropped to 4:3 (box {box})',
    })
    record = {
        'route': 'SEN',
        'status': 'generated',
        'note': 'Generated with Hugging Face image tools at the owner\'s request ("Use Hugging Face for this", 2026-10-25). Raw outputs and their prompts, seeds and models are in generated/SOURCES.json; scripts/art/senna.py makes these files from them.',
        'assets': assets,
    }
    with open(os.path.join(DIR, 'ART.json'), 'w') as f:
        json.dump(record, f, indent=2)
        f.write('\n')
    print('wrote', len(assets), 'images; ART.json status generated')

    if '--preview' in sys.argv:
        os.makedirs(os.path.join(ROOT, 'art-src/preview'), exist_ok=True)
        for name, colour in (('dark', (32, 30, 44)), ('stage', (88, 120, 96))):
            sheet = Image.new('RGBA', (SPRITE[0] * 5, SPRITE[1]), colour + (255,))
            for i, p in enumerate(previews):
                sheet.alpha_composite(p, (i * SPRITE[0], 0))
            sheet.convert('RGB').resize((SPRITE[0] * 5 // 2, SPRITE[1] // 2), Image.LANCZOS).save(
                os.path.join(ROOT, f'art-src/preview/senna_sprites_{name}.jpg'), quality=88)
        print('review sheets in art-src/preview/')


if __name__ == '__main__':
    main()
