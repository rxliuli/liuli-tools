import { objToFormData } from './objToFormData'
import { strToBlob } from '../ajax/strToBlob'

/**
 * @test {objToFormData}
 */
describe('test objToFormData', () => {
  it('simple example', () => {
    const fd = objToFormData({
      name: 'rx',
      age: 17,
    })
    expect(fd.get('name')).toBe('rx')
    expect(fd.get('age')).toBe('17')
  })
  it('test blob', () => {
    const avatar = strToBlob('name')
    expect(objToFormData({ avatar }).get('avatar')).toEqual(
      new File([avatar], 'temp'),
    )
  })
})
