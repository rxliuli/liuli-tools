/**
 * 将字符串转化为 Blob 类型
 * @param str 字符串
 * @returns Blob 数据
 */
export function strToBlob(str: string): Blob {
  return new Blob([str], {
    type: 'text/plain',
  })
}
