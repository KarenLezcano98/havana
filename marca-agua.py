#!/usr/bin/env python3
"""Graba una marca de agua diagonal en las imagenes del catalogo Havana.
Lee de Imagenes-originales/ y escribe en Imagenes/, para poder re-ejecutarlo
sin apilar marcas sobre marcas.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE = Path("/Users/kale/Documents/Cumple 25/Proyectos/Havana")
SRC = BASE / "Imagenes-originales"
DST = BASE / "Imagenes"
FONT_PATH = "/System/Library/Fonts/Supplemental/Didot.ttc"

# Archivos que no llevan marca (identidad de marca, no producto)
SKIP = {"logo-havana.jpg"}

TEXT = "HAVANA LENCERÍAS"
OPACITY = 46          # relleno blanco, sobre 255 -> ~18%
# Contorno oscuro: sin esto el texto blanco se pierde sobre piel y fondos claros
STROKE_OPACITY = 34
ANGLE = 30
EXTS = {".jpg", ".jpeg", ".png"}


def make_watermark(size):
    """Genera una capa RGBA con el texto repetido en diagonal."""
    w, h = size
    # Tamaño de fuente relativo al ancho para que se vea igual en toda foto
    font_size = max(14, int(w * 0.045))
    font = ImageFont.truetype(FONT_PATH, font_size)

    # Se dibuja sobre un lienzo mayor que la foto para que al rotar
    # el texto siga cubriendo las esquinas
    diag = int((w**2 + h**2) ** 0.5) + font_size * 4
    layer = Image.new("RGBA", (diag, diag), (255, 255, 255, 0))
    draw = ImageDraw.Draw(layer)

    stroke = max(1, font_size // 22)
    bbox = draw.textbbox((0, 0), TEXT, font=font, stroke_width=stroke)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    step_x = tw + int(font_size * 3.2)
    step_y = th + int(font_size * 4.5)

    row = 0
    y = 0
    while y < diag:
        # Filas alternadas desplazadas: patrón menos rígido, más difícil de recortar
        offset = 0 if row % 2 == 0 else step_x // 2
        x = -step_x + offset
        while x < diag:
            draw.text(
                (x, y), TEXT, font=font,
                fill=(255, 255, 255, OPACITY),
                stroke_width=stroke,
                stroke_fill=(60, 30, 45, STROKE_OPACITY),
            )
            x += step_x
        y += step_y
        row += 1

    layer = layer.rotate(ANGLE, resample=Image.BICUBIC)
    left = (diag - w) // 2
    top = (diag - h) // 2
    return layer.crop((left, top, left + w, top + h))


def main():
    if not SRC.exists():
        print(f"ERROR: no existe {SRC}", file=sys.stderr)
        return 1

    files = sorted(p for p in SRC.iterdir() if p.suffix.lower() in EXTS)
    done = skipped = 0

    for path in files:
        if path.name in SKIP:
            skipped += 1
            continue
        try:
            img = Image.open(path).convert("RGBA")
            img.alpha_composite(make_watermark(img.size))
            out = DST / path.name
            img.convert("RGB").save(out, "JPEG", quality=88, optimize=True)
            done += 1
        except Exception as e:
            print(f"FALLO {path.name}: {e}", file=sys.stderr)

    print(f"Marcadas: {done} | Sin marca (logo): {skipped} | Total: {len(files)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
