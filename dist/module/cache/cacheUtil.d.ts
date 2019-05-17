/**
 * 缓存工具类
 * 主要实现缓存高阶函数的封装
 */
export declare class CacheUtil {
    /**
     * 包裹函数为缓存函数
     * @param {Function} fn 一个接受一些参数并返回结果的函数
     * @param {Object} [options={}] 缓存选项对象。可选项
     * @param {String|Number} [options.identity=fn.toString()] 缓存标识。默认为函数 {@link toString}，但有时候不太可行（继承自基类的函数）
     * @param {Number|String} [options.timeout=TimeoutInfinite] 缓存时间。默认为无限
     * @returns {Function|Object} 带有缓存功能的函数
     */
    onceOfSameParam(fn: any, { identity, timeout }?: {
        identity?: any;
        timeout?: string | undefined;
    }): {
        (...args: any[]): any;
        /**
         * 所包装的原函数
         * @type {Function}
         */
        origin: Function;
        /**
         * 清空缓存，清空指定参数调用时的函数缓存
         * @type {Function}
         */
        clear: Function;
    };
}
/**
 * 导出一个默认的缓存工具对象
 */
export declare const cacheUtil: CacheUtil;
//# sourceMappingURL=cacheUtil.d.ts.map