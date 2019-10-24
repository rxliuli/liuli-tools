/**
 * 解构可能为 Promise 的变量
 */
export type PromiseDeconstruct<T> = T extends Promise<infer R> ? R : T
