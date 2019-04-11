import { objToFormData } from './objToFormData'
import { deletes } from './deletes'

/**
 * @test {deletes}
 */
describe('test deletes', () => {
  it('simple example', () => {
    const fd = objToFormData({
      name: 'rx',
      age: 17
    })
    deletes(fd, ['age'])
    expect(fd.get('age')).toBeNull()
  })
})
