// vite.config.js
// ─────────────────────────────────────────────────────────────
// PURPOSE: Configure Vite (the build tool for our React app)
//
// WHAT IS VITE?
//  Vite is a fast development server + build tool.
//  - In development: serves your React files instantly with hot reload
//    (changes appear in browser without refreshing!)
//  - In production: bundles all your JS/CSS into optimised static files
//
// WHAT IS A PROXY?
//  During development, frontend is on port 5173, backend on 5000.
//  If frontend calls "/api/...", Vite forwards it to port 5000.
//  This avoids CORS issues in development.
// ─────────────────────────────────────────────────────────────

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Enables React JSX transformation

  server: {
    port: 5173, // Frontend dev server port
    proxy: {
      // Any request starting with /api → forward to backend
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true, // Rewrites the host header
      },
    },
  },
});
