import { pipe } from './pipe'

describe('测试 pipe', () => {
  it('使用普通的高阶函数', () => {
    const res = pipe(
      Array(10),
      arr => arr.fill(0) as number[],
      arr => arr.map((_, i) => i),
      arr => arr.filter(i => i % 2 === 0),
      arr => arr.map(i => i.toString()),
      arr => arr.reduce((res, s) => res.concat(s.split('')), [] as string[]),
      arr => arr.join(','),
    )
    expect(res).toBe('0,2,4,6,8')
  })
  it('基本示例', () => {
    const fill = <T>(val: T) => (arr: any[]) => arr.fill(val) as T[]
    const filter = <T>(func: (val: T) => boolean) => (arr: T[]) =>
      arr.filter(func)
    const map = <T, U>(func: (val: T, i: number) => U) => (arr: T[]) =>
      arr.map(func)
    const join = <T>(separator?: string) => (arr: T[]) => arr.join(separator)
    const reduce = <T, R>(func: (res: R, val: T) => R, init: R) => (arr: T[]) =>
      arr.reduce(func, init)

    const res = pipe(
      Array(10),
      fill(0),
      map((_, i) => i),
      filter(i => i % 2 === 0),
      map(i => i.toString()),
      reduce((res, s) => res.concat(s.split('')), [] as string[]),
      join(','),
    )
    expect(res).toEqual('0,2,4,6,8')
  })
})
