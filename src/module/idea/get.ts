import { TypeValidator } from '../obj/TypeValidator'
import { isNullOrUndefined } from '../obj/isNullOrUndefined'

/**
 * 解析字段字符串为数组
 * @param str 字段字符串
 * @returns 字符串数组，数组的 `[]` 取法会被解析为数组的一个元素
 */
function parseFieldStr(str: string): string[] {
  return str
    .split(/[\.\[]/)
    .map(k => (/\]$/.test(k) ? k.slice(0, k.length - 1) : k))
}

/**
 * 安全的深度获取对象的字段
 * 注: 只要获取字段的值为 {@type null|undefined}，就会直接返回 {@param defVal}
 * 类似于 ES2019 的可选调用链特性: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE
 * @param obj 获取的对象
 * @param fields 字段字符串或数组
 * @param [defVal] 取不到值时的默认值，默认为 null
 */
export function get(
  obj: object,
  fields: PropertyKey[] | string,
  defVal: any = null,
): any {
  if (TypeValidator.isString(fields)) {
    fields = parseFieldStr(fields)
  }
  let res = obj
  for (const field of fields) {
    try {
      res = Reflect.get(res, field)
      if (isNullOrUndefined(res)) {
        return defVal
      }
    } catch (e) {
      return defVal
    }
  }
  return res
}
