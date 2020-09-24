/**
 * 将对象的键和值进行映射
 * @param obj
 * @param func
 */
export function mapObject<R extends Record<string, any>>(
  obj: Record<string, any>,
  func: (kv: [string, any]) => [string, any],
): R {
  return Object.entries(obj).reduce((res, kv) => {
    const [k, v] = func(kv as any)
    res[k] = v
    return res
  }, {} as any)
}
