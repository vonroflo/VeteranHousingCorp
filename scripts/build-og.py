#!/usr/bin/env python3
"""Generate /assets/og-image.jpg — 1200x630 social-share card.

Re-run when the logo or brand messaging changes:

    python3 scripts/build-og.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "assets" / "vhc-logo.jpg"
OUT = ROOT / "assets" / "og-image.jpg"

W, H = 1200, 630
NAVY_DARK = (15, 26, 69)
NAVY = (27, 42, 107)
RED = (200, 16, 46)
GOLD = (201, 147, 58)
GOLD_LIGHT = (232, 184, 109)
WHITE = (255, 255, 255)
MUTED = (180, 190, 210)

FONT_DISPLAY = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_SANS = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def draw_dot_field(img: Image.Image) -> None:
    """Subtle decorative dot grid, same vibe as the hero ::before."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    step = 32
    for y in range(0, H, step):
        for x in range(0, W, step):
            r = 1
            od.ellipse((x - r, y - r, x + r, y + r), fill=(255, 255, 255, 14))
    for y in range(16, H, 64):
        for x in range(16, W, 64):
            r = 1
            od.ellipse((x - r, y - r, x + r, y + r), fill=GOLD + (24,))
    img.alpha_composite(overlay)


def draw_text(d: ImageDraw.ImageDraw, xy, text, font, fill, anchor="la"):
    d.text(xy, text, font=font, fill=fill, anchor=anchor)


def text_width(d: ImageDraw.ImageDraw, text: str, font) -> int:
    bbox = d.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0]


def star_polygon(cx, cy, r_outer, r_inner=None):
    """Return points for a 5-pointed star centered at (cx, cy)."""
    import math
    if r_inner is None:
        r_inner = r_outer * 0.42
    pts = []
    for i in range(10):
        angle = -math.pi / 2 + i * math.pi / 5
        r = r_outer if i % 2 == 0 else r_inner
        pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    return pts


def draw_star_row(d: ImageDraw.ImageDraw, cx, cy, count, size, gap, fill):
    """Centered horizontal row of `count` stars at vertical center cy."""
    total = count * size * 2 + (count - 1) * gap
    start_x = cx - total / 2 + size
    for i in range(count):
        x = start_x + i * (size * 2 + gap)
        d.polygon(star_polygon(x, cy, size), fill=fill)


def main() -> None:
    canvas = Image.new("RGBA", (W, H), NAVY_DARK + (255,))
    draw_dot_field(canvas)
    d = ImageDraw.Draw(canvas)

    # Gold top + bottom rules
    d.rectangle((0, 0, W, 6), fill=GOLD)
    d.rectangle((0, H - 6, W, H), fill=GOLD)

    # Red ribbon at the very bottom (above the gold rule) — small accent
    ribbon_h = 56
    d.rectangle((0, H - 6 - ribbon_h, W, H - 6), fill=RED)

    # ---- Left: logo on a clean white tile so the brand reads on navy ----
    logo = Image.open(LOGO).convert("RGBA")
    tile = 380
    logo.thumbnail((tile - 24, tile - 24), Image.LANCZOS)
    tile_x, tile_y = 60, (H - ribbon_h - 6 - tile) // 2 + 10
    # White rounded backdrop
    backdrop = Image.new("RGBA", (tile, tile), (0, 0, 0, 0))
    bd = ImageDraw.Draw(backdrop)
    bd.rounded_rectangle((0, 0, tile, tile), radius=18, fill=WHITE)
    bd.rounded_rectangle((0, 0, tile, tile), radius=18, outline=GOLD, width=4)
    canvas.alpha_composite(backdrop, (tile_x, tile_y))
    # Center logo within tile
    lx = tile_x + (tile - logo.width) // 2
    ly = tile_y + (tile - logo.height) // 2
    canvas.alpha_composite(logo, (lx, ly))

    # ---- Right: text stack ----
    text_x = tile_x + tile + 40

    eyebrow_font = ImageFont.truetype(FONT_SANS, 22)
    headline_font = ImageFont.truetype(FONT_DISPLAY, 60)
    tagline_font = ImageFont.truetype(FONT_SANS, 22)
    foot_font = ImageFont.truetype(FONT_SANS, 18)

    # Eyebrow tag
    eyebrow = "VETERAN HOUSING CORP"
    draw_text(d, (text_x, 90), eyebrow, eyebrow_font, GOLD_LIGHT)

    # Gold star divider — drawn as polygons (Arial lacks U+2605)
    star_size = 10
    star_gap = 18
    row_total = 5 * star_size * 2 + 4 * star_gap
    draw_star_row(d, text_x + row_total / 2, 145, count=5, size=star_size, gap=star_gap, fill=GOLD)

    # Headline (manually wrapped)
    headline_lines = ["No Veteran Should", "Sleep Without a Roof."]
    y = 180
    for line in headline_lines:
        draw_text(d, (text_x, y), line, headline_font, WHITE)
        y += 72

    # Tagline strip — small inline strip in red
    tagline = "Housing Veterans · Strengthening Communities · Changing Lives"
    tw = text_width(d, tagline, tagline_font)
    pad_x, pad_y = 18, 10
    strip_y = 360
    d.rounded_rectangle(
        (text_x - 4, strip_y, text_x + tw + pad_x * 2, strip_y + 24 + pad_y * 2),
        radius=4,
        fill=RED,
    )
    draw_text(d, (text_x + pad_x - 4, strip_y + pad_y), tagline, tagline_font, WHITE)

    # Footer-style line above red ribbon
    foot_y = H - ribbon_h - 6 - 30
    foot = "501(c)(3) NONPROFIT · MARION COUNTY, FL · veteranhousingcorp.org"
    draw_text(d, (text_x, foot_y), foot, foot_font, MUTED)

    # Red ribbon text (with flanking polygon stars)
    ribbon_text_font = ImageFont.truetype(FONT_SANS, 20)
    rt = "GET HELP NOW · 352-509-5714 · CRISIS LINE 988 PRESS 1"
    rt_w = text_width(d, rt, ribbon_text_font)
    rx = (W - rt_w) // 2
    ry_center = H - 6 - ribbon_h // 2
    draw_text(d, (rx, ry_center - 12), rt, ribbon_text_font, WHITE)
    # Flanking stars
    d.polygon(star_polygon(rx - 24, ry_center, 8), fill=GOLD)
    d.polygon(star_polygon(rx + rt_w + 24, ry_center, 8), fill=GOLD)

    # Save (JPEG, no alpha)
    final = Image.new("RGB", (W, H), NAVY_DARK)
    final.paste(canvas, mask=canvas.split()[3])
    final.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"wrote {OUT.relative_to(ROOT)}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
