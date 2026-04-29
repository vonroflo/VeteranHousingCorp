#!/usr/bin/env python3
"""Convert lifestyle PNGs in assets/ to WebP at quality 85.

Originals are kept; WebP files are written alongside them.
Re-run after dropping new PNGs into assets/ to regenerate WebP outputs.

    python3 scripts/convert-images.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

NAMES = [
    "hero-home",
    "home-community",
    "about-hero",
    "about-street",
    "about-approach",
    "program-emergency",
    "program-transitional",
    "program-permanent",
    "donate-hero",
    "donate-impact",
    "contact-hero",
]

QUALITY = 85


def main() -> None:
    converted = []
    for name in NAMES:
        src = ASSETS / f"{name}.png"
        dst = ASSETS / f"{name}.webp"
        if not src.exists():
            print(f"!  missing  {src.relative_to(ROOT)}  — skipping")
            continue
        with Image.open(src) as im:
            # Preserve transparency if any; PIL handles RGBA → WebP fine
            im.save(dst, "WEBP", quality=QUALITY, method=6)
        before = src.stat().st_size
        after = dst.stat().st_size
        w, h = Image.open(dst).size
        converted.append((name, w, h, before, after))
        print(f"✓  {name}.webp  {w}×{h}  {before//1024} KB → {after//1024} KB")

    if converted:
        total_before = sum(c[3] for c in converted)
        total_after = sum(c[4] for c in converted)
        print(f"\nTotal: {total_before//1024//1024} MB → {total_after//1024//1024} MB "
              f"({100 - total_after * 100 // total_before}% smaller)")


if __name__ == "__main__":
    main()
