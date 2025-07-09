const CACHE_NAME = 'petslink-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',  // Asegúrate de que esté en la raíz del proyecto
  '/style.css',
  '/app.js',        // O los archivos relevantes de tu app
  // Agrega aquí cualquier otro recurso que desees cachear
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Responder las solicitudes con los archivos cacheados o desde la red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);  // Si no está en cache, lo busca en la red
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];  // Asegúrate de que la versión del cache sea la correcta
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);  // Elimina los caches antiguos
          }
        })
      );
    })
  );
});
