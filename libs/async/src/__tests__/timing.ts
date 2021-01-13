/**
 * 测试函数的执行时间
 * 注：如果函数返回 Promise，则该函数也会返回 Promise，否则直接返回执行时间
 * @param fn 需要测试的函数
 * @returns 执行的毫秒数
 */
export function timing<
  T extends (...args: any[]) => any,
  R extends ReturnType<T> extends Promise<any> ? Promise<number> : number
>(
  fn: T,
  // 函数返回类型是 Promise 的话，则返回 Promise<number>，否则返回 number
): R {
  const begin = performance.now()
  const res = fn()
  const getRes = () => performance.now() - begin
  return (res instanceof Promise ? res.then(getRes) : getRes()) as R
}

it('测试 timing', () => {})
