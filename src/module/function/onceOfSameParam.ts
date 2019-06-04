import { ReturnFunc } from '../interface/ReturnFunc'
import { compatibleAsync } from './compatibleAsync'

/**
 * 包装一个函数为指定参数只执行一次的函数
 * @param fn 需要包装的函数
 * @param paramConverter 参数转换的函数，参数为需要包装函数的参数
 * @returns 需要被包装的函数
 * TODO 高阶函数需要更完善的类型信息，主要是声明接受函数与返回函数的参数/返回值完全一致
 */
export function onceOfSameParam<R>(
  fn: ReturnFunc<R>,
  identity = fn.toString(),
): ReturnFunc<R> {
  const generateKey = (args: any[]) =>
    `onceOfSameParam-${identity}-${JSON.stringify(args)}`
  const cacheMap = new Map()
  return new Proxy(fn, {
    apply(_, _this, args) {
      const key = generateKey(args)
      const old = cacheMap.get(key)
      if (old !== undefined) {
        return old
      }
      const res = Reflect.apply(_, _this, args)
      return compatibleAsync(res, res => {
        cacheMap.set(key, res)
        return res
      })
    },
  })
}
