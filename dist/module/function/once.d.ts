/**
 * 将指定函数包装为只调用一次
 * @param fn 需要包装的函数
 * @returns 包装后的函数
 */
export declare function once<R, Fn extends (...args: any[]) => R>(fn: Fn): Fn & {
    origin: Fn;
    clear: () => void;
};
//# sourceMappingURL=once.d.ts.map