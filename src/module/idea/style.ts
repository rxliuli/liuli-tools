import { isNullOrUndefined } from '../obj/isNullOrUndefined'

interface StyleGetSetMethod<P extends keyof CSSStyleDeclaration> {
  fn(): CSSStyleDeclaration[P]
  fn(val: CSSStyleDeclaration[P]): StyleMapping
}
type StyleMapping = {
  [P in keyof CSSStyleDeclaration]: StyleGetSetMethod<
    P
  >[keyof StyleGetSetMethod<P>]
}

const handler: ProxyHandler<CSSStyleDeclaration> = {
  get(_: CSSStyleDeclaration, k: PropertyKey): any {
    return function(v: any) {
      if (v === undefined) {
        return _[k as any]
      }
      _[k as any] = v
      return new Proxy(_, handler)
    }
  },
}

/**
 * 包装 DOM 的 style 以便捷进行取值/赋值
 * 注: 如果没有查询到 DOM 节点则返回 `null`
 * 灵感来自: <https://tobiasahlin.com/blog/chaining-styles-with-proxy/>
 * @param val 需要包装的 DOM 或者 DOM 选择器
 * @returns 需要包装的
 */
export function style<E extends Element = Element>(
  val: string | Element,
): StyleMapping | null {
  const ele =
    val instanceof HTMLElement
      ? val
      : typeof val === 'string'
      ? document.querySelector<HTMLElement>(val)
      : null
  if (isNullOrUndefined(ele)) {
    return null
  }
  return new Proxy(ele.style, handler) as any
}
