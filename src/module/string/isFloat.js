var regexp = new RegExp('^(-?\\d+)(.\\d+)?$')
/**
 * 判断字符串是否位小数
 * @param {String} str 需要进行判断的字符串
 * @returns {Boolean} 是否为小数
 */
function isFloat (str) {
  return regexp.test(str)
}

export default isFloat
