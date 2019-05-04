/**
 * 将指定函数包装为只调用一次
 * @param {Function} fn 需要包装的函数
 * @returns {Function} 包装后的函数
 */
export const once = fn => {
  let flag = true
  let cache
  return function (...args) {
    if (flag === false) {
      return cache
    }
    flag = false
    const result = fn.call(this, ...args)
    // 如果是异步函数则返回异步的结果
    if (result instanceof Promise) {
      return result.then(res => {
        cache = res
        return res
      })
    }
    cache = result
    return cache
  }
}
