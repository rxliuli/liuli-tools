/**
 * 排除对象中的指定字段
 * 注: 此处将获得一个浅拷贝对象
 * @param obj 排除对象
 * @param fields 要排除的多个字段
 * @returns 排除完指定字段得到的新的对象
 */
export function excludeFields<T extends object, K extends keyof T>(
  obj: T,
  ...fields: K[]
): Omit<T, K> {
  const set = new Set(fields)
  return Object.keys(obj).reduce((res, k) => {
    if (!set.has(k as any)) {
      Reflect.set(res, k, Reflect.get(obj, k))
    }
    return res
  }, {}) as any
}
