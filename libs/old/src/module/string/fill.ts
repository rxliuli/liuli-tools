/**
 * 填充字符串到指定长度
 * @param item 填充的字符串
 * @param len 填充的长度
 * @returns 填充完成的字符串
 * @deprecated 已废弃，请使用 ES6 {@link String.prototype.repeat} 函数
 * 具体请参考 MDN {@url(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)}
 */
export function fill(item: string, len: number): string {
  if (len <= 0) {
    return ''
  }
  return item + fill(item, len - 1)
}
