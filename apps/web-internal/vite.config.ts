import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
    proxy: {
      '/health': 'http://127.0.0.1:3001',
      '/meta': 'http://127.0.0.1:3001',
      '/openapi.json': 'http://127.0.0.1:3001',
    },
  },
  preview: {
    host: '127.0.0.1',
    port: 4000,
    strictPort: true,
  },
});
