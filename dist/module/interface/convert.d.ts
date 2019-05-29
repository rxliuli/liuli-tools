/**
 * 转换一种泛型为另一种需要合理的泛型类型
 * 实质上就是转换为 unknown 再转换为 R 而已，仅仅只是为了绕过 ts 的编译
 * @param t 需要转换的任何参数
 * @returns 返回需要的合理类型结果
 * @typeparam T 被转换的类型
 * @typeparam T 需要转换的类型
 */
export declare function convert<T, R>(t: T): R;
//# sourceMappingURL=convert.d.ts.map