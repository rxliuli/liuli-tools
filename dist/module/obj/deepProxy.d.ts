/**
 * 包装对象，使其成为可以任意深度调用而不会出现 undefined 调用的问题
 * 注意: 该函数不能进行递归调用（{@link JSON.stringfy}），一定会造成堆栈溢出的问题（RangeError: Maximum call stack size exceeded）
 * @param obj 任意一个 Object 对象
 * @param [defaultValue] 默认值，默认为 {}
 * @returns 包装后的对象
 */
export declare function deepProxy<T extends object = object>(obj?: T, defaultValue?: any): any;
//# sourceMappingURL=deepProxy.d.ts.map