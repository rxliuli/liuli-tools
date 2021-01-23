/**
 * 判断如果 T 和 R 不是同类型则返回 Error
 * 注意：如果 T 和 R 不等，则会返回 Error | R，例如 {@code E1<number | string, number>} 的结果是 {@code number | Error}，具体原因参考 {@link https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-types}
 */
export type BaseExpect<T, R extends T> = T extends R ? R : Error

/**
 * 断言类型相等，如果 T 和 R 等价，那么将返回 R，否则返回 Error
 * 相比与通过 as 而言是比较类型是否相等而非比较 T 是 R 的子集类型
 *
 * 最终判断是否能提取出 Error，如果不能则返回 R，否则返回 Error
 * 注意：如果反向判断是否为 Error 的话则不能正常生效，例如 {@code type E4<T, R extends T> = E2<T, R> extends Error ? Error : R} 是错误的，具体原因在 {@link https://www.typescriptlang.org/docs/handbook/basic-types.html#never} 中提到，never 是所有类型的子类，但其它类型不能赋值给它，例如 {@code never extends Error} 一定为真，反之则一定为假
 */
export type Expect<T, R extends T> = Extract<
  BaseExpect<T, R>,
  Error
> extends never
  ? R
  : Error
