import { Plugin } from 'rollup'
import { generate, loadContext } from '@graphql-codegen/cli'
import { isMainThread, parentPort, Worker } from 'worker_threads'
import { expose, wrap } from 'comlink'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'
import { tagStr2DtsConfig } from './config'
import { pathExists } from 'fs-extra'
import { Types } from '@graphql-codegen/plugin-helpers'
import * as path from 'path'

async function codegenDts(watch: boolean, config: Types.Config) {
  try {
    if (await pathExists('codegen.yml')) {
      const codegenContext = await loadContext()
      codegenContext.updateConfig({ watch })
      await generate(codegenContext)
    } else {
      await generate({
        ...config,
        cwd: path.resolve(),
        watch,
      } as any)
    }
  } catch (error) {
    console.log('Something went wrong.')
  }
}

if (!isMainThread) {
  expose(codegenDts, nodeEndpoint(parentPort!))
}

export function graphQLCodegen(config: Types.Config = tagStr2DtsConfig): Plugin {
  return {
    name: 'rollup-plugin-graphql-codegen',
    async buildStart() {
      await codegenDts(false, config)
      if (this.meta.watchMode) {
        const worker = new Worker(__filename)
        const codegenWorker = wrap<(watch: boolean, config: Types.Config) => void>(nodeEndpoint(worker))
        // noinspection ES6MissingAwait
        codegenWorker(this.meta.watchMode, config)
      }
    },
  }
}

export * from './config'
