import { defineConfig } from 'vite'
import { envDtsGen } from '@liuli-util/vite-plugin-env-dts-gen'

export default defineConfig({
  plugins: [envDtsGen()],
})
