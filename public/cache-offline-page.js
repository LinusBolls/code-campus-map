const CACHE_NAME = 'offline-cache-v1';

const OFFLINE_PAGE = '/';

const OFFLINE_ASSETS = [
    '/_next/static/chunks/app/page.js',
    '/_next/static/chunks/app/layout.js',
    '/_next/static/chunks/main-app.js',
    '/_next/static/chunks/app-pages-internals.js',
    '/_next/static/chunks/webpack.js',
    '/_next/static/css/app/layout.css',
    '/_next/static/css/app/page.css',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([OFFLINE_PAGE, ...OFFLINE_ASSETS]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    const pathname = url.pathname;

    if (event.request.mode === 'navigate' && pathname === '/') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(OFFLINE_PAGE))
        );
    } else if (OFFLINE_ASSETS.includes(pathname)) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(pathname))
        );
    }
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            const deleteOutdatedCaches = Promise.all(
                keyList.map((key) => {
                    const isOutdatedCache = key !== CACHE_NAME;
                    if (isOutdatedCache) {
                        return caches.delete(key);
                    }
                })
            );

            return deleteOutdatedCaches.then(() => {
                return caches.open(CACHE_NAME).then((cache) => {
                    return cache.addAll([OFFLINE_PAGE, ...OFFLINE_ASSETS]);
                });
            });
        })
    );
});
