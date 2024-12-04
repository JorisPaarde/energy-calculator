import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/App.jsx',
      name: 'EnergyCalculator',
      formats: ['iife'],
      fileName: () => 'energy-calculator.js'
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        extend: true,
        manualChunks: undefined
      }
    },
    sourcemap: false,
    minify: true
  },
  publicDir: false
})
