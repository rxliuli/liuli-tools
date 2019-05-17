/**
 * 限制并发请求数量的 fetch 封装
 * @class FetchLimiting
 * @example
 * const fetchLimiting = new FetchLimiting()
 * fetchLimiting._fetch('/')
 *   .then(res => res.json())
 *   .then(json => console.log(json))
 */
export declare class FetchLimiting {
    /**
     * 构造函数
     * @param {Object} [option] 可选配置项
     * @param {Number} [option.timeout=10000] 超时毫秒数
     * @param {Number} [option.limit=10] 最大并发数限制
     */
    constructor({ timeout, limit }: {
        timeout?: number | undefined;
        limit?: number | undefined;
    });
    /**
     * 执行一个请求
     * 如果到达最大并发限制时就进行等待
     * @param {RequestInfo} url 请求 url 信息
     * @param {RequestInit} [init=undefined] 请求的其他可选项，默认为 undefined
     * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
     */
    fetch(url: any, init: any): Promise<any>;
}
//# sourceMappingURL=FetchLimiting.d.ts.map