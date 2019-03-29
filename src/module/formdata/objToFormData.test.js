import { objToFormData } from './objToFormData'

test('test objToFormData', () => {
  const fd = objToFormData({
    name: 'rx',
    age: 17
  })
  expect(fd.get('name')).toBe('rx')
  expect(fd.get('age')).toBe('17')
})
