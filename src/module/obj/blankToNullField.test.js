import { blankToNullField } from './blankToNullField'

/**
 * @test {blankToNullField}
 */
describe('test blankToNullField', () => {
  it('test blankToNullField', () => {
    expect(
      blankToNullField({
        name: '',
        age: ''
      })
    ).toEqual({
      name: null,
      age: null
    })
  })
})
