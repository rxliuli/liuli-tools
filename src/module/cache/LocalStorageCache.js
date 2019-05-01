import { ICache } from './ICache'
import { CacheVal } from './CacheVal'
import { CacheOption, TimeoutInfinite } from './CacheOption'
import { assign } from '../obj/assign'

/**
 * 使用 LocalStorage 实现的缓存
 */
export class LocalStorageCache extends ICache {
  /**
   * 构造函数
   * @param {CacheOption} [cacheOption] 全局缓存选项
   */
  constructor (cacheOption) {
    super(cacheOption)
    /**
     * 缓存对象，默认使用 localStorage
     */
    this.localStorage = window.localStorage
  }
  /**
   * 根据 key + value 添加
   * 如果不存在则添加，否则忽略
   * @param {String} key 缓存的 key
   * @param {Object} val 缓存的 value
   * @param {CacheOption} [cacheOption] 缓存的选项，默认为无限时间
   * @override
   */
  add (key, val, cacheOption) {
    const result = this.get(
      key,
      assign({ timeStart: Date.now() }, cacheOption)
    )
    if (result !== null) {
      return
    }
    this.set(key, val, cacheOption)
  }
  /**
   * 根据指定的 key 删除
   * 如果存在则删除，否则忽略
   * @param {String} key 删除的 key
   * @override
   */
  del (key) {
    this.localStorage.removeItem(key)
  }
  /**
   * 根据指定的 key 修改
   * 不管是否存在都会设置
   * @param {String} key 修改的 key
   * @param {Object} val 修改的 value
   * @param {CacheOption} [cacheOption] 修改的选项
   * @override
   */
  set (key, val, cacheOption = new CacheOption()) {
    const option = assign(
      this.cacheOption,
      { timeStart: Date.now() },
      cacheOption
    )
    this.localStorage.setItem(
      key,
      JSON.stringify(
        new CacheVal({
          key,
          val: option.serialize(val),
          cacheOption: option,
        })
      )
    )
  }
  /**
   * 根据 key 获取
   * 如果存在则获取，否则忽略
   * @param {String} key 指定的 key
   * @param {CacheOption} cacheOption 获取的选项
   * @returns {Object} 获取到的缓存值
   * @override
   */
  get (key, cacheOption = new CacheOption()) {
    const str = this.localStorage.getItem(key)
    const cacheVal = JSON.parse(str)
    if (cacheVal === null) {
      return null
    }
    const { timeStart, timeout, deserialize } = assign(
      this.cacheOption,
      cacheVal.cacheOption,
      cacheOption
    )
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
   * @param {String} key 指定的 key
   * @param {CacheOption} cacheOption 获取的选项
   * @returns {Object} 获取到的缓存值
   * @override
   */
  touch (key, cacheOption = new CacheOption()) {
    const str = this.localStorage.getItem(key)
    /**
     * @type {CacheVal}
     */
    const cacheVal = JSON.parse(str)
    if (cacheVal === null) {
      return null
    }
    /**
     * @type {CacheOption}
     */
    const option = assign(this.cacheOption, cacheVal.cacheOption, cacheOption)
    const { timeStart, timeout, deserialize } = option
    // 如果超时则删除并返回 null
    if (timeout !== TimeoutInfinite && Date.now() - timeStart > timeout) {
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
