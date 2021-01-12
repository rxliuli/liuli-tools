import { setCursorPosition } from './setCursorPosition'
import { getCursorPosition } from './getCursorPosition'

/**
 * @test {setCursorPosition}
 */
describe('test setCursorPosition', () => {
  let $name: any
  beforeEach(() => {
    document.body.innerHTML = /* html */ `
  <input type="text" id="name" />
`
    $name = document.querySelector('#name')
    $name.value = 'text'
  })
  it('test normal situation', () => {
    setCursorPosition($name, 1, 3)
    expect(getCursorPosition($name)).toEqual(1)
  })
})
