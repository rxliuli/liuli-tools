import { Plugin } from 'vite'
import { gen } from './gen'
import * as path from 'path'

export function envDtsGen(): Plugin {
  return {
    name: 'vite-plugin-env-dts-gen',
    configureServer(server) {
      server.watcher.add('.env*')
      const listener = async (filePath: string) => {
        const relative = path.relative(path.resolve(), filePath)
        // console.log('filePath: ', relative)
        if (relative.startsWith('.env')) {
          await gen(path.resolve())
        }
      }
      server.watcher.on('change', listener)
      server.watcher.on('add', listener)
    },
    async buildStart() {
      await gen(path.resolve())
    },
  }
}
