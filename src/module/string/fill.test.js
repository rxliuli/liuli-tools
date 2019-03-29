import { fill } from './fill'

test('test fill', () => {
  expect(fill('*', 3)).toEqual('***')
  expect(fill('*', 0)).toEqual('')
})
