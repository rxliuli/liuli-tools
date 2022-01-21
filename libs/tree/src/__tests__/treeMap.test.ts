import { treeMap } from '../treeMap'
import { Expect } from '@liuli-util/test'

describe('测试 treeMap', () => {
  interface Node {
    value: number
    label: string
    children?: Node[]
  }

  it('测试修改 children 的字段名', () => {
    const node: Node = {
      value: 1,
      label: '1',
      children: [
        {
          value: 2,
          label: '2',
        },
      ],
    }

    const options = {
      id: 'value',
      children: 'children',
    } as const

    const res1 = treeMap(
      [node],
      (node, path) => ({
        id: node.value,
        content: node.label,
        sub: node.children,
        path,
      }),
      options,
    )

    const expectRes = [
      {
        id: 1,
        content: '1',
        path: [1],
        sub: [
          {
            id: 2,
            content: '2',
            path: [1, 2],
          },
        ],
      },
    ]
    expect(res1).toEqual(expectRes)

    interface NewNode {
      id: number
      content: string
      sub?: Node[]
      path: number[]
    }

    const res2 = treeMap(
      [node],
      (node, path) =>
        ({
          id: node.value,
          content: node.label,
          sub: node.children,
          path,
        } as NewNode),
      options,
    )
    expect(res2 as Expect<typeof res2, NewNode[]>).toEqual(expectRes)
  })
  it('将子树挂载到另外一颗树的指定节点上', () => {
    const node1 = {
      value: 1,
      label: '1',
      children: [
        {
          value: 2,
          label: '2',
        },
      ],
    }
    const node2 = {
      value: 3,
      label: '3',
      children: [
        {
          value: 4,
          label: '4',
        },
      ],
    }
    const res = treeMap(
      [node1],
      (node) => {
        if (node.value === 2) {
          node.children = [...(node.children || []), node2]
        }
        return node
      },
      {
        id: 'value',
        children: 'children',
      },
    )
    expect(res).toEqual([
      {
        value: 1,
        label: '1',
        children: [
          {
            value: 2,
            label: '2',
            children: [
              {
                value: 3,
                label: '3',
                children: [
                  {
                    value: 4,
                    label: '4',
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
  })
})
