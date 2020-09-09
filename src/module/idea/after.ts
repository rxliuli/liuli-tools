import { Func } from 'liuli-types'
import { around } from './around'

/**
 * 在函数之后插入一个新的函数
 * @param fn
 * @param handle
 */
export function after<F extends Func, R>(
  fn: F,
  handle: (res: ReturnType<F>) => R,
): (...args: Parameters<F>) => R {
  return around(fn, (next, ...args) => handle(next(...(args as any))))
}
