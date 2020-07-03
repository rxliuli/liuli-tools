/**
 * 内存缓存接口
 */
export interface BaseMemoryCache<K, V> {
  /**
   * 添加一个缓存
   * @param key
   * @param val
   */
  add(key: K, val: V): void
  /**
   * 根据 key 获取一个缓存
   * @param key
   */
  get(key: K): V | undefined
  /**
   * 删除一个缓存
   * @param key
   */
  delete(key: K): void
  /**
   * 判断是否有一个缓存
   * @param key
   */
  has(key: K): boolean
  /**
   * 当前缓存数量
   */
  readonly size: number
  /**
   * 清空当前所有缓存
   */
  clear(): void
}

interface MemoryCacheConfig {
  /**
   * 缓存的最大容量
   */
  limit?: number
}

/**
 * 基本缓存实现
 * 主要封装通用的 delete/size 函数
 */
abstract class BasicMemoryCache<K, V> implements BaseMemoryCache<K, V> {
  protected cache = new Map<K, V>()
  protected readonly limit: number
  constructor({ limit = Infinity }: MemoryCacheConfig = {}) {
    if (limit <= 0) {
      throw new Error('缓存的最大容量至少为 1')
    }
    this.limit = limit
  }

  delete(key: K): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  get size() {
    return this.cache.size
  }

  abstract add(key: K, val: V): void
  abstract get(key: K): V | undefined
  abstract has(key: K): boolean
}

/**
 * FIFO 算法
 */
export class MemoryCacheFIFO<K = any, V = any> extends BasicMemoryCache<K, V> {
  add(key: K, val: V): void {
    const diff = this.cache.size + 1 - this.limit
    if (diff > 0) {
      const keys = [...this.cache.keys()].slice(0, diff)
      keys.forEach(k => this.delete(k))
    }
    this.cache.set(key, val)
  }

  delete(key: K): void {
    this.cache.delete(key)
  }

  get(key: K): V | undefined {
    return this.cache.get(key)
  }

  get size() {
    return this.cache.size
  }

  has(key: K): boolean {
    return this.cache.has(key)
  }
}

/**
 * IFU 算法
 */
export class MemoryCacheLFU<K = any, V = any> extends BasicMemoryCache<K, V> {
  private lfuMap = new Map<K, number>()

  add(key: K, val: V): void {
    const diff = this.cache.size + 1 - this.limit
    if (diff > 0) {
      const keys = [...this.cache.keys()]
        .sort((k1, k2) => this.lfuMap.get(k1)! - this.lfuMap.get(k2)!)
        .slice(0, diff)
      keys.forEach(k => this.delete(k))
    }
    this.cache.set(key, val)
    this.lfuMap.set(key, 0)
  }

  get(key: K): V | undefined {
    this.lfuMap.set(key, this.lfuMap.get(key)! + 1)
    return this.cache.get(key)
  }

  has(key: K): boolean {
    this.lfuMap.set(key, this.lfuMap.get(key)! + 1)
    return this.cache.has(key)
  }

  delete(key: K): void {
    super.delete(key)
    this.lfuMap.delete(key)
  }

  clear(): void {
    super.clear()
    this.lfuMap.clear()
  }
}

/**
 * LRU 算法
 */
export class MemoryCacheLRU<K = any, V = any> extends BasicMemoryCache<K, V> {
  private i = 0
  private get idx() {
    return this.i++
  }
  private lruMap = new Map<K, number>()

  add(key: K, val: V): void {
    const diff = this.cache.size + 1 - this.limit
    if (diff > 0) {
      const keys = [...this.cache.keys()]
        .sort((k1, k2) => this.lruMap.get(k1)! - this.lruMap.get(k2)!)
        .slice(0, diff)
      console.log(keys, this.lruMap)
      keys.forEach(k => this.delete(k))
    }
    this.cache.set(key, val)
    this.lruMap.set(key, this.idx)
  }

  get(key: K): V | undefined {
    this.lruMap.set(key, this.idx)
    return this.cache.get(key)
  }

  has(key: K): boolean {
    this.lruMap.set(key, this.idx)
    return this.cache.has(key)
  }

  delete(key: K): void {
    super.delete(key)
    this.lruMap.delete(key)
  }

  clear(): void {
    super.clear()
    this.lruMap.clear()
  }
}

export enum MemoryCacheEnum {
  //先进先出
  Fifo,
  //最少使用
  Lfu,
  //最近使用
  Lru,
}

/**
 * 缓存工厂类
 */
export class MemoryCacheFactory {
  static create<K = any, V = any>(
    type: MemoryCacheEnum,
    config?: MemoryCacheConfig,
  ): BaseMemoryCache<K, V> {
    switch (type) {
      case MemoryCacheEnum.Fifo:
        return new MemoryCacheFIFO(config)
      case MemoryCacheEnum.Lfu:
        return new MemoryCacheLFU(config)
      case MemoryCacheEnum.Lru:
        return new MemoryCacheLRU(config)
    }
  }
}
