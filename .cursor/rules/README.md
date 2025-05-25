# Cursor Rules for Arepera Los Pallares PWA

This directory contains comprehensive cursor rules for developing and maintaining the Arepera Los Pallares Progressive Web App. These rules ensure consistency, best practices, and proper PWA implementation across the entire project.

## Rules Files Overview

### 1. `pwa-general.mdc` - Core PWA Architecture
- **Purpose**: Defines the overall project architecture and development principles
- **Covers**: Project structure, core technologies, development guidelines
- **Key Focus**: Modern JavaScript, component architecture, full offline capability

### 2. `service-worker.mdc` - Service Worker Implementation
- **Purpose**: Guidelines for comprehensive offline caching strategy
- **Covers**: Cache management, event handlers, performance optimization
- **Key Focus**: Complete offline functionality, cache versioning, error handling

### 3. `manifest.mdc` - PWA Manifest Configuration
- **Purpose**: Web App Manifest best practices for restaurant PWA
- **Covers**: Icons, shortcuts, metadata, GitHub Pages compatibility
- **Key Focus**: Multi-location shortcuts, restaurant-specific features

### 4. `menu-component.mdc` - Dynamic Menu System
- **Purpose**: Guidelines for the location-based menu component system
- **Covers**: ES6 classes, JSON data structure, filtering, accessibility
- **Key Focus**: Reusable components, dynamic content, user experience

### 5. `styling-patterns.mdc` - CSS Design System
- **Purpose**: Consistent styling patterns and design system
- **Covers**: Brand colors, layout patterns, responsive design, animations
- **Key Focus**: Brand consistency, mobile-first design, performance

### 6. `html-structure.mdc` - Semantic HTML Patterns
- **Purpose**: HTML structure and accessibility guidelines
- **Covers**: Document structure, semantic elements, PWA meta tags
- **Key Focus**: Accessibility, SEO, progressive enhancement

## How to Use These Rules

### For New Development
1. Start with `pwa-general.mdc` for overall architecture guidance
2. Use `html-structure.mdc` for page structure and semantic markup
3. Apply `styling-patterns.mdc` for consistent visual design
4. Implement `menu-component.mdc` patterns for dynamic functionality
5. Follow `service-worker.mdc` for offline capabilities
6. Configure `manifest.mdc` for PWA features

### For Maintenance and Updates
- Reference the appropriate rule file based on the component you're working on
- Ensure changes maintain consistency with established patterns
- Update rules files when introducing new patterns or components

### For Code Reviews
- Check that new code follows the patterns defined in these rules
- Verify PWA features are properly implemented according to the guidelines
- Ensure accessibility and performance standards are met

## Project-Specific Context

This PWA is specifically designed for:
- **Multi-location restaurant** (Cruces, Bilbao, Barakaldo)
- **Venezuelan cuisine** (arepas and traditional dishes)
- **Spanish-speaking audience** in the Basque Country
- **Complete offline functionality** for menu browsing
- **Mobile-first experience** for restaurant customers

## Key Technologies Covered

- **HTML5**: Semantic structure, accessibility, PWA meta tags
- **CSS3**: Grid, Flexbox, custom properties, responsive design
- **JavaScript ES6+**: Classes, modules, async/await, service workers
- **JSON**: Menu data structure, PWA manifest configuration
- **PWA APIs**: Service Workers, Web App Manifest, installation prompts

## Maintenance Notes

- **Update cache version** in service worker when making significant changes
- **Test offline functionality** after any service worker modifications
- **Validate manifest** after adding new features or shortcuts
- **Check responsive design** on multiple devices and screen sizes
- **Verify accessibility** with screen readers and keyboard navigation

## Related Documentation

- Main project README: `../../README.md`
- Service Worker implementation: `../../service-worker.js`
- PWA Manifest: `../../manifest.json`
- Menu component: `../../assets/scripts/menu-component.js` 