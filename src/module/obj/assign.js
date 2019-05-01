import { flatMap } from '../array/flatMap'
import { isNullOrUndefined } from './isNullOrUndefined'

/**
 * 合并多个对象的属性
 * 1. 该合并的方式为浅层合并，只会合并一层的对象
 * 2. 默认忽略值为 undefined/null 的属性
 * @param  {...Object} objects 任意数量的对象
 * @returns {Object} 合并后的对象
 */
export function assign (...objects) {
  return flatMap(objects, object =>
    isNullOrUndefined(object) ? [] : Object.entries(object)
  ).reduce((res, [k, v]) => {
    if (isNullOrUndefined(v)) {
      return res
    }
    res[k] = v
    return res
  }, {})
}
