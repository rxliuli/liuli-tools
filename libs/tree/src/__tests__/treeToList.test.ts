import { treeToList } from '../treeToList'

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
    const nodeList = treeToList(nodeTreeList, {
      id: 'id',
      children: 'children',
      path: 'path' as const,
    })
    console.log(nodeList, nodeList[0].path)
    expect(nodeList.length).toBe(6)
  })
  it('测试列表中是否依然保持了引用关系', () => {
    const nodeList = treeToList(nodeTreeList, {
      id: 'id',
      children: 'children',
      path: 'path' as const,
    })
    const nodeTreeListRes = nodeList
      .filter((node) => node.path.length === 1)
      .map(({ path, ...others }) => others)
    console.log(JSON.stringify(nodeTreeListRes, null, 2))
  })
})
