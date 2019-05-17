import { blankToNullField } from './blankToNullField'

/**
 * @test {blankToNullField}
 */
describe('test blankToNullField', () => {
  it('simple example', () => {
    expect(
      blankToNullField({
        name: '',
        age: '',
        sex: false,
      })
    ).toEqual({
      name: null,
      age: null,
      sex: false,
    })
  })
})
