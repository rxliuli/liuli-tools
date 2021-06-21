import HelloWorker from './worker?worker'
import type { Worker } from 'worker_threads'

function main() {
  const helloWorker = new HelloWorker()
  console.log(helloWorker as Worker)
}

main()
