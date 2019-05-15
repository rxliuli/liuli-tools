/**
 * 包装一个函数为有错误重试功能的函数
 * @param {Number} num 调用的次数
 * @param {Function} fn 需要被包装的函数
 * @param {Function} errorCheck 检查返回结果是否需要重试的函数。默认只要 resolve() 就返回 true
 * @returns {Function} 包装后的有错误重试功能的函数
 */
export const trySometime = (num = 1, fn, errorCheck = res => true) => {
  return new Proxy(fn, {
    async apply (target, thisArg, args) {
      let err
      for (let i = 0; i < num; i++) {
        try {
          const res = await Reflect.apply(target, thisArg, args)
          if (errorCheck(res) === true) {
            return res
          }
          throw res
        } catch (error) {
          if (err === undefined) {
            err = error
          }
        }
      }
      throw err
    },
  })
}
