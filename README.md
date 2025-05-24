# PWA Shell for Google Sites - Source Code Approach

A Progressive Web App (PWA) that uses extracted Google Sites source code, making them fully installable as standalone apps with complete offline capability. Hosted on GitHub Pages with full content caching.

## 🚀 New Approach - Source Code Extraction

Instead of embedding Google Sites in an iframe (which has CSP restrictions), this approach:

✅ **Extracts the actual HTML/CSS/assets** from Google Sites  
✅ **Provides full offline capability** - content AND shell work offline  
✅ **No CSP restrictions** - complete control over the content  
✅ **Better performance** - optimized loading and caching  
✅ **Enhanced mobile experience** - proper PWA implementation  

## 📁 Project Structure

```
arepera-pallares-pwa/
├── index.html              # Main entry point (cleaned INICIO.html)
├── inicio.html             # About page
├── cruces.html             # Cruces location
├── bilbao.html             # Bilbao location  
├── barakaldo.html          # Barakaldo location
├── manifest.json           # PWA configuration
├── service-worker.js       # Full offline caching
├── assets/                 # Optimized assets
│   ├── images/
│   ├── styles/
│   └── scripts/
├── icons/                  # PWA icons
└── docs/                   # Original source code (for reference)
    └── source code/
```

## 🔧 Setup Process

### 1. **Source Code Extraction** ✅ DONE
- Extracted HTML from all Google Sites pages
- Downloaded all images and assets
- Organized in `docs/source code/` folder

### 2. **Content Processing** (Next Steps)
- Clean Google-specific code from HTML files
- Optimize and organize assets in `/assets/` folder
- Create proper navigation between pages
- Add PWA meta tags and service worker registration

### 3. **PWA Implementation**
- Configure manifest.json with proper icons and colors
- Set up service worker for full offline caching
- Test installation and offline functionality

## 🎯 Key Features

- **📱 Fully Installable:** Works as standalone app on any device
- **⚡ Complete Offline:** All content cached - no internet required after first load
- **🎨 Original Design:** Preserves Google Sites styling and layout
- **🚫 No Dependencies:** Pure vanilla JavaScript, works on GitHub Pages
- **🔄 Multi-page:** Navigate between all restaurant locations offline

## 🛠️ Development Workflow

1. **Clean source HTML files** - Remove Google tracking, fix paths
2. **Organize assets** - Copy images to `/assets/`, optimize sizes
3. **Add PWA features** - Meta tags, service worker, manifest
4. **Test locally** - Verify offline functionality
5. **Deploy to GitHub Pages** - Push to repository

## ⚠️ Important Notes

- **Source Files:** Original Google Sites files in `docs/source code/` (for reference only)
- **Asset Optimization:** Images should be compressed before deployment
- **Navigation:** Internal links updated to work with static hosting
- **Performance:** Significantly faster than iframe embedding approach

## 🧪 Testing Your PWA

1. **Local Testing:** Serve files with HTTP server (not file:// protocol)
2. **Install Test:** Look for install prompt in browsers
3. **Offline Test:** Disconnect internet - all pages should work
4. **Navigation Test:** Test all internal page links work offline

## 📖 Full Documentation

See `docs/instructions.md` for complete step-by-step setup instructions. 