/**
 * 返回第一个参数的函数
 * 注: 一般可以当作返回参数自身的函数，如果你只关注第一个参数的话
 * @param obj 任何对象
 * @returns 传入的第一个参数
 */
export function returnItself<T, R = T>(obj: T): R {
  return obj as any
}
