/**
 * 解构可能为 Promise 的变量
 */
export type ArrayDeconstruct<T> = T extends Array<infer R> ? R : never
