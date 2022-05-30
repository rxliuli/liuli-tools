import { Plugin } from 'esbuild'

/**
 * 排除和替换 node 内置模块
 */
 export function nodeExternals(): Plugin {
  return {
    name: 'nodeExternals',
    setup(build) {
      build.onResolve({ filter: /(^node:)/ }, (args) => ({
        path: args.path.slice(5),
        external: true,
      }))
    },
  }
}