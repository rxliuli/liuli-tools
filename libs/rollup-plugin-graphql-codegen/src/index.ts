import { Plugin } from 'rollup'
import { generate, loadContext } from '@graphql-codegen/cli'
import { isMainThread, parentPort, Worker } from 'worker_threads'
import { expose, wrap } from 'comlink'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'

async function codegen(watch: boolean) {
  const codegenContext = await loadContext()
  codegenContext.updateConfig({ watch })
  try {
    await generate(codegenContext)
  } catch (error) {
    console.log('Something went wrong.')
  }
}

if (!isMainThread) {
  expose(codegen, nodeEndpoint(parentPort!))
}

export function graphQLCodegen(): Plugin {
  return {
    name: 'rollup-plugin-graphql-codegen',
    async buildStart() {
      if (this.meta.watchMode) {
        const worker = new Worker(__filename)
        const codegenWorker = wrap<(watch: boolean) => void>(nodeEndpoint(worker))
        // noinspection ES6MissingAwait
        codegenWorker(this.meta.watchMode)
      } else {
        await codegen(false)
      }
    },
  }
}
