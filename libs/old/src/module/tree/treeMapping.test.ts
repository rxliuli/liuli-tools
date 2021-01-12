import { nodeBridgeUtil } from './NodeBridgeUtil'
import { treeMapping } from './treeMapping'

/**
 * @test {treeForeach}
 */
describe('test treeForeach', () => {
  it('simple example', () => {
    const tree = {
      uid: 1,
      childrens: [
        {
          uid: 2,
          parent: 1,
          childrens: [
            { uid: 3, parent: 2 },
            { uid: 4, parent: 2 },
          ],
        },
        {
          uid: 5,
          parent: 1,
          childrens: [
            { uid: 6, parent: 5 },
            { uid: 7, parent: 5 },
          ],
        },
      ],
    }
    const bridge = nodeBridgeUtil.bridge({
      id: 'uid',
      parentId: 'parent',
      child: 'childrens',
    })
    treeMapping(tree, {
      before: (node, parentPath) => {
        const _node = bridge(node)
        // @ts-ignore
        _node.parentPath = parentPath
        return _node
      },
      paramFn: (node, parentPath) => [
        (parentPath ? parentPath + ',' : '') + node.id,
      ],
    })
    expect(tree).toEqual({
      uid: 1,
      childrens: [
        {
          uid: 2,
          parent: 1,
          childrens: [
            {
              uid: 3,
              parent: 2,
              parentPath: '1,2',
            },
            {
              uid: 4,
              parent: 2,
              parentPath: '1,2',
            },
          ],
          parentPath: '1',
        },
        {
          uid: 5,
          parent: 1,
          childrens: [
            {
              uid: 6,
              parent: 5,
              parentPath: '1,5',
            },
            {
              uid: 7,
              parent: 5,
              parentPath: '1,5',
            },
          ],
          parentPath: '1',
        },
      ],
    })
  })
})
