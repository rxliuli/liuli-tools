import { setCursorPosition } from './setCursorPosition'
import { getCursorPosition } from './getCursorPosition'

/**
 * @test {getCursorPosition}
 */
describe('test getCursorPosition', () => {
  document.body.innerHTML = /* html */ `
    <input type="text" id="name" />
  `
  it('test normal situation', () => {
    // @ts-ignore
    const $name: HTMLFormElement = document.querySelector('#name')
    $name.value = 'getCursorPosition'
    const index = 3
    setCursorPosition($name, index)
    expect(getCursorPosition($name)).toBe(index)
  })
})
