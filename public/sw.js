/* global self, caches, fetch */

const CACHE_VERSION = 'v2.0.0'
const CACHE_NAME = `portfolio_2.0-${CACHE_VERSION}`
const STATIC_CACHE_NAME = `portfolio-static-${CACHE_VERSION}`
const DYNAMIC_CACHE_NAME = `portfolio-dynamic-${CACHE_VERSION}`

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
]

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...', CACHE_NAME)
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting()) // Activate immediately
      .catch(error => {
        console.error('[Service Worker] Cache install failed:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...', CACHE_NAME)
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            // Delete old caches that don't match current version
            return cacheName.startsWith('portfolio_') && 
                   cacheName !== STATIC_CACHE_NAME && 
                   cacheName !== DYNAMIC_CACHE_NAME &&
                   cacheName !== CACHE_NAME
          })
          .map(cacheName => {
            console.log('[Service Worker] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          })
      )
    }).then(() => self.clients.claim()) // Take control of all pages
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  // Strategy: Cache First for static assets, Network First for API calls
  if (request.method === 'GET') {
    if (url.pathname.startsWith('/api/')) {
      // Network First for API calls
      event.respondWith(
        fetch(request)
          .then(response => {
            // Clone the response
            const responseToCache = response.clone()
            // Cache successful responses
            if (response.status === 200) {
              caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                cache.put(request, responseToCache)
              })
            }
            return response
          })
          .catch(() => {
            // Fallback to cache if network fails
            return caches.match(request)
          })
      )
    } else {
      // Cache First for static assets
      event.respondWith(
        caches.match(request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse
            }
            // Fetch from network and cache
            return fetch(request).then(response => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response
              }
              const responseToCache = response.clone()
              caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                cache.put(request, responseToCache)
              })
              return response
            })
          })
      )
    }
  }
})