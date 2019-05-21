import { isNullOrUndefined } from './isNullOrUndefined'

/**
 * 默认实现的 toString 函数
 * @param obj 对象
 * @returns 字符串
 */
export function toString(obj: any): string {
  if (isNullOrUndefined(obj)) {
    return obj
  }
  return obj.toString()
}
