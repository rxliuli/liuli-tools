import { getSelectText } from './getSelectText'
import { setCursorPosition } from './setCursorPosition'

/**
 * @test {getSelectText}
 * But currently jsdom does not support the isContentEditable property.
 * @see https://github.com/jsdom/jsdom/issues/321
 */
describe.skip('test getSelectText', () => {
  let $name: HTMLFormElement
  beforeEach(() => {
    document.body.innerHTML = /* html */ `
  <input type="text" id="name" />
`
    // @ts-ignore
    $name = document.querySelector('#name')
    $name.value = 'text'
  })
  it('test normal situation', () => {
    setCursorPosition($name, 1, 3)
    expect(getSelectText()).toEqual('ex')
  })
})
