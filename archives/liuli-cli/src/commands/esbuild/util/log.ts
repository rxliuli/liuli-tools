import { Plugin, PluginBuild } from 'esbuild'

export function log(): Plugin {
  return {
    name: 'log',

    setup(builder: PluginBuild) {
      let start: number

      builder.onStart(() => {
        start = Date.now()
      })

      builder.onEnd((result) => {
        if (result.errors.length !== 0) {
          console.error('build failed', result.errors)
          return
        }

        console.log(`build complete, time ${Date.now() - start}ms`)
      })
    },
  }
}
