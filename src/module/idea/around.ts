import { Func } from 'liuli-types'
import { after } from './after'
import { before } from './before'

/**
 * 在函数周围添加前置/后置函数
 * @param fn
 * @param beforeHandle
 * @param afterHandle
 */
export function around<F extends Func, R1, R2>(
  fn: F,
  beforeHandle: (origin: F, ...args: Parameters<F>) => R1,
  afterHandle: (res: R1) => R2,
): (...args: Parameters<F>) => R2 {
  return after(before(fn, beforeHandle), afterHandle)
}
