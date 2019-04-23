/**
 * 将函数包装为柯里化函数
 * 注: 该函数模仿了 Lodash 的 curry 函数
 * @param {Function} fn 需要包装的函数
 * @param  {...any} args 应用的部分参数
 * @returns {Function} 包装后的函数
 */
export const curry = (fn, ...args) => {
  if (args.filter(arg => arg !== curry._).length >= fn.length) {
    return fn(...args)
  }
  return function (...otherArgs) {
    const removeIndexSet = new Set()
    let i = 0
    const newArgs = args.map(arg => {
      if (arg !== curry._) {
        return arg
      }
      if (otherArgs[i] === undefined || otherArgs[i] === curry._) {
        return arg
      }
      removeIndexSet.add(i)
      return otherArgs[i++]
    })
    const newOtherArgs = otherArgs.filter((_v, i) => !removeIndexSet.has(i))
    return curry(fn, ...newArgs, ...newOtherArgs)
  }
}

/**
 * 柯里化的占位符，需要应用后面的参数时使用
 */
curry._ = Symbol('柯里化占位符')
