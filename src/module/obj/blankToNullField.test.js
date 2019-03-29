import { blankToNullField } from './blankToNullField'

test('test blankToNullField', () => {
  expect(
    blankToNullField({
      name: '',
      age: ''
    })
  ).toEqual({
    name: null,
    age: null
  })
})
