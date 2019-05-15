import { range } from '../array/range'

/**
 * 包装一个函数为有错误重试功能的函数
 * 注意: 该函数是并行运行，所以一旦调用，就会同时调用 n 次，不管之前有没有失败。。。此函数不适合包装有副作用的操作，例如修改用户信息，请使用 {@link trySometime} 替代
 * @param {Number} num 调用的次数
 * @param {Function} fn 需要被包装的函数
 * @param {Function} errorCheck 检查返回结果是否需要重试的函数。默认只要 resolve() 就返回 true
 * @returns {Function} 包装后的有错误重试功能的函数
 */
export const trySometimeParallel = (num = 1, fn, errorCheck = res => true) => {
  return new Proxy(fn, {
    async apply (target, thisArg, args) {
      return Promise.race(
        range(0, num).map(async () => {
          const res = await Reflect.apply(target, thisArg, args)
          if (errorCheck(res) === true) {
            return res
          }
          throw res
        })
      )
    },
  })
}
