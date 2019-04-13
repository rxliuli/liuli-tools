// @ts-check
import { safeExec } from './safeExec'

/**
 * 监视指定函数返回值的变化
 * @param {Function} fn 需要监视的函数
 * @param {Function} callback 回调函数
 * @param {Number} [interval=100] 每次检查的间隔时间，默认为 100ms
 * @returns {Function} 关闭这个监视函数
 */
export const watch = (fn, callback, interval = 100) => {
  let oldVal = safeExec(fn)
  const timer = setInterval(() => {
    const newVal = safeExec(fn)
    if (oldVal !== newVal) {
      callback(newVal, oldVal)
      oldVal = newVal
    }
  }, interval)
  return () => clearInterval(timer)
}
