import { defineConfig } from 'vite';

export default defineConfig({
  base: '/energy-calculator/',
  plugins: [],
  server: {
    host: '0.0.0.0',
    hmr: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Configure both assets and entry chunks
        assetFileNames: 'assets/[name].[hash][ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
});