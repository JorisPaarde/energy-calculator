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
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      external: ['react', 'react-dom']
    },
    sourcemap: false,
    minify: true,
    define: {
      'process.env': '{}',
      'import.meta.env': '{}'
    }
  },
  publicDir: false
})
