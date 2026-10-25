import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static SPA for Cloudflare Pages. Approved art copies and fonts are served from
// /public as-is; nothing is fetched from third-party hosts at runtime.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    chunkSizeWarningLimit: 900,
  },
  server: { fs: { allow: ['.'] } },
});
