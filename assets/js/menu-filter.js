/**
 * Menu Filter - Sensei Sushi
 * ==========================
 */

class MenuFilter {
  constructor() {
    this.menuGrid = document.getElementById('menu-grid');
    this.searchInput = document.getElementById('menu-search');
    this.categoryBtns = document.querySelectorAll('[data-category-filter]');
    this.tagBtns = document.querySelectorAll('[data-tag-filter]');
    this.menuCards = document.querySelectorAll('.menu-card');
    this.categorySections = document.querySelectorAll('.menu-category-section');
    
    this.currentCategory = 'all';
    this.currentTag = null;
    this.searchTerm = '';
    
    if (this.menuGrid) {
      this.init();
    }
  }
  
  init() {
    this.bindEvents();
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
          // Show cards if they match current filters
          const shouldShow = this.shouldShowCard(card);
          if (shouldShow) {
            card.style.display = '';
            card.classList.remove('hidden');
          }
        } else {
          // Hide all cards in this section
          card.style.display = 'none';
          card.classList.add('hidden');
        }
      }
    });
  }
  
  shouldShowCard(card) {
    const category = card.dataset.category || '';
    const tags = card.dataset.tags || '';
    const title = card.querySelector('.menu-card__title')?.textContent.toLowerCase() || '';
    const description = card.querySelector('.menu-card__description')?.textContent.toLowerCase() || '';
    
    // Category check
    const categoryMatch = this.currentCategory === 'all' || category === this.currentCategory;
    
    // Tag check
    const tagMatch = !this.currentTag || tags.includes(this.currentTag);
    
    // Search check
    const searchMatch = !this.searchTerm || 
      title.includes(this.searchTerm) || 
      description.includes(this.searchTerm);
    
    return categoryMatch && tagMatch && searchMatch;
  }
  
  bindEvents() {
    // Search
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.filterMenu();
      });
    }
    
    // Category filters
    this.categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.categoryFilter;
        this.filterMenu();
      });
    });
    
    // Tag filters
    this.tagBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const wasActive = btn.classList.contains('active');
        this.tagBtns.forEach(b => b.classList.remove('active'));
        
        if (!wasActive) {
          btn.classList.add('active');
          this.currentTag = btn.dataset.tagFilter;
        } else {
          this.currentTag = null;
        }
        
        this.filterMenu();
      });
    });
  }
  
  filterMenu() {
    let visibleCount = 0;
    const categoryVisibleCount = {};
    
    // Count visible cards per category
    this.menuCards.forEach(card => {
      const category = card.dataset.category || '';
      const shouldShow = this.shouldShowCard(card);
      
      // Check if section is expanded
      const section = Array.from(this.categorySections).find(s => s.dataset.category === category);
      const button = section?.querySelector('.menu-category-section__title');
      const isExpanded = button?.getAttribute('aria-expanded') === 'true';
      
      // Show/Hide based on filters AND section expansion state
      if (shouldShow && isExpanded) {
        card.style.display = '';
        card.classList.remove('hidden');
        visibleCount++;
        
        // Count visible cards per category
        if (!categoryVisibleCount[category]) {
          categoryVisibleCount[category] = 0;
        }
        categoryVisibleCount[category]++;
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });
    
    // Show/Hide category sections based on visible cards
    this.categorySections.forEach(section => {
      const sectionCategory = section.dataset.category || '';
      const hasVisibleCards = categoryVisibleCount[sectionCategory] > 0;
      
      if (hasVisibleCards || this.currentCategory === 'all') {
        // Show section if it has visible cards OR if showing all categories
        // But only show if there are actually visible cards in that category
        if (hasVisibleCards) {
          section.style.display = '';
          section.classList.remove('hidden');
        } else {
          section.style.display = 'none';
          section.classList.add('hidden');
        }
      } else {
        section.style.display = 'none';
        section.classList.add('hidden');
      }
    });
    
    // Show empty state if no results
    this.toggleEmptyState(visibleCount === 0);
  }
  
  toggleEmptyState(show) {
    let emptyState = document.querySelector('.menu-empty');
    
    if (show && !emptyState) {
      emptyState = document.createElement('div');
      emptyState.className = 'menu-empty';
      emptyState.innerHTML = `
        <div class="menu-empty__content">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <h3>Aucun résultat</h3>
          <p>Essayez avec d'autres termes ou filtres</p>
        </div>
      `;
      this.menuGrid.appendChild(emptyState);
    } else if (!show && emptyState) {
      emptyState.remove();
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new MenuFilter();
});

