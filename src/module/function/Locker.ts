import { wait } from '../function/wait'

type Predicate = (...args: any[]) => boolean

/**
 * 默认的超时时间，可以认为是无限
 */
const TimeoutInfinity: Predicate = () => false

interface ILockerInit {
  limit?: number
  timeout?: number
}

/**
 * 创建一个 Lock 对象，用于锁住当前的当前的异步流程
 */
export class Locker {
  public limit: number
  public timeout: number | Predicate

  /**
   * @param options 可选项
   * @param options.limit 限制并发数量，默认为 1
   * @param options.timeout 超时时间，默认为无限
   */
  constructor({ limit = 1, timeout }: Partial<ILockerInit> = {}) {
    /**
     * @field 限制并发数量，默认为 1
     */
    this.limit = limit
    /**
     * @field 超时时间，默认为无限
     */
    this.timeout = timeout || TimeoutInfinity
  }
  /**
   * 当前是否锁住了
   * @returns 是否锁住了
   */
  public isLocked() {
    return this.limit <= 0
  }
  /**
   * 添加异步锁
   * @param timeout 超时时间，默认为全局 timeout
   * @returns 进行等待
   */
  public async lock(timeout = this.timeout) {
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
  public unlock() {
    this.limit++
  }
}
