import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base path matches the GitHub Pages URL: https://<user>.github.io/kawaiilearn/
export default defineConfig({
  base: "/kawaiilearn/",
  plugins: [react(), tailwindcss()],
});
