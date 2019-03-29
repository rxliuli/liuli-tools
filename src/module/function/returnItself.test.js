import { returnItself } from './returnItself'

test('test returnItSelf', () => {
  const user = {
    name: 'rx',
    age: 17
  }
  expect(returnItself(user)).toEqual(user)
})
