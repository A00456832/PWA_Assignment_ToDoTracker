self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('AssinmentDB')
            .then(function (cache) {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/styles.css',
                    '/script.js',
                    '/db.js',
                    '/manifest.json',
                    '/node_modules',
                    '/node_modules/dexie/dist/dexie.js',
                    '/node_modules/bootstrap/dist/css/bootstrap.min.css',
                    '/smu-icon-96x96.png',
                    '/favicon.ico',
                    '/icons'                    
                ])
            })
    );
    return self.clients.claim();
});

// activat service worker
self.addEventListener('activate', function (event) {
    console.log('Service worker activated', event);
})

// return cached response
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (res) {
                return res;
            })
    );
});
