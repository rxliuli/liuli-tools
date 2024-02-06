import { Plugin } from 'esbuild'

/**
 * 设置指定模块为没有副作用的包，由于 webpack/esbuild 的配置不兼容，所以先使用插件来完成这件事
 * @param packages
 * @returns
 */
export function sideEffects(packages: string[]): Plugin {
  return {
    name: 'sideEffects',
    setup(build) {
      build.onResolve({ filter: /.*/ }, async (args) => {
        if (
          args.pluginData || // Ignore this if we called ourselves
          !packages.includes(args.path)
        ) {
          return
        }

        const { path, ...rest } = args
        rest.pluginData = true // Avoid infinite recursion
        const result = await build.resolve(path, rest)

        result.sideEffects = false
        return result
      })
    },
  }
}
