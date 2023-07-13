import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { cssdts } from '@liuli-util/vite-plugin-css-dts'

export default defineConfig({
  plugins: [react(), cssdts()],
  css: {
    postcss: {
      plugins: [tailwindcss() as any, autoprefixer()],
    },
  },
})
