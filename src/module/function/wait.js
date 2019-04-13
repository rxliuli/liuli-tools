// @ts-check
/**
 * 等待指定的时间/等待指定表达式成立
 * 如果未指定等待条件则立刻执行
 * @param {Number|Function} [param] 等待时间/等待条件
 * @returns {Promise} Promise 对象
 */
export const wait = param => {
  return new Promise(resolve => {
    if (typeof param === 'number') {
      setTimeout(resolve, param)
    } else if (typeof param === 'function') {
      var timer = setInterval(() => {
        if (param()) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    } else {
      resolve()
    }
  })
}
