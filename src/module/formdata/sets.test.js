import { sets } from './sets'
import { objToFormData } from './objToFormData'

/**
 * @test {sets}
 */
describe('test sets', () => {
  it('simple example', () => {
    const user = {
      name: 'rx',
      age: 17
    }

    const fd = new FormData()
    sets(fd, user)
    expect(fd).toEqual(objToFormData(user))
  })
})
