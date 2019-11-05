import { excludeFields } from './excludeFields'

/**
 * 递归排除对象中的指定字段
 * @param obj 需要排除的对象
 * @param  {...obj} fields 需要排除的字段
 */
export function excludeFieldsDeep<T extends object>(
  obj: T,
  ...fields: PropertyKey[]
): T {
  return Object.keys(obj).reduce(
    (res, k) => {
      const v = Reflect.get(res, k)
      if (v instanceof Object) {
        Reflect.set(obj, k, excludeFieldsDeep(v, ...fields))
      }
      return res
    },
    obj instanceof Array ? obj : excludeFields(obj, ...(fields as any)),
  ) as any
}
