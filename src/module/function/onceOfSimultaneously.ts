import { compatibleAsync } from '../async/compatibleAsync'
import { ReturnFunc } from '../interface/ReturnFunc'

/**
 * 将函数包装为同一时间只能调用一次，其他的调用返回旧值
 * 主要适用场景是同一时间只允许存在一个 UI 调用（弹出层）
 * 示意图:
 * a => b => c => d => e =>
 * a ==|===> c ==|===> e =>
 *     |b        |d     (die)
 *
 * @param func 需要包装的函数
 * @returns 包装后的函数
 */
export function onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(
  func: Fn,
): Fn {
  let flag = false
  let cache: R
  return new Proxy(func, {
    apply(_, _this, args) {
      if (flag) {
        return cache
      }
      flag = true
      return compatibleAsync(Reflect.apply(_, _this, args), res => {
        cache = res
        flag = false
        return res
      })
    },
  })
}
