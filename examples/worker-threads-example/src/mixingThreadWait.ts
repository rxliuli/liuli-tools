import { isMainThread, parentPort, Worker } from 'worker_threads'
import { expose, wrap } from 'comlink'
import nodeEndpoint from 'comlink/dist/umd/node-adapter'

function _wait(time: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, time))
}

let wait: (time: number) => Promise<void>

if (isMainThread) {
  wait = async (time: number) => {
    const worker = new Worker(__filename)
    try {
      return await wrap<typeof _wait>(nodeEndpoint(worker))(time)
    } finally {
      worker.unref()
    }
  }
} else {
  wait = _wait
  expose(_wait, nodeEndpoint(parentPort!))
}

export { wait }
