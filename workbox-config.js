// workbox-config.js
module.exports = {
    globDirectory: 'out',
    globPatterns: [
      '**/*.{html,js,css,woff2,json,png,jpg,svg,ico,txt,zip}',
    ],
    swDest: 'out/service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /^\/_next\/.*/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'next-static',
        },
      },
      {
        urlPattern: /^\/.*\.(?:png|jpg|jpeg|svg|gif|ico)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      }
    ],
    navigateFallback: '/offline.html',
  };
  