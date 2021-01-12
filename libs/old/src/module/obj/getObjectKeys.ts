import { isNullOrUndefined } from './isNullOrUndefined'

/**
 * 获取对象中所有的属性，包括 ES6 新增的 Symbol 类型的属性
 * @param obj 任何对象
 * @returns 属性数组
 * @deprecated 已废弃，请使用 ES6 {@see Reflect.ownKeys} 代替
 * 具体参考 {@url(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)}
 */
export function getObjectKeys(obj: object | undefined | null): PropertyKey[] {
  if (isNullOrUndefined(obj)) {
    return []
  }
  return Reflect.ownKeys(obj!)
}
