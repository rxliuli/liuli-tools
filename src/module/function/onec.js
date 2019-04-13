/**
 * 将指定函数包装为只调用一次
 * @param {Function} fn 需要包装的函数
 * @returns {Function} 包装后的函数
 */
export const onec = fn => {
  let flag = true
  let res
  return function (...args) {
    if (flag === false) {
      return res
    }
    flag = false
    return (res = fn.call(this, ...args))
  }
}
