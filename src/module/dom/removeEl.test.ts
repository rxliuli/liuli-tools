import { removeEl } from './removeEl'
/**
 * @test {removeEl}
 */
describe('test removeEl', () => {
  let $name
  beforeEach(() => {
    document.body.innerHTML = /* html */ `
  <input type="text" id="name" />
`
    $name = document.querySelector('#name')
  })
  it('test remove element', () => {
    expect(removeEl($name)).toEqual($name)
  })
  it('test remove a nonexistent element', () => {
    expect(() => removeEl(document.querySelector('#nonexistent'))).toThrow()
  })
})
