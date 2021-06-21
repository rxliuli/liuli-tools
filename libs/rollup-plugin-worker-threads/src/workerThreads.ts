import { Plugin, RenderedChunk } from 'rollup'
import path from 'path'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { pathExists } from 'fs-extra'

type WorkerThreadsOptions = {
  include?: FilterPattern
  exclude?: FilterPattern
}

/**
 * 插件逻辑
 */
export function workerThreads(options?: WorkerThreadsOptions): Plugin {
  const filter = createFilter(options?.include, options?.exclude)
  const chunkMap = new Map<string, string>()

  return {
    name: 'rollup-plugin-worker-threads',
    load(id: string) {
      if (!id.endsWith('?worker')) {
        return
      }
      // console.log('load: ', id.substr(0, id.length - 7))
      return id
    },
    resolveId(id: string, importer: string) {
      if (!id.endsWith('?worker')) {
        return
      }
      return path.resolve(path.dirname(importer), id)
    },
    renderChunk(code: string, chunk: RenderedChunk) {
      let workerChunkName = chunkMap.get(chunk.facadeModuleId!)
      if (workerChunkName) {
        if (workerChunkName.endsWith('.ts')) {
          workerChunkName =
            workerChunkName.substr(0, workerChunkName.length - 3) + '.js'
        }
        chunk.fileName = workerChunkName
      }
      return
    },

    async transform(code: string, id: string) {
      if (!filter(id) || !id.endsWith('?worker')) {
        return
      }
      const filePath = id.substr(0, id.length - 7)
      const ext = (await pathExists(filePath + '.ts')) ? '.ts' : '.js'
      const chunk = `./${path.basename(filePath)}-${this.emitFile({
        type: 'chunk',
        id: filePath + ext,
      })}.js`
      chunkMap.set(filePath + ext, chunk)

      return `import { Worker } from 'worker_threads'
      import path from 'path'
      export default function WorkerWrapper() {
        return new Worker(path.resolve(__dirname, ${JSON.stringify(chunk)}))
      }`
    },
  } as Plugin
}
