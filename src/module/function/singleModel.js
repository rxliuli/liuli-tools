/**
 * 通用的单例模式
 *
 * @param {FunctionConstructor} clazz 需要包装为单例的类型
 * @returns {FunctionConstructor} 包装后的单例模式类，使用 {@code new} 创建将只在第一次有效
 */
function singleModel (clazz) {
  let instance
  return class SingleClass extends clazz {
    constructor (...args) {
      if (instance) {
        return instance
      }
      super(...args)
      instance = this
    }
  }
}

export default singleModel
