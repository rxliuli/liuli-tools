/**
 * 使用 Proxy 实现通用的单例模式
 * @param {Object} clazz 需要包装为单例的类型
 * @returns {Object} 包装后的单例模式类，使用 {@code new} 创建将只在第一次有效
 */
export function singleModel (clazz) {
  let instance
  return new Proxy(clazz, {
    construct (target, args, newTarget) {
      if (instance) {
        return instance
      }
      instance = Reflect.construct(target, args, newTarget)
      return instance
    },
  })
}
