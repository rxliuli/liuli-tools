import { Plugin } from 'esbuild'
import { readFile } from 'fs-extra'
import * as path from 'path'

/**
 * 通过 ?raw 将资源作为字符串打包进来
 * @returns
 */
export function raw(): Plugin {
  return {
    name: 'raw',
    setup(build) {
      build.onResolve({ filter: /\?raw$/ }, (args) => {
        return {
          path: path.isAbsolute(args.path) ? args.path : path.join(args.resolveDir, args.path),
          namespace: 'raw-loader',
        }
      })
      build.onLoad({ filter: /\?raw$/, namespace: 'raw-loader' }, async (args) => {
        return {
          contents: await readFile(args.path.replace(/\?raw$/, '')),
          loader: 'text',
        }
      })
    },
  }
}
