# TODO: Mejoras Proyecto La Familia Cubana (lfc-propuesta)

## Fase 1: Victorias Rápidas ✅ Completada
- ✅ Actualizar `README.md` con descripción completa, setup npm, deploy Netlify/Vercel.
- ✅ `index.html`: Meta/OG/Twitter tags SEO, 3 imágenes Unsplash temáticas Cuba + `loading="lazy"` + alt texts descriptivos.
- ✅ `style.css`: Soporte `@supports picture` WebP/performance, fixes carrusel móvil (altura responsive).

## Fase 2: Build Performance ✅ Completada
- ✅ `package.json` (Vite scripts).
- ✅ Configs `vite.config.js`/`tailwind.config.js`/`postcss.config.js` (Cuba theme, purge paths).
- ✅ `npm install` ejecutado (vite^5, tailwind^3, postcss, autoprefixer).
- ✅ `index.html`: Migrado CDNs → Vite imports/build.
- ✅ Test dev: `npm run dev` (localhost:3000 running).
- ✅ Build prod: `npm run build` → /dist (CSS 3.96KB gzip, JS 1.75KB, total ~15KB).
- ✅ Lighthouse ready (performance 95+ expected).

**Estado**: Fases 1-2 ✅ completadas. Frontend optimizado listo deploy. Dev server: http://localhost:3000**

## Fase 3: Funciones Avanzadas (Próxima)

- [ ] Crear `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`.
- [ ] Instalar deps: `npm install`.
- [ ] Migrar Tailwind CDN a build local (purge/minify).
- [ ] Test: `npm run dev` / `npm run build`.

## Fase 3: Funciones Avanzadas
- [ ] `script.js`: Reactivar búsqueda (Fuse.js), toggle tema claro/oscuro.
- [ ] Crear `search-index.json`.
- [ ] PWA: `manifest.json`, service worker.

## Fase 4: Contenido/SEO/Deploy
- [ ] Agregar artículos reales (5 páginas?).
- [ ] Schema markup, sitemap.xml, robots.txt.
- [ ] Optimizar assets (WebP, thumbnails).
- [ ] Deploy Netlify/Vercel.
- [ ] Lighthouse audit (95+ scores).

**Estado**: Fase 1 en progreso - Próximo: index.html**

