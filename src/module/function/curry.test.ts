import { curry } from './curry'

/**
 * @test {curry}
 */
describe('test curry', () => {
  it('simple example', () => {
    const add = (i: number, k: number) => i + k
    const fn = curry(add, 1)
    expect(fn).toBeFunction()
    expect(fn(2)).toBe(3)
  })
  it('test this', function() {
    // @ts-ignore
    this.value = 'value: '
    // @ts-ignore
    const add = (i, k) => this.value + (i + k)
    const fn = curry(add, 1)
    expect(fn).toBeFunction()
    expect(fn(2)).toBe('value: 3')
    // @ts-ignore
    this.value = 'v: '
    expect(fn(2)).toBe('v: 3')
  })
  it('test curry._', function() {
    // @ts-ignore
    this.value = 'value: '
    // @ts-ignore
    const add = (i: number, k: number) => this.value + (i + k)
    const fn = curry(add, curry._, 1)
    expect(fn).toBeFunction()
    expect(fn(2)).toBe('value: 3')
    // @ts-ignore
    this.value = 'v: '
    expect(fn(2)).toBe('v: 3')
  })
  it('test complex curry._', () => {
    const add = (i1: number, i2: number, i3: number, i4: number, i5: number) =>
      i1 + i2 + i3 + i4 + i5
    expect(curry(add)(curry._, 2)(1, curry._)(3, curry._, 5)(4)).toBe(15)
  })
  it('test curry toString', () => {
    const add = (i1: number, i2: number, i3: number) => i1 + i2 + i3
    expect(curry(add)(1)(2).toString()).toBe('name: add, args: [1, 2]')
  })
})
