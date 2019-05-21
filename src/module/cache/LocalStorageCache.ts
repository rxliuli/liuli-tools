import { ICache } from './ICache'
import { CacheVal } from './CacheVal'
import { ICacheOption, TimeoutInfinite } from './CacheOption'
import { assign } from '../obj/assign'
import { safeExec } from '../function/safeExec'
import { wait } from '../function/wait'

/**
 * 使用 LocalStorage 实现的缓存
 */
export class LocalStorageCache extends ICache {
  public localStorage: Storage
  /**
   * 构造函数
   * @param [cacheOption] 全局缓存选项
   */
  constructor(cacheOption: Partial<ICacheOption> = {}) {
    super(cacheOption)
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
    const len = local.length
    const delKeys = []
    for (let i = 0; i < len; i++) {
      await wait(0)
      const key = local.key(i)
      const str = local.getItem(key!)
      const cacheVal = safeExec(JSON.parse, null, str)
      if (cacheVal === null) {
        continue
      }
      const { timeStart, timeout } = cacheVal.cacheOption
      // 如果超时则删除并返回 null
      // console.log(i, cacheVal, Date.now(), Date.now() - timeStart > timeout)
      if (timeout !== TimeoutInfinite && Date.now() - timeStart > timeout) {
        delKeys.push(key)
      }
      // console.log(i, key, local.getItem(key))
    }
    await delKeys.forEach(async key => local.removeItem(key!))
  }
  /**
   * 根据 key + value 添加
   * 如果不存在则添加，否则忽略
   * @param key 缓存的 key
   * @param val 缓存的 value
   * @param [cacheOption] 缓存的选项，默认为无限时间
   * @override
   */
  public add(key: string, val: any, cacheOption: Partial<ICacheOption> = {}) {
    const result = this.get(key, cacheOption)
    if (result !== null) {
      return
    }
    this.set(key, val, cacheOption)
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
   * @param [cacheOption] 修改的选项
   * @override
   */
  public set(key: string, val: any, cacheOption: Partial<ICacheOption> = {}) {
    const option = assign(this.cacheOption, cacheOption)
    this.localStorage.setItem(
      key,
      JSON.stringify(
        new CacheVal({
          key,
          val: option.serialize(val),
          cacheOption: { ...option, timeStart: option.timeStart || Date.now() },
        }),
      ),
    )
  }
  /**
   * 根据 key 获取
   * 如果存在则获取，否则忽略
   * @param key 指定的 key
   * @param cacheOption 获取的选项
   * @returns 获取到的缓存值
   * @override
   */
  public get(key: string, cacheOption: Partial<ICacheOption> = {}): any {
    const str = this.localStorage.getItem(key)
    const cacheVal = safeExec(JSON.parse, null, str)
    if (cacheVal === null) {
      return null
    }
    const { timeStart, timeout, deserialize } = assign(
      this.cacheOption,
      cacheVal.cacheOption,
      cacheOption,
    )
    // 如果超时则删除并返回 null
    if (timeout !== TimeoutInfinite && Date.now() - timeStart! > timeout) {
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
  public touch(key: string, cacheOption: Partial<ICacheOption> = {}): any {
    const str = this.localStorage.getItem(key)
    /**
     * @type {CacheVal}
     */
    const cacheVal: CacheVal = safeExec(JSON.parse, null, str)
    if (cacheVal === null) {
      return null
    }
    /**
     * @type {ICacheOption}
     */
    const option: ICacheOption = assign(
      this.cacheOption,
      cacheVal.cacheOption,
      cacheOption,
    )
    const { timeStart, timeout, deserialize } = option
    // 如果超时则删除并返回 null
    if (timeout !== TimeoutInfinite && Date.now() - timeStart! > timeout) {
      this.del(key)
      return null
    }
    try {
      const result = deserialize(cacheVal.val)
      this.set(key, result, assign(option, { timeStart: Date.now() }))
      return result
    } catch (e) {
      this.del(key)
      return null
    }
  }
}
