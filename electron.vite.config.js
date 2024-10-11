import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

// https://vitejs.dev/config/

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.intisoft.com.pe', // Cambia esto a la URL de tu backend NestJS
        changeOrigin: true,
        secure: true // Si no estás usando HTTPS en el backend
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/renderer/src'),
        '@renderer': resolve('./src/renderer/src')
      }
    },
    plugins: [react(), tailwindcss('tailwind.config.js'), autoprefixer]
  }
})
