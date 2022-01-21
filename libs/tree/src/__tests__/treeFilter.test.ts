import { treeFilter } from '../treeFilter'

describe('测试 treeFilter', () => {
  interface Node {
    id: string
    name: string
    children?: Node[]
  }

  const data: Node[] = [
    {
      id: '1',
      name: 'test',
      children: [
        {
          id: '1-1',
          name: 'test 1-1',
        },
        {
          id: '1-2',
          name: 'test 1-2',
        },
        {
          id: '1-3',
          name: '1-3',
        },
      ],
    },
    {
      id: '2',
      name: '2',
      children: [
        {
          id: '2-1',
          name: '2-1',
        },
      ],
    },
    {
      id: '3',
      name: '3',
      children: [],
    },
    {
      id: '4',
      name: '4',
    },
  ]

  it('基本示例', () => {
    const nodes = treeFilter(
      data,
      (node) => {
        return !!node.children || node.name.includes('test')
      },
      {
        id: 'id',
        children: 'children',
      },
    )
    expect(nodes).toEqual([
      {
        id: '1',
        name: 'test',
        children: [
          {
            id: '1-1',
            name: 'test 1-1',
          },
          {
            id: '1-2',
            name: 'test 1-2',
          },
        ],
      },
    ])
  })
})
