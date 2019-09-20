/**
 * 提取对象中的字段并封装为函数
 * @param k 提取的字段，深度获取使用 . 分割不同的字段
 * @returns 获取对象中指定字段的函数
 */
export declare function extractField<T extends object>(k: PropertyKey): (obj: T) => any;
//# sourceMappingURL=extractField.d.ts.map