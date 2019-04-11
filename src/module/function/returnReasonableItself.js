// @ts-check

/**
 * 返回合理参数本身的函数
 * 1. 如果没有参数则返回 undefined
 * 2. 如果只有一个参数则返回参数本身
 * 3. 如果有两个以上的参数则返回参数列表
 * @param {...Object} args 任何对象
 * @returns {undefined|Object|Array.<Object>} 传入的参数
 */
export function returnReasonableItself (...args) {
  const len = args.length
  if (len === 0) {
    return
  }
  if (len === 1) {
    return args[0]
  }
  return args
}
