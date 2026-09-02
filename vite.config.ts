import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project below /<repository>/, not the domain root.
  // Relative URLs also work when opening the committed build from docs/ directly.
  base: "./",
  build: {
    // Pages can serve only the repository-root docs/ folder. This app lives one
    // level below the repository root, hence the parent-directory reference.
    outDir: "../docs"
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
