/**
 * 取值的字符串
 */
const rangeStr =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const rangeLen = rangeStr.length

/**
 * 生成一个随机字符串
 * @param len
 */
export function randomStr(len: number) {
  let res = ''
  for (let i = 0; i < len; i++) {
    res += rangeStr.charAt(Math.floor(Math.random() * rangeLen))
  }
  return res
}
