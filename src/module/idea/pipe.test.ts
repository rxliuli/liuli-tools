import { pipe } from './pipe'

describe('测试 pipe', () => {
  it('基本示例', () => {
    type DescArray<T extends any[]> = T extends (infer U)[] ? U : never
    const fill = <T, A extends T[]>(value: T, start?: number, end?: number) => (
      arr: A,
    ) => arr.fill(value, start, end)
    const filter = <A extends any[]>(
      func: (value: DescArray<A>, index: number, array: A) => boolean,
    ) => (arr: A) => arr.filter(func as any)
    const map = <A extends any[], U>(
      func: (value: DescArray<A>, index: number, array: A) => U,
    ) => (arr: A) => arr.map(func as any)
    const join = <T, A extends T[]>(separator?: string) => (arr: A) =>
      arr.join(separator)

    const res = pipe(
      fill(0),
      map((_, i) => i),
      filter((i: any) => i % 2 === 1),
      join(','),
    )(Array(10))
    expect(res).toEqual('1,3,5,7,9')
  })
})
