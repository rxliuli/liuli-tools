import { range } from '../array/range'

/**
 * 包装一个函数为有错误重试功能的函数
 * 注意: 该函数是并行运行，所以一旦调用，就会同时调用 n 次，不管之前有没有失败。。。此函数不适合包装有副作用的操作，例如修改用户信息，请使用 {@link trySometime} 替代
 * @param {Function} fn 需要被包装的函数
 * @param {Number} [num=1] 调用的次数。默认为 1
 * @param {Function} [errorCheck=res=>true] 检查返回结果是否需要重试的函数。默认只要 resolve() 就返回 true
 * @returns {Function} 包装后的有错误重试功能的函数
 */
export function trySometimeParallel (fn, num = 1, errorCheck = res => true) {
  return new Proxy(fn, {
    async apply (target, thisArg, args) {
      return new Promise(async (resolve, reject) => {
        let err
        try {
          await Promise.all(
            range(0, num).map(async () => {
              try {
                const res = await Reflect.apply(target, thisArg, args)
                if (errorCheck(res) === true) {
                  resolve(res)
                }
                throw res
              } catch (error) {
                err = error
              }
            })
          )
        } catch (error) {
          console.log(error)
        }
        reject(err)
      })
    },
  })
}
// ;(async () => {
//   let num = 0
//   // 模拟前两次调用都挂掉了
//   const get = async i => {
//     num++
//     if (num < 3) {
//       throw num
//     }
//     return i
//   }
//   // 重复调用两次
//   const fn = trySometimeParallel(get, 2)
//   try {
//     const res = await fn(0)
//     console.log(res)
//   } catch (err) {
//     console.log(err)
//     // expect(err).toBe(2)
//   }
// })()
