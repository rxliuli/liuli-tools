import { ICache } from './ICache'
import { CacheVal } from './CacheVal'
import { ICacheOption, TimeoutInfinite } from './ICacheOption'
import { safeExec } from '../function/safeExec'
import { isNullOrUndefined } from '../obj/isNullOrUndefined'
import { not } from '../function/CombinedPredicate'

/**
 * 使用 LocalStorage 实现的缓存
 * 1. get: 根据 key 获取
 * 2. set: 根据 key value 设置，会覆盖
 * 3. touch: 获取并刷新超时时间
 * 4. add: 根据 key value 添加，不会覆盖
 * 5. del: 根据 key 删除
 * 6. clearExpired: 清除所有过期的缓存
 */
export class LocalStorageCache<T> implements ICache<T> {
  public localStorage: Storage
  public cacheOption: ICacheOption
  /**
   * 构造函数
   * @param cacheOption 全局缓存选项
   */
  constructor({
    timeout = TimeoutInfinite,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: Partial<ICacheOption> = {}) {
    // 这里必须强制转换，因为 timeStart 在全局选项中是不可能存在的
    this.cacheOption = {
      timeout,
      serialize,
      deserialize,
    } as any
    /**
     * 缓存对象，默认使用 localStorage
     */
    this.localStorage = window.localStorage
    // 创建后将异步清空所有过期的缓存
    this.clearExpired()
  }
  /**
   * 清空所有过期的 key
   * 注: 该函数是异步执行的
   */
  public async clearExpired() {
    const local = this.localStorage
    const getKeys = () => {
      const len = local.length
      const res = []
      for (let i = 0; i < len; i++) {
        res.push(local.key(i))
      }
      return res
    }
    getKeys()
      .filter(not(isNullOrUndefined))
      .map(key => safeExec(() => JSON.parse(local.getItem(key!)!)))
      .filter(
        cacheVal =>
          !isNullOrUndefined(cacheVal) &&
          isNullOrUndefined(cacheVal.cacheOption),
      )
      // TODO 这里暂时加个补丁，过滤掉 timeStart,timeout 为 undefined 的缓存
      .filter(({ cacheOption = {} as any }: CacheVal) => {
        const { timeStart, timeout } = cacheOption
        if (isNullOrUndefined(timeStart) || isNullOrUndefined(timeout)) {
          return false
        }
        return timeout !== TimeoutInfinite && Date.now() - timeStart > timeout
      })
      .forEach(({ key }: CacheVal) => local.removeItem(key))
  }
  /**
   * 根据 key + value 添加
   * 如果不存在则添加，否则忽略
   * @param key 缓存的 key
   * @param val 缓存的 value
   * @param cacheOption 缓存的选项，默认为无限时间
   * @override
   */
  public add(key: string, val: T, timeout?: number) {
    const result = this.get(key)
    if (result !== null) {
      return
    }
    this.set(key, val, timeout)
  }
  /**
   * 根据指定的 key 删除
   * 如果存在则删除，否则忽略
   * @param key 删除的 key
   * @override
   */
  public del(key: string) {
    this.localStorage.removeItem(key)
  }
  /**
   * 根据指定的 key 修改
   * 不管是否存在都会设置
   * @param key 修改的 key
   * @param val 修改的 value
   * @param timeout 修改的选项
   * @override
   */
  public set(key: string, val: T, timeout?: number) {
    this.localStorage.setItem(
      key,
      JSON.stringify(
        new CacheVal({
          key,
          val: this.cacheOption.serialize(val),
          // 我们不需要缓存序列化/反序列化策略（实际上也无法缓存）
          cacheOption: {
            timeStart: Date.now(),
            timeout: timeout || this.cacheOption.timeout,
          } as any,
        }),
      ),
    )
  }
  /**
   * 根据 key 获取
   * 如果存在则获取，否则忽略
   * @param key 指定的 key
   * @param timeout 获取的选项
   * @returns 获取到的缓存值
   * @override
   */
  public get(key: string): T | null {
    const str = this.localStorage.getItem(key)
    const cacheVal: CacheVal = safeExec(() => JSON.parse(str!))
    if (
      isNullOrUndefined(cacheVal) ||
      isNullOrUndefined(cacheVal.cacheOption)
    ) {
      return null
    }
    const [timeStart, timeout, deserialize] = [
      cacheVal.cacheOption.timeStart,
      cacheVal.cacheOption.timeout,
      this.cacheOption.deserialize,
    ]
    // 如果超时则删除并返回 null
    if (timeout !== TimeoutInfinite && Date.now() - timeStart > timeout) {
      this.del(key)
      return null
    }
    try {
      return deserialize(cacheVal.val)
    } catch (e) {
      this.del(key)
      return null
    }
  }
  /**
   * 根据 key 获取并刷新超时时间
   * @param key 指定的 key
   * @param cacheOption 获取的选项
   * @returns 获取到的缓存值
   * @override
   */
  public touch(key: string): T | null {
    const str = this.localStorage.getItem(key)
    /**
     * @type {CacheVal}
     */
    const cacheVal: CacheVal = safeExec(() => JSON.parse(str!))
    if (
      isNullOrUndefined(cacheVal) ||
      isNullOrUndefined(cacheVal.cacheOption)
    ) {
      return null
    }
    const [timeStart, timeout, deserialize] = [
      cacheVal.cacheOption.timeStart,
      cacheVal.cacheOption.timeout,
      this.cacheOption.deserialize,
    ]
    // 如果超时则删除并返回 null
    if (timeout !== TimeoutInfinite && Date.now() - timeStart! > timeout) {
      this.del(key)
      return null
    }
    try {
      const result = deserialize(cacheVal.val)
      this.set(key, result, { timeStart: Date.now(), timeout } as any)
      return result
    } catch (e) {
      this.del(key)
      return null
    }
  }
}
