import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({ command }) => ({
    plugins: [react()],
    server: {
        proxy: command === "serve"
            ? {
                "/api": {
                    target: "http://localhost:3000", // vercel dev 실행 주소
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
