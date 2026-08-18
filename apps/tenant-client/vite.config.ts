import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tscConfigPath from "vite-tsconfig-paths";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({}) => {
  return {
    plugins: [react(), tscConfigPath(), viteCompression({ algorithm: "brotliCompress" })],
    base: "/",
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    server: {
      host: true,
      port: 3001,
      strictPort: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ["src"],
          api: "legacy",
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    build: {
      sourcemap: true
    },
  };
});
