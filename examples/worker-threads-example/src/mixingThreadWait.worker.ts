import { wrapWorkerFunc } from './mixingThread'

function _wait(time: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, time))
}

export const wait = wrapWorkerFunc(_wait)
