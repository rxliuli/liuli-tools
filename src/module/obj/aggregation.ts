import { returnItself } from '../function/returnItself'

/**
 * 根据不同的源对象获取不同的正则匹配，代表不需要拷贝的属性
 * @param source 源对象
 * @returns 匹配内部属性的正则表达式
 */
function getInnerFieldRule(source: any): RegExp {
  if (source instanceof Function) {
    return /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
  } else {
    return /^(?:toString|length)$/
  }
}

/**
 * 拷贝对象的属性到目标对象上
 * @param target 目标对象
 * @param source 源对象
 * @returns 返回 {@param target} 目标对象
 */
function _copyProps<T extends object>(target: T, source: T): T {
  const innerField = getInnerFieldRule(source)
  Reflect.ownKeys(source).forEach(prop => {
    if (typeof prop === 'string' && innerField.test(prop)) {
      return
    }
    Reflect.set(target, prop, Reflect.get(source, prop))
  })
  return target
}

/**
 * 混合多个类
 * @param  {...Class} mixins 需要混合的多个类及其构造函数参数映射函数的 Map 集合
 * @returns 返回一个混合后的类，构造函数将的参数
 */
export function aggregation(mixins: Map<any, (args: any[]) => any[]>): any {
  const arr: Array<[any, (args: any[]) => any[]]> = Array.from(mixins)
  class Aggregate {
    /**
     * @param args 任意数量的参数
     */
    constructor(...args: any[]) {
      arr.forEach(([Mixin, fn = returnItself]) =>
        _copyProps(this, new Mixin(...fn(args))),
      )
    }
  }

  arr.forEach(([Mixin]) => {
    _copyProps(Aggregate.prototype, Mixin.prototype)
    _copyProps(Aggregate, Mixin)
  })

  return Aggregate
}
