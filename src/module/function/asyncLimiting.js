import { wait } from '../function/wait'

/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param {Function} fn 异步函数
 * @param {Object} [options={}] 可选参数
 * @param {Number} [options.limit=1] 并发限制数量，默认为 1
 * @returns {Function} 返回被包装后的限制并发功能的函数
 */
export const asyncLimiting = (fn, { limit = 1 } = {}) => {
  // 当前正在执行异步的数量
  let execCount = 0
  // waitArr 等待的队列
  const takeQueue = []
  // 是否增加了 execCount 的标记
  let flag = false
  return new Proxy(fn, {
    async apply (target, thisArg, args) {
      const _takeRun = async () => {
        if (!flag) {
          execCount++
          flag = false
        }
        const tempArgs = takeQueue.shift()
        // console.log(args + ' 执行前: ' + execCount)
        try {
          return await Reflect.apply(target, thisArg, tempArgs)
        } finally {
          // console.log(args + ' 执行后: ')
          execCount--
        }
      }
      takeQueue.push(args)

      // console.log(args + ' 判断前: ')
      await wait(() => {
        const result = execCount < limit
        if (result) {
          flag = true
          execCount++
        }
        return result
      })
      // console.log(args + ' 判断后: ' + execCount)
      return _takeRun()
    },
  })
}
