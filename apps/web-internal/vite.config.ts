import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const apiOrigin = process.env['CPOS_API_ORIGIN']?.trim() || 'http://127.0.0.1:3001';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
    proxy: {
      '/health': apiOrigin,
      '/meta': apiOrigin,
      '/platform': apiOrigin,
      '/openapi.json': apiOrigin,
    },
  },
  preview: {
    host: '127.0.0.1',
    port: 4000,
    strictPort: true,
  },
});
