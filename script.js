// Current Date Display
function updateDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const today = new Date().toLocaleDateString('es-ES', options);
        dateElement.textContent = today.charAt(0).toUpperCase() + today.slice(1);
    }
}

// Current Year Display
function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuTrigger = document.getElementById('menu-trigger');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');

    if (!menuTrigger || !mobileMenu || !mobileMenuPanel) return;

    function openMenu() {
        mobileMenu.classList.remove('hidden');
        // Small delay to allow display:block to apply before transform
        setTimeout(() => {
            mobileMenuPanel.classList.remove('-translate-x-full');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeMenuFn() {
        mobileMenuPanel.classList.add('-translate-x-full');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }

    menuTrigger.addEventListener('click', openMenu);
    closeMenu?.addEventListener('click', closeMenuFn);

    // Close on click outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMenuFn();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenuFn();
        }
    });
}

// Search Functionality - Fuse.js powered
async function initSearch() {
    const searchIcon = document.querySelector('[data-feather="search"]');
    const searchButton = searchIcon?.closest('button');
    
    if (!searchButton) return;

    // Load Fuse.js via import (ES module)
    const Fuse = (await import('fuse.js')).default;
    
    // Load search index
    const response = await fetch('./search-index.json');
    const articles = await response.json();
    
    // Fuse.js config
    const fuse = new Fuse(articles, {
      keys: ['title', 'excerpt', 'keywords', 'category'],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true
    });

    searchButton.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 p-4 sm:p-8';
        modal.innerHTML = `
            <div class="w-full max-w-3xl bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-700 max-h-[80vh] overflow-y-auto">
                <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-700">
                    <i data-feather="search" class="w-6 h-6 text-gray-400 flex-shrink-0"></i>
                    <input type="text" id="search-input" placeholder="Buscar noticias, remesas, política..." class="flex-1 bg-transparent text-xl text-white outline-none placeholder-gray-400">
                    <button id="close-search" class="p-2 hover:bg-gray-800 rounded-lg transition-colors" aria-label="Cerrar búsqueda">
                        <i data-feather="x" class="w-6 h-6"></i>
                    </button>
                </div>
                <div id="search-results" class="space-y-3 mb-6"></div>
                <div class="border-t pt-6 border-gray-700">
                    <p class="text-sm text-gray-500 mb-3 opacity-75">Búsquedas populares:</p>
                    <div class="flex flex-wrap gap-2">
                        <button class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs transition-colors" data-query="Remesas Cuba">Remesas Cuba</button>
                        <button class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs transition-colors" data-query="Dólar hoy">Dólar hoy</button>
                        <button class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs transition-colors" data-query="Política Cuba">Política Cuba</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        feather.replace();

        const input = modal.querySelector('#search-input');
        const results = modal.querySelector('#search-results');
        input.focus();

        // Search handler
        const search = (query) => {
            if (!query.trim()) {
                results.innerHTML = '<p class="text-gray-400 text-sm italic">Escribe para buscar noticias...</p>';
                return;
            }

            const result = fuse.search(query);
            if (result.length === 0) {
                results.innerHTML = '<p class="text-gray-400 text-sm italic">No se encontraron resultados. Prueba otras palabras clave.</p>';
                return;
            }

            results.innerHTML = result.map(item => {
                const article = item.item;
                return `
                    <article class="group cursor-pointer p-4 hover:bg-gray-800 rounded-xl transition-all border border-gray-800 group-hover:border-gray-600 group-hover:shadow-lg">
                        <div class="flex items-start gap-4">
                            <span class="px-2 py-1 bg-cuba-blue text-white text-xs font-bold uppercase tracking-wider rounded mt-1 flex-shrink-0">${article.category}</span>
                            <div class="flex-1 min-w-0">
                                <h3 class="font-bold text-white leading-tight group-hover:text-cuba-red transition-colors line-clamp-2 mb-1">${article.title}</h3>
                                <p class="text-gray-400 text-sm line-clamp-2 leading-relaxed">${article.excerpt}</p>
                                <a href="${article.url}" class="inline-flex items-center gap-1 text-cuba-red hover:text-red-300 font-medium mt-2 text-sm group-hover:underline">
                                    Leer más <i data-feather="arrow-right" class="w-4 h-4"></i>
                                </a>
                            </div>
                        </div>
                    </article>
                `.trim();
            }).join('');
            feather.replace();
        };

        input.addEventListener('input', (e) => search(e.target.value));

        // Popular searches
        modal.querySelectorAll('[data-query]').forEach(btn => {
            btn.addEventListener('click', () => {
                input.value = btn.dataset.query;
                search(input.value);
            });
        });

        // Close handlers
        function closeModal() {
            modal.remove();
            document.body.style.overflow = '';
        }

        modal.querySelector('#close-search').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const toggleBtn = document.querySelector('[data-feather="moon"]') || document.createElement('button');
    if (toggleBtn.tagName !== 'BUTTON') {
        const userBtn = document.querySelector('[data-feather="user"]').closest('button');
        if (userBtn) {
            userBtn.insertAdjacentHTML('afterend', `
                <button id="theme-toggle" class="p-2 hover:bg-gray-900 rounded-full transition-colors text-white relative" title="Cambiar tema" aria-label="Cambiar tema claro/oscuro">
                    <i data-feather="moon" class="w-5 h-5"></i>
                </button>
            `);
        }
    }

    const toggle = document.getElementById('theme-toggle') || toggleBtn;
    
    if (!toggle) return;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    toggle.querySelector('i').setAttribute('data-feather', savedTheme === 'dark' ? 'sun' : 'moon');

    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        const icon = toggle.querySelector('i');
        icon.setAttribute('data-feather', isDark ? 'sun' : 'moon');
        feather.replace({icons: {icon: icon}});
    });
}

// Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('opacity-0');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Reading Progress Indicator
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-cuba-red z-50 transition-all duration-100';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Article Click Tracking (simulated)
function initArticleTracking() {
    const articles = document.querySelectorAll('article');
    
    articles.forEach(article => {
        article.addEventListener('click', () => {
            const title = article.querySelector('h2, h3, h4')?.textContent || 'Artículo sin título';
            console.log(`Artículo leído: ${title}`);
            
            // Visual feedback
            article.style.transform = 'scale(0.98)';
            setTimeout(() => {
                article.style.transform = '';
            }, 150);
        });
    });
}

// Newsletter Form Handler
function initNewsletterForm() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                const button = form.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = '¡Suscrito!';
                button.classList.add('bg-green-600');
                button.classList.remove('bg-cuba-red');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('bg-green-600');
                    button.classList.add('bg-cuba-red');
                    form.reset();
                }, 3000);
            }
        });
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', async () => {
    updateDate();
    updateYear();
    initMobileMenu();
    await initSearch(); // Fuse.js async load
    initLazyLoading();
    initReadingProgress();
    initArticleTracking();
    initNewsletterForm();
    initThemeToggle();

    // Refresh Feather icons
    feather.replace();
});

// Handle visibility change (pause animations when tab is hidden)
document.addEventListener('visibilitychange', () => {
    const ticker = document.querySelector('.animate-marquee');
    if (ticker) {
        ticker.style.animationPlayState = document.hidden ? 'paused' : 'running';
    }
});