import { deepFreeze } from './deepFreeze'

/**
 * @test {deepFreeze}
 */
describe('test deepFreeze', () => {
  it('simple example', () => {
    const obj = deepFreeze({ name: 'rx' })
    expect(() => (obj.name = '琉璃')).toThrowError()
    expect(obj.name).toBe('rx')
    expect(deepFreeze(null)).toBeNull()
  })
  it('deep freeze array', () => {
    const obj = deepFreeze([1, 2, 3])
    expect(() => (obj[0] = 0)).toThrowError()
    expect(obj[0]).toBe(1)
  })
  it('deep nest object', () => {
    const obj = deepFreeze({
      user: {
        name: 'rx',
      },
    })
    expect(() => (obj.user.name = '琉璃')).toThrowError()
    expect(obj.user.name).toBe('rx')
  })
  it('deep nest array', () => {
    const obj = deepFreeze([
      {
        name: 'rx',
      },
    ])
    expect(() => (obj[0].name = '琉璃')).toThrowError()
    expect(obj[0].name).toBe('rx')
  })
  it('deep nest object and array', () => {
    const obj = deepFreeze({
      arr: [
        {
          user: {
            name: 'rx',
          },
        },
      ],
    })
    expect(() => (obj.arr[0].user.name = '琉璃')).toThrowError()
    expect(obj.arr[0].user.name).toBe('rx')
  })
})
