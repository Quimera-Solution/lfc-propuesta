# La Familia Cubana - lfc-propuesta 🚀

## 📖 Descripción
Sitio web de noticias moderno para la comunidad cubana y diaspora. Portal estilo CNN/NBC con tema oscuro, ticker de noticias urgentes, carrusel hero, grillas categorizadas (Política, Economía, Cultura), newsletter y footer completo. 

**Características principales:**
- ✅ Diseño responsive mobile-first
- ✅ Carrusel autoplay con controles
- ✅ Menú hamburguesa fluido
- ✅ Animaciones suaves (marquee, hovers)
- ✅ Barra de progreso de lectura
- ✅ Lazy loading imágenes
- ✅ Accesibilidad (focus-visible, reduced-motion)
- ✅ Newsletter signup funcional
- ✅ Optimizado print/PDF

**Tema:** Noticias Cuba (remesas, política, economía, cultura, deportes, turismo).

## 🚀 Instalación Rápida (5 min)
1. Clona el repo:
   ```
   git clone https://github.com/tu-user/lfc-propuesta.git
   cd lfc-propuesta
   ```

2. **Modo Desarrollo** (con build optimizado - recomendado):
   ```
   npm install
   npm run dev    # http://localhost:5173
   ```

3. **Vista estática** (sin build):
   - Abre `index.html` en browser.

## 🔧 Configuración Desarrollo (Opcional)
Instala dependencias para build prod:
```
npm install
npm run build   # genera /dist optimizado
npm run preview # preview build
```

### Scripts npm:
- `dev` - Servidor dev con hot reload
- `build` - Build prod (Tailwind purgado, JS/CSS minificado)
- `preview` - Preview build local

## 📱 Demo
- [Sitio Live](https://tu-deploy.netlify.app) (actualizar con tu deploy)
- Assets locales: logos SVG, banners (agregar videos/thumbnails).

## 🛠️ Estructura Archivos
```
lfc-propuesta/
├── index.html       # Layout principal
├── style.css        # Estilos custom + Tailwind
├── script.js        # Funcionalidad principal
├── assets/js/carousel.js  # Carrusel hero
├── README.md        # 👈 Este archivo
├── TODO.md          # Progreso mejoras
├── package.json     # Build tools (Fase 2)
└── assets/          # Imágenes, videos, logos
```

## 🚀 Deploy Fácil (Gratis)
### Netlify (Recomendado - 2 min):
1. Arrastra carpeta `/dist` (o raíz) a [netlify.com/drop](https://app.netlify.com/drop)
2. ✅ HTTPS auto, CDN global, forms gratis.

### Vercel:
```
npm i -g vercel
vercel --prod
```

### GitHub Pages:
Settings > Pages > Deploy from branch `main`.

## 📈 Próximas Mejoras (ver TODO.md)
- Fase 1: Meta/SEO + contenido real
- Fase 2: Build Vite/Tailwind local
- Fase 3: Búsqueda Fuse.js + PWA
- Fase 4: Artículos reales + deploy

## 🤝 Contribuir
1. Fork → clone → crea branch `feature/xxx`
2. Commits claros → PR a `main`
3. Issues bienvenidos.

## 📄 Licencia
MIT - Usa libremente.

**Desarrollado con ❤️ para la comunidad cubana.**

