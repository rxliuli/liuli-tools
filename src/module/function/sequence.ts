import { ReturnFunc } from '../interface/ReturnFunc'

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 例如以下场景很常见：用户输入文字，即时响应结果，但第二次的结果先得到了，第一次的结果把第二次的覆盖掉了。那么，如何保证后面的结果一定在后面进行处理呢？
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
function sequence<R>(fn: ReturnFunc<Promise<R>>): ReturnFunc<Promise<R>> {
  let id = 0
  const ids = new Set()
  return new Proxy(fn, {
    apply(_, _this, args) {
      ids.add(id++)
      if (ids.has(id - 1)) {
      }
      return Reflect.apply(_, _this, args)
    },
  })
}
