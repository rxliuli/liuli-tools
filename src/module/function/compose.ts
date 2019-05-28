import { curry } from './curry'
import { findIndex } from '../array/findIndex'

/**
 * 连接两个函数并自动柯里化
 * 注: 该函数依赖于 length，所以不支持默认参数以及不定参数
 * @param fn1 第一个函数
 * @param fn2 第二个函数
 * @returns 连接后的函数
 */
const _compose = (fn1: Function, fn2: Function): Function => {
  return function(...args: any[]) {
    const i = findIndex(
      args,
      v => v !== curry._,
      (fn1 as any)._length || fn1.length,
    )
    const res = curry(fn1, ...args)
    // 如果这个函数的参数不足，则返回它
    if (i === -1) {
      return _compose(res, fn2)
    }
    // 否则将结果以及多余的参数应用到下一个函数上
    return curry(fn2, res, ...args.slice(i + 1))
  }
}

/**
 * 将多个函数组合起来
 * 前面函数的返回值将变成后面函数的第一个参数，如果到了最后一个函数执行完成，则直接返回
 * 注: 该函数是自动柯里化，将对所有传入的函数进行柯里化处理
 * 注: 该函数支持一次调用传入全部函数的参数
 * @param fns 多个需要连接函数
 * @returns 连接后的柯里化函数
 * TODO 这里需要进行类型优化
 */
export function compose(...fns: Function[]): Function {
  return fns.reduceRight((fn1, fn2) => _compose(fn2, fn1))
}
