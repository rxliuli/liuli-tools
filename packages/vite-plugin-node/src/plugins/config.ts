import { Plugin } from 'vite'
import path from 'path'

export function config(options: { entry: string }): Plugin {
  const entry = options.entry
  return {
    name: 'node-config',
    config() {
      return {
        build: {
          lib: {
            entry,
            formats: ['es'],
            fileName: path.basename(entry, path.extname(entry)),
          },
        },
      }
    },
    apply: 'build',
  }
}
