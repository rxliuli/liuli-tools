import { returnItself } from '../function/returnItself'

/**
 * 根据不同的源对象获取不同的正则匹配，代表不需要拷贝的属性
 * @param {Object} source 源对象
 * @returns {RegExp} 匹配内部属性的正则表达式
 */
function getInnerFieldRule (source) {
  if (source instanceof Function) {
    return /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
  } else {
    return /^(?:toString|length)$/
  }
}

/**
 * 拷贝对象的属性到目标对象上
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @returns {Object} 返回 {@param target} 目标对象
 */
function _copyProps (target, source) {
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
 * @returns {Class} 返回一个混合后的类，构造函数将的参数
 */
export function aggregation (mixins) {
  const map = Array.from(mixins)
  class __Aggregate {
    /**
     * @param {...Object} args 任意数量的参数
     */
    constructor (...args) {
      map.forEach(([Mixin, fn = returnItself]) => {
        _copyProps(this, new Mixin(...fn(args)))
      })
    }
  }

  map.forEach(([Mixin]) => {
    _copyProps(__Aggregate.prototype, Mixin.prototype)
    _copyProps(__Aggregate, Mixin)
  })

  return __Aggregate
}