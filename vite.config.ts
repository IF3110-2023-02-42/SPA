import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 8090,  // Default Vite dev server port
    strictPort: true,
    host: true,  // Allow connections from any host
    open: true,  // Automatically open a browser window
    hmr: {
      clientPort: 9026,
    }
  }
})