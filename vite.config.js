import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/appointment': {
//       target: 'http://localhost:8082',
         target: 'https://appointment-a29e.onrender.com',
        changeOrigin: true
      }
    },
    allowedHosts: ["3e1f250baeaa.ngrok-free.app"]
  }
})
