"""Placeholder art for Senna's route until her generated art is approved.

Draws a plain, clearly-temporary silhouette in her herb green (with her bun,
pencil, spectacles and apron so players can tell her apart) for the five
expression slots, and a simple lamplit infirmary silhouette for the midpoint
illustration slot. The game's alt text says "placeholder" while these ship.

  python3 scripts/art/senna_placeholder.py   # writes art-src/routes/SEN/*.png + ART.json
"""
import hashlib, json, os
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'art-src/routes/SEN')
GREEN = (76, 117, 83)
LIGHT = (122, 160, 126)
APRON = (214, 205, 183)
HAIR = (205, 168, 96)
INK = (40, 48, 44)
EXPRESSIONS = ['neutral', 'playful', 'worried', 'annoyed', 'surprised']


def sha(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()


def portrait():
    W, H, S = 1024, 1536, 2  # drawn at 2x, then downsampled for smooth edges
    im = Image.new('RGBA', (W * S, H * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    s = lambda *v: [x * S for x in v]
    # shoulders and dress
    d.rounded_rectangle(s(170, 760, 854, 1700), radius=260 * S, fill=GREEN + (255,))
    # high collar
    d.rounded_rectangle(s(430, 650, 594, 800), radius=40 * S, fill=GREEN + (255,))
    # apron with pockets
    d.rounded_rectangle(s(330, 930, 694, 1700), radius=36 * S, fill=APRON + (255,))
    for x0 in (360, 530):
        d.rounded_rectangle(s(x0, 1120, x0 + 135, 1250), radius=14 * S, outline=GREEN + (255,), width=6 * S)
    d.line(s(360, 990, 664, 990), fill=GREEN + (255,), width=6 * S)
    # head
    d.ellipse(s(372, 330, 652, 680), fill=LIGHT + (255,))
    # hair: messy low bun and crown
    d.chord(s(350, 300, 674, 600), 180, 360, fill=HAIR + (255,))
    d.ellipse(s(560, 560, 720, 700), fill=HAIR + (255,))
    # pencil and rosemary sprig through the bun
    d.line(s(600, 520, 760, 690), fill=INK + (255,), width=10 * S)
    d.line(s(560, 700, 700, 540), fill=GREEN + (255,), width=8 * S)
    for i in range(6):
        y = 690 - i * 26
        x = 560 + i * 23
        d.ellipse(s(x - 10, y - 20, x + 10, y + 4), fill=GREEN + (255,))
    # round spectacles pushed up on her head
    for cx in (462, 562):
        d.ellipse(s(cx - 42, 316, cx + 42, 400), outline=INK + (255,), width=8 * S)
    d.line(s(504, 356, 520, 356), fill=INK + (255,), width=8 * S)
    return im.resize((W, H), Image.LANCZOS)


def illustration():
    W, H, S = 1448, 1086, 2
    im = Image.new('RGB', (W * S, H * S), (36, 30, 26))
    # warm lamplight glow
    glow = Image.new('L', (W * S, H * S), 0)
    ImageDraw.Draw(glow).ellipse([x * S for x in (420, 120, 1180, 880)], fill=255)
    glow = glow.filter(ImageFilter.GaussianBlur(160 * S / 2))
    amber = Image.new('RGB', im.size, (176, 124, 66))
    im = Image.composite(amber, im, glow)
    d = ImageDraw.Draw(im)
    s = lambda *v: [x * S for x in v]
    # shelves of jars
    for row, y in enumerate((150, 300, 450)):
        d.rectangle(s(80, y + 90, 1368, y + 100), fill=(70, 52, 38))
        for i in range(14):
            x = 110 + i * 90 + (row * 23) % 40
            h = 60 + (i * 37 + row * 11) % 30
            d.rounded_rectangle(s(x, y + 90 - h, x + 52, y + 90), radius=10 * S, fill=(92, 110, 96))
            d.rectangle(s(x + 10, y + 90 - h + 18, x + 42, y + 90 - h + 34), fill=(214, 205, 183))
    # worktable
    d.rectangle(s(0, 840, 1448, 1086), fill=(62, 44, 32))
    # seated figure (silhouette in her green), lamp
    d.rounded_rectangle(s(560, 560, 900, 900), radius=150 * S, fill=GREEN)
    d.ellipse(s(640, 380, 820, 590), fill=LIGHT)
    d.chord(s(625, 360, 835, 560), 180, 360, fill=HAIR)
    d.ellipse(s(770, 520, 860, 600), fill=HAIR)
    d.ellipse(s(1040, 640, 1160, 760), fill=(244, 206, 130))
    d.rectangle(s(1088, 760, 1112, 840), fill=(70, 52, 38))
    for i in range(5):
        x = 360 + i * 70
        d.rounded_rectangle(s(x, 780, x + 44, 840), radius=8 * S, fill=(92, 110, 96))
    return im.resize((W, H), Image.LANCZOS)


def main():
    rec = os.path.join(OUT, 'ART.json')
    if os.path.exists(rec) and json.load(open(rec))['status'] != 'placeholder':
        raise SystemExit('Senna has generated art now (scripts/art/senna.py); not overwriting it with placeholders.')
    os.makedirs(OUT, exist_ok=True)
    assets = []
    p = portrait()
    for e in EXPRESSIONS:
        aid = f'senna_senna_{e}'
        path = os.path.join(OUT, f'{aid}.png')
        p.save(path, optimize=True)
        assets.append({'asset_id': aid, 'kind': 'expression_sprite', 'file': f'{aid}.png', 'sha256': sha(path), 'width': 1024, 'height': 1536})
    path = os.path.join(OUT, 'senna_senna_lamplight.png')
    illustration().save(path, optimize=True)
    assets.append({'asset_id': 'senna_senna_lamplight', 'kind': 'midpoint_CG', 'file': 'senna_senna_lamplight.png', 'sha256': sha(path), 'width': 1448, 'height': 1086})
    record = {
        'route': 'SEN',
        'status': 'placeholder',
        'note': 'Temporary silhouettes drawn by scripts/art/senna_placeholder.py until Senna\'s generated art is approved. The game labels them "placeholder" in alt text.',
        'assets': assets,
    }
    with open(os.path.join(OUT, 'ART.json'), 'w') as f:
        json.dump(record, f, indent=2)
        f.write('\n')
    print('wrote', len(assets), 'placeholder images')


if __name__ == '__main__':
    main()
