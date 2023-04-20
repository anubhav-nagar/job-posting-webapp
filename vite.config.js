import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/job-posting-webapp/",
  plugins: [react()],
  server: {
    port: 3000
  },
  preview: {
    port: 8080
  }
})
