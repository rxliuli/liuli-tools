import { flatMap } from '../array/flatMap'
import { isNullOrUndefined } from './isNullOrUndefined'
import { getObjectEntries } from './getObjectEntries'

/**
 * 合并多个对象的属性
 * 1. 该合并的方式为浅层合并，只会合并一层的对象
 * 2. 默认忽略值为 undefined/null 的属性
 * @param  {...Object} sources 任意数量的对象
 * @returns {Object} 合并后的对象
 */
export function assign<T extends object>(
  target: T,
  ...sources: Array<any | null | undefined>
): T {
  sources.reduce((res, source) => {
    if (isNullOrUndefined(source)) {
      return res
    }
    return Reflect.ownKeys(source).reduce((res, k) => {
      const v = Reflect.get(source, k)
      if (isNullOrUndefined(v)) {
        return res
      }
      Reflect.set(res, k, v)
      return res
    }, res)
  }, target)
  return flatMap(sources, object =>
    isNullOrUndefined(object) ? [] : getObjectEntries(object),
  ).reduce((res, [k, v]) => {
    if (isNullOrUndefined(v)) {
      return res
    }
    res[k] = v
    return res
  }, target)
}
