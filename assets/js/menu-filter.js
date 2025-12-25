/**
 * Menu Accordion - Sensei Sushi
 * =============================
 */

class MenuAccordion {
  constructor() {
    this.menuGrid = document.getElementById('menu-grid');
    this.menuCards = document.querySelectorAll('.menu-card');
    this.categorySections = document.querySelectorAll('.menu-category-section');
    
    if (this.menuGrid) {
      this.init();
    }
  }
  
  init() {
    this.initAccordions();
  }
  
  initAccordions() {
    // Initialize all sections as collapsed by default
    this.categorySections.forEach(section => {
      const button = section.querySelector('.menu-category-section__title');
      const category = section.dataset.category;
      
      if (button) {
        // Hide all cards in this section by default
        this.menuCards.forEach(card => {
          if (card.dataset.category === category) {
            card.style.display = 'none';
            card.classList.add('hidden');
          }
        });
        
        button.addEventListener('click', () => {
          this.toggleSection(section, category);
        });
      }
    });
  }
  
  toggleSection(section, category) {
    const button = section.querySelector('.menu-category-section__title');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;
    
    button.setAttribute('aria-expanded', newState);
    
    // Show/hide all cards in this category
    this.menuCards.forEach(card => {
      if (card.dataset.category === category) {
        if (newState) {
          // Show all cards in this section
          card.style.display = '';
          card.classList.remove('hidden');
        } else {
          // Hide all cards in this section
          card.style.display = 'none';
          card.classList.add('hidden');
        }
      }
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new MenuAccordion();
});

