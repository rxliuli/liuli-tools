/**
 * 异步的 reduce 回调函数类型
 */
declare type AsyncArrayReduceCallback<T, R> = (res: R, item: T, index: number, arr: AsyncArray<T>) => Promise<R>;
/**
 * 异步的数组一般迭代类型
 */
declare type AsyncArrayCallback<T, R> = (item: T, index: number, arr: AsyncArray<T>) => Promise<R>;
/**
 * 异步的数组
 * 基于普通的 Array 类型实现
 */
export declare class AsyncArray<T> {
    /**
     * 当前数组的长度
     * 主要是为了便于与 Array 进行转换
     */
    readonly length: number;
    /**
     * 提供一个函数方便根据已有的数组或类数组（Set/Map）
     * @param arr 一个可迭代元素
     * @returns 创建一个新的异步数组包装
     */
    static from<T>(arr: Iterable<T> | ArrayLike<T> | null | undefined): AsyncArray<T>;
    /**
     * 内部的数组
     */
    private _arr;
    /**
     * 构造函数
     * @param args 数组初始元素
     */
    constructor(...args: T[]);
    /**
     * 异步的 forEach
     * @param fn 异步迭代函数
     */
    forEach(fn: AsyncArrayCallback<T, void>): Promise<void>;
    /**
     * 异步的 filter
     * @param fn 异步过滤函数
     * @returns 过滤后的新数组
     */
    filter(fn: AsyncArrayCallback<T, boolean>): Promise<AsyncArray<T>>;
    /**
     * 异步的 map
     * @param fn 异步映射函数
     * @returns 经过映射产生的新的异步数组
     */
    map<R>(fn: AsyncArrayCallback<T, R>): Promise<AsyncArray<R>>;
    /**
     * 异步的 flatMap
     * @param fn 异步映射函数，产生一个新的数组
     * @returns 压平一层的数组
     */
    flatMap<R>(fn: AsyncArrayCallback<T, R[]>): Promise<AsyncArray<R>>;
    /**
     * 异步的 every
     * @param fn 异步匹配函数
     * @returns 是否全部匹配
     */
    every(fn: AsyncArrayCallback<T, boolean>): Promise<boolean>;
    /**
     * 异步的 find
     * @param fn 异步查询函数
     * @returns 查询到的第一个值
     */
    find(fn: AsyncArrayCallback<T, boolean>): Promise<T | null>;
    /**
     * 异步 findIndex
     * @param fn 异步查询函数
     * @returns 查询到的第一个值的下标
     */
    findIndex(fn: AsyncArrayCallback<T, boolean>): Promise<number | null>;
    /**
     * 异步的 reduce
     * @param fn 归纳函数
     * @param res 初始值，默认为第一个元素
     * @returns 归纳后的值
     */
    reduce<R = T>(fn: AsyncArrayReduceCallback<T, R>, res?: R): Promise<R>;
    /**
     * 异步的 reduceRight
     * @param fn 归纳函数
     * @param res 初始值，默认为最后一个元素
     * @returns 归纳后的值
     */
    reduceRight<R = T>(fn: AsyncArrayReduceCallback<T, R>, res?: R): Promise<R>;
    /**
     * 获取内部数组的值，将返回一个浅复制的数组
     */
    value(): T[];
    /**
     * 使该对象可以被 for-of 迭代
     */
    [Symbol.iterator](): {
        next(): IteratorResult<T>;
    };
}
export {};
//# sourceMappingURL=AsyncArray.d.ts.map