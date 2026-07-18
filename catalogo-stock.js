/* ============================================================
   HAVANA LENCERÍAS — Disponibilidad en el catálogo
   ------------------------------------------------------------
   Lee stock.js y pinta la disponibilidad en:
     · las tarjetas de subcategoría
     · el encabezado de cada prenda
     · el apartado Edición Limitada
   No requiere tocar el HTML: cada prenda se identifica por el
   id de su sección (o el href de su tarjeta), que ya existían.
   ============================================================ */
(function () {
  const productos = window.HAVANA_PRODUCTOS;
  if (!productos) return;

  const PHONE = "595982532340";

  function badge(estado) {
    const el = document.createElement("span");
    el.className = `stock-badge stock-${estado.clase}`;
    el.textContent = estado.texto;
    return el;
  }

  /* --- 1. Tarjetas de subcategoría (grilla de portada) --- */
  document.querySelectorAll(".subcategory-card").forEach((card) => {
    const id = (card.getAttribute("href") || "").replace("#", "");
    const prod = productos[id];
    if (!prod) return;

    const estado = window.havanaEstadoStock(prod.stock);
    const overlay = card.querySelector(".subcategory-overlay");
    if (overlay) overlay.insertBefore(badge(estado), overlay.firstChild);

    if (prod.limitada) {
      const tag = document.createElement("span");
      tag.className = "limitada-tag";
      tag.textContent = "Edición limitada";
      card.appendChild(tag);
    }
    if (!estado.disponible) card.classList.add("sin-stock");
  });

  /* --- 2. Encabezado de cada prenda --- */
  document.querySelectorAll(".subcategory-section").forEach((section) => {
    const prod = productos[section.id];
    if (!prod) return;

    const estado = window.havanaEstadoStock(prod.stock);
    const header = section.querySelector(".subcategory-section-header");
    if (header) {
      const linea = document.createElement("div");
      linea.className = "stock-linea";
      linea.appendChild(badge(estado));
      if (prod.limitada) {
        const tag = document.createElement("span");
        tag.className = "limitada-tag inline";
        tag.textContent = "Edición limitada";
        linea.appendChild(tag);
      }
      header.appendChild(linea);
    }

    // Agotado: se atenúa la galería y el mensaje pasa a ser de reposición
    if (!estado.disponible) {
      section.classList.add("sin-stock");
      section.querySelectorAll(".gallery-item").forEach((item) => {
        const msg = `¡Hola! Vi que el ${prod.nombre} está agotado. ¿Van a reponerlo? 💕`;
        item.setAttribute("href", `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`);
      });
    }
  });

  /* --- 3. Apartado Edición Limitada --- */
  const grid = document.getElementById("limitadaGrid");
  const seccion = document.getElementById("edicion-limitada");
  if (!grid || !seccion) return;

  const limitadas = Object.entries(productos).filter(([, p]) => p.limitada);

  // Sin prendas marcadas, la sección se oculta en vez de quedar vacía
  if (!limitadas.length) {
    seccion.style.display = "none";
    document.querySelectorAll('a[href="#edicion-limitada"]').forEach((a) => {
      a.style.display = "none";
    });
    return;
  }

  limitadas.forEach(([id, prod]) => {
    const estado = window.havanaEstadoStock(prod.stock);

    const card = document.createElement("a");
    card.className = "subcategory-card limitada-card";
    card.href = `#${id}`;
    if (!estado.disponible) card.classList.add("sin-stock");

    const img = document.createElement("img");
    img.src = prod.foto;
    img.alt = prod.nombre;
    img.loading = "lazy";
    img.onerror = function () { this.style.opacity = "0.15"; };

    const overlay = document.createElement("div");
    overlay.className = "subcategory-overlay";
    overlay.appendChild(badge(estado));

    const h3 = document.createElement("h3");
    h3.textContent = prod.nombre;

    const span = document.createElement("span");
    span.textContent = "Ver modelos";

    overlay.appendChild(h3);
    overlay.appendChild(span);

    const tag = document.createElement("span");
    tag.className = "limitada-tag";
    tag.textContent = "Edición limitada";

    card.appendChild(img);
    card.appendChild(overlay);
    card.appendChild(tag);
    grid.appendChild(card);
  });
})();
