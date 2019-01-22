/**
 * 字符串格式化
 *
 * @param {String} str 要进行格式化的值
 * @param {Object} args 格式化参数值，替换字符串中的 {} 的值
 * @returns {String} 替换完成的字符串
 */
const format = function (str, args) {
  const rxstr = require('../str')
  if (!args) {
    return str
  }
  for (var key in args) {
    var value = args[key]
    if (undefined !== value) {
      str = rxstr.replaceAll(str, '\\{' + key + '\\}', value)
    }
  }
  return str
}

export default format
