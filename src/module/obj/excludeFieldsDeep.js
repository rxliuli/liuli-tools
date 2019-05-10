import { excludeFields } from './excludeFields'
import { getObjectKeys } from './getObjectKeys'

/**
 * 递归排除对象中的指定字段
 * @param {Object} object 需要排除的对象
 * @param  {...Object} fields 需要排除的字段
 */
export function excludeFieldsDeep (object, ...fields) {
  const res =
    object instanceof Array ? object : excludeFields(object, ...fields)
  getObjectKeys(object).forEach(k => {
    // @ts-ignore
    const v = res[k]
    if (v instanceof Object) {
      // @ts-ignore
      object[k] = excludeFieldsDeep(v, ...fields)
    }
  })
  return res
}
