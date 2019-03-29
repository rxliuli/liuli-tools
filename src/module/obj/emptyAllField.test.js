import { emptyAllField } from './emptyAllField'

test('test emptyAllField', () => {
  expect(
    emptyAllField({
      name: 'rx',
      age: 17
    })
  ).toEqual({
    name: null,
    age: null
  })
})
