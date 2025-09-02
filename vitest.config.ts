/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import RubyPlugin from "vite-plugin-ruby";

export default defineConfig({
  plugins: [react(), tailwindcss(), RubyPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["setup.ts"],
  },
});
