#!/usr/bin/env python3
"""
Darkroom — verlegt die hell fotografierten Flaschen auf einen dunklen
Studio-Hintergrund (Pinien-Grün-Nacht + warmer Honig-Glow), passend zur
Nocturne-Direktion. Reine lokale Verarbeitung (PIL/numpy), keine Cloud.

Technik: weicher Matte aus Helligkeit + Sättigung trennt die (helle,
entsättigte) Wand vom farbigen/dunklen Motiv; Motiv wird auf einen
Studio-Backdrop mit Radial-Glow, Vignette und Boden-Reflexion komponiert.
"""
import sys
import os
import numpy as np
from PIL import Image, ImageFilter

PINE_TOP = np.array([16, 30, 23]) / 255.0     # #101e17
PINE_BOT = np.array([6, 11, 8]) / 255.0       # #060b08
WARM = np.array([232, 178, 94]) / 255.0       # honey


def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a + 1e-6), 0, 1)
    return t * t * (3 - 2 * t)


GREEN_TONE = np.array([0.82, 1.06, 0.90])   # Schatten → Pinie
WARM_TONE = np.array([1.10, 1.0, 0.82])     # Lichter → Honig


def process(inp, outp):
    """Moody Grade ohne Freistellen: die helle Wand wird zum dunklen
    Studio-Backdrop heruntergezogen und grün getönt, das Motiv bleibt
    intakt (kein zerschnittener Flaschenhals). Warmer Glow + Vignette."""
    im = Image.open(inp).convert("RGB")
    W, H = im.size
    arr = np.asarray(im).astype(np.float32) / 255.0
    L = 0.299 * arr[..., 0] + 0.587 * arr[..., 1] + 0.114 * arr[..., 2]

    yy = np.linspace(0, 1, H)[:, None] * np.ones((1, W))
    xx = np.ones((H, 1)) * np.linspace(0, 1, W)[None, :]
    cx, cy = 0.5, 0.46
    d = np.sqrt(((xx - cx) / 0.62) ** 2 + ((yy - cy) / 0.62) ** 2)

    # 1) Lichter (helle Wand) hart herunterziehen, Tiefen halten
    crush = 1.0 - 0.80 * smoothstep(0.44, 0.97, L)
    # Wand zusätzlich außerhalb der Bildmitte abdunkeln (lenkt Blick auf Flasche)
    crush = crush * (1.0 - 0.30 * smoothstep(0.30, 0.95, d))
    out = arr * crush[..., None]

    # 2) Split-Tone: Tiefen → Pinie, Lichter → Honig
    L2 = 0.299 * out[..., 0] + 0.587 * out[..., 1] + 0.114 * out[..., 2]
    t = smoothstep(0.10, 0.55, L2)[..., None]
    out = out * (GREEN_TONE[None, None, :] * (1 - t) + WARM_TONE[None, None, :] * t)

    # 3) warmer Studio-Glow hinter dem Motiv
    glow = np.clip(1 - d, 0, 1) ** 2.4
    out = out + glow[..., None] * WARM[None, None, :] * 0.10

    # 4) Vignette + Mikrokontrast
    vig = np.clip(1 - d * 0.42, 0.34, 1)
    out = out * vig[..., None]
    out = np.clip(out, 0, 1)
    out = np.clip((out - 0.5) * 1.06 + 0.5, 0, 1)  # leichter Kontrast

    Image.fromarray((out * 255).astype(np.uint8)).save(outp, quality=90)
    print(f"  {os.path.basename(inp)} -> {os.path.basename(outp)} ({W}x{H})")


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    process(src, dst)
