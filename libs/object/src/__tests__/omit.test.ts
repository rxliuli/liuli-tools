import { omit } from '../omit'

describe('test omit', () => {
  const obj = {
    name: 'rx',
    age: 17,
  }
  it('test normal object and not exclude any field.', () => {
    expect(omit(obj)).not.toBe(obj)
    expect(omit(obj)).toEqual(obj)
  })

  it('test normal object and normal fields', () => {
    expect(omit(obj, 'name')).toEqual({ age: 17 })
    expect(omit(obj, 'name', 'age')).toEqual({})
  })
  it('test exclude Symbol', () => {
    const symbol = Symbol('name')
    const name = 'name'
    expect(
      omit(
        {
          [symbol]: name,
          [name]: symbol,
        },
        symbol,
      ),
    ).toEqual({ [name]: symbol })
  })
})
