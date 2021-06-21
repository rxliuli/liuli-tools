import { wait } from '@liuli-util/async'
import { wrapWorkerFunc } from './util/wrapWorkerFunc'

async function _hello(name: string) {
  await wait(100)
  return `hello ${name}`
}

export const hello = wrapWorkerFunc(_hello)
