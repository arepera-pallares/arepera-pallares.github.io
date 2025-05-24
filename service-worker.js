const CACHE_NAME = 'arepera-pallares-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/cruces.html',
    '/bilbao.html',
    '/barakaldo.html',
    '/manifest.json',
    '/assets/images/arepa-hero.jpg',
    '/assets/images/logo-icon.jpg',
    '/assets/images/arepa-gallery-1.jpg',
    '/assets/images/cruces-hero.jpg',
    '/assets/images/cruces-gallery.jpg',
    '/assets/images/bilbao-hero.jpg',
    '/assets/images/bilbao-gallery.jpg',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/icons/maskable_icon.png',
    '/icons/apple-touch-icon.png'
];

// Install event - cache all resources
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: All files cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Error caching files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Handle navigation requests (page loads)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    // Return cached page or fallback to index.html
                    return response || caches.match('/index.html') || fetch(event.request);
                })
                .catch(() => {
                    // If offline and no cache, return index.html
                    return caches.match('/index.html');
                })
        );
        return;
    }

    // Handle all other requests (assets, etc.)
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('Service Worker: Serving from cache:', event.request.url);
                    return response;
                }

                // If not in cache, fetch from network and cache it
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache if request failed
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Add to cache for future use
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // If network fails and not in cache, show fallback
                        if (event.request.destination === 'image') {
                            // Return a placeholder for images
                            return new Response('', {
                                status: 200,
                                statusText: 'OK',
                                headers: { 'Content-Type': 'image/svg+xml' }
                            });
                        }
                        
                        // For other requests, just fail gracefully
                        return new Response('', {
                            status: 404,
                            statusText: 'Not Found'
                        });
                    });
            })
    );
});

// Handle background sync for future features
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('Service Worker: Background sync event');
        // Add background sync logic here if needed
    }
});

// Handle push notifications for future features
self.addEventListener('push', (event) => {
    if (event.data) {
        console.log('Service Worker: Push event received');
        // Add push notification logic here if needed
    }
});

// Log service worker lifecycle
console.log('Service Worker: Script loaded'); 