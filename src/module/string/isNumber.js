const regexp = new RegExp('^-?\\d+$')
/**
 * 判断字符串是否位整数
 * @param {String} str 需要进行判断的字符串
 * @returns {Boolean} 是否为小数
 */
function isInteger (str) {
  return regexp.test(str)
}

export default isInteger
