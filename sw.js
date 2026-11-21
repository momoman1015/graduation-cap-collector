const CACHE="cap-collector-cd123835e31a";const FILES=["./assets/index-JacyaoZ_.js","./assets/index-r5j8wKXQ.css","./assets/phaser-D8At0iQG.js","./assets/rolldown-runtime-XKyaHtl9.js","./assets/solver.worker-DWEu6q8B.js","./assets/web-B9xWQYC5.js","./assets/web-D4l6o2qn.js","./assets/web-DTd49ZsD.js","./assets/web-DiaIs8Sb.js","./assets/web-okayxmr5.js","./fonts/Galmuri11-Bold.woff2","./fonts/Galmuri9.woff2","./fonts/bitmap/NOTICE.txt","./fonts/bitmap/OFL.md","./fonts/bitmap/bold.json","./fonts/bitmap/bold.png","./fonts/bitmap/bold.xml","./fonts/bitmap/regular.json","./fonts/bitmap/regular.png","./fonts/bitmap/regular.xml","./fonts/ofl.md","./icons/icon-192.png","./icons/icon-512.png","./index.html","./"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('cap-collector-')&&key!==CACHE).slice(0,-1).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const request=event.request, url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  if(url.pathname.endsWith('/version.json')) { event.respondWith(fetch(request,{cache:'no-store'})); return; }
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    if(request.mode==='navigate') {
      try {
        const response=await fetch(request,{cache:'no-store',signal:AbortSignal.timeout(3500)});
        if(!response.ok)throw Error('Navigation unavailable');
        await cache.put('./index.html',response.clone());
        await cache.put('./',response.clone());
        return response;
      } catch(error) {
        const offline=await cache.match('./index.html');
        if(offline)return offline;
        throw error;
      }
    }
    return (await cache.match(request,{ignoreVary:true}))||fetch(request);
  })());
});
