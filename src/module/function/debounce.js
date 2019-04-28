/**
 * 函数去抖
 * 去抖 (debounce) 去抖就是对于一定时间段的连续的函数调用，只让其执行一次
 * 注: 包装后的函数如果两次操作间隔小于 delay 则不会被执行, 如果一直在操作就会一直不执行, 直到操作停止的时间大于 delay 最小间隔时间才会执行一次, 不管任何时间调用都需要停止操作等待最小延迟时间
 * 应用场景主要在那些连续的操作, 例如页面滚动监听, 包装后的函数只会执行最后一次
 * 注: 该函数第一次调用一定不会执行，第一次一定拿不到缓存值，后面的连续调用都会拿到上一次的缓存值。如果需要在第一次调用获取到的缓存值，则需要传入第三个参数 {@link init}，默认为 {@link undefined} 的可选参数
 * @param {Number} delay 最小延迟时间，单位为 ms
 * @param {Function} action 真正需要执行的操作
 * @param {Object} [init=undefined] 初始的缓存值，不填默认为 {@link undefined}
 * @return {Function} 包装后有去抖功能的函数。该函数是异步的，与需要包装的函数 {@link action} 是否异步没有太大关联
 */
export const debounce = (delay, action, init = undefined) => {
  let flag
  let result = init
  return function (...args) {
    return new Promise(resolve => {
      if (flag) clearTimeout(flag)
      flag = setTimeout(() => {
        result = action.call(this, ...args)
        resolve(result)
      }, delay)
      setTimeout(() => {
        resolve(result)
      }, delay)
    })
  }
}
