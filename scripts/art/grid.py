# Render an image region with a labelled coordinate grid (full-res coords) for picking polygons.
import sys
from PIL import Image, ImageDraw
src, out = sys.argv[1], sys.argv[2]
x0, y0, x1, y1 = map(int, sys.argv[3].split(',')) if len(sys.argv) > 3 else (0, 0, 0, 0)
step = int(sys.argv[4]) if len(sys.argv) > 4 else 50
im = Image.open(src).convert('RGBA')
bg = Image.new('RGBA', im.size, (40, 40, 40, 255)); bg.alpha_composite(im); im = bg.convert('RGB')
if x1 == 0: x1, y1 = im.size
im = im.crop((x0, y0, x1, y1))
scale = min(1.0, 900 / max(im.size))
im = im.resize((int(im.width * scale), int(im.height * scale)))
d = ImageDraw.Draw(im)
for gx in range((x0 // step) * step, x1, step):
    if gx < x0: continue
    X = (gx - x0) * scale
    d.line([(X, 0), (X, im.height)], fill=(0, 255, 255) if gx % (step * 2) == 0 else (0, 140, 140), width=1)
    d.text((X + 2, 2), str(gx), fill=(255, 255, 0))
for gy in range((y0 // step) * step, y1, step):
    if gy < y0: continue
    Y = (gy - y0) * scale
    d.line([(0, Y), (im.width, Y)], fill=(0, 255, 255) if gy % (step * 2) == 0 else (0, 140, 140), width=1)
    d.text((2, Y + 2), str(gy), fill=(255, 255, 0))
im.save(out)
