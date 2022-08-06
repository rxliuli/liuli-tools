/**
 * 一旦被初始化，就不会再次初始化。但如果初始化失败，则错误会被传播给所有调用者，并且 flag 将会重置以便重新初始化。
 * @param fn
 * @returns
 */
export function once<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  let flag = false,
    res: any
  return (async (...args) => {
    if (flag) {
      return res
    }
    try {
      res = fn(...args)
      flag = true
      await res
      return res
    } catch (e) {
      flag = false
      throw e
    }
  }) as T
}
