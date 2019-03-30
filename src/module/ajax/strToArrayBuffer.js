// @ts-check
/**
 * 将字符串转为字符流
 *
 * @param {String} str 字符串
 * @returns {ArrayBuffer} 字符流对象
 */
export function strToArrayBuffer (str) {
  const buf = new ArrayBuffer(str.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== str.length; ++i) {
    view[i] = str.charCodeAt(i) & 0xff
  }
  return buf
}
