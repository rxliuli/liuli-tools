// @ts-check
/**
 * 判断是否为整数的正则表达式
 */
const regexp = new RegExp('^-?\\d+$')
/**
 * 判断字符串是否位整数
 * @param {String} str 需要进行判断的字符串
 * @returns {Boolean} 是否为小数
 */
export function isNumber (str) {
  return regexp.test(str)
}
