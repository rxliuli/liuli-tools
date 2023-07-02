import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import { firefox } from '@liuli-util/vite-plugin-firefox-dist'
import manifest from './manifest.json'
import { i18nextDtsGen } from '@liuli-util/rollup-plugin-i18next-dts-gen'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    firefox({
      browser_specific_settings: {
        gecko: {
          id: 'clean-twttier@rxliuli.com',
          strict_min_version: '109.0',
        },
      },
    }),
    i18nextDtsGen({
      dirs: ['src/i18n'],
    }),
  ] as any,
  base: './',
  build: {
    target: 'esnext',
    minify: false,
    cssMinify: false,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})
