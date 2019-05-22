import { convert } from '../interface/convert'

/**
 * 将对象的所有属性置空
 * @param obj 需要置空属性的对象
 * @returns 返回一个新的对象
 */
export function emptyAllField<T extends object>(obj: T): T {
  return convert(
    Reflect.ownKeys(obj).reduce((res, k) => {
      Reflect.set(res, k, null)
      return res
    }, {}),
  )
}
