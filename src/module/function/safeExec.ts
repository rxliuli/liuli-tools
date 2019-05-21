/**
 * 安全执行某个函数
 * @param fn 需要执行的函数
 * @param [defaultVal=null] 发生异常后的默认返回值，默认为 null
 * @param [args] 可选的函数参数
 * @returns 函数执行的结果，或者其默认值
 */
export function safeExec<R>(
  fn: (...args: any[]) => R,
  defaultVal: R | null = null,
  ...args: any[]
): R | null {
  try {
    return fn(...args)
  } catch (err) {
    return defaultVal
  }
}
