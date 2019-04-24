/**
 * 测试函数的执行时间
 * 注：如果函数返回 Promise，则该函数也会返回 Promise，否则直接返回执行时间
 * @param {Function} fn 需要测试的函数
 * @returns {Number|Promise} 执行的毫秒数
 */
export const timing = fn => {
  // 使用 Proxy 实现了一下，但感觉实际上与原来的差不多（或许是吾辈的使用场景不太对？）
  const proxyFn = new Proxy(fn, {
    apply (target, thisArg, args) {
      const begin = performance.now()
      const result = Reflect.apply(target, thisArg, args)
      if (!(result instanceof Promise)) {
        return performance.now() - begin
      }
      return result.then(() => performance.now() - begin)
    },
  })
  return proxyFn()
  // const begin = performance.now()
  // const result = fn()
  // if (!(result instanceof Promise)) {
  //   return performance.now() - begin
  // }
  // return result.then(() => performance.now() - begin)
}
