import { objToFormData } from './objToFormData'
import { deletes } from './deletes'

test('test deletes', () => {
  const fd = objToFormData({
    name: 'rx',
    age: 17
  })
  deletes(fd, ['age'])
  expect(fd.get('age')).toBeNull()
})
