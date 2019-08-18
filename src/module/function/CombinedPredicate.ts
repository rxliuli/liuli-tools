import { ReturnFunc } from '../interface/ReturnFunc'
import { compatibleAsync } from '../async/compatibleAsync'

/**
 * 谓词的返回值，支持异步函数
 */
type PredicateReturn = boolean | Promise<boolean>
/**
 * 谓词函数的类型
 */
type PredicateFunc = ReturnFunc<PredicateReturn>

/**
 * 内部使用的函数
 * 注: 如果谓词中包含任意一个异步(返回 Promise)函数,则整个返回结果将变成异步的,否则默认为同步操作.
 * @param fns 谓词数组
 * @param args 谓词应用的参数列表
 * @param condition 临界条件
 * @returns 返回结果
 */
function _inner(
  fns: PredicateFunc[],
  args: any[],
  condition: (res: boolean) => boolean,
): PredicateReturn {
  const fn = fns[0]
  const res = fn!(...args)
  function _call(res: boolean): PredicateReturn {
    if (condition(res)) {
      return res
    }
    const others = fns.slice(1)
    if (others.length === 0) {
      return res
    }
    return _inner(others, args, condition)
  }
  return compatibleAsync(res, _call) as any
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
      return _inner(fns, args, res => !res)
    }
  }
  /**
   * 使用 || 进行连接
   * @param fns 连接任意多个谓词
   * @returns 连接后的新谓词
   */
  public static or(...fns: PredicateFunc[]) {
    return function(...args: any[]) {
      return _inner(fns, args, res => res)
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
        return compatibleAsync(Reflect.apply(_, this, args), res => !res)
      },
    })
  }
}

export const and = CombinedPredicate.and
export const or = CombinedPredicate.or
export const not = CombinedPredicate.not
