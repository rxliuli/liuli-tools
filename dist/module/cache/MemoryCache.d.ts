/**
 * 内存缓存接口
 */
export interface BaseMemoryCache<K, V> {
    /**
     * 添加一个缓存
     * @param key
     * @param val
     */
    add(key: K, val: V): void;
    /**
     * 根据 key 获取一个缓存
     * @param key
     */
    get(key: K): V | undefined;
    /**
     * 删除一个缓存
     * @param key
     */
    delete(key: K): void;
    /**
     * 判断是否有一个缓存
     * @param key
     */
    has(key: K): boolean;
    /**
     * 当前缓存数量
     */
    readonly size: number;
    /**
     * 清空当前所有缓存
     */
    clear(): void;
}
interface MemoryCacheConfig {
    /**
     * 缓存的最大容量
     */
    limit?: number;
}
/**
 * 基本缓存实现
 * 主要封装通用的 delete/size 函数
 */
declare abstract class BasicMemoryCache<K, V> implements BaseMemoryCache<K, V> {
    protected cache: Map<K, V>;
    protected readonly limit: number;
    constructor({ limit }?: MemoryCacheConfig);
    delete(key: K): void;
    clear(): void;
    get size(): number;
    abstract add(key: K, val: V): void;
    abstract get(key: K): V | undefined;
    abstract has(key: K): boolean;
}
/**
 * FIFO 算法
 */
export declare class MemoryCacheFIFO<K = any, V = any> extends BasicMemoryCache<K, V> {
    add(key: K, val: V): void;
    delete(key: K): void;
    get(key: K): V | undefined;
    get size(): number;
    has(key: K): boolean;
}
/**
 * IFU 算法
 */
export declare class MemoryCacheLFU<K = any, V = any> extends BasicMemoryCache<K, V> {
    private lfuMap;
    add(key: K, val: V): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    delete(key: K): void;
    clear(): void;
}
/**
 * LRU 算法
 */
export declare class MemoryCacheLRU<K = any, V = any> extends BasicMemoryCache<K, V> {
    private i;
    private get idx();
    private lruMap;
    add(key: K, val: V): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    delete(key: K): void;
    clear(): void;
}
export declare enum MemoryCacheEnum {
    Fifo = 0,
    Lfu = 1,
    Lru = 2
}
/**
 * 缓存工厂类
 */
export declare class MemoryCacheFactory {
    static create<K = any, V = any>(type: MemoryCacheEnum, config?: MemoryCacheConfig): BaseMemoryCache<K, V>;
}
export {};
//# sourceMappingURL=MemoryCache.d.ts.map