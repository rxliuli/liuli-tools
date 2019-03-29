// @ts-check
/**
 * 安全执行某个函数
 * @param {Function} fn 需要执行的函数
 * @param {Object} [defaultVal=undefined] 发生异常后的默认返回值，默认为 undefined
 */
export function safeExec (fn, defaultVal = undefined) {
  try {
    return fn()
  } catch (err) {
    return defaultVal
  }
}
