import { removeText } from './removeText'

/**
 * @test {removeText}
 */
describe('test removeText', () => {
  let $name
  beforeEach(() => {
    document.body.innerHTML = /* html */ `
  <input type="text" id="name" />
`
    $name = document.querySelector('#name')
    $name.value = 'text'
  })
  it('test normal situation', () => {
    removeText($name, 0, $name.value.length)
    expect($name.value).toBeEmpty()
  })
  it('test remove text for not specify start index', () => {
    removeText($name)
    expect($name.value).toEqual('text')
  })
})
