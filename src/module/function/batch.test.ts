import { batch } from './batch'
import { arrayToMap } from '../array/arrayToMap'
import { dateFormat, wait } from '../..'

describe('测试 batch', () => {
  const handle = jest.fn(async (idList: [number][]) => {
    console.log('batch.handle', idList, dateFormat(new Date(), 'ss.SSS'))
    return arrayToMap(
      idList,
      (params) => params,
      ([id]) => id * 2,
    )
  })

  beforeEach(handle.mockClear)

  it('基本示例', async () => {
    const fn = batch(handle)
    const numbers = await Promise.all([fn(1), fn(2)])
    expect(numbers).toEqual([2, 4])
    //上面虽然调用了两次，但批处理只会进行一次，因为它们是并发调用的，所以只会处理一次
    expect(handle.mock.calls.length).toBe(1)
    // console.log('numbers: ', numbers)
    expect(await fn(3)).toBe(6)
    expect(await fn(4)).toBe(8)
    //如果是顺序调用则仍然会执行两次批处理
    expect(handle.mock.calls.length).toBe(3)
  })
  it('测试异常情况', async () => {
    const fn = batch(async (idList: [number][]) => {
      console.log('batch.handle', idList)
      if (idList.some(([id]) => id === 0)) {
        return arrayToMap(
          idList,
          (params) => params,
          () => new Error('id not equals 0'),
        )
      }
      return arrayToMap(
        idList,
        (params) => params,
        ([id]) => id * 2,
      )
    })
    await Promise.all([
      expect(fn(1)).rejects.toThrowError(),
      expect(fn(0)).rejects.toThrowError(),
    ])
    expect(await fn(1)).toBe(2)
    await expect(fn(0)).rejects.toThrowError()
  })
  it('测试等待间隔几十毫秒的调用（微任务）', async () => {
    const fn = batch(handle)
    await Promise.all([
      fn(1).then(() => {
        expect(handle.mock.calls.length).toBe(1)
      }),
      wait(150)
        .then(() => fn(2))
        .then(() => {
          expect(handle.mock.calls.length).toBe(2)
        }),
    ])
  })
  it('测试等待间隔几十毫秒的调用（最小延迟）', async () => {
    const fn = batch(handle, 200)
    await Promise.all([
      fn(1).then(() => {
        expect(handle.mock.calls.length).toBe(1)
      }),
      wait(150)
        .then(() => fn(2))
        .then(() => {
          expect(handle.mock.calls.length).toBe(1)
        }),
    ])
  })
})
