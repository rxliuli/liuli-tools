import { listToTree } from '../listToTree'
import { Expect } from '@liuli-util/test'

describe('测试 listToTree', () => {
  const [res] = listToTree(
    [
      { id: 3, parent: 1 },
      { id: 4, parent: 1 },
      { id: 1, parent: 0 },
      { id: 2, parent: 0 },
      { id: 5, parent: 2 },
      { id: 6, parent: 2 },
      { id: 0 },
    ],
    {
      id: 'id',
      parentId: 'parent',
      children: 'children',
    },
  )
  it('基本示例', () => {
    expect(res).toEqual({
      id: 0,
      children: [
        {
          id: 1,
          parent: 0,
          children: [
            { id: 3, parent: 1 },
            { id: 4, parent: 1 },
          ],
        },
        {
          id: 2,
          parent: 0,
          children: [
            { id: 5, parent: 2 },
            { id: 6, parent: 2 },
          ],
        },
      ],
    })
  })
  it('测试类型', () => {
    const children = res.children
    expect(children as Expect<typeof children, any[] | undefined>)
    expect(res.id).toBe(res.children![0].parent)
  })
})
