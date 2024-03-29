const CACHE_NAME="pwa_mardhiyah";
var urlsToCache = [
    "/",
    "manifest.json",
    "/nav.html",
    "/icon.png",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/produk.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/img/1.jpeg",
    "/img/2.jpeg",
    "/img/3.jpeg",
    "/img/4.jpeg",
    "/img/5.jpeg",
    "/img/6.jpeg"
];


self.addEventListener("install", function(event){

    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName : CACHE_NAME})
            .then(function(response){
                if(response) {
                    console.log("ServiceWorker : Gunakan aset dari cache : ", response.url);
                    return response;
                }

                console.log (
                    "ServiceWorker : Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
         );
    });

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker : cache " + cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});