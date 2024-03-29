import { expect, it, describe, vi } from 'vitest'
import { asyncLimiting } from '../asyncLimiting'
import { wait } from '../wait'
import { countTime } from '@liuli-util/test'
import { AsyncArray } from '../AsyncArray'

describe('测试 AsyncArray', () => {
  async function testReduce(reduce: Function) {
    const res = await reduce([1, 2, 3, 4], async (res: any, item: number) => res + item, 0)
    expect(res).toBe(10)
  }

  async function testMap(map: Function) {
    const res = await map([1, 2, 3, 4, 5], async (item: number) => item * 2)
    expect(res).toEqual([2, 4, 6, 8, 10])
  }

  async function testFlatMap(flatMap: Function) {
    const arr = [1, 2, 3, 4, 5]
    const res = await flatMap(arr, async (i: number) => Array(i).fill(0))
    expect(res).toEqual(Array(arr.reduce((a, b) => a + b)).fill(0))
  }

  async function testFilter(filter: Function) {
    const res = await filter([1, 2, 3, 4, 5], async (item: number) => item % 2 === 0)
    expect(res).toEqual([2, 4])
  }

  async function testForEach(forEach: Function) {
    const fn = vi.fn(async (item: number) => {
      console.log(item)
    })

    await forEach([1, 2, 3, 4, 5], fn)
    expect(fn.mock.calls.length).toBe(5)
  }

  async function testParallelTime(fn: (arr: any[], fn: (...args: any[]) => Promise<any>) => Promise<any>) {
    const num = 5
    const time = 100
    expect(await countTime(() => fn(Array(num).fill(0), () => wait(time)))).toBeLessThanOrEqual(num * time)
  }

  describe('测试 AsyncArray', () => {
    it('测试 reduce', async () => {
      await testReduce(AsyncArray.reduce)
    })

    it('测试 map', async () => {
      await testMap(AsyncArray.map)
      await testParallelTime(AsyncArray.map)
    })

    it('测试 flatMap', async () => {
      await testFlatMap(AsyncArray.flatMap)
      await testParallelTime(AsyncArray.flatMap)
    })

    it('测试 filter', async () => {
      await testFilter(AsyncArray.filter)
      await testParallelTime(AsyncArray.filter)
    })

    it('测试 forEach', async () => {
      await testForEach(AsyncArray.forEach)
      await testParallelTime(AsyncArray.forEach)
    })
  })

  describe('测试 AsyncArray 测试链式调用', () => {
    it('基本示例', async () => {
      const res = await new AsyncArray([1, 2, 3, 4, 5])
        .filter(async (i) => i % 2 === 0)
        .flatMap(async (i) => Array(i).fill(0))
        .map(async (i) => i.toString())
      expect(res).toEqual(Array(6).fill('0'))
    })

    it('测试 forEach', async () => {
      const fn = vi.fn().mockImplementation(() => wait(100))
      const arr = [1, 2, 3, 4, 5]
      await AsyncArray.forEach(arr, asyncLimiting(fn, 1))
      console.log(fn.mock.calls[0][0])
      expect(fn.mock.calls.map((v) => v[0])).toEqual(arr)
    })
  })

  it('测试两次调用间隔过久', async () => {
    const fn = vi.fn().mockImplementation(() => wait(100))
    const mockFn = asyncLimiting(fn, 1)
    await mockFn()

    // 如果没有正确处理会导致超时错误
    await mockFn()
  })
})

it('asyncLimiting', async () => {
  const start = Date.now()
  const f = asyncLimiting(() => wait(100), 1)
  await Promise.all(Array(10).fill(0).map(f))
  const end = Date.now()
  console.log(end - start) // 超过 1000ms
  expect(end - start).toBeGreaterThanOrEqual(1000)
})
