import { repeatedCall } from '../function/repeatedCall'
import { BasicOnce, OnceInstance } from './OnceInstance'
import { randomInt } from '../number/randomInt'

describe('测试 OnceInstance', () => {
  function testOnce(onceInstance: BasicOnce) {
    const { once } = onceInstance
    it('简单示例 +1', () => {
      const mockFn = jest.fn((i: number) => i + 1)
      const fn = once(mockFn)
      expect(fn(0)).toBe(1)
      expect(fn(1)).toBe(1)
      expect(fn(2)).toBe(1)
      expect(mockFn.mock.calls.length).toBe(1)
    })
    it('测试异步函数', async () => {
      const add = async (i: number) => i - 1
      const fn = once(add)
      expect(await fn(3)).toBe(2)
      expect(await fn(2)).toBe(2)
      expect(await fn(1)).toBe(2)
    })
    class Model {
      public i = 3
      async add() {
        return --this.i
      }
    }
    it('测试 this', async function() {
      const model = new Model()
      const mockFn = jest.fn(model.add)
      const fn = once(mockFn.bind(model))
      await Promise.all(repeatedCall(3, fn))
      expect(await fn()).toBe(2)
      expect(model.i).toBe(2)
    })
    it('测试手动 bind this', async function() {
      const obj = {
        i: 3,
      }
      const model = new Model()
      const fn = once(model.add).bind(obj)
      await Promise.all(repeatedCall(3, fn))
      expect(model.i).toBe(3)
      expect(obj.i).toBe(2)
    })
  }
  function testLimit(onceInstance: BasicOnce) {
    const { limit } = onceInstance
    it('简单示例 +1', () => {
      const mockFn = jest.fn((i: number) => i + 1)
      const fn = limit(mockFn, 1)
      expect(fn(0)).toBe(1)
      expect(fn(1)).toBe(1)
      expect(fn(2)).toBe(1)
      expect(mockFn.mock.calls.length).toBe(1)
    })
    it('测试异步函数', async () => {
      const add = async (i: number) => i - 1
      const fn = limit(add, 1)
      expect(await fn(3)).toBe(2)
      expect(await fn(2)).toBe(2)
      expect(await fn(1)).toBe(2)
    })
    class Model {
      public i = 3
      async add() {
        return --this.i
      }
    }
    it('测试 this', async function() {
      const model = new Model()
      const mockFn = jest.fn(model.add)
      const fn = limit(mockFn.bind(model), 1)
      await Promise.all(repeatedCall(3, fn))
      expect(await fn()).toBe(2)
      expect(model.i).toBe(2)
    })
    it('测试手动 bind this', async function() {
      const obj = {
        i: 3,
      }
      const model = new Model()
      const fn = limit(model.add, 1).bind(obj)
      await Promise.all(repeatedCall(3, fn))
      expect(model.i).toBe(3)
      expect(obj.i).toBe(2)
    })
  }
  function testOnceOfSameParam(onceInstance: BasicOnce) {
    const { onceOfSameParam } = onceInstance
    it('简单示例', () => {
      let res = 0
      const mockFn = jest.fn((i: number) => res + i)
      const fn = onceOfSameParam(mockFn)
      expect(repeatedCall(3, fn, 0)).toSatisfyAll(i => i === 0)
      expect(repeatedCall(3, fn, 1)).toSatisfyAll(i => i === 1)
      expect(repeatedCall(3, fn, 3)).toSatisfyAll(i => i === 3)
      expect(mockFn.mock.calls.length).toBe(3)
    })
    it('测试异步函数', async () => {
      class User {
        constructor(public name: string, public age?: number) {}
      }
      // 模拟一个根据姓名获取 User 对象的值的 API
      const getById = async (name: any) => new User(name, randomInt(18))
      const fn = onceOfSameParam(getById)
      const res = await fn('rxliuli')
      expect(await fn('rxliuli')).toBe(res)
      // 相同的名字不会真正执行到服务端
      expect(await fn('rxliuli')).toBe(res)
      // 换个名字就不同了
      expect(await fn('ling_meng')).not.toBe(res)
    })
  }

  describe('测试 RamOnce', () => {
    describe('测试 once', () => testOnce(OnceInstance.RamOnce))
    describe('测试 limit', () => testLimit(OnceInstance.RamOnce))
    describe('测试 onceOfSameParam', () =>
      testOnceOfSameParam(OnceInstance.RamOnce))
  })
})
