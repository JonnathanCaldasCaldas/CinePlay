import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // 2. Añade el plugin PWA
    VitePWA({
      registerType: 'autoUpdate', // Se actualiza solo
      
      // 3. Configuración del Service Worker
      // (Esto crea el archivo 'sw.js' por ti)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'], // Qué debe guardar en caché
        runtimeCaching: [
          // Caché para las imágenes de TMDB (MUY IMPORTANTE)
          {
            urlPattern: /^https:\/\/image\.tmdb\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'tmdb-images-cache',
              expiration: {
                maxEntries: 200, // Máximo 200 imágenes
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Caché para la API de RandomUser (comentarios)
          {
            urlPattern: /^https:\/\/randomuser\.me\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'randomuser-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 1 día
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      
      // 4. Configuración del "Manifest"
      // (Esto crea el 'manifest.webmanifest' por ti)
      manifest: {
        name: 'CinePlay',
        short_name: 'CinePlay',
        description: 'Tu app de películas y cartelera',
        theme_color: '#050505', // Color de la barra de título en móviles
        background_color: '#050505', // Color de la pantalla de carga (splash screen)
        start_url: '/',
        display: 'standalone', // Abre como una app, sin barra de navegador
        icons: [
          // ¡Debes crear estos íconos!
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable', // Ícono que se adapta a diferentes formas
          },
        ],
      },
    }),
  ],
})
