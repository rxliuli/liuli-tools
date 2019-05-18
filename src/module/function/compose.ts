import { curry } from './curry'

/**
 * 连接两个函数并自动柯里化
 * @param {Function} fn1 第一个函数
 * @param {Function} fn2 第二个函数
 * @returns {Function} 连接后的函数
 */
const _compose = (fn1: Function, fn2: Function): Function => {
  return function(...args: any[]) {
    const res = curry(fn1, ...args)
    // 如果这个函数的参数不足，则返回它
    // @ts-ignore
    if (res instanceof Function && res._curry === true) {
      return _compose(res, fn2)
    }
    return curry(fn2, res)
  }
}

/**
 * 将多个函数组合起来
 * 前面函数的返回值将变成后面函数的第一个参数，如果到了最后一个函数执行完成，则直接返回
 * 该函数是自动柯里化，将对所有传入的函数进行柯里化处理
 * @param  {...Function} fns 多个需要连接函数
 * @returns {Function} 连接后的柯里化函数
 */
export function compose(...fns: Function[]): Function {
  return fns.reduceRight((fn1, fn2) => _compose(fn2, fn1))
}
