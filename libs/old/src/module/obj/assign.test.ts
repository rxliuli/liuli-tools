import { assign } from './assign'

/**
 * @test {assign}
 */
describe('test assign', () => {
  it('simple example', () => {
    const res = assign(
      {
        name: 'rx',
        hello() {
          return this.name
        },
      },
      {
        name: '琉璃',
        hello: undefined,
      },
    )
    expect(res.name).toEqual('琉璃')
    expect(res.hello()).toEqual('琉璃')
  })
  it('test undefined or null', () => {
    const res: any = assign(
      undefined,
      {
        name: 'rx',
        hello() {
          return this.name
        },
      },
      null,
      {
        name: '琉璃',
        hello: undefined,
      },
    )
    expect(res.name).toEqual('琉璃')
    expect(res.hello()).toEqual('琉璃')
  })
  it('test type', () => {
    const res = assign(
      {
        name: '灵梦',
      },
      {
        age: 17,
      },
      {
        sex: false,
      },
    )
    expect(res.name).toBe('灵梦')
    expect(res.age).toBe(17)
    expect(res.sex).toBe(false)
  })
})
