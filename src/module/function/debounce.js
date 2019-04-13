// @ts-check
/**
 * 函数去抖
 * 去抖 (debounce) 去抖就是对于一定时间段的连续的函数调用，只让其执行一次
 * 注: 包装后的函数如果两次操作间隔小于 delay 则不会被执行, 如果一直在操作就会一直不执行, 直到操作停止的时间大于 delay 最小间隔时间才会执行一次, 不管任何时间调用都需要停止操作等待最小延迟时间
 * 应用场景主要在那些连续的操作, 例如页面滚动监听, 包装后的函数只会执行最后一次
 * @param {Number} delay 最小延迟时间，单位为 ms
 * @param {Function} action 真正需要执行的操作
 * @return {Function} 包装后有去抖功能的函数
 */
export const debounce = (delay, action) => {
  let tId
  return function (...args) {
    if (tId) clearTimeout(tId)
    tId = setTimeout(() => {
      action.call(this, ...args)
    }, delay)
  }
}
