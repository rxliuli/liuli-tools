import { batch } from './batch'
import { arrayToMap } from '../array/arrayToMap'

describe('测试 batch', () => {
  it('基本示例', async () => {
    const handle = jest.fn(async (idList: [number][]) => {
      console.log('batch.handle', idList)
      return arrayToMap(
        idList,
        params => params,
        ([id]) => id * 2,
      )
    })
    const fn = batch(async (i: number) => i * 2, handle)
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
})
