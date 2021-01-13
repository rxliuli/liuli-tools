/**
 * 断言类型，如果 T 和 R 等价，那么将返回 R，否则返回 Error
 */
export type Expect<T, R> = T extends R ? (R extends T ? R : Error) : Error
