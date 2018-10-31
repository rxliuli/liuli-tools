/**
 * 字符串格式化
 * @param str 要进行格式化的值
 * @param args 格式化参数值
 */
module.exports = function(str, args) {
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
