import safeExec from './safeExec'

/**
 * 监视指定函数返回值的变化
 * @param {WatchFunction} fn 需要监视的函数
 * @param {WatchCallback} callback 回调函数
 * @param {Number} [interval] 每次检查的间隔时间，默认为 50ms
 */
function watch (fn, callback, interval = 50) {
  let oldVal = safeExec(fn)
  setInterval(() => {
    const newVal = safeExec(fn)
    if (oldVal !== newVal) {
      callback(newVal, oldVal)
    }
    oldVal = newVal
  }, interval)
}

export default watch
