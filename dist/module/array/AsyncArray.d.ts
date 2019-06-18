/**
 * 异步的 reduce 回调函数类型
 */
declare type AsyncArrayReduceCallback<T, R, IArray> = (res: R, item: T, index: number, arr: IArray) => Promise<R>;
/**
 * 异步的数组一般迭代类型
 */
declare type AsyncArrayCallback<T, R, IArray> = (item: T, index: number, arr: IArray) => Promise<R>;
/**
 * 抽象异步数组，实现了一些公共的函数
 */
declare abstract class BaseAsyncArray<T> {
    /**
     * 内部的数组
     */
    protected _arr: T[];
    /**
     * 当前数组的长度
     * 主要是为了便于与 Array 进行转换
     */
    readonly length: number;
    /**
     * 构造函数
     * @param args 数组初始元素
     */
    constructor(...args: T[]);
    /**
     * 获取内部数组的值，将返回一个浅复制的数组
     */
    value(): T[];
    /**
     * 使该对象可以被 for-of 迭代
     */
    [Symbol.iterator](): IterableIterator<T>;
}
/**
 * 串行的异步数组
 */
export declare class AsyncArray<T> extends BaseAsyncArray<T> {
    /**
     * 提供一个函数方便根据已有的数组或类数组（Set/Map）
     * @param arr 一个可迭代元素
     * @returns 创建一个新的异步数组包装
     */
    static from<T>(arr: Iterable<T> | ArrayLike<T> | null | undefined): AsyncArray<T>;
    constructor(...args: T[]);
    /**
     * 异步的 forEach
     * @param fn 异步迭代函数
     */
    forEach(fn: AsyncArrayCallback<T, void, AsyncArray<T>>): Promise<void>;
    /**
     * 异步的 filter
     * @param fn 异步过滤函数
     * @returns 过滤后的新数组
     */
    filter(fn: AsyncArrayCallback<T, boolean, AsyncArray<T>>): Promise<AsyncArray<T>>;
    /**
     * 异步的 map
     * @param fn 异步映射函数
     * @returns 经过映射产生的新的异步数组
     */
    map<R>(fn: AsyncArrayCallback<T, R, AsyncArray<T>>): Promise<AsyncArray<R>>;
    /**
     * 异步的 flatMap
     * @param fn 异步映射函数，产生一个新的数组
     * @returns 压平一层的数组
     */
    flatMap<R>(fn: AsyncArrayCallback<T, R[], AsyncArray<T>>): Promise<AsyncArray<R>>;
    /**
     * 异步的 every
     * @param fn 异步匹配函数
     * @returns 是否全部匹配
     */
    every(fn: AsyncArrayCallback<T, boolean, AsyncArray<T>>): Promise<boolean>;
    /**
     * 异步的 find
     * @param fn 异步查询函数
     * @returns 查询到的第一个值
     */
    find(fn: AsyncArrayCallback<T, boolean, AsyncArray<T>>): Promise<T | null>;
    /**
     * 异步 findIndex
     * @param fn 异步查询函数
     * @returns 查询到的第一个值的下标
     */
    findIndex(fn: AsyncArrayCallback<T, boolean, AsyncArray<T>>): Promise<number | null>;
    /**
     * 异步的 reduce
     * @param fn 归纳函数
     * @param res 初始值，默认为第一个元素
     * @returns 归纳后的值
     */
    reduce<R = T>(fn: AsyncArrayReduceCallback<T, R, AsyncArray<T>>, res?: R): Promise<R>;
    /**
     * 异步的 reduceRight
     * @param fn 归纳函数
     * @param res 初始值，默认为最后一个元素
     * @returns 归纳后的值
     */
    reduceRight<R = T>(fn: AsyncArrayReduceCallback<T, R, AsyncArray<T>>, res?: R): Promise<R>;
    /**
     * 转换为并发的异步数组
     * @returns {@link AsyncArrayParallel} 实例
     */
    parallel(): AsyncArrayParallel<T>;
}
/**
 * 并发的异步数组
 */
export declare class AsyncArrayParallel<T> extends BaseAsyncArray<T> {
    /**
     * 提供一个函数方便根据已有的数组或类数组（Set/Map）
     * @param arr 一个可迭代元素
     * @returns 创建一个新的异步数组包装
     */
    static from<T>(arr: Iterable<T> | ArrayLike<T> | null | undefined): AsyncArrayParallel<T>;
    constructor(...args: T[]);
    /**
     * 异步的 forEach
     * 注: 执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
     * @param fn 异步迭代函数
     */
    forEach(fn: AsyncArrayCallback<T, void, AsyncArrayParallel<T>>): Promise<void>;
    /**
     * 异步的 filter
     * 注: 执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
     * @param fn 异步过滤函数
     * @returns 过滤后的新数组
     */
    filter(fn: AsyncArrayCallback<T, boolean, AsyncArrayParallel<T>>): Promise<AsyncArrayParallel<T>>;
    /**
     * 异步的 map
     * 注: 执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
     * @param fn 异步映射函数
     * @returns 经过映射产生的新的异步数组
     */
    map<R>(fn: AsyncArrayCallback<T, R, AsyncArrayParallel<T>>): Promise<AsyncArrayParallel<R>>;
    /**
     * 异步的 flatMap
     * 注: 执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
     * @param fn 异步映射函数，产生一个新的数组
     * @returns 压平一层的数组
     */
    flatMap<R>(fn: AsyncArrayCallback<T, R[], AsyncArrayParallel<T>>): Promise<AsyncArrayParallel<R>>;
    /**
     * 异步的 every
     * 注: 执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
     * 注: 实际上是全部遍历一遍才会去判断是否有不符合谓词的元素，所以如果异步操作有副作用请不要使用此函数（例如 Ajax 修改数据库）
     * @param fn 异步匹配函数
     * @returns 是否全部匹配
     */
    every(fn: AsyncArrayCallback<T, boolean, AsyncArrayParallel<T>>): Promise<boolean>;
    /**
     * 异步的 find
     * 注: 执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
     * 注: 实际上是全部遍历一遍才会去判断是否有符合谓词的元素，所以如果异步操作有副作用请不要使用此函数（例如 Ajax 修改数据库）
     * @param fn 异步查询函数
     * @returns 查询到的第一个值
     */
    find(fn: AsyncArrayCallback<T, boolean, AsyncArrayParallel<T>>): Promise<T | null>;
    /**
     * 异步 findIndex
     * 注: 执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
     * 注: 实际上是全部遍历一遍才会去判断是否有符合谓词的元素，所以如果异步操作有副作用请不要使用此函数（例如 Ajax 修改数据库）
     * @param fn 异步查询函数
     * @returns 查询到的第一个值的下标
     */
    findIndex(fn: AsyncArrayCallback<T, boolean, AsyncArrayParallel<T>>): Promise<number>;
    /**
     * 异步的 reduce
     * @param fn 归纳函数
     * @param res 初始值，默认为第一个元素
     * @returns 归纳后的值
     */
    reduce<R = T>(fn: AsyncArrayReduceCallback<T, R, AsyncArrayParallel<T>>, res?: R): Promise<R>;
    /**
     * 异步的 reduceRight
     * @param fn 归纳函数
     * @param res 初始值，默认为最后一个元素
     * @returns 归纳后的值
     */
    reduceRight<R = T>(fn: AsyncArrayReduceCallback<T, R, AsyncArrayParallel<T>>, res?: R): Promise<R>;
    /**
     * 转换为串行化的异步数组
     * @returns {@link AsyncArray} 实例
     */
    serial(): AsyncArray<T>;
    private _all;
}
export {};
//# sourceMappingURL=AsyncArray.d.ts.map