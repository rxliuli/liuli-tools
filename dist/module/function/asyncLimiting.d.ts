interface IAsyncLimiting {
    limit: number;
}
/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param fn 异步函数
 * @param [options={}] 可选参数
 * @param [options.limit=1] 并发限制数量，默认为 1
 * @returns 返回被包装后的限制并发功能的函数
 */
export declare function asyncLimiting<R>(fn: (...args: any[]) => R, { limit }?: Partial<IAsyncLimiting>): (...args: any[]) => R;
export {};
//# sourceMappingURL=asyncLimiting.d.ts.map