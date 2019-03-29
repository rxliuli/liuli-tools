import { appends } from './appends'

test('test appends', () => {
  const fd = new FormData()
  appends(fd, {
    name: 'rx',
    age: 17
  })
  expect(fd.get('name')).toBe('rx')
  expect(fd.get('age')).toBe('17')
})
