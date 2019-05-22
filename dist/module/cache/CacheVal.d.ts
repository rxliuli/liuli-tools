import { ICacheOption } from './CacheOption';
interface ICacheValInit {
    key: string;
    val: any;
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