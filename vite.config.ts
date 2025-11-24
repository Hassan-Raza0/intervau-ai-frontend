import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/intervau-ai-frontend/",   // ⭐ REQUIRED — must match repo name EXACTLY
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
