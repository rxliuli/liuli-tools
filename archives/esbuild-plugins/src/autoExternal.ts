import { Plugin } from 'esbuild'

/**
 * 自动排除所有依赖项
 * golang 不支持 js 的一些语法，参考 https://github.com/evanw/esbuild/issues/1634
 */
export function autoExternal(): Plugin {
  return {
    name: 'autoExternal',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        if (/^\.{1,2}\//.test(args.path)) {
          return
        }
        return {
          path: args.path,
          external: true,
        }
      })
    },
  }
}
