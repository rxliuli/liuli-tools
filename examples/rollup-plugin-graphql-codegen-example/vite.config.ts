import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { graphQLCodegen } from '@liuli-util/rollup-plugin-graphql-codegen'
import checker from 'vite-plugin-checker'
import { envDtsGen } from '@liuli-util/vite-plugin-env-dts-gen/dist'

export default defineConfig({
  plugins: [react(), envDtsGen(), graphQLCodegen(), checker({ typescript: true })],
})
