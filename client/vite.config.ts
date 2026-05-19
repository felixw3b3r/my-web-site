import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 1500,
    proxy: {
      "/api": {
        target: "http://localhost:1600",
        changeOrigin: true,
      },
    },
  },
});
