const Change = Symbol('change')
const Path = Symbol('path')

type PeekObject<T extends object> = T & {
  [Change]: Map<PropertyKey[], any>
  [Path]?: PropertyKey[]
}

/**
 * 记录对象的修改
 * 1. 传入一个对象
 * 2. 使用代理监听所有的操作
 * 3. 如果是获取对象类型的属性，则为该属性添加同样的代理
 * 4. 如果设置对象的属性，则记录本次修改的值
 * 5. 根据所有修改的值构建一个新的对象
 * @param obj 需要修改的对象
 * @returns 能够记录修改的对象
 */
export class Peek {
  constructor() {
    this.peek.bind(this)
    this.compute.bind(this)
    this.reset.bind(this)
  }
  public peek<T extends object>(obj: T): PeekObject<T> {
    // 保存旧值
    const map = new Map<PropertyKey[], any>()
    const handler: ProxyHandler<PeekObject<T>> = {
      get(_, k) {
        const v = Reflect.get(_, k)
        if (k === Path || k === Change || typeof v !== 'object') {
          return v
        }
        const res = new Proxy(v, handler)
        Reflect.set(res, Path, [...(_[Path] || []), k])
        return res
      },
      set(_, k, v) {
        Reflect.set(_, k, v)
        if (k === Path || k === Change) {
          return true
        }
        const path = [...(_[Path] || []), k]
        const peekOld = map.get(path)
        if (Array.isArray(_)) {
          map.set(_[Path] || [], _)
          return true
        }
        map.set(path, v)
        return true
      },
    }
    const res = new Proxy(obj, handler) as any
    res[Change] = map
    return res
  }
  /**
   * 计算修改的属性
   * @param obj 监听修改的对象
   * @returns 修改的部分
   */
  public compute<T extends PeekObject<object>>(obj: T): T {
    const res = Object.create(null)
    const map: Map<PropertyKey[], any> = obj[Change]
    Array.from(map).forEach(([paths, now]) => {
      paths.reduce((res, k, i) => {
        if (i === paths.length - 1) {
          Reflect.set(res, k, now)
          return
        }
        if (!Reflect.has(res, k)) {
          Reflect.set(res, k, {})
        }
        return Reflect.get(res, k)
      }, res)
    })
    return res
  }
  /**
   * 重置该对象的修改属性
   */
  public reset(obj: PeekObject<object>): void {
    obj[Change].clear()
  }
}

export const peekInstance = new Peek()
