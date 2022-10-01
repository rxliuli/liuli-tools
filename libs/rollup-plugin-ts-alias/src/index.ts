import { Plugin, ResolveIdResult } from 'rollup'
import { pathExists } from '@liuli-util/fs-extra'
import { createRequire } from 'module'
import { findParent } from './utils/findParent'
import path from 'path'

async function resolvePackagePath(name: string) {
  return await findParent(createRequire(import.meta.url).resolve(name), (item) =>
    pathExists(path.resolve(item, 'package.json')),
  )
}

export function tsAlias(
  includes: (string | RegExp)[],
  excludes: (string | RegExp)[] = [],
): Plugin & {
  enforce: 'pre' | 'post'
} {
  return {
    name: 'rollup-plugin-ts-alias',
    enforce: 'pre',

    async resolveId(source: string): Promise<ResolveIdResult> {
      excludes.push(/\/.*\//)
      console.log('resolveId', source)
      const predicate = (item: string | RegExp) =>
        typeof item === 'string' ? source.startsWith(item) : item.test(source)

      if (includes.some(predicate) && !excludes.some(predicate)) {
        let res: string

        try {
          res = (await resolvePackagePath(source)) + '/src/index.ts'
        } catch (e) {
          return null
        }

        if (!(await pathExists(res))) {
          console.warn('path not exists: ', res)
          return null
        }

        console.log('rewrite: ', res)
        return res
      }

      return null
    },
  }
}
