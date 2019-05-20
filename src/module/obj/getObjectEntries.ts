import { getObjectKeys } from './getObjectKeys'

/**
 * 获取对象中所有的属性及对应的值，包括 ES6 新增的 Symbol 类型的属性
 * @param obj 任何对象
 * @returns 属性及其对应值的二维数组
 */
export function getObjectEntries(obj: object): Array<[PropertyKey, any]> {
  const fn: (k: PropertyKey) => [PropertyKey, any] = k => [
    k,
    Reflect.get(obj, k),
  ]
  return Reflect.ownKeys(obj).map(fn)
}
