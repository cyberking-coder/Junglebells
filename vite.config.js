import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Project Pages serve from https://<user>.github.io/Junglebells/, so assets
  // need that prefix. Dev and preview stay at the root.
  base: process.env.GITHUB_PAGES === 'true' ? '/Junglebells/' : '/',
  plugins: [react(), tailwindcss()],
})
