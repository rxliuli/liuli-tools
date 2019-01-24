import wait from '../function/wait'
import fetchTimeout from './fetchTimeout'
/**
 * 限制并发请求数量的 fetch 封装
 */
class RequestLimiting {
  constructor ({ timeout = 10000, limit = 10 }) {
    this.timeout = timeout
    this.limit = limit
    this.execCount = 0
    // 等待队列
    this.waitArr = []
  }

  /**
   * 执行一个请求
   * 如果到达最大并发限制时就进行等待
   * 注：该方法的请求顺序是无序的，与代码里的顺序无关
   * @param {RequestInfo} url 请求 url 信息
   * @param {RequestInit} init 请求的其他可选项
   * @returns {Promise} 如果超时就提前返回 reject, 否则正常返回 fetch 结果
   */
  async _fetch (url, init) {
    const _innerFetch = async () => {
      console.log(
        `执行 execCount: ${this.execCount}, waitArr length: ${
          this.waitArr.length
        }, index: ${JSON.stringify(this.waitArr[0])}`
      )
      this.execCount++
      const args = this.waitArr.shift(0)
      try {
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

export default RequestLimiting
