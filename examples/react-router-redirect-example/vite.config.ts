import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tsAlias } from '@liuli-util/rollup-plugin-ts-alias/dist'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
