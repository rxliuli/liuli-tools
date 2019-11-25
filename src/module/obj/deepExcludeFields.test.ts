import { deepExcludeFields } from './deepExcludeFields'

describe('测试 deepExcludeFields', () => {
  it('基本示例', () => {
    const name = 'rx'
    const res = deepExcludeFields(
      {
        id: 1,
        info: {
          id: 1,
          address: {
            id: 1,
            name,
          },
        },
      },
      'id',
    )
    expect(res).toEqual({
      info: {
        address: {
          name,
        },
      },
    })
  })
  it('包含数组', () => {
    const res = deepExcludeFields(
      {
        id: 1,
        type: 'student',
        hobby: [
          {
            id: 1,
            name: '动画',
          },
          {
            id: 2,
            name: '游戏',
          },
        ],
      },
      'id',
    )
    expect(res).toEqual({
      type: 'student',
      hobby: [{ name: '动画' }, { name: '游戏' }],
    })
  })
})
