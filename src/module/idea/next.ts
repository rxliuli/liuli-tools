import { Func } from 'liuli-types'

type NextFunc = (next: Func, ...args: any[]) => void
type NextChain = Func & {
  next: (next: Func, ...args: any[]) => NextChain
  nextFn: NextFunc
}

/**
 * 职责链模式
 * @param fn
 */
export function next(fn: NextFunc): NextChain {
  //保存起始节点与终结节点
  const first: any = function(...args: any[]) {
    fn(first.nextFn, ...args)
  }
  //终结节点默认为起始节点
  let last = first

  first.next = function(fn: NextFunc) {
    const nextFn = next(fn)
    last.nextFn = nextFn
    last = nextFn
    return first
  }
  //永远都返回起始节点
  return first
}
