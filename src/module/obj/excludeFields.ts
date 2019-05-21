import { getObjectKeys } from './getObjectKeys'

/**
 * 排除对象中的指定字段
 * 注: 此处将获得一个浅拷贝对象
 * @param object 排除对象
 * @param fields 要排除的多个字段
 * @returns 排除完指定字段得到的新的对象
 */
export function excludeFields(
  object: Record<PropertyKey, any>,
  ...fields: PropertyKey[]
): object {
  const set = new Set(fields)
  return getObjectKeys(object).reduce((res, k) => {
    if (!set.has(k)) {
      // @ts-ignore
      res[k] = object[k]
    }
    return res
  }, {})
}
