/**
 * 填充字符串到指定长度
 * @param {String} item 填充的字符串
 * @param {Number} len 填充的长度
 * @returns {String} 填充完成的字符串
 */
function fill(item, len) {
  var res = ''
  for (let i = 0; i < len; i++) {
    res += item
  }
  return res
}

export default fill
