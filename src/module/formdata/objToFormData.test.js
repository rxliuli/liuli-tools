import { objToFormData } from './objToFormData'

/**
 * @test {objToFormData}
 */
describe('test objToFormData', () => {
  it('simple example', () => {
    const fd = objToFormData({
      name: 'rx',
      age: 17
    })
    expect(fd.get('name')).toBe('rx')
    expect(fd.get('age')).toBe('17')
  })
})
