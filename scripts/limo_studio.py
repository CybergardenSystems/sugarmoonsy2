#!/usr/bin/env python3
"""
Veredelt eine (bereits dunkel getönte) Flaschen-Aufnahme zu einem sauberen
3:4-Studio-Shot: dunkler Pinien-Spotlight-Hintergrund, warmer Glow, weiche
Boden-Reflexion und Vignette. Das echte Etikett bleibt unangetastet.

Aufruf: limo_studio.py <input-graded.jpg> <output.jpg>
"""
import sys
import numpy as np
from PIL import Image

W, H = 900, 1200
PINE_C = np.array([22, 39, 29]) / 255.0   # Spotlight-Zentrum
PINE_E = np.array([7, 12, 9]) / 255.0      # Rand
WARM = np.array([232, 178, 94]) / 255.0


def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a + 1e-6), 0, 1)
    return t * t * (3 - 2 * t)


def studio(inp, outp):
    yy = np.linspace(0, 1, H)[:, None] * np.ones((1, W))
    xx = np.ones((H, 1)) * np.linspace(0, 1, W)[None, :]
    d = np.sqrt(((xx - 0.5) / 0.6) ** 2 + ((yy - 0.42) / 0.62) ** 2)
    canvas = PINE_E[None, None] + (PINE_C - PINE_E)[None, None] * np.clip(1 - d, 0, 1)[..., None]
    glow = np.clip(1 - np.sqrt(((xx - 0.32) / 0.5) ** 2 + ((yy - 0.3) / 0.5) ** 2), 0, 1) ** 2.4
    canvas = canvas + glow[..., None] * WARM[None, None] * 0.10

    b = Image.open(inp).convert("RGB")
    bw, bh = b.size
    target_h = int(H * 0.74)
    target_w = max(1, int(bw * target_h / bh))
    b = b.resize((target_w, target_h), Image.LANCZOS)
    barr = np.asarray(b).astype(np.float32) / 255.0

    # weiche Kanten, damit die Kachel im Canvas verschmilzt (BG ≈ Canvas)
    ax = smoothstep(0, 0.16, np.linspace(0, 1, target_w))
    ax = np.minimum(ax, ax[::-1])
    ay = smoothstep(0, 0.05, np.linspace(0, 1, target_h))
    ay = np.minimum(ay, ay[::-1])
    alpha = ay[:, None] * ax[None, :]

    ox = (W - target_w) // 2
    oy = int(H * 0.09)
    a3 = alpha[..., None]
    reg = canvas[oy:oy + target_h, ox:ox + target_w]
    canvas[oy:oy + target_h, ox:ox + target_w] = reg * (1 - a3) + barr * a3

    # Boden-Reflexion
    ry = oy + target_h
    rh = min(int(target_h * 0.26), H - ry)
    if rh > 0:
        refl = np.flip(barr, 0)[:rh]
        ralpha = np.flip(alpha, 0)[:rh]
        fade = (np.linspace(1, 0, rh) ** 1.6) * 0.16
        ra = (ralpha * fade[:, None])[..., None]
        reg = canvas[ry:ry + rh, ox:ox + target_w]
        canvas[ry:ry + rh, ox:ox + target_w] = reg * (1 - ra) + refl * ra

    vig = np.clip(1 - d * 0.5, 0.34, 1)
    canvas = np.clip(canvas * vig[..., None], 0, 1)
    Image.fromarray((canvas * 255).astype(np.uint8)).save(outp, quality=92)
    print(f"  {inp} -> {outp}")


if __name__ == "__main__":
    studio(sys.argv[1], sys.argv[2])
