import { Plugin } from 'vite'
import { gen } from './gen'
import * as path from 'path'

export function envDtsGen(): Plugin {
  let rootPath: string
  return {
    name: 'vite-plugin-env-dts-gen',
    configResolved(resolveConfig) {
      rootPath = resolveConfig.root
    },
    configureServer(server) {
      server.watcher.add('.env*')
      const listener = async (filePath: string) => {
        const relative = path.relative(rootPath, filePath)
        // console.log('filePath: ', relative)
        if (relative.startsWith('.env')) {
          await gen(rootPath)
        }
      }
      server.watcher.on('change', listener)
      server.watcher.on('add', listener)
    },
    async buildStart() {
      await gen(rootPath)
    },
  }
}
