/**
 * 柯里化后返回的函数
 */
interface IRFunc extends Function {
    /**
     * 是否为柯里化函数，默认为 true 以标识柯里化函数
     */
    _curry: boolean;
    /**
     * 剩余参数的长度
     */
    _length: number;
    /**
     * 重写 toString 便于调试
     */
    toString: () => string;
}
/**
 * 将函数包装为柯里化函数
 * 注: 该函数模仿了 Lodash 的 curry 函数
 * @param fn 需要包装的函数
 * @param  {...any} args 应用的部分参数
 * @returns 包装后的函数
 */
export declare function curry(fn: Function, ...args: any[]): IRFunc;
export declare namespace curry {
    var _: symbol;
}
export {};
//# sourceMappingURL=curry.d.ts.map