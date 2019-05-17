/**
 * 将多个函数组合起来
 * 前面函数的返回值将变成后面函数的第一个参数，如果到了最后一个函数执行完成，则直接返回
 * 该函数是自动柯里化，将对所有传入的函数进行柯里化处理
 * @param  {...Function} fns 多个需要连接函数
 * @returns {Function} 连接后的柯里化函数
 */
export declare function compose(...fns: any[]): any;
//# sourceMappingURL=compose.d.ts.map