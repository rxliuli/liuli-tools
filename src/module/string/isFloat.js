// @ts-check
/**
 * 判断是否为小数的正则表达式
 */
const regexp = new RegExp('^(-?\\d+)(.\\d+)?$')
/**
 * 判断字符串是否位小数
 * @param {String} str 需要进行判断的字符串
 * @returns {Boolean} 是否为小数
 */
export function isFloat (str) {
  return regexp.test(str)
}
