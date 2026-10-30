import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Flash Cards",
        short_name: "Flash Cards",
        description: "Estude idiomas com flashcards e a Fluently AI.",
        lang: "pt-BR",
        start_url: "/dashboard",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#161f32",
        theme_color: "#070b12",
        icons: [
          { src: "pwa/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "pwa/maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // O Piper (voz em turco: pastas onnx/piper + chunk piper-tts-web, ~100MB) não
        // entra no cache da instalação: é guardado só quando o áudio é usado (runtimeCaching)
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        globIgnores: ["onnx/**", "piper/**", "assets/piper-tts-web-*.js"],
        navigateFallback: "/index.html",
        // /api é o backend (rewrite da Vercel): nunca deve cair no index.html
        navigateFallbackDenylist: [/^\/api\//, /^\/onnx\//, /^\/piper\//],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/onnx/") ||
              url.pathname.startsWith("/piper/") ||
              url.pathname.startsWith("/assets/piper-tts-web-"),
            handler: "CacheFirst",
            options: {
              cacheName: "piper-assets",
              expiration: { maxEntries: 50 },
              cacheableResponse: { statuses: [200] },
            },
          },
        ],
      },
    }),
  ],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  preview: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
