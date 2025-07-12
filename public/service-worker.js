const CACHE_NAME = 'vapear-cache-v1';
const imageUrls = [
  "https://cvzhpgstiuclkavfidpu.supabase.co/storage/v1/object/public/avatar/gorra-vapear.jpg",
  "https://cvzhpgstiuclkavfidpu.supabase.co/storage/v1/object/public/avatar/pines-vapear.jpg"
  // Agrega más URLs de imágenes si es necesario
];

const urlsToCache = [
  '/', // La página principal
  '/index.html', // Asegúrate de que index.html esté disponible
  '/favicon.ico', // Asegúrate de que favicon.ico esté disponible
  '/manifest.json', // Asegúrate de que manifest.json esté disponible
  '/style.css', // Asegúrate de que style.css esté disponible
  '/static/js/main.js', // Cambiar /app.js por /static/js/main.js o el archivo adecuado
  ...imageUrls, // Añadir las URLs de las imágenes
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache)
          .catch((error) => {
            console.error('Error al cachear archivos:', error);  // Mejor manejo de errores
          });
      })
      .catch((error) => {
        console.error('Error al abrir el cache:', error);  // Manejo de errores en la apertura del cache
      })
  );
});

// Responder las solicitudes con los archivos cacheados o desde la red
self.addEventListener('fetch', (event) => {
  // Si es una solicitud de una imagen, asegurarse de que se cachee
  if (event.request.url.includes('/storage/v1/object/public/avatar/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Si está en cache, devolverlo, si no, buscarlo en la red
        return response || fetch(event.request).then((networkResponse) => {
          // Si la solicitud de la red tiene éxito, cachear el recurso
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        });
      })
    );
  } else {
    // Para otras solicitudes, usar el comportamiento estándar
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eliminar cachés antiguos que no estén en la lista blanca
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
