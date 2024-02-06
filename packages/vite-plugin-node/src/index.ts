import { Plugin } from 'vite'
import { externals } from './plugins/externals'
import { config } from './plugins/config'
import { dts } from './plugins/dts'

/**
 * @public
 */
export interface NodeBuildOptions {
  entry?: string | string[] // default: 'src/index.ts'
  formats?: ('es' | 'cjs')[] // default: ['es']
  shims?: boolean // default: false
  dts?:
    | boolean
    | {
        bundle?: boolean // default: false
      } // default: false
  outDir?: string // default: 'dist'
}

/**
 * @public
 * @param options - Options
 * @returns
 */
export async function node(options?: NodeBuildOptions): Promise<Plugin[]> {
  const entry = options?.entry ? (Array.isArray(options.entry) ? options.entry : [options.entry]) : ['src/index.ts']
  const r: Plugin[] = [
    externals(),
    config({
      entry,
      formats: options?.formats ?? ['es'],
      outDir: options?.outDir,
    }),
  ]
  if (options?.shims) {
    r.push((await import('./plugins/shims')).shims())
  }
  if (options?.dts) {
    r.push(
      ...(await dts({
        ...(typeof options.dts === 'object' ? options.dts : {}),
        entry,
      })),
    )
  }
  return r
}
