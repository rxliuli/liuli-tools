/**
 * Fetch 对象参数接口
 */
interface IFetchLimitingOptions {
  timeout: number
  limit: number
}
/**
 * 限制并发请求数量的 fetch 封装
 * @class FetchLimiting
 * @example
 * const fetchLimiting = new FetchLimiting()
 * fetchLimiting._fetch('/')
 *   .then(res => res.json())
 *   .then(json => console.log(json))
 * @deprecated 已废弃，请使用 {@link asyncLimiting} 函数
 */
export declare class FetchLimiting {
  private timeout
  private limit
  private execCount
  private waitArr
  /**
   * 构造函数
   * @param option 可选配置项
   * @param option.timeout 超时毫秒数
   * @param option.limit 最大并发数限制
   */
  constructor({ timeout, limit }?: Partial<IFetchLimitingOptions>)
  /**
   * 执行一个请求
   * 如果到达最大并发限制时就进行等待
   * @param url 请求 url 信息
   * @param init 请求的其他可选项，默认为 undefined
   * @returns 如果超时就提前返回 reject, 否则正常返回 fetch 结果
   */
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
}
export {}
//# sourceMappingURL=FetchLimiting.d.ts.map
