// 애기동자 신점 Service Worker - Offline 지원 및 캐싱
const CACHE_NAME = 'dalsindang-v1';
const urlsToCache = [
    '/ChoiseokheeProduct_01/',
    '/ChoiseokheeProduct_01/index.html',
    '/ChoiseokheeProduct_01/style.css',
    '/ChoiseokheeProduct_01/script.js',
    '/ChoiseokheeProduct_01/script_data.js',
    '/ChoiseokheeProduct_01/include.js',
    '/ChoiseokheeProduct_01/images/Fire.png'
];

// Install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// Activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(names =>
            Promise.all(
                names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch - Network first, fallback to cache
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
