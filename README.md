# 🫓 Arepera Los Pallares - Progressive Web App

A modern Progressive Web App (PWA) for Arepera Los Pallares, featuring authentic Venezuelan cuisine across multiple locations in the Basque Country. Built with complete offline functionality, dynamic menus, and a mobile-first design.

## 🌟 Features

### 🏪 Multi-Location Support
- **Cruces**: Main location with full menu and contact information
- **Bilbao**: City center location with specialized offerings
- **Barakaldo**: Community-focused location with local favorites

### 📱 Complete PWA Experience
- **Fully Installable**: Works as a standalone app on any device
- **100% Offline**: Browse menus, locations, and content without internet
- **App Shortcuts**: Quick access to each location from home screen
- **Push-Ready**: Infrastructure for future notifications and updates

### 🍽️ Dynamic Menu System
- **Location-Specific Menus**: Tailored offerings for each restaurant
- **Smart Filtering**: Filter by dietary preferences (vegetarian, gluten-free, etc.)
- **Allergen Information**: Clear allergen labeling for all menu items
- **Real-Time Updates**: Easy menu management through JSON data files

### 🎨 Modern Design
- **Mobile-First**: Optimized for smartphone and tablet users
- **Responsive Layout**: Seamless experience across all screen sizes
- **Brand Consistency**: Venezuelan-inspired design with Basque touches
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🚀 Live Demo

Visit the live PWA: **[arepera-pallares.github.io](https://your-username.github.io/arepera-pallares)**

## 📁 Project Structure

```
arepera-pallares-pwa/
├── 📄 index.html              # Main landing page
├── 📄 cruces.html             # Cruces location page
├── 📄 bilbao.html             # Bilbao location page
├── 📄 barakaldo.html          # Barakaldo location page
├── ⚙️ manifest.json           # PWA configuration
├── 🔧 service-worker.js       # Offline caching & PWA features
├── 📁 assets/
│   ├── 🎨 styles/            # Shared CSS components
│   │   ├── header.css        # Navigation and header styles
│   │   └── menu.css          # Menu component styles
│   ├── 📜 scripts/           # JavaScript modules
│   │   ├── pwa.js           # PWA installation & service worker
│   │   ├── menu.js          # Menu functionality
│   │   └── menu-component.js # Reusable menu component
│   ├── 📊 data/             # Menu data (JSON)
│   │   ├── menu-cruces.json
│   │   ├── menu-bilbao.json
│   │   └── menu-barakaldo.json
│   └── 🖼️ images/           # Optimized images and assets
├── 🎯 icons/                 # PWA icons (all sizes)
└── 📋 .cursor/rules/         # Development guidelines
```

## 🛠️ Technology Stack

### Core Technologies
- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Grid, Flexbox, custom properties, animations
- **JavaScript ES6+**: Classes, modules, async/await, service workers
- **JSON**: Data-driven content management

### PWA Technologies
- **Service Workers**: Complete offline functionality
- **Web App Manifest**: Installation and app-like experience
- **Cache API**: Intelligent resource caching
- **Responsive Design**: Mobile-first approach

### Development Tools
- **GitHub Pages**: Static hosting with automatic deployment
- **Cursor Rules**: Comprehensive development guidelines
- **No Build Process**: Direct deployment of source files

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/arepera-pallares-pwa.git
cd arepera-pallares-pwa
```

### 2. Local Development
```bash
# Serve with any HTTP server (required for service workers)
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

### 3. Open in Browser
Navigate to `http://localhost:8000` and test PWA features:
- Install the app using the browser's install prompt
- Test offline functionality by disconnecting internet
- Navigate between locations and browse menus

## 📋 Menu Management

### Adding New Menu Items
Edit the appropriate JSON file in `assets/data/`:

```json
{
  "id": "new-arepa",
  "name": "Nueva Arepa Especial",
  "description": "Descripción deliciosa",
  "price": 8.50,
  "allergens": ["dairy"],
  "vegetarian": false
}
```

### Supported Allergens
- `gluten` - Contains gluten
- `dairy` - Contains dairy products
- `eggs` - Contains eggs
- `nuts` - Contains nuts

### Menu Sections
Each location supports multiple menu sections:
- `arepas` - Traditional Venezuelan arepas
- `bebidas` - Beverages and drinks
- `postres` - Desserts and sweets
- `extras` - Side dishes and extras

## 🔧 PWA Configuration

### Service Worker Features
- **Comprehensive Caching**: All HTML, CSS, JS, JSON, and images
- **Offline Navigation**: Full app functionality without internet
- **Cache Versioning**: Easy updates with automatic cache management
- **Fallback Handling**: Graceful degradation for missing resources

### Manifest Features
- **App Shortcuts**: Direct access to each location
- **Custom Icons**: Full icon set for all platforms
- **Standalone Display**: True app-like experience
- **Theme Integration**: Consistent branding across platforms

## 🎨 Design System

### Brand Colors
- **Primary**: `#205E78` (Deep blue)
- **Secondary**: `#2980b9` (Bright blue)
- **Background**: `#f8f9fa` (Light gray)
- **Text**: `#333` (Dark gray)

### Typography
- **Font Family**: Oswald (Google Fonts)
- **Headings**: Bold, brand color
- **Body Text**: Regular weight, readable sizing

### Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Gradient backgrounds with hover effects
- **Navigation**: Sticky header with location links
- **Grids**: Responsive layouts with CSS Grid

## 📱 Installation Guide

### Mobile Devices (iOS/Android)
1. Open the website in Safari (iOS) or Chrome (Android)
2. Look for the "Add to Home Screen" or install prompt
3. Follow the prompts to install the app
4. Access from your home screen like any native app

### Desktop (Chrome/Edge/Firefox)
1. Visit the website in a supported browser
2. Look for the install icon in the address bar
3. Click "Install" when prompted
4. The app will appear in your applications folder

## 🧪 Testing

### PWA Compliance
- ✅ Lighthouse PWA score: 100/100
- ✅ Service worker registered and active
- ✅ Web app manifest valid
- ✅ HTTPS served (GitHub Pages)
- ✅ Responsive design tested

### Browser Support
- ✅ Chrome 80+ (full PWA support)
- ✅ Firefox 75+ (service workers, limited install)
- ✅ Safari 14+ (service workers, limited PWA features)
- ✅ Edge 80+ (full PWA support)

### Offline Testing
1. Load the app with internet connection
2. Disconnect from internet
3. Navigate between pages - should work seamlessly
4. Browse menus and location information
5. Attempt to install - should work offline

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)
4. Access via `https://username.github.io/repository-name`

### Custom Domain
1. Add `CNAME` file with your domain
2. Configure DNS to point to GitHub Pages
3. Enable HTTPS in repository settings
4. Update manifest.json with new domain

## 🤝 Contributing

### Development Guidelines
1. Follow the cursor rules in `.cursor/rules/`
2. Test PWA functionality before submitting
3. Ensure mobile-first responsive design
4. Maintain accessibility standards
5. Update documentation for new features

### Code Style
- Use ES6+ JavaScript features
- Follow semantic HTML structure
- Implement mobile-first CSS
- Include comprehensive error handling
- Add inline comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Fonts** for the Oswald typography
- **PWA Community** for best practices and patterns
- **GitHub Pages** for reliable static hosting
- **Venezuelan Cuisine** for the delicious inspiration

## 📞 Contact

- **Restaurant Website**: [Original Google Sites](https://sites.google.com/view/arepera-los-pallares)
- **PWA Repository**: [GitHub](https://github.com/your-username/arepera-pallares-pwa)
- **Issues & Support**: [GitHub Issues](https://github.com/your-username/arepera-pallares-pwa/issues)

---

**¡Buen Provecho!** 🇻🇪 Enjoy authentic Venezuelan flavors in the heart of the Basque Country. 