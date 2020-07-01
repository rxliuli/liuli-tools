/**
 * 将多个并发异步调用合并为一次批处理
 * @param handle 批处理的函数
 * @param ms 等待的时长（时间越长则可能合并的调用越多，否则将使用微任务只合并一次同步执行的所有调用）
 */
export declare function batch<P extends any[], R extends any>(handle: (list: P[]) => Promise<Map<P, R | Error>>, ms?: number): (...args: P) => Promise<R>;
//# sourceMappingURL=batch.d.ts.map