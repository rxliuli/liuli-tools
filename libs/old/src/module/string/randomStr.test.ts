import { randomStr } from './randomStr'

describe('测试 randomStr', () => {
  it('基本示例', () => {
    expect(randomStr(10)).toHaveLength(10)
  })
})
