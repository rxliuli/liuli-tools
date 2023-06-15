import { Plugin } from 'vite'
import path from 'path'

export function config(options: { entry: string | string[] }): Plugin {
  const entry = options.entry
  return {
    name: 'node-config',
    config() {
      return {
        build: {
          lib: {
            entry,
            formats: ['es'],
            fileName(_format, entryName) {
              return `${path.basename(entryName, path.extname(entryName))}.js`
            },
          },
        },
      }
    },
    apply: 'build',
  }
}
