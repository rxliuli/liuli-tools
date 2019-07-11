import { Newable } from '../interface/Newable'
import { Nullable } from '../interface/Nullable'

/**
 * 状态机
 * 用于避免使用 if-else 的一种方式
 * @typeparam K 状态的类型，默认为 any
 * @typeparam V 构造函数返回值的类型，一般为实现子类的基类，默认为 any
 * @deprecated 该类将在下个大版本进行重构，使用函数而非类作为基本单元
 */
export class StateMachine<K = any, R = any> {
  /**
   * 获取到一个状态工厂
   * @deprecated 已废弃，请直接创建一个 StateMachine 实例
   */
  public static getFactory<K>() {
    /**
     * 状态注册器
     * 更好的有限状态机，分离子类与构建的关系，无论子类如何增删该都不影响基类及工厂类
     */
    return new StateMachine<K>()
  }
  private classMap = new Map<K, Newable<R>>()
  /**
   * 注册一个 class，创建子类时调用，用于记录每一个 [状态 => 子类] 对应
   * 注: 此处不再默认使用单例模式，如果需要，请自行对 class 进行包装
   * @param state 作为键的状态
   * @param clazz 对应的子类型
   * @returns 返回 clazz 本身
   */
  public register(state: K, clazz: Newable<R>): Newable<R> {
    this.classMap.set(state, clazz)
    return clazz
  }

  /**
   * 获取一个标签子类对象
   * @param state 状态索引
   * @param args 构造函数的参数
   * @returns 子类对象
   */
  public getInstance(state: K, ...args: any[]): Nullable<R> {
    const Class = this.classMap.get(state)
    if (!Class) {
      return null
    }
    // 构造函数的参数
    return new Class(...args)
  }
  /**
   * 允许使用 for-of 遍历整个状态机
   */
  public *[Symbol.iterator]() {
    for (const kv of this.classMap.entries()) {
      yield kv
    }
  }
}
