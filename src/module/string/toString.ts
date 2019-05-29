import { isNullOrUndefined } from '../obj/isNullOrUndefined'

/**
 * 将任意对象转换为 String
 * 主要避免原生 Object toString 遇到某些空值的时候抛异常的问题
 * @param object 任意对象
 * @returns 字符串
 */
export function toString(object: any): string {
  if (isNullOrUndefined(object)) {
    return ''
  }
  if (object instanceof Date) {
    return object.toISOString()
  }
  return object.toString()
}
