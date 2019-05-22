/**
 * 包装一个函数为有错误重试功能的函数
 * 注意: 该函数是并行运行，所以一旦调用，就会同时调用 n 次，不管之前有没有失败。。。此函数不适合包装有副作用的操作，例如修改用户信息，请使用 {@link trySometime} 替代
 * @param fn 需要被包装的函数
 * @param [num=1] 调用的次数。默认为 1
 * @param [errorCheck=res=>true] 检查返回结果是否需要重试的函数。默认只要 resolve() 就返回 true
 * @returns 包装后的有错误重试功能的函数
 */
export declare function trySometimeParallel<R, Func extends Function = (...args: any[]) => R>(fn: Func, num?: number, errorCheck?: (res: R) => boolean): Func;
//# sourceMappingURL=trySometimeParallel.d.ts.map