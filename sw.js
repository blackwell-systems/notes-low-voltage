/* Service worker: makes the quiz installable and fully offline.
   Bump CACHE when you deploy new assets to retire the old cache. */
const CACHE = "cr67-v5";
const ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "questions.json",
  "guide-content.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
  "media/13198.jpg",
  "media/52587.jpg",
  "media/53612.jpg",
  "media/54582.jpg",
  "media/54583.jpg",
  "media/54584.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // only handle our own files

  // Stale-while-revalidate: serve cache instantly, refresh it in the background.
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(req).then((cached) => {
        const fromNetwork = fetch(req)
          .then((res) => {
            if (res && res.status === 200) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cached || cache.match("index.html"));
        return cached || fromNetwork;
      })
    )
  );
});
