import * as dotenv from "dotenv";
dotenv.config();
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const API_URL = process.env.VITE_PROD_ENV == 'DEV' ? process.env.VITE_BACKEND_URL_DEV : process.env.VITE_BACKEND_URL_PROD;
console.log(API_URL)
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    base: './',
    outDir: 'dist',
    emptyOutDir: true
  }
})
