import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tscConfigPath from "vite-tsconfig-paths";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tscConfigPath(), viteCompression({ algorithm: "brotliCompress" })],
    base: "/",
    server: {
      host: true,
      port: 3000,
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
  };
});
