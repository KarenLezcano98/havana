#!/usr/bin/env python3
"""Quita el fondo rosa del logo de Havana y lo deja en PNG transparente."""
from pathlib import Path
from PIL import Image
import numpy as np

BASE = Path("/Users/kale/Documents/Cumple 25/Proyectos/Havana")
SRC = BASE / "Imagenes-originales" / "logo-havana.jpg"
DST = BASE / "Imagenes" / "logo-havana.png"

FONDO = np.array([243, 177, 178], dtype=np.float32)
# Por debajo de T1 es fondo puro; por encima de T2 es logo puro.
# En el medio se interpola para no dejar el borde dentado.
T1, T2 = 38.0, 105.0

img = Image.open(SRC).convert("RGB")
arr = np.asarray(img).astype(np.float32)

dist = np.sqrt(((arr - FONDO) ** 2).sum(axis=2))
alpha = np.clip((dist - T1) / (T2 - T1), 0.0, 1.0)

# Los pixeles del borde son una mezcla de dorado y rosa. Si solo se les baja
# el alpha, queda un halo rosado. Se recupera el color original despejando
# el fondo de la mezcla: original = (mezcla - fondo*(1-a)) / a
a = alpha[..., None]
seguro = np.maximum(a, 1e-6)
recuperado = (arr - FONDO * (1.0 - a)) / seguro
recuperado = np.clip(recuperado, 0, 255)

rgba = np.dstack([recuperado, alpha * 255]).astype(np.uint8)
out = Image.fromarray(rgba, "RGBA")

# Se recorta al contenido real para que no arrastre aire de más en el menú
caja = out.getbbox()
if caja:
    pad = 8
    x0, y0, x1, y1 = caja
    out = out.crop((max(0, x0 - pad), max(0, y0 - pad),
                    min(out.width, x1 + pad), min(out.height, y1 + pad)))

out.save(DST, "PNG", optimize=True)
print(f"Guardado: {DST.name}  {out.size[0]}x{out.size[1]}")
print(f"Opacos: {(alpha > 0.9).sum() * 100 / alpha.size:.1f}%  |  Transparentes: {(alpha < 0.1).sum() * 100 / alpha.size:.1f}%")
