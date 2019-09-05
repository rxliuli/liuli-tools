import { ICacheOption } from './ICacheOption';
/**
 * 缓存值的构造函数对象参数定义接口
 */
interface ICacheValInit {
    /**
     * 缓存的 key 值
     */
    key: string;
    /**
     * 缓存的 value
     */
    val: any;
    /**
     * 缓存的选项
     */
    cacheOption: ICacheOption;
}
/**
 * 缓存的值
 */
export declare class CacheVal implements ICacheValInit {
    key: string;
    val: any;
    cacheOption: ICacheOption;
    /**
     * 构造函数
     * @param options 缓存值对象
     * @param options.key 缓存的键原始值
     * @param options.val 缓存的值
     * @param options.cacheOption 缓存的选项
     */
    constructor(options?: Partial<ICacheValInit>);
}
export {};
//# sourceMappingURL=CacheVal.d.ts.map