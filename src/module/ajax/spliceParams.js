// @ts-check
import { dateFormat } from './../date/dateFormat'

const deteFormatter = 'yyyy-MM-ddThh:mm:ss.SSSZ'
const encode = (k, v) => encodeURIComponent(k) + '=' + encodeURIComponent(v)

/**
 * 拼接参数字符串
 * @param {Object} params 参数对象
 * @returns {String} 拼接后的字符串
 */
export function spliceParams (params) {
  if (!params) {
    throw new Error(`参数对象不能为空：${params}`)
  }
  return Array.from(Object.entries(params)).reduce((res, [k, v]) => {
    if (v instanceof Date) {
      res += encode(k, dateFormat(v, deteFormatter))
    } else if (v instanceof Array) {
      res += v.map(item => encode(k, item)).join('&')
    } else {
      res += encode(k, v)
    }
    return (res += '&')
  }, '')
}
