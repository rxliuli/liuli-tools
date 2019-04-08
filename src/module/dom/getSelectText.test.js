import { setCusorPostion } from './setCusorPostion'
import { getSelectText } from './getSelectText'

/**
 * @test {getSelectText}
 * @see https://github.com/jsdom/jsdom/issues/321
 */
describe.skip('test getSelectText(But currently jsdom does not support the isContentEditable property.)', () => {
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
    expect(getSelectText()).toEqual('ex')
  })
})
