import { blankToNull } from './../string/blankToNull'

/**
 * 置空对象所有空白的属性
 * @param obj 对象
 * @returns 将所有的空白属性全部转换为 null 的新对象
 */
export function blankToNullField<T extends object>(obj: T): T {
  return Object.keys(obj).reduce((res, k) => {
    const v = Reflect.get(obj, k)
    Reflect.set(res, k, typeof v === 'string' ? blankToNull(v) : v)
    return res
  }, {}) as any
}
