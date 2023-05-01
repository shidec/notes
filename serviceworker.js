// This code executes in its own worker or thread
self.addEventListener("install", event => {
    console.log("Service worker installed");
 });
 
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

 self.addEventListener('fetch', function(event) {
   event.respondWith(async function() {
      try{
        var res = await fetch(event.request);
        var cache = await caches.open('cache');
        cache.put(event.request.url, res.clone());
        return res;
      }
      catch(error){
        return caches.match(event.request);
       }
     }());
 });