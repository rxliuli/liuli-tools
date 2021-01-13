import { treeToList } from '../treeToList'
import { Expect } from '@liuli-util/test'

describe('测试 treeToList', () => {
  interface Node {
    id: string
    children?: Node[]
  }

  const nodeTreeList: Node[] = [
    { id: '1', children: [{ id: '1-1' }, { id: '1-2' }] },
    { id: '2', children: [{ id: '2-1', children: [{ id: '2-1-1' }] }] },
  ]

  it('基本示例', () => {
    const res = treeToList(nodeTreeList, {
      id: 'id',
      children: 'children',
      path: 'path' as const,
    })
    expect(
      (res as Expect<typeof res, (Node & { path: string[] })[]>).length,
    ).toBe(6)
  })
  it('测试列表中是否依然保持了引用关系', () => {
    const res = treeToList(nodeTreeList, {
      id: 'id',
      children: 'children',
      path: 'path' as const,
    })
    expect(res).toEqual([
      { id: '1-1', path: ['1', '1-1'] },
      { id: '1-2', path: ['1', '1-2'] },
      { id: '1', children: [{ id: '1-1' }, { id: '1-2' }], path: ['1'] },
      { id: '2-1-1', path: ['2', '2-1', '2-1-1'] },
      { id: '2-1', children: [{ id: '2-1-1' }], path: ['2', '2-1'] },
      {
        id: '2',
        children: [{ id: '2-1', children: [{ id: '2-1-1' }] }],
        path: ['2'],
      },
    ])
  })
})
