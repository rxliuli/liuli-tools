import { ReturnFunc } from '../interface/ReturnFunc'
import { async } from './async'
import { stringValidator } from '../string/stringValidator'

/**
 * 谓词的返回值，支持异步函数
 */
type PredicateReturn = boolean | Promise<boolean>
/**
 * 谓词函数的类型
 */
type PredicateFunc = ReturnFunc<PredicateReturn>

/**
 * 内部函数
 * @param fns 传入剩余的函数列表
 * @param args 参数数组
 * @param call 执行的回调函数
 * @returns 执行结果
 */
function _inner(
  fns: PredicateFunc[],
  args: any[],
  call: (res: boolean) => PredicateReturn,
): PredicateReturn {
  const fn = fns.shift()
  if (!fn) {
    return false
  }
  // @ts-ignore
  const result = fn.apply(this, args)
  if (result instanceof Promise) {
    return result.then(call)
  }
  return call(result)
}

/**
 * 连接谓词函数
 */
export class CombinedPredicate {
  /**
   * 使用 && 进行连接
   * @param fns 连接任意多个谓词
   * @returns 连接后的新谓词
   */
  public static and(...fns: PredicateFunc[]) {
    return function(...args: any[]) {
      return _inner(fns, args, function call(res): PredicateReturn {
        if (!res) {
          return false
        }
        if (fns.length === 0) {
          return res
        }
        return _inner(fns, args, call)
      })
    }
  }
  /**
   * 使用 || 进行连接
   * @param fns 连接任意多个谓词
   * @returns 连接后的新谓词
   */
  public static or(...fns: PredicateFunc[]) {
    return function(...args: any[]) {
      return _inner(fns, args, function call(res): PredicateReturn {
        if (res) {
          return true
        }
        if (fns.length === 0) {
          return res
        }
        return _inner(fns, args, call)
      })
    }
  }
  /**
   * 对谓词进行取反
   * @param fn 谓词
   * @returns 取反后的谓词
   */
  public static not(fn: PredicateFunc) {
    return new Proxy(fn, {
      apply(_, _this, args) {
        const result = Reflect.apply(_, this, args)
        if (result instanceof Promise) {
          return result.then(res => !res)
        }
        return !result
      },
    })
  }
}
