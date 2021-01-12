import { next } from './next'
import { Func } from 'liuli-types'

describe('测试 AsyncChain', () => {
  it('基本示例', () => {
    const fn0 = (next: Func | undefined, i: number) => {
      console.log(i)
      next && next(i)
    }
    const fn1 = (next: Func | undefined, i: number) => {
      console.log(i + 1)
      next && next(i)
    }
    const fn2 = (next: Func | undefined, i: number) => {
      console.log(i + 2)
      next && next(i)
    }
    const fn3 = (next: Func | undefined, i: number) => {
      console.log(i + 3)
      next && next()
    }
    const fn = next(fn0).next(fn1).next(fn2).next(fn3)
    fn(1)
  })
})
