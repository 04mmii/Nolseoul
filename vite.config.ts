import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy:
      command === "serve"
        ? {
            "/api": {
              target: "http://localhost:3000",
              changeOrigin: true,
              rewrite: (path) => path,
            },
          }
        : undefined,
  },
  build: {
    target: "es2015",
  },
}));
