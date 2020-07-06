import { Func } from 'liuli-types'

/**
 * 在函数之前插入一个新的函数
 * @param fn
 * @param handle
 */
export function before<F extends Func, R>(
  fn: F,
  handle: (origin: F, ...args: Parameters<F>) => R,
): (...args: Parameters<F>) => R {
  return function(...args: Parameters<F>) {
    return handle(fn, ...args)
  }
}
