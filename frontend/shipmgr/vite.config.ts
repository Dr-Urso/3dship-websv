import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/part': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
      },
      '/unity': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
      },
    }
  },
  build: {
    outDir: "../../shipmgr/resource/public/",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },


},})
