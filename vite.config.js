import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://github.com/anubhav-nagar/job-posting-webapp",
  plugins: [react()],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  }
})
