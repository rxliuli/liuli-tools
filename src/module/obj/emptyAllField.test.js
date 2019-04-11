import { emptyAllField } from './emptyAllField'

/**
 * @test {emptyAllField}
 */
describe('test emptyAllField', () => {
  it('test emptyAllField', () => {
    expect(
      emptyAllField({
        name: 'rx',
        age: 17
      })
    ).toEqual({
      name: null,
      age: null
    })
  })
})
