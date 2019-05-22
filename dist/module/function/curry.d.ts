/**
 * 将函数包装为柯里化函数
 * 注: 该函数模仿了 Lodash 的 curry 函数
 * @param fn 需要包装的函数
 * @param  {...any} args 应用的部分参数
 * @returns 包装后的函数
 */
export declare function curry(fn: Function, ...args: any[]): Function;
export declare namespace curry {
    var _: symbol;
}
//# sourceMappingURL=curry.d.ts.map