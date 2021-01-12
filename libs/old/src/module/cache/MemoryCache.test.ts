import {
  BaseMemoryCache,
  MemoryCacheEnum,
  MemoryCacheFactory,
} from './MemoryCache'
import { range } from '../array/range'
import { repeatedCall } from '../function/repeatedCall'

describe('测试内存缓存', () => {
  function initCache(cache: BaseMemoryCache<any, any>) {
    cache.add('1', 1)
    cache.add('2', 2)
    cache.add('3', 3)
    expect(cache.get('1')).toBe(1)
    expect(cache.get('2')).toBe(2)
    expect(cache.get('3')).toBe(3)
  }

  describe('测试 FIFO', () => {
    it('基本示例', () => {
      const cache = MemoryCacheFactory.create(MemoryCacheEnum.Fifo, {
        limit: 3,
      })
      initCache(cache)

      //达到最大容量后继续添加
      cache.add('4', 4)
      expect(cache.get('4')).toBe(4)
      //最早添加的值将被删除
      expect(cache.get('1')).toBeUndefined()
    })
    it('使用无限容量的缓存', () => {
      const cache = MemoryCacheFactory.create(MemoryCacheEnum.Fifo)

      range(0, 100).forEach((i) => cache.add(i, i))
      expect(cache.size).toBe(100)
    })
    it('测试使用负值', () => {
      expect(() =>
        MemoryCacheFactory.create(MemoryCacheEnum.Fifo, { limit: -1 }),
      ).toThrowError()
    })
    it('测试清空', () => {
      const cache = MemoryCacheFactory.create(MemoryCacheEnum.Fifo)
      cache.add(1, 1)
      cache.add(2, 2)
      expect(cache.size).toBe(2)
      cache.clear()
      expect(cache.size).toBe(0)
    })
  })
  describe('测试 LFU', () => {
    it('基本示例', () => {
      const cache = MemoryCacheFactory.create(MemoryCacheEnum.Lfu, {
        limit: 3,
      })
      initCache(cache)

      console.log(cache.get('1'))

      //达到最大容量后继续添加
      cache.add('4', 4)
      expect(cache.get('4')).toBe(4)
      // 访问次数最少的值将被删除
      expect(cache.get('2')).toBeUndefined()
    })
  })
  describe('测试 LRU', () => {
    it('基本示例', () => {
      const cache = MemoryCacheFactory.create<string, number>(
        MemoryCacheEnum.Lru,
        {
          limit: 3,
        },
      )
      initCache(cache)

      repeatedCall(3, () => cache.get('3'))
      repeatedCall(2, () => cache.get('2'))
      repeatedCall(1, () => cache.get('1'))

      //达到最大容量后继续添加
      cache.add('4', 4)
      expect(cache.get('4')).toBe(4)
      // 最久没有被访问的值将被删除
      expect(cache.get('3')).toBeUndefined()
    })
  })
})
