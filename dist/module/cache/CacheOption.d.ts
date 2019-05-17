/**
 * 无限的超时时间
 * TODO 此处暂时使用字符串作为一种折衷方法，因为 Symbol 无法被序列化为 JSON，反向序列化也是不可能的
 */
export declare const TimeoutInfinite: string;
/**
 * 缓存选项
 */
export declare class CacheOption {
    /**
     * 构造函数
     * @param {Object} options 缓存选项对象
     * @param {Number|Symbol|String} [options.timeout] 超时时间，以毫秒为单位
     * @param {Number} [options.timeStart] 缓存开始时间
     * @param {Function} [options.serialize] 缓存序列化
     * @param {Function} [options.deserialize] 缓存反序列化
     */
    constructor({ timeout, timeStart, serialize, deserialize }?: {
        timeout: any;
        timeStart: any;
        serialize: any;
        deserialize: any;
    });
}
//# sourceMappingURL=CacheOption.d.ts.map