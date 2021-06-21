import { isMainThread, parentPort, Worker } from 'worker_threads'
import { expose, wrap } from 'comlink'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'
import { wait } from '@liuli-util/async'
import { worker as helloType } from './worker'

async function _hello(name: string) {
  await wait(100)
  return `hello ${name}`
}

let hello: (name: string) => Promise<string>

if (isMainThread) {
  hello = async (name: string) => {
    const worker = new Worker(__filename)
    try {
      const helloWorker = wrap<typeof helloType>(nodeEndpoint(worker))
      return await helloWorker(name)
    } finally {
      worker.unref()
    }
  }
} else {
  hello = _hello
  expose(_hello, nodeEndpoint(parentPort!))
}

export { hello }
