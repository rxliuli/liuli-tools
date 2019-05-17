import { setCusorPostion } from './setCusorPostion'
import { getCusorPostion } from './getCusorPostion'

/**
 * @test {setCusorPostion}
 */
describe('test setCusorPostion', () => {
  let $name
  beforeEach(() => {
    document.body.innerHTML = /* html */ `
  <input type="text" id="name" />
`
    $name = document.querySelector('#name')
    $name.value = 'text'
  })
  it('test normal situation', () => {
    setCusorPostion($name, 1, 3)
    expect(getCusorPostion($name)).toEqual(1)
  })
})
