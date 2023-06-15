import { Plugin } from 'vite'
import { build } from 'esbuild'
import { createRequire } from 'node:module'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

export function modPatch(): Plugin {
  const list = ['chalk', 'iconv-lite']
  return {
    name: 'rollup-plugin-chalk-patch',
    enforce: 'pre',
    resolveId(source, importer) {
      if (list.includes(source)) {
        return createRequire(importer!).resolve(source) + '?patch'
      }
    },
    async load(id) {
      if (id.endsWith('?patch')) {
        const mod = id.slice(0, -'?patch'.length)
        const r = await build({
          entryPoints: [mod],
          platform: 'node',
          format: 'esm',
          write: false,
          sourcemap: 'inline',
          bundle: true,
          plugins: [nodeExternalsPlugin()],
        })
        return r.outputFiles[0].text
      }
    },
  }
}
