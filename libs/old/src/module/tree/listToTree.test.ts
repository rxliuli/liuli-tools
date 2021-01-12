import { listToTree } from './listToTree'
import { nodeBridgeUtil } from './NodeBridgeUtil'

/**
 * @test {listToTree}
 */
describe('test listToTree', () => {
  it('simple example', () => {
    class Node {
      constructor(public id: number, public parentId?: number) {}
    }
    const list = [
      new Node(1),
      new Node(2, 1),
      new Node(3, 2),
      new Node(4, 2),
      new Node(5, 1),
      new Node(6, 5),
      new Node(7, 5),
    ]

    expect(listToTree(list)).toEqual({
      id: 1,
      parentId: undefined,
      child: [
        {
          id: 2,
          parentId: 1,
          child: [
            { id: 3, parentId: 2 },
            { id: 4, parentId: 2 },
          ],
        },
        {
          id: 5,
          parentId: 1,
          child: [
            { id: 6, parentId: 5 },
            { id: 7, parentId: 5 },
          ],
        },
      ],
    })
  })
  it('test multi root node', () => {
    class Node {
      constructor(public id: number, public parentId?: number) {}
    }
    const list = [
      new Node(1),
      new Node(2),
      new Node(3, 2),
      new Node(4, 2),
      new Node(5),
      new Node(6, 5),
      new Node(7, 5),
    ]

    expect(listToTree(list)).toEqual([
      {
        id: 1,
      },
      {
        id: 2,
        child: [
          { id: 3, parentId: 2 },
          { id: 4, parentId: 2 },
        ],
      },
      {
        id: 5,
        child: [
          { id: 6, parentId: 5 },
          { id: 7, parentId: 5 },
        ],
      },
    ])
  })
  it('test no root node', () => {
    class Node {
      constructor(public id: number, public parentId: number) {}
    }
    const list = [
      new Node(2, 1),
      new Node(3, 2),
      new Node(4, 2),
      new Node(5, 1),
      new Node(6, 5),
      new Node(7, 5),
    ]
    expect(listToTree(list)).toEqual({})
  })
  class CustomNode {
    constructor(public uid: number, public parent?: number) {}
  }
  const result = {
    uid: 1,
    parent: undefined,
    child: [
      {
        uid: 2,
        parent: 1,
        child: [
          { uid: 3, parent: 2 },
          { uid: 4, parent: 2 },
        ],
      },
      {
        uid: 5,
        parent: 1,
        child: [
          { uid: 6, parent: 5 },
          { uid: 7, parent: 5 },
        ],
      },
    ],
  }
  it('test custom field getter and setter', () => {
    // 桥接类 BridgeNode，使用 getter/setter 包装对象
    class BridgeNode {
      public uid: number
      public parent?: number
      constructor({ uid, parent }: CustomNode) {
        this.uid = uid
        this.parent = parent
      }
      // 定义 Getter 拦截 id 并返回 this.uid
      get id() {
        return this.uid
      }
      set id(id) {
        this.uid = id
      }
      get parentId() {
        return this.parent
      }

      set parentId(parentId) {
        this.parent = parentId
      }
    }
    // 使用 BridgeNode 包装 Node 类
    const list = [
      new BridgeNode(new CustomNode(1)),
      new BridgeNode(new CustomNode(2, 1)),
      new BridgeNode(new CustomNode(3, 2)),
      new BridgeNode(new CustomNode(4, 2)),
      new BridgeNode(new CustomNode(5, 1)),
      new BridgeNode(new CustomNode(6, 5)),
      new BridgeNode(new CustomNode(7, 5)),
    ]

    expect(listToTree(list)).toEqual(result)
  })
  it('test custom proxy', () => {
    const handler: ProxyHandler<CustomNode> = {
      get(target: CustomNode, k: PropertyKey) {
        if (k === 'id') {
          return target.uid
        }
        if (k === 'parentId') {
          return target.parent
        }
        return Reflect.get(target, k)
      },
      set(target: CustomNode, k: PropertyKey, v: any) {
        if (k === 'id') {
          target.uid = v
          return false
        }
        if (k === 'parentId') {
          target.parent = v
          return false
        }
        Reflect.set(target, k, v)
        return true
      },
    }
    function bridgeNode(node: CustomNode) {
      return new Proxy(node, handler)
    }
    // 使用 bridge 代理过的 Node 类
    const list = [
      bridgeNode(new CustomNode(1)),
      bridgeNode(new CustomNode(2, 1)),
      bridgeNode(new CustomNode(3, 2)),
      bridgeNode(new CustomNode(4, 2)),
      bridgeNode(new CustomNode(5, 1)),
      bridgeNode(new CustomNode(6, 5)),
      bridgeNode(new CustomNode(7, 5)),
    ]

    expect(listToTree(list)).toEqual(result)
  })
  it('test custom INode bridge', () => {
    const bridgeNode = nodeBridgeUtil.bridge({
      id: 'uid',
      parentId: 'parent',
    })
    // 使用 bridge 代理过的 Node 类
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
    expect(listToTree(list.map(bridgeNode))).toEqual(result)
  })
  it('custom field for node', () => {
    const list = [
      new CustomNode(1),
      new CustomNode(2, 1),
      new CustomNode(3, 2),
      new CustomNode(4, 2),
      new CustomNode(5, 1),
      new CustomNode(6, 5),
      new CustomNode(7, 5),
    ]

    const bridge = nodeBridgeUtil.bridge({
      id: 'uid',
      parentId: 'parent',
    })
    // 转换时使用 bridge 代理 CustomNode 类
    expect(listToTree(list, { bridge })).toEqual(result)
  })
})
