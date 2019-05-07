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
})
