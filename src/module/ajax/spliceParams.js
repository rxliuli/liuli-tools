// @ts-check
/**
 * 拼接参数字符串
 * @param {Object} params 参数对象
 * @returns {String} 拼接后的字符串
 */
export function spliceParams (params) {
  if (!params) {
    throw new Error(`参数对象不能为空：${params}`)
  }
  var res = ''
  for (const k in params) {
    if (params.hasOwnProperty(k)) {
      const v = params[k]
      res += `${encodeURIComponent(k)}=${encodeURIComponent(v)}&`
    }
  }
  return res
}
