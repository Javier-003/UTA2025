import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps:{
      exclude: ['blip-ds/loader']
     },
  })
  