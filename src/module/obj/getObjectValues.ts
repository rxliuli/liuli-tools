/**
 * 获取对象中所有的属性值，包括 ES6 新增的 Symbol 类型的属性
 * @param obj 任何对象
 * @returns 属性值数组
 */
export function getObjectValues(obj: Record<PropertyKey, any>): any[] {
  return Reflect.ownKeys(obj).map(k => Reflect.get(obj, k))
}
