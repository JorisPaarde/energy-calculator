import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'EnergyCalculator',
      formats: ['iife'],
      fileName: () => 'energy-calculator.js'
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        globals: {
          'react': 'React',
          'react-dom/client': 'ReactDOM'
        }
      },
      external: ['react', 'react-dom/client']
    },
    sourcemap: false,
    minify: true
  },
  publicDir: false
})
