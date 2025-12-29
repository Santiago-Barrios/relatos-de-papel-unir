import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@app": path.resolve(__dirname, "./src"),
    },
  },
});
