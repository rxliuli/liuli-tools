import { ICacheOption } from './CacheOption'

interface ICacheValInit {
  key: string
  val: any
  cacheOption: ICacheOption
}

/**
 * 缓存的值
 */
export class CacheVal implements ICacheValInit {
  public key!: string
  public val: any
  public cacheOption!: ICacheOption
  /**
   * 构造函数
   * @param {Object} options 缓存值对象
   * @param {String} options.key 缓存的键原始值
   * @param {Object} options.val 缓存的值
   * @param {ICacheOption} options.cacheOption 缓存的选项
   */
  constructor(options: Partial<ICacheValInit> = {}) {
    Object.assign(this, options)
  }
}
