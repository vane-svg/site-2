# Noguera S.A.S. — Sitio web

Sitio estático (HTML + CSS + JS) de Noguera S.A.S., ejecución retail en Colombia.

## Estructura

```
index.html            página principal
proyectos.html        portafolio (se publica como /proyectos en Netlify)
styles/               site.css, portfolio.css
js/                   main.js, portfolio.js
assets/img/           imágenes de la página principal
assets/video/         hero.mp4, proyecto.mp4
assets/projects/      fotos y videos de proyectos
assets/projects/sin-usar/   fotos que ninguna página usa todavía
```

## Ejecutar en local

```bash
python3 -m http.server 8000
# http://localhost:8000  y  http://localhost:8000/proyectos.html
```

## Pendiente por revisar

- Fotos que las páginas piden y no existen: carolina antes/1/2/3, ara-lomita-2, cedi2, cedi3, cedi4, civil farmatodo, ARA-North-Point-antes.
- Correspondencias asignadas por nombre de archivo y por orden, a confirmar: FT1–FT6 (Farmatodo Navarra), cota hidro (4 fotos), cedi-cucuta.
- Los textos alternativos de PQP1–3 y FT1–6 en index.html describen otros trabajos que las fotos.
- 9 imágenes de index.html siguen cargándose desde noguera1.carrd.co.
- Teléfono y correo del JSON-LD no coinciden con los del footer.
- Varias fotos pesan más de 2 MB; conviene comprimirlas antes de publicar.

## Dependencias externas (CDN)

Remix Icon 4.2.0 (jsDelivr) y Plus Jakarta Sans (Google Fonts).
