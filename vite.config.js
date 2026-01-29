import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Works on GitHub Pages and local; assets load relative to current path
  base: './',
})
