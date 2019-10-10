import { peekInstance } from './Peek'

describe('测试 Peek', () => {
  const { peek, compute, reset } = peekInstance
  describe('基本使用', () => {
    const res = peek({
      name: 'rx',
      age: 17,
      info: {
        desc: '描述',
        hobby: ['动画', '游戏'],
      },
    })
    it('修改对象属性', () => {
      reset(res)
      res.name = 'liuli'
      expect(compute(res)).toEqual({ name: 'liuli' })
      res.info.desc = 'desc'
      res.info.desc = 'description'
      expect(compute(res)).toEqual({
        name: 'liuli',
        info: { desc: 'description' },
      })
    })
    it('修改数组元素', () => {
      reset(res)
      res.info.hobby.push('test')
      res.info.hobby.splice(0, 1)
      console.log(compute(res))
      expect(compute(res).info.hobby).toIncludeAllMembers(['游戏', 'test'])
    })
  })
})
