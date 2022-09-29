import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { cssdts } from '@liuli-util/vite-plugin-css-dts'

export default defineConfig({
  plugins: [preact(), cssdts()],
})
