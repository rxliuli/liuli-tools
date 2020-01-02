/**
 * 解析字段字符串为数组
 * @param str 字段字符串
 * @returns 字符串数组，数组的 `[]` 取法会被解析为数组的一个元素
 */
export function parseFieldStr(str: string): string[] {
  return str
    .split(/[\.\[]/)
    .map(k => (/\]$/.test(k) ? k.slice(0, k.length - 1) : k))
}
