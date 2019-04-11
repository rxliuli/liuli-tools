import { singleModel } from './singleModel'

// @ts-check
/**
 * 状态机
 * 用于避免使用 if-else 的一种方式
 */
export class StateMachine {
  /**
   * 获取到一个状态工厂
   */
  static getFactory () {
    const classMap = new Map()
    /**
     * 状态注册器
     * 更好的有限状态机，分离子类与构建的关系，无论子类如何增删该都不影响基类及工厂类
     */
    return new class Builder {
      /**
       * 注册一个 class，创建子类时调用，用于记录每一个 [状态 => 子类] 对应
       * @param {Number|String} state 作为键的状态
       * @param {Object} clazz 对应的子类型
       * @returns {Object} 返回 clazz 本身
       */
      register (state, clazz) {
        classMap.set(state, singleModel(clazz))
        return clazz
      }

      // noinspection JSMethodCanBeStatic
      /**
       * 获取一个标签子类对象
       * @param {Number|String} state 状态索引
       * @returns {Object} 子类对象
       */
      getInstance (state) {
        const Class = classMap.get(state)
        if (!Class) {
          return null
        }
        // 构造函数的参数
        return new Class(...Array.from(arguments).slice(1))
      }
    }()
  }
}
