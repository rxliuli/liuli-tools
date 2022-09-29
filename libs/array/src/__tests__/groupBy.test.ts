import { expect, it, describe } from 'vitest'
import { groupBy } from '../groupBy'
import { Expect } from '@liuli-util/test'

describe('测试 groupBy', () => {
  it('基本示例', () => {
    const arr = [1, 2, 3]
    const res = groupBy(arr, (i) => i % 2 === 0)
    expect(res as Expect<typeof res, Map<boolean, number[]>>).toEqual(new Map().set(true, [2]).set(false, [1, 3]))
  })

  it('测试自定义 reduce 函数', () => {
    const arr = [
      {
        type: 1,
        sub: [1],
      },
      {
        type: 2,
        sub: [2],
      },
      {
        type: 1,
        sub: [3],
      },
    ]

    const res = groupBy(
      arr,
      (item) => item.type,
      (res: number[], item) => res.concat(item.sub),
    )
    expect(res as Expect<typeof res, Map<number, number[]>>).toEqual(new Map().set(1, [1, 3]).set(2, [2]))
  })
})
