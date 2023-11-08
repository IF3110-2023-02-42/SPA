import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 8090,
    strictPort: true,
    host: true,  // Allow connections from any host
    watch: {
      usePolling: true,
    }
  }
})