import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import Inspect from "vite-plugin-inspect";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), Inspect()],
    optimizeDeps: {
        include: ["zod", "@tanstack/react-table", "@hookform/resolvers/zod"],
    },
    server: {
        fs: {
            strict: true,
        },
        watch: {
            ignored: [
                "**/node_modules/**",
                "**/dist/**",
                "**/public/assets/**",
            ],
        },
    },
    cacheDir: "node_modules/.vite-cache",
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                },
                chunkFileNames: "assets/[name]-[hash].js",
                entryFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash][extname]",
            },
        },
        chunkSizeWarningLimit: 1000,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
