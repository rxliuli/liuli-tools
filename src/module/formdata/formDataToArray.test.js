import { formDataToArray } from './formDataToArray'
import { objToFormData } from './objToFormData'

test('test formDataToArray', () => {
  const fd = objToFormData({
    name: 'rx',
    age: 17
  })
  expect(formDataToArray(fd)).toEqual(
    expect.arrayContaining([['name', 'rx'], ['age', '17']])
  )
})
