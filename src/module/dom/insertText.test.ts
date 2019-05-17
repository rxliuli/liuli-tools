import { insertText } from './insertText'

/**
 * @test {insertText}
 */
describe('test insertText', () => {
  let $name
  beforeEach(() => {
    document.body.innerHTML = /* html */ `
  <input type="text" id="name" />
`
    $name = document.querySelector('#name')
    $name.value = 'text'
  })
  it('test not specify start insert index', () => {
    insertText($name, 'insert ')
    expect($name.value).toEqual('insert text')
  })

  it('test specify start insert index', () => {
    insertText($name, ' insert success', 4)
    expect($name.value).toEqual('text insert success')
  })
})
