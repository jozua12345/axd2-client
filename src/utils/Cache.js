export const addDataIntoCache = (cacheName, url, response) => {
    const data = new Response(JSON.stringify(response))
    if ('caches' in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
        alert('Data Added into cache!')
      })
    }
  }