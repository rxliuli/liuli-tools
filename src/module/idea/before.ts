import { Func } from 'liuli-types'

/**
 * 在函数之前插入一个新的函数
 * @param fn
 * @param handle
 */
export function before<F extends Func>(
  fn: F,
  handle: (origin: F, ...args: Parameters<F>) => void,
) {
  return function(...args: Parameters<F>) {
    return handle(fn, ...args)
  }
}
