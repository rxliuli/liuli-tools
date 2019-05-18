/**
 * 包装对象，使其成为可以任意深度调用而不会出现 undefined 调用的问题
 * 注意: 该函数不能进行递归调用（{@link JSON.stringfy}），一定会造成堆栈溢出的问题（RangeError: Maximum call stack size exceeded）
 * @param {Object} object 任意一个 Object 对象
 * @returns {Object} 包装后的对象
 */
export function deepProxy(object: object): any {
  const handler = {
    get(target: object, k: PropertyKey): object {
      Reflect.set(
        target,
        k,
        Reflect.has(target, k) ? Reflect.get(target, k) : {},
      )
      const v = Reflect.get(target, k)
      if (typeof v === 'object') {
        return new Proxy(v, handler)
      }
      return v
    },
  }
  return new Proxy(object, handler)
}
