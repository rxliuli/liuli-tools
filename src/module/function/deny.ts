/**
 * 将一个谓词函数取反
 * @param fn 要取反的函数
 * @returns 取反得到的函数
 */
export function deny<Func extends Function = (...args: any[]) => any>(
  fn: Func,
): Func {
  return new Proxy(fn, {
    apply(_, _this, args) {
      const result = Reflect.apply(_, this, args)
      if (result instanceof Promise) {
        return result.then(res => !res)
      }
      return !result
    },
  })
}
