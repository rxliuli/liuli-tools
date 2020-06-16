import { wait } from '../async/wait'
import { Func, DeconstructionPromise } from 'liuli-types'
import { Err } from 'typedoc/dist/lib/utils/result'

export function batch<
  T extends Func,
  P extends Parameters<T>,
  R extends DeconstructionPromise<ReturnType<T>>
>(fn: T, handle: (args: P[]) => Promise<Map<P, R>>) {
  const resultMap = new Map<P, R | Error>()
  const paramSet = new Set<P>()
  let lock = false
  return new Proxy(fn, {
    async apply(target: T, thisArg: any, argArray: P): Promise<R> {
      paramSet.add(argArray)
      // console.log('apply wait begin: ', lock, resultMap.get(argArray))
      await wait(() => resultMap.get(argArray) !== undefined || !lock)
      // console.log('apply wait end: ', lock, resultMap.get(argArray), resultMap)
      lock = true
      try {
        if (!resultMap.has(argArray)) {
          Array.from((await handle(Array.from(paramSet))).entries()).forEach(
            ([k, v]) => {
              resultMap.set(k, v)
            },
          )
        }
        const value = resultMap.get(argArray)
        paramSet.delete(argArray)
        resultMap.delete(argArray)
        // console.log('delete: ', resultMap)

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
