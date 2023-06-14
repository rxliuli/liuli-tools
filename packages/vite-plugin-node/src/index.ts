import { Plugin, defineConfig } from 'vite'
import MagicString from 'magic-string'
import { nodeExternals } from 'rollup-plugin-node-externals'
import path from 'path'
import dts from 'vite-plugin-dts'

function shims(): Plugin {
  return {
    name: 'node-shims',
    renderChunk(code, chunk) {
      if (!chunk.fileName.endsWith('.js')) {
        return
      }
      // console.log('transform', chunk.fileName)
      const s = new MagicString(code)
      s.prepend(`
import __path from 'path'
import { fileURLToPath as __fileURLToPath } from 'url'
import { createRequire as __createRequire } from 'module'

const __getFilename = () => __fileURLToPath(import.meta.url)
const __getDirname = () => __path.dirname(__getFilename())
const __dirname = __getDirname()
const __filename = __getFilename()
const self = globalThis
const require = __createRequire(import.meta.url)
`)
      return {
        code: s.toString(),
        map: s.generateMap(),
      }
    },
    apply: 'build',
  }
}

function externals(): Plugin {
  return {
    ...nodeExternals(),
    name: 'node-externals',
    enforce: 'pre',
    apply: 'build',
  }
}

function config(options: { entry: string }): Plugin {
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

interface NodeBuildOptions {
  entry?: string // default: 'src/index.ts'
  shims?: boolean // default: false
  dts?: boolean // default: false
}

export function node(options?: NodeBuildOptions): Plugin[] {
  const r: Plugin[] = [
    externals(),
    config({
      entry: options?.entry ?? 'src/index.ts',
    }),
  ]
  if (options?.shims) {
    r.push(shims())
  }
  if (options?.dts) {
    r.push(dts())
  }
  return r
}
