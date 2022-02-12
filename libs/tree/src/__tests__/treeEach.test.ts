import { treeEach } from '../treeEach'

describe('测试 treeEach', () => {
  it('基本示例', () => {
    const node = {
      value: 1,
      label: '1',
      children: [
        {
          value: 2,
          label: '2',
        },
      ],
    }

    const mockFn = jest.fn()

    treeEach(
      [node],
      (node) => {
        mockFn(node.value)
      },
      {
        id: 'value',
        children: 'children',
      },
    )

    expect(mockFn.mock.calls.map(([arg]) => arg)).toEqual([2, 1])
  })
})
