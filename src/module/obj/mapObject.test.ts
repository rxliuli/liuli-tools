import { mapObject } from './mapObject'

it('测试 mapObject', () => {
  const res = mapObject({ Name: 'li', age: 17 }, ([k, v]) => [
    k.toLowerCase(),
    v,
  ])
  expect(res).toEqual({
    name: 'li',
    age: 17,
  })
})
