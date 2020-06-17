import { wait } from '../async/wait'
import { Func, DeconstructionPromise } from 'liuli-types'

/**
 * 将多个并发异步调用合并为一次批处理
 * @param fn 需要包装的函数
 * @param handle 批处理的函数
 */
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
      // console.log('apply wait begin: ', argArray, lock)
      await wait(() => resultMap.has(argArray) || !lock)
      // console.log('apply wait end: ', argArray, lock, resultMap)
      lock = true
      try {
        if (!resultMap.has(argArray)) {
          // console.log('handle end: ', argArray, map)
          Array.from(await handle(Array.from(paramSet))).forEach(([k, v]) => {
            resultMap.set(k, v)
          })
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
