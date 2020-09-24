import { splitHttpHeader } from './splitHttpHeader'

it('测试 splitHttpHeader', () => {
  const map = splitHttpHeader('text/html; charset=utf-8')
  expect(map.get('text/html')).toBeUndefined()
  expect(map.get('charset')).toBe('utf-8')
})
