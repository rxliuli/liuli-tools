/**
 * 安全执行某个函数
 * @param {Function} fn 需要执行的函数
 * @param {Object} [defaultVal] 发生异常后的默认返回值
 */
function safeExec (fn, defaultVal = undefined) {
  try {
    return fn()
  } catch (err) {
    return defaultVal
  }
}

export default safeExec
