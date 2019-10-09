import { partial } from './partial'

/**
 * @test {partial}
 */
describe('test partial', () => {
  it('simple example', () => {
    const add = (i: number, k: number) => i + k
    const fn = partial(add, 1)
    expect(fn).toBeFunction()
    expect(fn(2)).toBe(3)
  })
  it('test this', function() {
    // @ts-ignore
    this.value = 'value: '
    // @ts-ignore
    const add = (i, k) => this.value + (i + k)
    const fn = partial(add, 1)
    expect(fn).toBeFunction()
    expect(fn(2)).toBe('value: 3')
    // @ts-ignore
    this.value = 'v: '
    expect(fn(2)).toBe('v: 3')
  })
  it('test partial._', function() {
    // @ts-ignore
    this.value = 'value: '
    // @ts-ignore
    const add = (i: number, k: number) => this.value + (i + k)
    const fn = partial(add, partial._, 1)
    expect(fn).toBeFunction()
    expect(fn(2)).toBe('value: 3')
    // @ts-ignore
    this.value = 'v: '
    expect(fn(2)).toBe('v: 3')
  })
  it('test complex partial._', () => {
    const add = (i1: number, i2: number, i3: number, i4: number, i5: number) =>
      i1 + i2 + i3 + i4 + i5
    expect(partial(add)(partial._, 2)(1, partial._)(3, partial._, 5)(4)).toBe(
      15,
    )
  })
  it('test partial toString', () => {
    const add = (i1: number, i2: number, i3: number) => i1 + i2 + i3
    expect(partial(add)(1)(2).toString()).toBe('name: add, args: [1, 2]')
  })
  it('test length', () => {
    const add = (a: number, b: number, c: number) => a + b + c
    expect(partial(add)._length).toBe(3)
    expect(partial(add)(1)._length).toBe(2)
    expect(partial(add)(1)(2)._length).toBe(1)
    expect(partial(add)(1, 2)._length).toBe(1)
    expect(partial(add)(1, partial._, 3)._length).toBe(1)
    expect(partial(add)(partial._, 1)._length).toBe(2)
  })
})
