import { treeToList } from './treeToList'
import { excludeFieldsDeep } from '../obj/excludeFieldsDeep'
import { INode } from './Node'

/**
 * @test {treeToList}
 */
describe('test treeToList', () => {
  it('simple example', () => {
    const tree = {
      id: 1,
      child: [
        {
          id: 2,
          parentId: 1,
          child: [{ id: 3, parentId: 2 }, { id: 4, parentId: 2 }],
        },
        {
          id: 5,
          parentId: 1,
          child: [{ id: 6, parentId: 5 }, { id: 7, parentId: 5 }],
        },
      ],
    }
    const list = [
      { id: 1 },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 2 },
      { id: 4, parentId: 2 },
      { id: 5, parentId: 1 },
      { id: 6, parentId: 5 },
      { id: 7, parentId: 5 },
    ]

    expect(excludeFieldsDeep(treeToList(tree), 'child')).toEqual(list)
  })
  it('calc path', () => {
    const tree = {
      id: 1,
      child: [
        {
          id: 2,
          parentId: 1,
          child: [{ id: 3, parentId: 2 }, { id: 4, parentId: 2 }],
        },
        {
          id: 5,
          parentId: 1,
          child: [{ id: 6, parentId: 5 }, { id: 7, parentId: 5 }],
        },
      ],
    }
    const list = [
      { id: 1, path: '1' },
      { id: 2, parentId: 1, path: '1,2' },
      { id: 3, parentId: 2, path: '1,2,3' },
      { id: 4, parentId: 2, path: '1,2,4' },
      { id: 5, parentId: 1, path: '1,5' },
      { id: 6, parentId: 5, path: '1,5,6' },
      { id: 7, parentId: 5, path: '1,5,7' },
    ]
    expect(
      excludeFieldsDeep(treeToList(tree, { calcPath: true }), 'child')
    ).toEqual(list)
  })
  it('custom field for node', () => {
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
    const list = [
      { uid: 1, path: '1' },
      { uid: 2, parent: 1, path: '1,2' },
      { uid: 3, parent: 2, path: '1,2,3' },
      { uid: 4, parent: 2, path: '1,2,4' },
      { uid: 5, parent: 1, path: '1,5' },
      { uid: 6, parent: 5, path: '1,5,6' },
      { uid: 7, parent: 5, path: '1,5,7' },
    ]
    expect(
      excludeFieldsDeep(
        treeToList(tree, {
          bridge: INode.bridge({
            id: 'uid',
            parentId: 'parent',
            child: 'childrens',
          }),
          calcPath: true,
        }),
        'childrens'
      )
    ).toEqual(list)
  })
})
