/* ============================================================
   HAVANA LENCERÍAS — CONTROL DE STOCK
   ------------------------------------------------------------
   Este archivo es la ÚNICA fuente de verdad del stock.
   No hace falta editarlo a mano: usá el panel privado
   (panel.html), ajustá las cantidades y descargá el archivo
   actualizado para reemplazar este mismo.

   Campos de cada prenda:
     nombre    -> como se muestra a la clienta
     categoria -> Conjuntos | Baby dolls | Línea Sexy | Body
     foto      -> imagen principal (se usa en Edición Limitada)
     stock     -> unidades disponibles
     limitada  -> true = aparece en el apartado Edición Limitada
   ============================================================ */

const HAVANA_CONFIG = {
  // Con esta cantidad o menos, el panel avisa "stock bajo"
  umbralStockBajo: 2,
};

const HAVANA_PRODUCTOS = {
  /* ---------- CONJUNTOS ---------- */
  "conjunto-rosa": {
    nombre: "Conjunto Rosa",
    categoria: "Conjuntos",
    foto: "Imagenes/conjunto-rosa1.jpg",
    stock: 3,
    limitada: false,
  },
  "conjunto-negro": {
    nombre: "Conjunto Negro",
    categoria: "Conjuntos",
    foto: "Imagenes/conjunto-negro2.jpg",
    stock: 3,
    limitada: false,
  },
  "conjunto-blanco": {
    nombre: "Conjunto Blanco",
    categoria: "Conjuntos",
    foto: "Imagenes/conjunto-blanco2.jpg",
    stock: 3,
    limitada: false,
  },
  "conjunto-rojo": {
    nombre: "Conjunto Rojo",
    categoria: "Conjuntos",
    foto: "Imagenes/conjunto-rojo2.jpg",
    stock: 3,
    limitada: false,
  },
  "conjunto-negro-2": {
    nombre: "Conjunto Negro 2",
    categoria: "Conjuntos",
    foto: "Imagenes/conjunto-negro-2.jpg",
    stock: 2,
    limitada: true,
  },

  /* ---------- BABY DOLLS ---------- */
  "babydolls-1": {
    nombre: "Baby dolls 1",
    categoria: "Baby dolls",
    foto: "Imagenes/Babydolls11.jpg",
    stock: 3,
    limitada: false,
  },
  "babydolls-azul": {
    nombre: "Baby dolls Azul",
    categoria: "Baby dolls",
    foto: "Imagenes/Babydollsazul1.jpg",
    stock: 3,
    limitada: false,
  },
  "babydolls-2": {
    nombre: "Baby dolls 2",
    categoria: "Baby dolls",
    foto: "Imagenes/Babydolls1.jpg",
    stock: 3,
    limitada: false,
  },
  "babydolls-rosa": {
    nombre: "Baby dolls Rosa",
    categoria: "Baby dolls",
    foto: "Imagenes/Babydollsrosa1.jpg",
    stock: 3,
    limitada: false,
  },
  "babydolls-blanco": {
    nombre: "Baby dolls Blanco",
    categoria: "Baby dolls",
    foto: "Imagenes/Babydollsblanco1.jpg",
    stock: 3,
    limitada: false,
  },
  "babydolls-negro": {
    nombre: "Baby dolls Negro",
    categoria: "Baby dolls",
    foto: "Imagenes/Babydollsnegro1.jpg",
    stock: 3,
    limitada: false,
  },
  "babydolls-negro-largo": {
    nombre: "Baby dolls Negro Largo",
    categoria: "Baby dolls",
    foto: "Imagenes/Babydollsnegrolargo1.jpg",
    stock: 3,
    limitada: false,
  },
  "babydolls-azul-marino": {
    nombre: "Baby dolls Azul Marino",
    categoria: "Baby dolls",
    foto: "Imagenes/babyazulmarino1.jpg",
    stock: 3,
    limitada: false,
  },

  /* ---------- LÍNEA SEXY ---------- */
  "sexy-enfermera": {
    nombre: "Enfermera",
    categoria: "Línea Sexy",
    foto: "Imagenes/enfermera1.jpg",
    stock: 3,
    limitada: false,
  },
  "sexy-colegiala": {
    nombre: "Colegiala",
    categoria: "Línea Sexy",
    foto: "Imagenes/colegiala1.jpg",
    stock: 3,
    limitada: false,
  },
  "sexy-conejita-negro": {
    nombre: "Conejita Negro",
    categoria: "Línea Sexy",
    foto: "Imagenes/conejitanegro1.jpg",
    stock: 3,
    limitada: false,
  },
  "sexy-arnes": {
    nombre: "Arnés de cuerpo",
    categoria: "Línea Sexy",
    foto: "Imagenes/arnes1.jpg",
    stock: 3,
    limitada: false,
  },
  "sexy-conejita": {
    nombre: "Conejita",
    categoria: "Línea Sexy",
    foto: "Imagenes/conejita1.jpg",
    stock: 3,
    limitada: false,
  },
  "sexy-kitsumisa": {
    nombre: "Kit Sumisa",
    categoria: "Línea Sexy",
    foto: "Imagenes/kitsumisa1.jpg",
    stock: 1,
    limitada: true,
  },
  "sexy-latigo": {
    nombre: "Látigo",
    categoria: "Línea Sexy",
    foto: "Imagenes/latigo1.jpg",
    stock: 2,
    limitada: false,
  },

  /* ---------- BODY ---------- */
  "body-1": {
    nombre: "Body 1",
    categoria: "Body",
    foto: "Imagenes/body1.jpg",
    stock: 3,
    limitada: false,
  },
  "body-rojo": {
    nombre: "Body Rojo",
    categoria: "Body",
    foto: "Imagenes/bodyrojo1.jpg",
    stock: 3,
    limitada: true,
  },
  "body-negro": {
    nombre: "Body Negro",
    categoria: "Body",
    foto: "Imagenes/bodynegro1.jpg",
    stock: 3,
    limitada: false,
  },
};

/* ------------------------------------------------------------
   Traduce un número de stock al cartelito que ve la clienta.
   ------------------------------------------------------------ */
function havanaEstadoStock(stock) {
  if (stock <= 0) return { texto: "Agotado", clase: "agotado", disponible: false };
  if (stock === 1) return { texto: "¡Última unidad!", clase: "critico", disponible: true };
  if (stock === 2) return { texto: "Últimas 2 unidades", clase: "bajo", disponible: true };
  return { texto: `${stock} disponibles`, clase: "ok", disponible: true };
}

// Disponible tanto para las páginas como para el panel
if (typeof window !== "undefined") {
  window.HAVANA_PRODUCTOS = HAVANA_PRODUCTOS;
  window.HAVANA_CONFIG = HAVANA_CONFIG;
  window.havanaEstadoStock = havanaEstadoStock;
}
