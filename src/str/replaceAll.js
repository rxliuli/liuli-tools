/**
 * 替换所有匹配 exp 的字符串为指定字符串
 * @param str 要进行格式化的值
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
module.exports = function (str, exp, newStr) {
  return str.replace(new RegExp(exp, 'gm'), newStr)
}
