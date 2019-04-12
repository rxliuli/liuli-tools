import { wait } from './wait'

/**
 * 将一个异步函数包装为限定并发数的异步函数
 * 适用于服务端做了并发限制的情况
 * @param {Function} fn 返回 Promise 的异步函数
 * @param {Number} [limit=1] 限制并发的数量，默认为 1
 * @returns {Function} 包装后的有并发限制的异步函数
 */
export const promiseLimit = (fn, limit = 1) => {
  // 当前正在执行异步的数量
  let execCount = 0
  // 等待的队列
  const waitArr = []
  return async (...args) => {
    const innerFn = () => {
      execCount++
      const args = waitArr.shift()
      try {
        return fn.call(this, ...args)
      } finally {
        execCount--
      }
    }
    waitArr.push(args)
    await wait(() => execCount < limit)
    // 尝试启动等待队列
    return innerFn()
  }
}
