const CACHE_NAME = "tle-ict-learning-hub-public-student-v1";
const CORE_FILES = ["./", "./index.html", "./style.css", "./script.js", "./week1-content.js", "./week2-10-content.js", "./daily-materials.js", "./manifest.json", "./school-logo.png", "./deped-logo.png", "./division-leyte-logo.png", "./icon-192.png", "./icon-512.png"];
const LEARNING_FILES = [];
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_FILES);
    // Cache each learning file independently so one missing file does not prevent installation.
    await Promise.all(LEARNING_FILES.map(async file => { try { await cache.add(file); } catch (error) { console.warn("Could not cache", file, error); } }));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response.ok && new URL(event.request.url).origin === self.location.origin) {
        const cache = await caches.open(CACHE_NAME); cache.put(event.request, response.clone());
      }
      return response;
    } catch (error) {
      if (event.request.mode === "navigate") return caches.match("./index.html");
      throw error;
    }
  })());
});
