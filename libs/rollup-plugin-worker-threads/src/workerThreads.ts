import {
  CustomPluginOptions,
  LoadResult,
  NormalizedOutputOptions,
  OutputBundle,
  Plugin,
  PreRenderedChunk,
  RenderedChunk,
  SourceMapInput,
  TransformResult,
} from 'rollup'
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
    load(id: string): LoadResult {
      if (!id.endsWith('?worker')) {
        return
      }
      // console.log('load: ', id.substr(0, id.length - 7))
      return id
    },
    resolveId(
      id: string,
      importer: string,
      options: { custom?: CustomPluginOptions },
    ) {
      if (!id.endsWith('?worker')) {
        return
      }
      const fullPath = path.resolve(path.dirname(importer), id)
      // console.log('fullPath: ', fullPath)
      return fullPath
    },
    renderChunk(
      code: string,
      chunk: RenderedChunk,
      options: NormalizedOutputOptions,
    ):
      | Promise<{ code: string; map?: SourceMapInput } | null>
      | { code: string; map?: SourceMapInput }
      | string
      | null
      | undefined {
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

    async transform(code: string, id: string): Promise<TransformResult> {
      // if (filter(id)) return null
      if (!id.endsWith('?worker')) {
        return null
      }
      const filePath = id.substr(0, id.length - 7)
      const ext = (await pathExists(filePath + '.ts')) ? '.ts' : '.js'
      const chunk = `./${path.basename(filePath)}-${this.emitFile({
        type: 'chunk',
        id: filePath + ext,
      })}.js`
      chunkMap.set(filePath + ext, chunk)

      return `import { Worker } from 'worker_threads'
      export default function WorkerWrapper() {
        return new Worker(${JSON.stringify(chunk)})
      }`
    },
  } as Plugin
}
