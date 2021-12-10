const CACHE_ID = "MIND_AND_BODY_CONTROL_APP";
const cachedFiles = [
    "/mind-and-body-control/index.html",
    "/mind-and-body-control/favicon-256x256.png",
    "/mind-and-body-control/favicon-512x512.png",
    "/mind-and-body-control/favicon.ico",
    "/mind-and-body-control/js/app.js",
    "/mind-and-body-control/js/chunk-vendors.js",
    "/mind-and-body-control/Roboto-Regular.ttf",
];

self.addEventListener("install", event => {
    console.log("(*) Instalando app «Mind and Body Control» en caché del navegador.");
    const waiter = async () => {
        const cache = await caches.open(CACHE_ID);
        console.log("(*) Cacheando los contenidos (" + cachedFiles.length + ")");
        await cache.addAll(cachedFiles);
    };
    event.waitUntil(waiter());
});

self.addEventListener("fetch", event => {
    console.log("(*) Cargando recurso: " + event.request.url);
    const fetcher = async () => {
        const resource = await caches.match(event.request);
        if(resource) {
            return resource;
        }
        console.log("(*) Cacheando recurso: " + event.request.url);
        const response = await fetch(event.request);
        const cache = await caches.open(CACHE_ID);
        cache.put(event.request, response.clone());
        return response;
    };
    event.respondWith(fetcher());
});