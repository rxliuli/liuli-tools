/**
 * 将一个 key 生成的函数转换为一个接受两个参数的比较函数，主要用于排序函数的转换
 * @param kFn 生成 key 的函数
 * @returns 生成的接受两个参数的比较函数
 * @typeparam T 比较元素的类型
 */
export declare function kFnToCompare<T, K = any>(kFn: (v: T) => K): (v1: T, v2: T) => number;
//# sourceMappingURL=kFnToCompare.d.ts.map