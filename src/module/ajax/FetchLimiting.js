// @ts-check
import { wait } from '../function/wait'
import { fetchTimeout } from './fetchTimeout'

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
  /**
   * 构造函数
   * @param {Object} [option] 可选配置项
   * @param {Number} [option.timeout=10000] 超时毫秒数
   * @param {Number} [option.limit=10] 最大并发数限制
   */
  constructor ({ timeout = 10000, limit = 10 }) {
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
   * @param {RequestInfo} url 请求 url 信息
   * @param {RequestInit} [init=undefined] 请求的其他可选项，默认为 undefined
   * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
   */
  async fetch (url, init) {
    const _innerFetch = async () => {
      this.execCount++
      const args = this.waitArr.shift()
      try {
        // 这里的 args 实际上就是 arguments 对象，即上面的 url 和 init
        // @ts-ignore
        return await fetchTimeout(fetch(...args), this.timeout)
      } finally {
        this.execCount--
      }
    }
    this.waitArr.push(arguments)
    await wait(() => this.execCount < this.limit)
    // 尝试启动等待队列
    return _innerFetch()
  }
}
