// @ts-check
/**
 * 填充字符串到指定长度
 * @param {String} item 填充的字符串
 * @param {Number} len 填充的长度
 * @returns {String} 填充完成的字符串
 */
export function fill (item, len) {
  if (len <= 0) {
    return ''
  }
  return item + fill(item, len - 1)
}
