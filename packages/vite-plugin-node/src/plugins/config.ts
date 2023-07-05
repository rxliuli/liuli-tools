import { Plugin } from 'vite'
import pathe from 'pathe'
import { access, readFile } from 'fs/promises'

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}
type Format = 'es' | 'cjs' | 'iife'

function defaultOutExtension({ format, pkgType }: { format: Format; pkgType?: string }): { js: string; dts: string } {
  let jsExtension = '.js'
  let dtsExtension = '.d.ts'
  const isModule = pkgType === 'module'
  if (isModule && format === 'cjs') {
    jsExtension = '.cjs'
    dtsExtension = '.d.cts'
  }
  if (!isModule && format === 'es') {
    jsExtension = '.mjs'
    dtsExtension = '.d.mts'
  }
  if (format === 'iife') {
    jsExtension = '.global.js'
  }
  return {
    js: jsExtension,
    dts: dtsExtension,
  }
}

export function config(options: { entry: string | string[]; formats: Format[] }): Plugin {
  return {
    name: 'node-config',
    async config(config, env) {
      const root = config.root ?? process.cwd()
      const jsonPath = pathe.resolve(root, 'package.json')
      if (!(await pathExists(jsonPath))) {
        throw new Error(`package.json not found in ${root}`)
      }
      const r = JSON.parse(await readFile(jsonPath, 'utf-8'))
      return {
        build: {
          lib: {
            entry: options.entry,
            formats: options.formats,
            fileName(_format, entryName) {
              const ext = defaultOutExtension({ format: _format as any, pkgType: r.type })
              // console.log(_format, entryName, ext)
              return `${pathe.basename(entryName, pathe.extname(entryName))}${ext.js}`
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
