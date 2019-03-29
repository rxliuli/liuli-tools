import { mapToObject } from './mapToObject'

test('test mapToObject', () => {
  expect(
    mapToObject(
      new Map()
        .set('name', 'rx')
        .set('age', 17)
        .set(1, 1)
    )
  ).toEqual({
    name: 'rx',
    age: 17,
    '1': 1
  })
})
