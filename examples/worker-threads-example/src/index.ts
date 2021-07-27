import HelloWorker from './worker?worker'
import type { worker as helloType } from './worker'
import { wrap } from 'comlink'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'

export async function hello(name: string) {
  const worker = new HelloWorker()
  try {
    const helloWorker = wrap<typeof helloType>(nodeEndpoint(worker))
    return await helloWorker(name)
  } finally {
    worker.unref()
  }
}
