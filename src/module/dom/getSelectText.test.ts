import { setCusorPostion } from './setCusorPostion'
import { getSelectText } from './getSelectText'

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
    setCusorPostion($name, 1, 3)
    expect(getSelectText()).toEqual('ex')
  })
})
