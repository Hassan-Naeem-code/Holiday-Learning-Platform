const CACHE_NAME = 'holiday-learning-v1'
const urlsToCache = [
  '/',
  '/dashboard',
  '/progress',
  '/achievements',
  '/manifest.json',
]

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

// Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch with cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch new
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          // Don't cache POST requests or non-GET methods
          if (
            event.request.method !== 'GET' ||
            !fetchResponse ||
            fetchResponse.status !== 200 ||
            fetchResponse.type !== 'basic'
          ) {
            return fetchResponse
          }

          // Clone the response
          const responseToCache = fetchResponse.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return fetchResponse
        })
      )
    })
  )
})

// Handle offline functionality
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/')
      })
    )
  }
})
