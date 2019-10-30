/**
 * 解构可能为 Promise 的变量
 */
export declare type PromiseDeconstruct<T> = T extends Promise<infer R> ? R : T;
//# sourceMappingURL=PromiseDeconstruct.d.ts.map