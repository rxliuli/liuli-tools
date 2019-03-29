// @ts-check
/**
 * 字符串格式化
 *
 * @param {String} str 要进行格式化的值
 * @param {Object} args 格式化参数值，替换字符串中的 {} 的值
 * @returns {String} 替换完成的字符串
 */
export function format (str, args) {
  if (!args) {
    return str
  }
  return Object.keys(args).reduce(
    (res, k) => res.replace(new RegExp(`{${k}}`, 'g'), args[k]),
    str
  )
}
