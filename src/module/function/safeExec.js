// @ts-check
/**
 * 安全执行某个函数
 * @param {Function} fn 需要执行的函数
 * @param {Object} [defaultVal=undefined] 发生异常后的默认返回值，默认为 undefined
 * @param {...Object} [args] 可选的函数参数
 * @returns {Object|undefined} 函数执行的结果，或者其默认值
 */
export const safeExec = (fn, defaultVal = undefined, ...args) => {
  try {
    return fn(...args)
  } catch (err) {
    return defaultVal
  }
}
