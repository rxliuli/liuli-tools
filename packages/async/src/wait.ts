/**
 * 等待指定的时间/等待指定表达式成立
 * 如果未指定等待条件则立刻执行
 * @param param 等待时间/等待条件
 * @returns Promise 对象
 */
export function wait(param?: number | (() => boolean | Promise<boolean>)): Promise<void> {
  return new Promise((resolve) => {
    if (typeof param === 'number') {
      setTimeout(resolve, param)
    } else if (typeof param === 'function') {
      const timer = setInterval(async () => {
        if (await param()) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    } else {
      resolve()
    }
  })
}
