/**
 * Simple Carousel - Sensei Sushi
 * ==============================
 */

class Carousel {
  constructor(element, options = {}) {
    this.carousel = element;
    this.track = element.querySelector('.carousel__track');
    this.slides = element.querySelectorAll('.carousel__slide');
    this.prevBtn = element.querySelector('.carousel__prev');
    this.nextBtn = element.querySelector('.carousel__next');
    this.dotsContainer = element.querySelector('.carousel__dots');
    
    this.options = {
      autoplay: options.autoplay || false,
      autoplayDelay: options.autoplayDelay || 5000,
      slidesPerView: options.slidesPerView || 1,
      gap: options.gap || 24,
      loop: options.loop || true,
      ...options
    };
    
    this.currentIndex = 0;
    this.slidesCount = this.slides.length;
    this.autoplayInterval = null;
    
    this.init();
  }
  
  init() {
    this.setupSlides();
    this.createDots();
    this.bindEvents();
    this.updateCarousel();
    
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }
  
  setupSlides() {
    const slideWidth = `calc((100% - ${(this.options.slidesPerView - 1) * this.options.gap}px) / ${this.options.slidesPerView})`;
    
    this.slides.forEach(slide => {
      slide.style.minWidth = slideWidth;
      slide.style.marginRight = `${this.options.gap}px`;
    });
  }
  
  createDots() {
    if (!this.dotsContainer) return;
    
    const dotsCount = Math.ceil(this.slidesCount / this.options.slidesPerView);
    
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i * this.options.slidesPerView));
      this.dotsContainer.appendChild(dot);
    }
    
    this.dots = this.dotsContainer.querySelectorAll('.carousel__dot');
  }
  
  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    
    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
    this.carousel.addEventListener('mouseleave', () => {
      if (this.options.autoplay) this.startAutoplay();
    });
    
    // Touch support
    let startX;
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.stopAutoplay();
    }, { passive: true });
    
    this.track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
      
      if (this.options.autoplay) this.startAutoplay();
    }, { passive: true });
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.options.slidesPerView;
    } else if (this.options.loop) {
      this.currentIndex = this.slidesCount - this.options.slidesPerView;
    }
    this.updateCarousel();
  }
  
  next() {
    if (this.currentIndex < this.slidesCount - this.options.slidesPerView) {
      this.currentIndex += this.options.slidesPerView;
    } else if (this.options.loop) {
      this.currentIndex = 0;
    }
    this.updateCarousel();
  }
  
  goTo(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.slidesCount - this.options.slidesPerView));
    this.updateCarousel();
  }
  
  updateCarousel() {
    const slideWidth = this.slides[0].offsetWidth + this.options.gap;
    const translateX = -(this.currentIndex * slideWidth);
    
    this.track.style.transform = `translateX(${translateX}px)`;
    
    // Update dots
    if (this.dots) {
      const activeDot = Math.floor(this.currentIndex / this.options.slidesPerView);
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeDot);
      });
    }
  }
  
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => this.next(), this.options.autoplayDelay);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(el => {
    new Carousel(el, {
      autoplay: true,
      autoplayDelay: 5000,
      slidesPerView: parseInt(el.dataset.slidesPerView) || 1,
      gap: parseInt(el.dataset.gap) || 24,
      loop: true
    });
  });
});

