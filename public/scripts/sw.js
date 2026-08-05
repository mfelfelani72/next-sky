/*
 * @Author: Mohammad mfelfelani72@gmail.com
 * @Date: 2026-02-24 13:25:42
 * @LastEditors: Mohammad mfelfelani72@gmail.com
 * @LastEditTime: 2026-02-25 13:26:59
 * @FilePath: /next-sky-dev/scripts/sw.js
 * @Description: 
 */


const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/offline'
];

// Install service worker

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  self.skipWaiting();
});

// Activate service worker

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(clients.claim());
});

// Handle fetch requests

self.addEventListener('fetch', (event) => {
 
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return from cache if found
        if (response) {
          return response;
        }
        
        // Fetch from network if not in cache
        return fetch(event.request)
          .then((response) => {
            // Check if response is valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Save to cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});