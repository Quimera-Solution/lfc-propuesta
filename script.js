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

// Search Functionality
function initSearch() {
    // `:has()` is not universally supported; find the icon and get its button container instead
    const searchIcon = document.querySelector('[data-feather="search"]');
    const searchButton = searchIcon ? searchIcon.closest('button') : document.querySelector('button');

    if (!searchButton) return;

    // Only activate search if button is visible (not hidden by CSS)
    const isVisible = window.getComputedStyle(searchButton).display !== 'none';
    if (!isVisible) return;

    searchButton.addEventListener('click', () => {
        // Create and show search modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20 px-4';
        modal.innerHTML = `
            <div class="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                <div class="flex items-center gap-4 mb-4">
                    <i data-feather="search" class="w-6 h-6 text-gray-400"></i>
                    <input type="text" placeholder="Buscar noticias..." class="flex-1 text-xl outline-none">
                    <button class="p-2 hover:bg-gray-100 rounded-lg" id="close-search">
                        <i data-feather="x" class="w-6 h-6"></i>
                    </button>
                </div>
                <div class="border-t pt-4">
                    <p class="text-sm text-gray-500 mb-3">Búsquedas populares:</p>
                    <div class="flex flex-wrap gap-2">
                        <button class="px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">Remesas Cuba</button>
                        <button class="px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">Vuelos La Habana</button>
                        <button class="px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">Dólar hoy</button>
                        <button class="px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">Electricidad</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        feather.replace();

        const input = modal.querySelector('input');
        if (input) input.focus();

        // Close modal function — ensures we always remove the keydown listener
        function closeModal() {
            if (!modal.parentNode) return;
            modal.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeydown);
        }

        // Named handler so we can remove it when closing
        function onKeydown(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        }

        document.addEventListener('keydown', onKeydown);

        // Close handlers
        const closeBtn = modal.querySelector('#close-search');
        closeBtn?.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
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
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    updateYear();
    initMobileMenu();
    // initSearch(); // Temporarily disabled - search functionality causing issues on mobile
    initLazyLoading();
    initReadingProgress();
    initArticleTracking();
    initNewsletterForm();

    // Refresh Feather icons after any dynamic content
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

// Handle visibility change (pause animations when tab is hidden)
document.addEventListener('visibilitychange', () => {
    const ticker = document.querySelector('.animate-marquee');
    if (ticker) {
        ticker.style.animationPlayState = document.hidden ? 'paused' : 'running';
    }
});