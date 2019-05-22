type Newable = new (...args: any[]) => any

/**
 * 状态机
 * 用于避免使用 if-else 的一种方式
 */
export class StateMachine {
  /**
   * 获取到一个状态工厂
   */
  public static getFactory<K>() {
    const classMap = new Map()
    /**
     * 状态注册器
     * 更好的有限状态机，分离子类与构建的关系，无论子类如何增删该都不影响基类及工厂类
     */
    return new (class Builder {
      /**
       * 注册一个 class，创建子类时调用，用于记录每一个 [状态 => 子类] 对应
       * 注: 此处不再默认使用单例模式，如果需要，请自行对 class 进行包装
       * @param state 作为键的状态
       * @param clazz 对应的子类型
       * @returns 返回 clazz 本身
       */
      public register(state: K, clazz: Newable): object {
        classMap.set(state, clazz)
        return clazz
      }

      /**
       * 获取一个标签子类对象
       * @param state 状态索引
       * @param args 构造函数的参数
       * @returns 子类对象
       */
      public getInstance(state: K, ...args: undefined[]) {
        const Class = classMap.get(state)
        if (!Class) {
          return null
        }
        // 构造函数的参数
        return new Class(...args)
      }
      /**
       * 允许使用 for-of 遍历整个状态机
       */
      public [Symbol.iterator]() {
        const map = classMap.entries()
        return {
          next() {
            return map.next()
          },
        }
      }
    })()
  }
}
