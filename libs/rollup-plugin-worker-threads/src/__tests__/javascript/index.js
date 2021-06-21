import { Worker } from 'worker_threads'
import path from 'path'

export function main() {
  const worker = new Worker(path.resolve(__dirname, 'worker.js'))
  console.log(worker)
}
