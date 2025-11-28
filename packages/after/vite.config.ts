import { defineConfig } from "vite";
import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const base: string = process.env.NODE_ENV === "production" ? "/front_7th_chapter3-1/" : "";
// https://vite.dev/config/
export default mergeConfig(
  defineConfig({
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      css: true,
    },
  })
);
