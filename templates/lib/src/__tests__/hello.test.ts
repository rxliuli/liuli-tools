import { hello } from '../index'

it('测试 hello', () => {
  expect(hello('liuli')).toBe('hello liuli')
})
