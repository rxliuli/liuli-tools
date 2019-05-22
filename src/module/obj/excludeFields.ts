import { convert } from '../interface/convert'

/**
 * 排除对象中的指定字段
 * 注: 此处将获得一个浅拷贝对象
 * @param obj 排除对象
 * @param fields 要排除的多个字段
 * @returns 排除完指定字段得到的新的对象
 */
export function excludeFields<T extends object>(
  obj: T,
  ...fields: PropertyKey[]
): T {
  const set = new Set(fields)
  return convert(
    Reflect.ownKeys(obj).reduce((res, k) => {
      if (!set.has(k)) {
        Reflect.set(res, k, Reflect.get(obj, k))
      }
      return res
    }, {}),
  )
}
