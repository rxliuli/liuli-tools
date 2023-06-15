import { Plugin } from 'vite'
import { externals } from './plugins/externals'
import { config } from './plugins/config'

interface NodeBuildOptions {
  entry?: string | string[] // default: 'src/index.ts'
  shims?: boolean // default: false
  dts?: boolean // default: false
  modPatch?: boolean // default: false
}

export async function node(options?: NodeBuildOptions): Promise<Plugin[]> {
  const r: Plugin[] = [
    externals(),
    config({
      entry: options?.entry ?? 'src/index.ts',
    }),
  ]
  if (options?.shims) {
    r.push((await import('./plugins/shims')).shims())
  }
  if (options?.dts) {
    r.push((await import('vite-plugin-dts')).default())
  }
  if (options?.modPatch) {
    r.push((await import('./plugins/modPatch')).modPatch())
  }
  return r
}
