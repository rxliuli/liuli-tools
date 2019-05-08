import { nodeBridgeUtil } from './nodeBridgeUtil'

/**
 * @test {nodeBridgeUtil}
 */
describe('test NodeBridgeUtil', () => {
  const bridgeNode = {
    id: 'uid',
    parentId: 'parent',
    child: 'childrens',
  }
  it('simple example', () => {
    const tree = {
      uid: 1,
      parent: 0,
      childrens: [1, 2],
    }
    const newTree = nodeBridgeUtil.bridge(bridgeNode)(tree)
    expect(newTree.id).toBe(tree.uid)
    expect(newTree.parentId).toBe(tree.parent)
    expect(newTree.child).toIncludeAllMembers(tree.childrens)
  })
  it('test bridgeTree', () => {
    const tree = {
      uid: 1,
      childrens: [
        {
          uid: 2,
          parent: 1,
          childrens: [{ uid: 3, parent: 2 }, { uid: 4, parent: 2 }],
        },
        {
          uid: 5,
          parent: 1,
          childrens: [{ uid: 6, parent: 5 }, { uid: 7, parent: 5 }],
        },
      ],
    }
    // @ts-ignore
    const newTree = nodeBridgeUtil.bridgeTree(tree, bridgeNode)
    // @ts-ignore
    expect(newTree.child[0].child[0].id).toBe(3)
  })
  it('test bridgeList', () => {
    class CustomNode {
      constructor (uid, parent) {
        this.uid = uid
        this.parent = parent
      }
    }
    const list = [
      new CustomNode(1),
      new CustomNode(2, 1),
      new CustomNode(3, 2),
      new CustomNode(4, 2),
      new CustomNode(5, 1),
      new CustomNode(6, 5),
      new CustomNode(7, 5),
    ]
    // @ts-ignore
    const newList = nodeBridgeUtil.bridgeList(list, bridgeNode)
    // @ts-ignore
    newList.forEach(item => {
      // @ts-ignore
      expect(item.id).toBe(item.uid)
      // @ts-ignore
      expect(item.parentId).toBe(item.parent)
    })
  })
})
