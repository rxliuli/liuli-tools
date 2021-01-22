import { BaseExpect, Expect, ExtractError } from '../Expect'

describe('测试 Expect', () => {
  it('基本示例', () => {
    type E4<T, R extends T> = ExtractError<BaseExpect<T, R>> extends Error
      ? Error
      : R

    type S = Extract<number, number>

    type S1 = Expect<number, number>
    type S2 = Expect<number | string, number>
    type S3 = Expect<number | string, number | string>

    type S4 = E4<number, number>
    type S5 = E4<number | string, number>
    type S6 = E4<number | string, number | string>

    type S7 = never extends never ? true : false
    type S8 = never extends Error ? true : false
    type S9 = Error extends never ? true : false
  })
})
