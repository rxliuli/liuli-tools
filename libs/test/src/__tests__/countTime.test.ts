import { countTime } from '../countTime'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('测试 countTime', () => {
  it('测试异步函数', async () => {
    const num = 100
    const mock = jest.fn(() => wait(num))
    expect(await countTime(mock)).toBeGreaterThanOrEqual(num)
  })
  it('测试同步函数', () => {
    const num = 100
    const mock = jest.fn(() => {
      const start = Date.now()
      // eslint-disable-next-line no-empty
      while (Date.now() - start < num) {}
    })
    expect(countTime(mock)).toBeGreaterThanOrEqual(num)
  })
})
