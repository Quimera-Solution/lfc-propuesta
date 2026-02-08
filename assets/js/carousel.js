document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('#hero-carousel .carousel-track');
  const slides = Array.from(document.querySelectorAll('#hero-carousel .carousel-slide'));
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const indicators = Array.from(document.querySelectorAll('#hero-carousel .carousel-indicator'));
  let index = 0;
  let autoplayInterval = null;

  function update() {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
    indicators.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
      btn.style.opacity = i === index ? '1' : '0.5';
    });
  }

  function next() {
    index = (index + 1) % slides.length;
    update();
  }

  function prev() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  }

  nextBtn && nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
  prevBtn && prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

  indicators.forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.getAttribute('data-index'), 10);
      if (!Number.isNaN(i)) {
        index = i;
        update();
        resetAutoplay();
      }
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(next, 5000);
  }

  function resetAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Initialize
  update();
  startAutoplay();
});
