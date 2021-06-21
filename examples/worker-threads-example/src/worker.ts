import { wait } from '@liuli-util/async'
import { expose } from 'comlink'
import { parentPort } from 'worker_threads'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'

export async function worker(name: string) {
  await wait(1_00)
  return `hello ${name}`
}

expose(worker, nodeEndpoint(parentPort!))
