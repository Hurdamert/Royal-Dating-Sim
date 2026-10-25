import sys, numpy as np, cv2
from PIL import Image
src = sys.argv[1]
im = np.array(Image.open(src).convert('RGB'))
hsv = cv2.cvtColor(im, cv2.COLOR_RGB2HSV_FULL).astype(float)
for pt in sys.argv[2:]:
    name, xy = pt.split('=')
    x, y = map(int, xy.split(','))
    patch = im[y-4:y+5, x-4:x+5].reshape(-1, 3).mean(0)
    hp = hsv[y-4:y+5, x-4:x+5].reshape(-1, 3).mean(0)
    print(f"{name:12s} rgb={patch.round().astype(int)} h={hp[0]*360/256:5.1f} s={hp[1]/255:.2f} v={hp[2]/255:.2f}")
