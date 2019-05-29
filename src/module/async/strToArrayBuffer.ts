/**
 * 将字符串转为字符流
 * @param str 字符串
 * @returns 字符流对象
 */
export function strToArrayBuffer(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i < str.length; ++i) {
    view[i] = str.charCodeAt(i) & 0xff
  }
  return buf
}
