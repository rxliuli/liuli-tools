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
declare abstract class InnerBaseAsyncArray<T> {
    /**
     * 内部的数组
     */
    protected _arr: T[];
    /**
     * 构造函数
     * @param args 数组初始元素
     */
    constructor(args?: T[]);
    /**
     * 异步的 forEach
     * @param fn 异步迭代函数
     */
    abstract forEach(fn: AsyncArrayCallback<T, void, any>): Promise<void>;
    /**
     * 异步的 filter
     * @param fn 异步过滤函数
     * @returns 过滤后的新数组
     */
    abstract filter(fn: AsyncArrayCallback<T, boolean, any>): Promise<any>;
    /**
     * 异步的 map
     * @param fn 异步映射函数
     * @returns 经过映射产生的新的异步数组
     */
    abstract map<R>(fn: AsyncArrayCallback<T, R, any>): Promise<any>;
    /**
     * 异步的 flatMap
     * @param fn 异步映射函数，产生一个新的数组
     * @returns 压平一层的数组
     */
    abstract flatMap<R>(fn: AsyncArrayCallback<T, R[], any>): Promise<any>;
    /**
     * 将整个数组排序
     * @param fn 比较函数
     * @returns 排序后的数组
     */
    sort(fn?: (t1: T, t2: T) => Promise<number>): Promise<InnerAsyncArray<T>>;
    /**
     * 异步的 reduce
     * @param fn 归纳函数
     * @param res 初始值，默认为第一个元素
     * @returns 归纳后的值
     */
    abstract reduce<R = T>(fn: AsyncArrayReduceCallback<T, R, any>, res?: R): Promise<R>;
    /**
     * 异步的 reduceRight
     * @param fn 归纳函数
     * @param res 初始值，默认为最后一个元素
     * @returns 归纳后的值
     */
    abstract reduceRight<R = T>(fn: AsyncArrayReduceCallback<T, R, any>, res?: R): Promise<R>;
    /**
     * 异步 findIndex
     * @param fn 异步查询函数
     * @returns 查询到的第一个值的下标
     */
    abstract findIndex(fn: AsyncArrayCallback<T, boolean, any>): Promise<number>;
    /**
     * 异步的 find
     * @param fn 异步查询函数
     * @returns 查询到的第一个值
     */
    find(fn: AsyncArrayCallback<T, boolean, any>): Promise<T | null>;
    /**
     * 异步的 every
     * @param fn 异步匹配函数
     * @returns 是否全部匹配
     */
    every(fn: AsyncArrayCallback<T, boolean, any>): Promise<boolean>;
    /**
     * 异步的 some
     * @param fn 异步匹配函数
     * @returns 是否有任意一个匹配
     */
    some(fn: AsyncArrayCallback<T, boolean, any>): Promise<boolean>;
    /**
     * 转换为并发异步数组
     */
    parallel(): any;
    /**
     * 转换为顺序异步数组
     */
    serial(): any;
    /**
     * 获取内部数组的值，将返回一个浅复制的数组
     */
    value(): T[];
}
/**
 * 串行的异步数组
 */
declare class InnerAsyncArray<T> extends InnerBaseAsyncArray<T> {
    constructor(args?: T[]);
    forEach(fn: AsyncArrayCallback<T, void, InnerAsyncArray<T>>): Promise<void>;
    filter(fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T>>): Promise<InnerAsyncArray<T>>;
    map<R>(fn: AsyncArrayCallback<T, R, InnerAsyncArray<T>>): Promise<InnerAsyncArray<R>>;
    flatMap<R>(fn: AsyncArrayCallback<T, R[], InnerAsyncArray<T>>): Promise<InnerAsyncArray<R>>;
    reduce<R = T>(fn: AsyncArrayReduceCallback<T, R, InnerAsyncArray<T>>, res?: R): Promise<R>;
    reduceRight<R = T>(fn: AsyncArrayReduceCallback<T, R, InnerAsyncArray<T>>, res?: R): Promise<R>;
    findIndex(fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T>>): Promise<number>;
}
/**
 * 并发的异步数组
 */
declare class InnerAsyncArrayParallel<T> extends InnerBaseAsyncArray<T> {
    constructor(args?: T[]);
    forEach(fn: AsyncArrayCallback<T, void, InnerAsyncArrayParallel<T>>): Promise<void>;
    filter(fn: AsyncArrayCallback<T, boolean, InnerAsyncArrayParallel<T>>): Promise<InnerAsyncArrayParallel<T>>;
    map<R>(fn: AsyncArrayCallback<T, R, InnerAsyncArrayParallel<T>>): Promise<InnerAsyncArrayParallel<R>>;
    flatMap<R>(fn: AsyncArrayCallback<T, R[], InnerAsyncArrayParallel<T>>): Promise<InnerAsyncArrayParallel<R>>;
    sort(fn: (t1: T, t2: T) => Promise<number>): Promise<InnerAsyncArray<T>>;
    reduce<R = T>(fn: AsyncArrayReduceCallback<T, R, InnerAsyncArrayParallel<T>>, res?: R): Promise<R>;
    reduceRight<R = T>(fn: AsyncArrayReduceCallback<T, R, InnerAsyncArrayParallel<T>>, res?: R): Promise<R>;
    findIndex(fn: AsyncArrayCallback<T, boolean, InnerAsyncArrayParallel<T>>): Promise<number>;
    private _all;
}
/**
 * 异步数组
 */
export declare class AsyncArray<T> implements PromiseLike<any> {
    /**
     * 为内置数组赋值
     * 此处自动重新计算 length 属性
     */
    _arr: T[];
    /**
     * 提供一个函数方便根据已有的数组或类数组（Set/Map）创建 {@link AsyncArray}
     * @param arr 一个可迭代元素
     * @returns 创建一个新的异步数组包装
     */
    static from<T>(arr: Iterable<T> | ArrayLike<T> | null | undefined): AsyncArray<T>;
    /**
     * 内部数组的长度，用于让 {@link AsyncArray} 的实例能作为 {@link Array.from} 的参数
     */
    length: number;
    /**
     * 内部的数组
     */
    private __arr;
    /**
     * 保存的任务数组
     */
    private _tasks;
    /**
     * 构造函数
     * @param args 任意个参数
     */
    constructor(...args: T[]);
    filter(fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T> | InnerAsyncArrayParallel<T>>): AsyncArray<T>;
    map<R>(fn: AsyncArrayCallback<T, R, InnerAsyncArray<T> | InnerAsyncArrayParallel<T>>): AsyncArray<R>;
    flatMap<R>(fn: AsyncArrayCallback<T, R[], InnerAsyncArray<T> | InnerAsyncArrayParallel<T>>): AsyncArray<R>;
    sort(fn?: (a: T, b: T) => number): AsyncArray<T>;
    parallel(): AsyncArray<T>;
    serial(): AsyncArray<T>;
    forEach(fn: AsyncArrayCallback<T, void, InnerAsyncArray<T> | InnerAsyncArrayParallel<T>>): Promise<void>;
    some(fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T> | InnerAsyncArrayParallel<T>>): Promise<boolean>;
    every(fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T> | InnerAsyncArrayParallel<T>>): Promise<boolean>;
    find(fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T> | InnerAsyncArrayParallel<T>>): Promise<T | null>;
    findIndex(fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T> | InnerAsyncArrayParallel<T>>): Promise<number>;
    reduce<R = T>(fn: AsyncArrayReduceCallback<T, R, InnerAsyncArray<T>>, res?: R): Promise<R>;
    reduceRight<R = T>(fn: AsyncArrayReduceCallback<T, R, InnerAsyncArray<T>>, res?: R): Promise<R>;
    /**
     * 终结整个链式操作并返回结果，可以使用 await 等待当前实例开始计算
     */
    then<TResult1 = any, TResult2 = never>(onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<any>;
    /**
     * @deprecated 已废弃，请直接使用 await 进行等待获取结果值即可
     */
    value(): Promise<any>;
    /**
     * 允许使用 for-of 遍历内部的 _arr
     */
    [Symbol.iterator](): Generator<T, void, unknown>;
    private _addTask;
}
export {};
//# sourceMappingURL=AsyncArray.d.ts.map