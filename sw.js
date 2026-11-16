const CACHE='gf-9a6c448f89';
const FILES=['./','index.html','pdfjs/pdf.min.mjs','pdfjs/pdf.worker.min.mjs','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Red primero (para recibir actualizaciones); si no hay conexión, la copia guardada.
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||/\.mp4($|\?)/.test(e.request.url)||e.request.headers.get('range'))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
});
