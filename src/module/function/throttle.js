// @ts-check
/**
 * 函数节流
 * 节流 (throttle) 让一个函数不要执行的太频繁，减少执行过快的调用，叫节流
 * 类似于上面而又不同于上面的函数去抖, 包装后函数在上一次操作执行过去了最小间隔时间后会直接执行, 否则会忽略该次操作
 * 与上面函数去抖的明显区别在连续操作时会按照最小间隔时间循环执行操作, 而非仅执行最后一次操作
 *
 * @param {Number} delay 最小间隔时间，单位为 ms
 * @param {Function} action 真正需要执行的操作
 * @return {Function} 包装后有节流功能的函数
 */
export function throttle (delay, action) {
  let last = 0
  return function () {
    const curr = Date.now()
    if (curr - last > delay) {
      action.apply(this, arguments)
      last = curr
    }
  }
}
