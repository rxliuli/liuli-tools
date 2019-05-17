/**
 * 缓存的值
 */
export class CacheVal {
    /**
     * 构造函数
     * @param {Object} options 缓存值对象
     * @param {String} options.key 缓存的键原始值
     * @param {Object} options.val 缓存的值
     * @param {CacheOption} options.cacheOption 缓存的选项
     */
    constructor({ key, val, cacheOption }) {
        /**
         * @field 缓存的键原始值
         */
        this.key = key;
        /**
         * @field 缓存的值
         */
        this.val = val;
        /**
         * @field 缓存的选项
         */
        this.cacheOption = cacheOption;
    }
}
