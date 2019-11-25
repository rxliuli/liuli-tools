import { excludeFields } from './excludeFields'
import { TypeValidator } from './TypeValidator'

/**
 * 递归排除对象中的指定字段
 * @param obj 需要排除的对象
 * @param  {...obj} fields 需要排除的字段
 */
export function deepExcludeFields<T extends object>(
  obj: T,
  ...fields: PropertyKey[]
): T {
  if (TypeValidator.isArray(obj)) {
    return obj.map(o => deepExcludeFields(o, ...fields)) as any
  } else if (TypeValidator.isDate(obj)) {
    return obj
  } else if (TypeValidator.isObject(obj)) {
    const temp = excludeFields(obj, ...(fields as any))
    return Object.keys(temp).reduce((res, k) => {
      const v = Reflect.get(res, k)
      Reflect.set(res, k, deepExcludeFields(v, ...fields))
      return res
    }, temp) as any
  } else {
    return obj
  }
}
