declare type EventType = string | number;
declare type CallbackFunc<Args extends any[]> = Args extends [infer P1] ? (p1: P1) => void : Args extends [infer P1, infer P2] ? (p1: P1, p2: P2) => void : (...args: Args) => void;
/**
 * 事件总线
 * 实际上就是发布订阅模式的一种简单实现
 * 类型定义受到 {@link https://github.com/andywer/typed-emitter/blob/master/index.d.ts} 的启发，不过只需要声明参数就好了，而不需要返回值（应该是 {@code void}）
 */
export declare class EventEmitter<Events extends Record<EventType, any[]>> {
    private readonly events;
    /**
     * 添加一个事件监听程序
     * @param type 监听类型
     * @param callback 处理回调
     * @returns {@code this}
     */
    add<E extends keyof Events>(type: E, callback: CallbackFunc<Events[E]>): this;
    /**
     * 移除一个事件监听程序
     * @param type 监听类型
     * @param callback 处理回调
     * @returns {@code this}
     */
    remove<E extends keyof Events>(type: E, callback: CallbackFunc<Events[E]>): this;
    /**
     * 移除一类事件监听程序
     * @param type 监听类型
     * @returns {@code this}
     */
    removeByType<E extends keyof Events>(type: E): this;
    /**
     * 触发一类事件监听程序
     * @param type 监听类型
     * @param args 处理回调需要的参数
     * @returns {@code this}
     */
    emit<E extends keyof Events>(type: E, ...args: Events[E]): this;
    /**
     * 获取一类事件监听程序
     * @param type 监听类型
     * @returns 一个只读的数组，如果找不到，则返回空数组 {@code []}
     */
    listeners<E extends keyof Events>(type: E): readonly Function[];
}
export {};
//# sourceMappingURL=EventEmitter.d.ts.map