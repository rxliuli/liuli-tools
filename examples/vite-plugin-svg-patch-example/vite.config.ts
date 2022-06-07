import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svgPatch } from '@liuli-util/vite-plugin-svg-patch'

export default defineConfig({
  plugins: [react(), svgPatch()],
})
