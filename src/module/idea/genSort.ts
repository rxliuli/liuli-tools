import { get } from '../obj/get'

/**
 * 根据比较的 key 和排序规则生成 sort 函数的函数参数
 * @param field 排序字段
 * @param rule 顺序还是倒序，默认倒序
 * @returns 可以作为 {@link Array.prototype.sort} 函数的参数
 */
export function genSort<T extends object>(
  field: keyof T,
  rule: 'asc' | 'desc' = 'desc',
) {
  return function(a: T, b: T) {
    return (
      (rule === 'asc' ? 1 : -1) * (get(a, field as any) - get(b, field as any))
    )
  }
}
