import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/energy-calculator/',
  plugins: [],
  server: {
    host: '0.0.0.0',
    hmr: true,
  }
})
