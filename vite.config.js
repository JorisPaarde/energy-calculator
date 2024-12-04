import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'EnergyCalculator',
      formats: ['iife'],
      fileName: () => 'energy-calculator.js'
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    },
    sourcemap: true
  },
  publicDir: 'public'
})
