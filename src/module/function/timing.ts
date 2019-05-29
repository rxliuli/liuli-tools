import { ReturnFunc } from '../interface/ReturnFunc'

type MayPromise<T, R = T> = T extends Promise<any> ? Promise<R> : R

/**
 * 测试函数的执行时间
 * 注：如果函数返回 Promise，则该函数也会返回 Promise，否则直接返回执行时间
 * @param fn 需要测试的函数
 * @returns 执行的毫秒数
 */
export function timing<R>(fn: ReturnFunc<Exclude<R, Promise<any>>>): number
export function timing<R>(fn: ReturnFunc<Promise<any>>): Promise<number>
export function timing<R>(fn: ReturnFunc<R>): number | Promise<number> {
  const begin = performance.now()
  const result = fn()
  if (!(result instanceof Promise)) {
    return performance.now() - begin
  }
  return result.then(() => performance.now() - begin)
}

// 第二种实现方式，避免了重载，却需要在函数内部进行强制类型转换
// export function timing<R>(
//   fn: ReturnFunc<R>,
//   // 函数返回类型是 Promise 的话，则返回 Promise<number>，否则返回 number
// ): R extends Promise<any> ? Promise<number> : number {
//   const begin = performance.now()
//   const result = fn()
//   if (!(result instanceof Promise)) {
//     return convert(performance.now() - begin)
//   }
//   return result.then(() => performance.now() - begin) as any
// }
