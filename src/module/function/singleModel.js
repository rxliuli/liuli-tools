// @ts-check
/**
 * 通用的单例模式
 * @param {Object} clazz 需要包装为单例的类型
 * @returns {Object} 包装后的单例模式类，使用 {@code new} 创建将只在第一次有效
 */
export function singleModel (clazz) {
  let instance
  return class SingleClass extends clazz {
    /**
     * @param {...Object} args
     */
    constructor (...args) {
      if (instance) {
        return instance
      }
      super(...args)
      instance = this
    }
  }
}
