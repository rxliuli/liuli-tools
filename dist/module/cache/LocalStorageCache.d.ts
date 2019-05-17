import { ICache } from './ICache';
import { CacheOption } from './CacheOption';
/**
 * 使用 LocalStorage 实现的缓存
 */
export declare class LocalStorageCache extends ICache {
    /**
     * 构造函数
     * @param {CacheOption} [cacheOption] 全局缓存选项
     */
    constructor(cacheOption: any);
    /**
     * 清空所有过期的 key
     * 注: 该函数是异步执行的
     */
    clearExpired(): Promise<void>;
    /**
     * 根据 key + value 添加
     * 如果不存在则添加，否则忽略
     * @param {String} key 缓存的 key
     * @param {Object} val 缓存的 value
     * @param {CacheOption} [cacheOption] 缓存的选项，默认为无限时间
     * @override
     */
    add(key: any, val: any, cacheOption: any): void;
    /**
     * 根据指定的 key 删除
     * 如果存在则删除，否则忽略
     * @param {String} key 删除的 key
     * @override
     */
    del(key: any): void;
    /**
     * 根据指定的 key 修改
     * 不管是否存在都会设置
     * @param {String} key 修改的 key
     * @param {Object} val 修改的 value
     * @param {CacheOption} [cacheOption] 修改的选项
     * @override
     */
    set(key: any, val: any, cacheOption?: CacheOption): void;
    /**
     * 根据 key 获取
     * 如果存在则获取，否则忽略
     * @param {String} key 指定的 key
     * @param {CacheOption} cacheOption 获取的选项
     * @returns {Object} 获取到的缓存值
     * @override
     */
    get(key: any, cacheOption?: CacheOption): any;
    /**
     * 根据 key 获取并刷新超时时间
     * @param {String} key 指定的 key
     * @param {CacheOption} cacheOption 获取的选项
     * @returns {Object} 获取到的缓存值
     * @override
     */
    touch(key: any, cacheOption?: CacheOption): any;
}
//# sourceMappingURL=LocalStorageCache.d.ts.map