/**
 * 将函数包装为柯里化函数
 * 注: 该函数模仿了 Lodash 的 curry 函数
 * @param {Function} fn 需要包装的函数
 * @param  {...any} args 应用的部分参数
 * @returns {Function} 包装后的函数
 */
export const curry = (fn, ...args) => {
  const realArgs = args.filter(arg => arg !== curry._)
  if (realArgs.length >= fn.length) {
    return fn(...realArgs)
  }
  return function (...otherArgs) {
    // 记录需要移除补到前面的参数
    const removeIndexSet = new Set()
    let i = 0
    const newArgs = args.map(arg => {
      if (
        arg !== curry._ ||
        otherArgs[i] === undefined ||
        otherArgs[i] === curry._
      ) {
        return arg
      }
      removeIndexSet.add(i)
      // 每次补偿前面的 curry._ 参数计数器 +1
      return otherArgs[i++]
    })
    const newOtherArgs = otherArgs.filter((_v, i) => !removeIndexSet.has(i))
    return curry(fn, ...newArgs, ...newOtherArgs)
  }
}

/**
 * 柯里化的占位符，需要应用后面的参数时使用
 * 例如 {@link curry(fn)(curry._, 1)} 意味着函数 fn 的第二个参数将被确定为 1
 */
curry._ = Symbol('柯里化占位符')
