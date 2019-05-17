import { setCusorPostion } from './setCusorPostion'
import { getCusorPostion } from './getCusorPostion'
/**
 * @test {getCusorPostion}
 */
describe('test getCusorPostion', () => {
  document.body.innerHTML = /* html */ `
    <input type="text" id="name" />
  `
  it('test normal situation', () => {
    const $name = document.querySelector('#name')
    $name.value = 'getCusorPostion'
    const index = 3
    setCusorPostion($name, index)
    expect(getCusorPostion($name)).toBe(index)
  })
})
