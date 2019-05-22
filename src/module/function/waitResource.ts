interface IWaitResource {
  interval: number
  max: number
}
/**
 * 轮询等待指定资源加载完毕再执行操作
 * 使用 Promises 实现，可以使用 ES7 的 {@async}/{@await} 调用
 * @param fn 判断必须的资源是否存在的方法
 * @param option 可配置项
 * @param option.interval 轮询间隔
 * @param option.max 最大轮询次数
 * @returns Promise 对象
 */
export function waitResource(
  fn: (...args: any[]) => boolean,
  { interval = 100, max = 10 }: Partial<IWaitResource> = {},
) {
  let current = 0
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (fn()) {
        clearInterval(timer)
        resolve()
      }
      current++
      if (current >= max) {
        clearInterval(timer)
        reject(new Error('waitResource call timeout'))
      }
    }, interval)
  })
}
