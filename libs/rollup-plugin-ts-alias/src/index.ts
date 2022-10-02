import { createRequire } from 'module'
import { Plugin, ResolveIdResult } from 'rollup'

export function tsAlias(options: {
  includes: (string | RegExp)[]
  excludes?: (string | RegExp)[]
  debug?: boolean
}): Plugin & {
  enforce: 'pre' | 'post'
} {
  const { includes, excludes = [], debug = false } = options
  return {
    name: 'rollup-plugin-ts-alias',
    enforce: 'pre',

    async resolveId(source: string, importer?: string): Promise<ResolveIdResult> {
      excludes.push(/\/.*\//)
      const predicate = (item: string | RegExp) =>
        typeof item === 'string' ? source.startsWith(item) : item.test(source)

      const isRewrite = includes.some(predicate) && !excludes.some(predicate)
      debug && console.log('resolveId', source, importer, isRewrite)
      if (!isRewrite || !importer) {
        return null
      }
      try {
        const res = createRequire(importer)
          .resolve(source + '/src')
          .replace(/\\/g, '/')
        debug && console.log(`rewrite: ${source} => ${res}`)
        return res
      } catch (e) {
        console.warn('rewrite failed: ', source, e)
        return null
      }
    },
  }
}
