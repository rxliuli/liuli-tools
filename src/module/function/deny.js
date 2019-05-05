/**
 * 将一个谓词函数取反
 * @param {Function} fn 要取反的函数
 * @returns {Function} 取反得到的函数
 */
export const deny = fn =>
  /**
   * 包装后的函数
   * @param {...any} args 函数的参数
   * @returns {any} 函数的返回值取反
   */
  function (...args) {
    const result = fn.apply(this, args)
    if (result instanceof Promise) {
      return result.then(res => !res)
    }
    return !result
  }
