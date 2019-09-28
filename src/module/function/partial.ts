/**
 * 部分应用后返回的函数
 */
interface IRFunc extends Function {
  /**
   * 是否为偏函数，默认为 true 以标识偏函数
   */
  _partial: boolean
  /**
   * 剩余参数的长度
   */
  _length: number
  /**
   * 重写 toString 便于调试
   */
  toString: () => string
}

/**
 * 将函数包装为偏函数
 * 注: 该函数模仿了 underscore 的 partial 函数
 * @param fn 需要包装的函数
 * @param  {...any} args 应用的部分参数
 * @returns 包装后的函数
 */
export function partial(fn: Function, ...args: any[]): IRFunc {
  const realArgs = args.filter(arg => arg !== partial._)
  // 如果函数参数足够则调用传入的函数
  if (realArgs.length >= fn.length) {
    return fn(...realArgs)
  }

  /**
   * 最终返回的函数
   * @param otherArgs 接受任意参数
   * @returns 返回一个函数，或者函数调用完成返回结果
   */
  function innerFn(...otherArgs: any[]): Function {
    // 记录需要移除补到前面的参数
    const removeIndexSet = new Set()
    let i = 0
    const newArgs = args.map(arg => {
      if (
        arg !== partial._ ||
        otherArgs[i] === undefined ||
        otherArgs[i] === partial._
      ) {
        return arg
      }
      removeIndexSet.add(i)
      // 每次补偿前面的 partial._ 参数计数器 +1
      return otherArgs[i++]
    })
    const newOtherArgs = otherArgs.filter((_v, i) => !removeIndexSet.has(i))
    return partial(fn, ...newArgs, ...newOtherArgs)
  }
  // 定义偏函数的剩余参数长度，便于在其他地方进行部分参数应用
  // 注: 不使用 length 属性的原因是 length 属性
  innerFn._length = fn.length - args.filter(arg => arg !== partial._).length
  // 自定义 toString 函数便于调试
  innerFn.toString = () =>
    `name: ${fn.name}, args: [${args.map(o => o.toString()).join(', ')}]`
  innerFn._partial = true
  return innerFn
}

/**
 * 偏的占位符，需要应用后面的参数时使用
 * 例如 {@link partial(fn)(partial._, 1)} 意味着函数 fn 的第二个参数将被确定为 1
 */
partial._ = Symbol('_')
