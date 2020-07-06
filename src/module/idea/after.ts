import { Func } from 'liuli-types'

/**
 * 在函数之后插入一个新的函数
 * @param fn
 * @param handle
 */
export function after<F extends Func, R>(
  fn: F,
  handle: (res: ReturnType<F>) => R,
): (...args: Parameters<F>) => R {
  return function(...args: Parameters<F>) {
    return handle(fn(...(args as any)))
  }
}
