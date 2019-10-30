import { Newable } from '../interface/Newable';
import { Nullable } from '../interface/Nullable';
/**
 * 状态机
 * 用于避免使用 if-else 的一种方式
 * @typeparam K 状态的类型，默认为 any
 * @typeparam V 构造函数返回值的类型，一般为实现子类的基类，默认为 any
 * @deprecated 该类将在下个大版本进行重构，使用函数而非类作为基本单元
 */
export declare class StateMachine<K = any, R = any> {
    /**
     * 获取到一个状态工厂
     * @deprecated 已废弃，请直接创建一个 StateMachine 实例
     */
    static getFactory<K>(): StateMachine<K, any>;
    private classMap;
    /**
     * 注册一个 class，创建子类时调用，用于记录每一个 [状态 => 子类] 对应
     * 注: 此处不再默认使用单例模式，如果需要，请自行对 class 进行包装
     * @param state 作为键的状态
     * @param clazz 对应的子类型
     * @returns 返回 clazz 本身
     */
    register(state: K, clazz: Newable<R>): Newable<R>;
    /**
     * 获取一个标签子类对象
     * @param state 状态索引
     * @param args 构造函数的参数
     * @returns 子类对象
     */
    getInstance(state: K, ...args: any[]): Nullable<R>;
    /**
     * 允许使用 for-of 遍历整个状态机
     */
    [Symbol.iterator](): Generator<[K, Newable<R>], void, unknown>;
}
//# sourceMappingURL=StateMachine.d.ts.map