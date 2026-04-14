import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",   // network access
    port: 8080,
    strictPort: true, // fail instead of try next port
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    allowedHosts: "all",
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: mode === "development", // easier debugging
    target: "esnext",          // modern build target (2026 browsers)
    minify: "esbuild",         // super fast minification
    chunkSizeWarningLimit: 1200,
  },
  define: {
    __APP_ENV__: JSON.stringify(mode),
  },
}));
