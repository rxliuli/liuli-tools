/**
 * 为 fetch 请求添加超时选项
 * 注：超时选项并非真正意义上的超时即取消请求，请求依旧正常执行完成，但会提前返回 reject 结果
 * @param {Promise} fetchPromise fetch 请求的 Promise
 * @param {Number} timeout 超时时间
 * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
 */
export declare function fetchTimeout(fetchPromise: any, timeout: any): Promise<any>;
//# sourceMappingURL=fetchTimeout.d.ts.map