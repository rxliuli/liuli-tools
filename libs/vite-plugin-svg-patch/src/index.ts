import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { readFile } from 'fs-extra'
import svgToMiniDataURI from 'mini-svg-data-uri'
import * as path from 'path'
import { optimize, OptimizedSvg } from 'svgo'
import { Plugin } from 'vite'

const defaults = {
  exclude: null,
  include: null,
}

export function svgPatch(opts?: { include?: FilterPattern; exclude?: FilterPattern }): Plugin {
  const options = Object.assign({}, defaults, opts)
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'vite-plugin-svg-patch',
    enforce: 'pre',
    resolveId(id: string, importer: string) {
      if (this.meta.watchMode) {
        return null
      }
      if (id.endsWith('.svg')) {
        return path.resolve(path.dirname(importer), id)
      }
    },
    async load(id) {
      if (this.meta.watchMode) {
        return null
      }
      if (!filter(id) || !id.endsWith('.svg')) {
        return null
      }
      const source = optimize((await readFile(id, 'utf-8')).replace(/[\r\n]+/gm, ''))
      if (source.error || source.modernError) {
        console.error('svg 优化失败：', id)
      }
      const dataUri = svgToMiniDataURI((source as OptimizedSvg).data)
      return `export default "${dataUri}";`
    },
  }
}
