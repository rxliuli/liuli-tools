import { defineConfig } from 'vite'
import { node } from './src'

export default defineConfig({
  plugins: [node({ dts: { bundle: true } })],
})
