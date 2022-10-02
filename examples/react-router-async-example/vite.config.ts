import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tsAlias } from '@liuli-util/rollup-plugin-ts-alias'

export default defineConfig({
  plugins: [react(), tsAlias({ includes: ['@liuli-util/'] }) as any],
})
