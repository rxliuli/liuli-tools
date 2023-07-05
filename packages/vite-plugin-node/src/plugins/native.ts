import type { Plugin } from 'vite'
import pathe from 'pathe'

export function native(): Plugin {
  const set = new Set(['.node'])
  return {
    name: 'native',
    apply: 'build',
    enforce: 'pre',
    resolveId(source, importer) {
      if (set.has(pathe.extname(source))) {
        throw new Error(`native module is not supported, source: ${source}, importer: ${importer}`)
      }
    },
  }
}
