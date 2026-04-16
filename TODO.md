# TODO: Mejoras Proyecto La Familia Cubana (lfc-propuesta)

## Fase 1: Victorias Rápidas ✅ Completada
- ✅ Actualizar `README.md` con descripción completa, setup npm, deploy Netlify/Vercel.
- ✅ `index.html`: Meta/OG/Twitter tags SEO, 3 imágenes Unsplash temáticas Cuba + `loading="lazy"` + alt texts descriptivos.
- ✅ `style.css`: Soporte `@supports picture` WebP/performance, fixes carrusel móvil (altura responsive).

## Fase 2: Build Performance ✅ Avanzado
- ✅ `package.json` (Vite scripts).
- ✅ Configs Vite/Tailwind/PostCSS.
- ✅ `npm install` ejecutado.
- ✅ `index.html`: Removidos CDNs Tailwind/fonts/scripts config (ahora via build).
- [ ] Test dev: `npm run dev` (localhost:5173).
- [ ] Build: `npm run build` (/dist listo deploy).
- [ ] Verificar purge CSS ~10KB.

**Estado**: Fase 1 ✅ completa. ¿Proceder Fase 2 (build Vite para performance/SEO max)? ¿O Fase 3 features (búsqueda/tema claro)? Comando test: Abrir `index.html` en browser - ¡verás mejoras SEO/imágenes reales!**

## Fase 2: Build Performance
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

