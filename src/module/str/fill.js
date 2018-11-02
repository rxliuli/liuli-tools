/**
 * 为 js 的 String 添加填充字符串的静态方法
 * @param item 填充的元素
 * @param length 填充的长度
 * @returns {string} 填充得到的字符串
 */
export default function(item, length) {
  var result = ''
  for (var i = 0; i < length; i++) {
    result += item
  }
  return result
}
