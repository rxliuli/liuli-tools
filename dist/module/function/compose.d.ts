/**
 * 将多个函数组合起来
 * 前面函数的返回值将变成后面函数的第一个参数，如果到了最后一个函数执行完成，则直接返回
 * 注: 该函数是自动柯里化，将对所有传入的函数进行柯里化处理
 * 注: 该函数支持一次调用传入全部函数的参数
 * @param fns 多个需要连接函数
 * @returns 连接后的柯里化函数
 * TODO 这里需要进行类型优化
 */
export declare function compose(...fns: Function[]): Function;
//# sourceMappingURL=compose.d.ts.map