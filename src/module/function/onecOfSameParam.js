// @ts-check

/**
 * 包装一个函数为指定参数只执行一次的函数
 * @param {Function} fn 需要包装的函数
 * @param {Function} paramConverter 参数转换的函数，参数为需要包装函数的参数
 * @returns {Function} 需要被包装的函数
 */
export const onecOfSameParam = (
  fn,
  paramConverter = (...args) => JSON.stringify(args)
) => {
  const paramMap = new Map()
  return function (...args) {
    const key = paramConverter(...args)
    const old = paramMap.get(key)
    if (old !== undefined) {
      return old
    }
    const res = fn.call(this, ...args)
    if (res instanceof Promise) {
      return res.then(res => {
        paramMap.set(key, res)
        return res
      })
    }
    paramMap.set(key, res)
    return res
  }
}
