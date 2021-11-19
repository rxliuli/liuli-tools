import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { graphQLCodegen } from '@liuli-util/rollup-plugin-graphql-codegen'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [react(), graphQLCodegen(), checker({ typescript: true })],
})
