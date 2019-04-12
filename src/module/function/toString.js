// @ts-check

/**
 * 默认实现的 toString 函数
 * @param {Object} obj 对象
 * @returns {String} 字符串
 */
export function toString (obj) {
  if (obj === undefined || obj === null) {
    return obj
  }
  return obj.toString()
}
