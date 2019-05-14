import { wait } from '../function/wait'

/**
 * 默认的超时时间，可以认为是无限
 */
const TimeoutInfinity = () => false
/**
 * 创建一个 Lock 对象，用于锁住当前的当前的异步流程
 */
export class Locker {
  constructor ({ limit = 1, timeout = TimeoutInfinity } = {}) {
    this.limit = limit
    this.timeout = timeout
  }
  /**
   * 当前是否锁住了
   */
  isLocked () {
    return this.limit <= 0
  }
  /**
   * 添加异步锁
   * @param {Number} timeout 超时时间
   */
  // @ts-ignore
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
