import { ICache } from './ICache';
import { ICacheOption } from './ICacheOption';
/**
 * 使用 LocalStorage 实现的缓存
 */
export declare class LocalStorageCache implements ICache {
    localStorage: Storage;
    cacheOption: ICacheOption;
    /**
     * 构造函数
     * @param cacheOption 全局缓存选项
     */
    constructor({ timeout, serialize, deserialize, }?: Partial<ICacheOption>);
    /**
     * 清空所有过期的 key
     * 注: 该函数是异步执行的
     */
    clearExpired(): Promise<void>;
    /**
     * 根据 key + value 添加
     * 如果不存在则添加，否则忽略
     * @param key 缓存的 key
     * @param val 缓存的 value
     * @param cacheOption 缓存的选项，默认为无限时间
     * @override
     */
    add(key: string, val: any, cacheOption?: Partial<ICacheOption>): void;
    /**
     * 根据指定的 key 删除
     * 如果存在则删除，否则忽略
     * @param key 删除的 key
     * @override
     */
    del(key: string): void;
    /**
     * 根据指定的 key 修改
     * 不管是否存在都会设置
     * @param key 修改的 key
     * @param val 修改的 value
     * @param cacheOption 修改的选项
     * @override
     */
    set(key: string, val: any, cacheOption?: Partial<ICacheOption>): void;
    /**
     * 根据 key 获取
     * 如果存在则获取，否则忽略
     * @param key 指定的 key
     * @param cacheOption 获取的选项
     * @returns 获取到的缓存值
     * @override
     */
    get(key: string, cacheOption?: Partial<ICacheOption>): any;
    /**
     * 根据 key 获取并刷新超时时间
     * @param key 指定的 key
     * @param cacheOption 获取的选项
     * @returns 获取到的缓存值
     * @override
     */
    touch(key: string, cacheOption?: Partial<ICacheOption>): any;
}
//# sourceMappingURL=LocalStorageCache.d.ts.map