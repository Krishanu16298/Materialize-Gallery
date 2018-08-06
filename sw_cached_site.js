var cacheName = 'v1';

// Call Install event

self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
});

// Call Activate event

self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    // Remove Unwanted caches
    e.waitUntil(
        caches
            .keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName){
                            console.log('Service Worker: Clearing old cache');
                            return caches.delete(cache);
                        }
                    })
                )
            })
    );
});

// Call fetch event

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                var resClone = res.clone();
                caches
                    .open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resClone);
                    });
                return res;
            })
            .catch(err => caches.match(e.request).then(res => res))
    );
});
