import { wait } from '../function/wait'

/**
 * 默认的超时时间，可以认为是无限
 */
const TimeoutInfinity = () => false
/**
 * 创建一个 Lock 对象，用于锁住当前的当前的异步流程
 */
export class Locker {
  /**
   * @param {Object} [options={}] 可选项
   * @param {Number} [options.limit=1] 限制并发数量，默认为 1
   * @param {Number|Function} [options.timeout=TimeoutInfinity] 超时时间，默认为无限
   */
  constructor ({ limit = 1, timeout = TimeoutInfinity } = {}) {
    /**
     * @field 限制并发数量，默认为 1
     */
    this.limit = limit
    /**
     * @field 超时时间，默认为无限
     */
    this.timeout = timeout
  }
  /**
   * 当前是否锁住了
   * @returns {Boolean} 是否锁住了
   */
  isLocked () {
    return this.limit <= 0
  }
  /**
   * 添加异步锁
   * @param {Number|Function} [timeout=this.timeout] 超时时间，默认为全局 timeout
   * @returns {Promise} 进行等待
   */
  async lock (timeout = this.timeout) {
    if (this.isLocked()) {
      /**
       * @type {Number|Function}
       */
      await Promise.race([
        wait(() => {
          const result = !this.isLocked()
          if (result) {
            this.limit--
          }
          return result
        }),
        wait(timeout),
      ])
    } else {
      this.limit--
    }
  }
  /**
   * 删除异步锁
   */
  unlock () {
    this.limit++
  }
}
