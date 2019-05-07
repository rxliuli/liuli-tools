import { treeToList } from './treeToList'
import { excludeFieldsDeep } from '../obj/excludeFieldsDeep'

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
})
