import { wait } from '../async/wait'
import { Func, DeconstructionPromise } from 'liuli-types'

export function batch<
  T extends Func,
  P extends Parameters<T>,
  R extends DeconstructionPromise<ReturnType<T>>
>(fn: T, handle: (args: Set<P>) => Map<P, R>) {
  const map = new Map<P, R | Error>()
  const pList = new Set<P>()
  let lock = false
  return new Proxy(fn, {
    async apply(target: T, thisArg: any, argArray: P): Promise<R> {
      pList.add(argArray)
      await wait(() => map.get(argArray) !== undefined || !lock)
      lock = true
      try {
        Array.from((await handle(pList)).entries()).forEach(([k, v]) => {
          map.set(k, v)
        })
        const value = map.get(argArray)
        if (value instanceof Error) {
          throw value
        }
        return value as R
      } finally {
        lock = false
      }
    },
  })
}
