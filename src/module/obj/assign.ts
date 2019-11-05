import { isNullOrUndefined } from './isNullOrUndefined'

//TODO 暂时绕过类型错误，之后有时间再修
// export function assign<T, A>(target: T, a: A): T & A
// export function assign<T, A, B>(target: T, a: A, b: B): T & A & B
// export function assign<T, A, B, C>(target: T, a: A, b: B, c: C): T & A & B & C
// export function assign<T, A, B, C, D>(
//   target: T,
//   a: A,
//   b: B,
//   c: C,
//   d: D,
// ): T & A & B & C & D
/**
 * 合并多个对象的属性
 * 1. 该合并的方式为浅层合并，只会合并一层的对象
 * 2. 默认忽略值为 undefined/null 的属性
 * @param target 覆盖的对象上
 * @param  {...Object} sources 任意数量的对象
 * @returns 合并后的对象
 */
export function assign<T extends object>(
  target: T | null | undefined,
  ...sources: Array<any | null | undefined>
): any {
  return [target, ...sources].reduce((res, source) => {
    if (isNullOrUndefined(source)) {
      return res
    }
    return Object.keys(source).reduce((res, k) => {
      const v = Reflect.get(source, k)
      if (isNullOrUndefined(v)) {
        return res
      }
      Reflect.set(res, k, v)
      return res
    }, res)
  }, {})
}
