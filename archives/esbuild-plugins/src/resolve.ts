import { build, Plugin } from 'esbuild'
import path from 'path'

/**
 * 将指定的 import 重写为另一个
 * @param entries
 * @returns
 */
export function resolve(entries: [from: string, to: string][]): Plugin {
  return {
    name: 'resolve',
    setup(build) {
      build.onResolve({ filter: /.*/ }, async (args) => {
        const findEntries = entries.find((item) => item[0] === args.path)
        if (!findEntries) {
          return
        }
        return await build.resolve(findEntries[1], {
          kind: args.kind,
        })
      })
    },
  }
}
