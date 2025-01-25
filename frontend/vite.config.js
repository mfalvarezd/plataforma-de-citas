import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@schedule-x/plugins': '/ruta/a/tu/modulo/plugins', // Ajusta la ruta según sea necesario
    },
  },
  
})

