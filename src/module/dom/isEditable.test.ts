import { isEditable } from './isEditable'
/**
 * @test {isEditable}
 */
describe('test isEditable', () => {
  document.body.innerHTML = /* html */ `
  <main>
    <input type="text" id="name" />
    <p id="not-editable">this is not an editable element</p>
    <p id="editable" contenteditable="true">this is an editable element</p>
  </main>
`
  it('test input', () => {
    expect(isEditable(document.querySelector('#name'))).toBeTrue()
  })
  it('test an not editable element', () => {
    expect(isEditable(document.querySelector('#not-editable'))).toBeFalse()
  })
})

describe.skip('Currently jsdom does not support the isContentEditable property', () => {
  it('test an editable element', () => {
    console.log(document.querySelector('#editable').isContentEditable)
    expect(isEditable(document.querySelector('#editable'))).toBeTrue()
  })
})
