import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "ChatBot",
        short_name: "Sri indu ChatBot",
        description: "A React app built with Vite",
        theme_color: "#317EFB",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
    }),
  ],
  server: {
    host: "0.0.0.0", // This allows access from the network
    port: 5173, // You can change this to any available port
  },
});
