// Reusable Menu Component for Location Pages
class LocationMenuComponent {
    constructor(containerId, location) {
        this.containerId = containerId;
        this.location = location;
        this.menuData = null;
        this.currentSection = 'arepas';
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        await this.loadMenuData();
        this.renderMenuComponent();
        this.setupEventListeners();
    }

    async loadMenuData() {
        try {
            const response = await fetch(`/assets/data/menu-${this.location}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.menuData = data.menu;
        } catch (error) {
            console.error('Error loading menu data:', error);
            this.showError('Error al cargar el menú. Por favor, intenta de nuevo.');
        }
    }

    renderMenuComponent() {
        if (!this.menuData) return;

        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="location-menu-component">
                <!-- Menu Header -->
                <div class="menu-header">
                    <h2>🍽️ Menú - ${this.menuData.locationName}</h2>
                    <p>Descubre nuestras deliciosas arepas venezolanas y mucho más</p>
                </div>

                <!-- Menu Navigation -->
                <div class="menu-nav" id="menu-nav-${this.location}">
                    ${this.renderSectionNav()}
                </div>

                <!-- Menu Filters -->
                <div class="menu-filters" id="menu-filters-${this.location}">
                    <button class="filter-btn active" data-filter="all">Todos</button>
                    <button class="filter-btn" data-filter="vegetarian">🌱 Vegetarianos</button>
                    <button class="filter-btn" data-filter="no-gluten">Sin Gluten</button>
                    <button class="filter-btn" data-filter="no-dairy">Sin Lácteos</button>
                </div>

                <!-- Menu Content -->
                <div class="menu-content" id="menu-content-${this.location}">
                    ${this.renderCurrentSection()}
                </div>
            </div>
        `;
    }

    renderSectionNav() {
        if (!this.menuData) return '';
        
        return this.menuData.sections.map(section => `
            <button class="menu-nav-btn ${section.id === this.currentSection ? 'active' : ''}" 
                    data-section="${section.id}" data-location="${this.location}">
                ${section.name}
            </button>
        `).join('');
    }

    renderCurrentSection() {
        if (!this.menuData) return '';

        const section = this.menuData.sections.find(s => s.id === this.currentSection);
        if (!section) return '';

        // Apply current filter to items
        let filteredItems = section.items;
        if (this.currentFilter && this.currentFilter !== 'all') {
            filteredItems = this.filterItems(section.items, this.currentFilter);
        }

        return `
            <div class="menu-section">
                <div class="section-header">
                    <h3 class="section-title">${section.name}</h3>
                    <p class="section-description">${section.description}</p>
                    ${this.currentFilter && this.currentFilter !== 'all' ? 
                        `<p class="filter-info">Mostrando: ${this.getFilterLabel(this.currentFilter)} (${filteredItems.length} elementos)</p>` : ''}
                </div>
                <div class="menu-items">
                    ${filteredItems.length > 0 ? 
                        filteredItems.map(item => this.renderMenuItem(item)).join('') :
                        '<div class="no-items">No hay elementos que coincidan con este filtro.</div>'
                    }
                </div>
            </div>
        `;
    }

    renderMenuItem(item) {
        const allergenIcons = {
            'gluten': '🌾',
            'dairy': '🥛',
            'eggs': '🥚',
            'nuts': '🥜'
        };

        const allergenLabels = {
            'gluten': 'Contiene Gluten',
            'dairy': 'Contiene Lácteos',
            'eggs': 'Contiene Huevos',
            'nuts': 'Contiene Frutos Secos'
        };

        // Handle both old format and new column-based format
        let itemData;
        if (item.columns) {
            // New format with columns (3-column: photo, content, price)
            const photoColumn = item.columns[0];
            const contentColumn = item.columns[1];
            const priceColumn = item.columns[2];
            
            itemData = {
                photo: photoColumn['product-photo'] || '',
                name: contentColumn.rows.find(row => row.name)?.name || '',
                description: contentColumn.rows.find(row => row.description)?.description || '',
                allergens: contentColumn.rows.find(row => row.allergens)?.allergens || [],
                vegetarian: contentColumn.rows.find(row => row.vegetarian)?.vegetarian || false,
                price: parseFloat(priceColumn.price) || 0
            };
        } else {
            // Old format (direct properties) - generate photo path from item id
            itemData = {
                ...item,
                photo: item.id ? `assets/images/products/${item.id}.svg` : ''
            };
        }

        const allergensHtml = itemData.allergens && itemData.allergens.length > 0 
            ? `<div class="allergens">
                ${itemData.allergens.map(allergen => 
                    `<span class="allergen-icon" title="${allergenLabels[allergen] || allergen}">
                        ${allergenIcons[allergen] || '⚠️'}
                    </span>`
                ).join('')}
               </div>`
            : '';

        const vegetarianIcon = itemData.vegetarian ? '<span class="vegetarian-icon" title="Opción Vegetariana">🌱</span>' : '';

        return `
            <div class="menu-item">
                <img src="${itemData.photo}" alt="${itemData.name}" class="item-photo" loading="lazy" onerror="this.src='assets/images/products/placeholder.svg'">
                <div class="item-content">
                    <h4 class="item-name">${itemData.name}</h4>
                    <p class="item-description">${itemData.description}</p>
                    <div class="item-tags">
                        ${vegetarianIcon}
                        ${allergensHtml}
                    </div>
                </div>
                <span class="item-price">${itemData.price.toFixed(2)}€</span>
            </div>
        `;
    }

    setupEventListeners() {
        // Section navigation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('menu-nav-btn') && e.target.dataset.location === this.location) {
                const sectionId = e.target.dataset.section;
                this.switchSection(sectionId);
            }
        });

        // Filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn') && 
                e.target.closest(`#menu-filters-${this.location}`)) {
                const filter = e.target.dataset.filter;
                this.applyFilter(filter);
            }
        });
    }

    switchSection(sectionId) {
        this.currentSection = sectionId;
        
        // Update navigation
        const navContainer = document.getElementById(`menu-nav-${this.location}`);
        if (navContainer) {
            navContainer.innerHTML = this.renderSectionNav();
        }
        
        // Update content
        const contentContainer = document.getElementById(`menu-content-${this.location}`);
        if (contentContainer) {
            contentContainer.innerHTML = this.renderCurrentSection();
        }
        
        // Maintain filter button state
        if (this.currentFilter && this.currentFilter !== 'all') {
            const activeBtn = document.querySelector(`#menu-filters-${this.location} [data-filter="${this.currentFilter}"]`);
            if (activeBtn) activeBtn.classList.add('active');
        }
    }

    applyFilter(filter) {
        // Update active filter button
        const filterBtns = document.querySelectorAll(`#menu-filters-${this.location} .filter-btn`);
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        const activeBtn = document.querySelector(`#menu-filters-${this.location} [data-filter="${filter}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Store current filter
        this.currentFilter = filter;

        // Re-render with filter applied
        const contentContainer = document.getElementById(`menu-content-${this.location}`);
        if (contentContainer) {
            contentContainer.innerHTML = this.renderCurrentSection();
        }
    }

    filterItems(items, filter) {
        switch (filter) {
            case 'vegetarian':
                return items.filter(item => item.vegetarian === true);
            case 'no-gluten':
                return items.filter(item => !item.allergens || !item.allergens.includes('gluten'));
            case 'no-dairy':
                return items.filter(item => !item.allergens || !item.allergens.includes('dairy'));
            case 'all':
            default:
                return items;
        }
    }

    getFilterLabel(filter) {
        const labels = {
            'all': 'Todos',
            'vegetarian': '🌱 Vegetarianos',
            'no-gluten': 'Sin Gluten',
            'no-dairy': 'Sin Lácteos'
        };
        return labels[filter] || filter;
    }

    showError(message) {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Error</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="retry-btn">Reintentar</button>
                </div>
            `;
        }
    }
}

// Export for use in other scripts
window.LocationMenuComponent = LocationMenuComponent; 