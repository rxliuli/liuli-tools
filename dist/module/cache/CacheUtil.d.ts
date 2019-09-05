import { ReturnFunc } from '../interface/ReturnFunc';
/**
 * 缓存工具类可选参数项类型
 */
interface ICacheUtilOptions {
    /**
     * 函数唯一标识，默认为函数 toString()
     */
    identity: string;
    /**
     * 缓存超时时间，默认为无限
     */
    timeout: number;
}
/**
 * 缓存后的函数
 */
interface ICacheFunc<R> extends ReturnFunc<R> {
    /**
     * 所包装的原函数
     * @type {Function}
     */
    origin: ReturnFunc<R>;
    /**
     * 清空缓存，清空指定参数调用时的函数缓存
     * @type {Function}
     */
    clear: ReturnFunc<void>;
}
/**
 * 缓存工具类
 * 主要实现缓存高阶函数的封装
 */
export declare class CacheUtil {
    /**
     * 将指定函数包装为只调用一次为缓存函数
     * @param fn 需要包装的函数
     * @param options 缓存选项对象。可选项
     * @param options.identity 缓存标识。默认为函数 {@link toString}，但有时候不太可行（继承自基类的函数）
     * @param options.timeout 缓存时间。默认为无限
     * @returns 包装后的函数
     */
    static once<R>(fn: ReturnFunc<R>, { identity, timeout }?: Partial<ICacheUtilOptions>): ICacheFunc<R>;
    /**
     * 包裹函数为缓存函数
     * @param fn 一个接受一些参数并返回结果的函数
     * @param options 缓存选项对象。可选项
     * @param options.identity 缓存标识。默认为函数 {@link toString}，但有时候不太可行（继承自基类的函数）
     * @param options.timeout 缓存时间。默认为无限
     * @returns 带有缓存功能的函数
     */
    static onceOfSameParam<R>(fn: ReturnFunc<R>, { identity, timeout }?: Partial<ICacheUtilOptions>): ICacheFunc<R>;
}
/**
 * 导出一个默认的缓存工具对象
 * @deprecated 已废弃，请直接使用类的静态函数
 */
export declare const cacheUtil: typeof CacheUtil;
export {};
//# sourceMappingURL=CacheUtil.d.ts.map