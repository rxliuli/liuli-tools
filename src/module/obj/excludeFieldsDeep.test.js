import { excludeFieldsDeep } from './excludeFieldsDeep'

/**
 * @test {excludeFieldsDeep}
 */
describe('test excludeFieldsDeep', () => {
  const obj = {
    name: 'rx',
    age: 17
  }
  it('test normal object and not exculde any field.', () => {
    expect(excludeFieldsDeep(obj)).not.toBe(obj)
    expect(excludeFieldsDeep(obj)).toEqual(obj)
  })

  it('test normal object and normal fields', () => {
    expect(excludeFieldsDeep(obj, 'name')).toEqual({ age: 17 })
    expect(excludeFieldsDeep(obj, 'name', 'age')).toEqual({})
  })

  it('test deep exclude field', () => {
    expect(
      excludeFieldsDeep(
        {
          id: 1,
          child: [
            {
              id: 2,
              name: '2',
              parent: 1
            },
            {
              id: 3,
              name: '2',
              parent: 1
            }
          ]
        },
        'name',
        'parent'
      )
    ).toEqual({
      id: 1,
      child: [
        {
          id: 2
        },
        {
          id: 3
        }
      ]
    })
  })
  it('test deep exclude field for array', () => {
    expect(
      excludeFieldsDeep(
        [
          {
            id: 2,
            name: '2',
            parent: 1
          },
          {
            id: 3,
            name: '2',
            parent: 1
          }
        ],
        'name',
        'parent'
      )
    ).toEqual([
      {
        id: 2
      },
      {
        id: 3
      }
    ])
  })
})
