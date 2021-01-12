/**
 * 将参数对象转换为 URLSearchParams
 * @param obj 参数对象
 * @returns 转换后的 URLSearchParams
 */
export function objToURLSearchParams(obj: object): URLSearchParams {
  const res = new URLSearchParams()
  for (const [k, v] of Object.entries(obj)) {
    res.append(k, v)
  }
  return res
}
