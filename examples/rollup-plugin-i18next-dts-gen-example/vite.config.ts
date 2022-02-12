import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { i18nextDtsGen } from '@liuli-util/rollup-plugin-i18next-dts-gen'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    i18nextDtsGen({
      dirs: ['src/i18n'],
    }),
  ],
})
