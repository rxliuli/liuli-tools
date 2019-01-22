/**
 * 轮询等待指定资源加载完毕再执行操作
 * 使用 Promises 实现，可以使用 ES7 的 {@async}/{@await} 调用
 * @param {Function} resourceFn 判断必须的资源是否存在的方法
 * @param {Object} options 选项
 * @returns Promise 对象
 */
function waitResource (resourceFn, options) {
  var optionsRes = Object.assign(
    {
      interval: 1000,
      max: 10
    },
    options
  )
  var current = 0
  return new Promise((resolve, reject) => {
    var timer = setInterval(() => {
      if (resourceFn()) {
        clearInterval(timer)
        resolve()
      }
      current++
      if (current >= optionsRes.max) {
        clearInterval(timer)
        reject(new Error('等待超时'))
      }
    }, optionsRes.interval)
  })
}

export default waitResource
