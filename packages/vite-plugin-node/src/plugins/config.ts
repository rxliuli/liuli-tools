import { Plugin } from 'vite'
import pathe from 'pathe'

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
              return `${pathe.basename(entryName, pathe.extname(entryName))}.js`
            },
          },
          target: 'esnext',
        },
        resolve: {
          browserField: false, // TODO 该选项已被标记为废弃，需要找到替代品
          conditions: ['node'],
        },
      }
    },
    apply: 'build',
  }
}
