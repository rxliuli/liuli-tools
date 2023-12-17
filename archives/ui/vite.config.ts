import { defineConfig } from 'vite'
import { node } from '@liuli-util/vite-plugin-node'
import path from 'path'

export default defineConfig({
  plugins: [node({ dts: true })],
  build: {
    cssMinify: false,
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
