import { spliceParams } from './spliceParams'

test('test spliceParams', () => {
  expect(
    spliceParams({
      name: 'rx',
      age: 17
    })
  ).toBe('name=rx&age=17&')
})
