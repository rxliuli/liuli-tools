/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param {Function} fn 异步函数
 * @param {Object} [options={}] 可选参数
 * @param {Number} [options.limit=1] 并发限制数量，默认为 1
 * @returns {Function} 返回被包装后的限制并发功能的函数
 */
export declare function asyncLimiting(fn: any, { limit }?: {
    limit?: number | undefined;
}): any;
//# sourceMappingURL=asyncLimiting.d.ts.map