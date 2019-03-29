import { format } from './format'

test('test format', () => {
  expect(
    format('name: {name}, age: {age}', {
      name: 'rx',
      age: 17
    })
  ).toEqual('name: rx, age: 17')
})
