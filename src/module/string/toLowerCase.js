// @ts-check
/**
 * 字符串安全的转换为小写
 * @param {String} str 字符串
 * @returns {String} 转换后得到的全小写字符串
 */
export function toLowerCase (str) {
  if (!str || typeof str !== 'string') {
    return str
  }
  return str.toLowerCase()
}
