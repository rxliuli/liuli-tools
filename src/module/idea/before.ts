import { Func } from 'liuli-types'
import { around } from './around'

/**
 * 在函数之前插入一个新的函数
 * @param fn
 * @param handle
 */
export function before<F extends Func>(
  fn: F,
  handle: (origin: F, ...args: Parameters<F>) => ReturnType<F>,
): (...args: Parameters<F>) => ReturnType<F> {
  return around(fn, (next, ...args) => handle(next, ...args))
}
