import { wait } from '../function/wait'
import { fetchTimeout } from './fetchTimeout'

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
 */
export class FetchLimiting {
  private timeout: number
  private limit: number
  private execCount: number
  private waitArr: Array<[RequestInfo, RequestInit | undefined]>
  /**
   * 构造函数
   * @param option 可选配置项
   * @param option.timeout 超时毫秒数
   * @param option.limit 最大并发数限制
   */
  constructor({
    timeout = 10000,
    limit = 10,
  }: Partial<IFetchLimitingOptions> = {}) {
    /**
     * @field timeout 超时毫秒数
     */
    this.timeout = timeout
    /**
     * @field limit 最大并发数限制
     */
    this.limit = limit
    /**
     * @field execCount 当前正在执行异步的数量
     */
    this.execCount = 0
    /**
     * @field waitArr 等待的队列
     * @type {Array.<IArguments>}
     */
    this.waitArr = []
  }

  /**
   * 执行一个请求
   * 如果到达最大并发限制时就进行等待
   * @param url 请求 url 信息
   * @param init 请求的其他可选项，默认为 undefined
   * @returns 如果超时就提前返回 reject, 否则正常返回 fetch 结果
   */
  public async fetch(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<Response> {
    const _innerFetch = async () => {
      this.execCount++
      const args = this.waitArr.shift()
      try {
        // 这里的 args 实际上就是 arguments 对象，即上面的 url 和 init
        return await fetchTimeout(fetch(args![0], args![1]), this.timeout)
      } finally {
        this.execCount--
      }
    }
    this.waitArr.push([input, init])
    await wait(() => this.execCount < this.limit)
    // 尝试启动等待队列
    return _innerFetch()
  }
}
