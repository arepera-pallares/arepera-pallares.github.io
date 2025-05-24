# PWA Shell for Google Sites on GitHub Pages

This guide provides step-by-step instructions to convert your Google Sites page into an installable Progressive Web App (PWA) shell, hosted for free on GitHub Pages. This PWA will act as a dedicated app-like browser for your Google Sites page.

**Important Note:** This PWA shell will cache itself for offline access, but the content of your Google Sites page (which is loaded inside an iframe) will still require an internet connection to display dynamically, due to browser security policies (Same-Origin Policy).

---

## Prerequisites

1. **Your Google Sites Page URL:** Ensure your Google Sites page is published and you have its public URL.
2. **GitHub Account:** You need an active GitHub account.
3. **Basic Text Editor:** For creating and editing files (e.g., VS Code, Notepad++, Sublime Text).
4. **Git Installed (Recommended):** For easier management of your code on GitHub via the command line. Download it from [git-scm.com](https://git-scm.com/).

---

## Part 1: Prepare Your PWA Shell Code

You will create three essential files (`index.html`, `manifest.json`, `service-worker.js`) and an `icons` folder.

### 1. Create `index.html`

This is the main entry point of your PWA. It embeds your Google Sites page.

- Create a new file named `index.html`.
- Paste the following code into it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Google Site PWA</title>
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#FFFFFF">
    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
    <style>
        body {
            margin: 0;
            overflow: hidden; /* Prevent scrollbars on body */
            display: flex;
            flex-direction: column;
            height: 100vh; /* Full viewport height */
            width: 100vw; /* Full viewport width */
        }
        #googleSiteIframe {
            flex-grow: 1; /* Make iframe fill available space */
            border: none;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <iframe id="googleSiteIframe" src="YOUR_GOOGLE_SITE_URL_HERE"></iframe>

    <script>
        // Register the Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('Service Worker registered successfully:', registration);
                    })
                    .catch(error => {
                        console.error('Service Worker registration failed:', error);
                    });
            });
        }
    </script>
</body>
</html>
```

- **Customization:**
  - Replace `YOUR_GOOGLE_SITE_URL_HERE` with your actual Google Sites public URL (e.g., `https://sites.google.com/view/my-awesome-site`).
  - Update the `<title>` tag to your desired PWA name.
  - Adjust `meta name="theme-color"` to match your branding.

### 2. Create `manifest.json`

This file describes your PWA's appearance and behavior.

- Create a new file named `manifest.json`.
- Paste the following code into it:

```json
{
  "name": "My Google Site App",
  "short_name": "GoogleSiteApp",
  "description": "An installable app for my Google Sites page.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/maskable_icon.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

- **Customization:**
  - Update `"name"`, `"short_name"`, and `"description"`.
  - Adjust `"background_color"` and `"theme_color"` to your preference.
  - The `icons` paths assume an `/icons/` folder at the root.

### 3. Create `service-worker.js`

This script enables the PWA's offline caching for the shell itself.

- Create a new file named `service-worker.js`.
- Paste the following code into it:

```javascript
const CACHE_NAME = 'google-site-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    // Add your PWA icons here
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/icons/maskable_icon.png',
    '/icons/apple-touch-icon.png' // If you include this one
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    // Serve cached assets for the PWA shell
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
    // Important: Requests for content inside the iframe (Google Sites) are cross-origin
    // and cannot be intercepted or cached by this service worker due to security policies.
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
```

- **Important:** Ensure `urlsToCache` includes all your PWA shell files (especially all icon paths).

### 4. Prepare Your PWA Icons

These icons will be used on the home screen, splash screen, and other places.

- Create a new folder named `icons` in the same directory as your `index.html` file.
- Generate (or create) the following PNG icon files and place them inside the `icons` folder:
  - `icon-192x192.png` (192x192 pixels)
  - `icon-512x512.png` (512x512 pixels)
  - `maskable_icon.png` (at least 192x192 pixels, designed for various shapes)
  - `apple-touch-icon.png` (typically 180x180 pixels, for iOS home screen icon)

*Tip: Use online PWA icon generators to quickly create these from a single source image.*

### Your Local PWA Shell Directory Structure

Your project folder should now look like this:

```text
my-google-site-pwa/
├── index.html
├── manifest.json
├── service-worker.js
└── icons/
    ├── icon-192x192.png
    ├── icon-512x512.png
    ├── maskable_icon.png
    └── apple-touch-icon.png
```

## Part 2: Publish Your PWA to GitHub Pages

Now, you'll upload your PWA shell to GitHub and enable hosting.

### 1. Create a New GitHub Repository

1. Go to [github.com](https://github.com/) and log in.
2. Click the **"+"** sign (top-right) and select **"New repository."**
3. **Repository name:**
   - For a **project page** (e.g., `yourusername.github.io/my-pwa/`): Choose any descriptive name (e.g., `google-site-pwa`).
   - For a **user/organization page** (e.g., `yourusername.github.io/`): The repository *must* be named `yourusername.github.io`.
4. **Description (Optional):** Add a brief description.
5. **Public/Private:** Select **"Public"** (GitHub Pages free tier requires public repos).
6. Check **"Add a README file"**.
7. Click **"Create repository."**

### 2. Upload Your PWA Files to the Repository (Using Git Command Line)

This is the recommended method for developers.

1. **Open your terminal or command prompt.**
2. **Navigate to your PWA shell's root folder** (e.g., `my-google-site-pwa`):

   ```bash
   cd path/to/your/my-google-site-pwa
   ```

3. **Initialize a new Git repository:**

   ```bash
   git init
   ```

4. **Add all files to the staging area:**

   ```bash
   git add .
   ```

5. **Commit your changes:**

   ```bash
   git commit -m "Initial PWA shell for Google Sites"
   ```

6. **Connect to your GitHub repository:**
   - Go to your new GitHub repository in your web browser.
   - Click the green **"<> Code"** button.
   - Copy the HTTPS URL (e.g., `https://github.com/yourusername/your-repo-name.git`).
   - In your terminal, run:

     ```bash
     git remote add origin YOUR_REPOSITORY_HTTPS_URL
     ```

     (Replace `YOUR_REPOSITORY_HTTPS_URL` with the URL you copied.)

7. **Push your code to GitHub:**

   ```bash
   git push -u origin main
   ```

   (Use `master` instead of `main` if that's your default branch name.)

---

## Part 3: Access and Test Your PWA

1. **Wait for Deployment:** GitHub Pages will now build and deploy your site. This typically takes a few minutes.
2. **Get Your URL:** Refresh the "Pages" settings page. You will see a message like: "Your site is published at `https://yourusername.github.io/your-repo-name/`" (or `https://yourusername.github.io/`).
3. **Open in Browser:** Click on the provided URL to access your PWA.

### Crucial Testing Steps

1. **Google Site Loads:** Confirm your Google Sites page loads correctly within the PWA shell.
2. **PWA Installability:**
   - **Desktop (Chrome/Edge):** Look for the "install" icon in the address bar (monitor with download arrow or plus sign). Click it to install.
   - **Android (Chrome):** You might see an "Add to Home Screen" prompt, or find it in the browser's menu (three dots).
   - **iOS (Safari):** Tap the Share button (square with an arrow pointing up), then scroll and tap "Add to Home Screen."
3. **Standalone Mode:** After installing, launch the PWA from your home screen/applications list. It should open without browser UI elements (address bar, tabs).
4. **Developer Tools (Inspect PWA Status):**
   - Right-click on your PWA page and select "Inspect" (or "Inspect Element").
   - Go to the **"Application"** tab.
     - **Manifest:** Verify your `manifest.json` is loaded correctly.
     - **Service Workers:** Ensure your `service-worker.js` is "activated and running."
     - **Cache Storage:** Confirm `google-site-pwa-cache-v1` (or your cache name) is present with your shell files.
5. **Offline Test (Important):**
   - In Developer Tools, go to the **"Network"** tab.
   - Change the "Throttling" dropdown to **"Offline."**
   - **Refresh your PWA page.** The PWA *shell* (`index.html`, `manifest.json`, icons) should load instantly from cache.
   - **Observe Google Site content:** The content inside the iframe (your Google Sites page) will likely show a "no internet connection" message or fail to load, as it relies on Google's live servers and cannot be cached by your service worker. This is expected.
