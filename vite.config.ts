import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/m3-design-docs/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['@sicaho-collab/m3-design-system'],
  },
  server: {
    watch: {
      ignored: ['!**/node_modules/@sicaho-collab/**'],
    },
  },
})
