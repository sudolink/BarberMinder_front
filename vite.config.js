import * as dotenv from "dotenv";
dotenv.config();
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path,  {resolve} from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: true
        //rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    base: './',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname,"index.html") 
    }
  }
})
