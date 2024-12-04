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
      formats: ['es', 'umd'],
      fileName: (format) => `energy-calculator.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        paths: {
          react: 'https://unpkg.com/react@18/umd/react.production.min.js',
          'react-dom': 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js'
        }
      }
    },
    sourcemap: true
  },
  publicDir: 'public'
})
