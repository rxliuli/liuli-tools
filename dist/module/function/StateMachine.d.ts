/**
 * 状态机
 * 用于避免使用 if-else 的一种方式
 */
export declare class StateMachine {
    /**
     * 获取到一个状态工厂
     */
    static getFactory(): {
        /**
         * 注册一个 class，创建子类时调用，用于记录每一个 [状态 => 子类] 对应
         * 注: 此处不再默认使用单例模式，如果需要，请自行对 class 进行包装
         * @param {Number|String} state 作为键的状态
         * @param {Object} clazz 对应的子类型
         * @returns {Object} 返回 clazz 本身
         */
        register(state: any, clazz: any): any;
        /**
         * 获取一个标签子类对象
         * @param {Number|String} state 状态索引
         * @param {...Object} [args] 构造函数的参数
         * @returns {Object} 子类对象
         */
        getInstance(state: any, ...args: any[]): any;
        /**
         * 允许使用 for-of 遍历整个状态机
         */
        [Symbol.iterator](): {
            next(): IteratorResult<[any, any]>;
        };
    };
}
//# sourceMappingURL=StateMachine.d.ts.map