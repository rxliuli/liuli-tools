import { ReturnFunc } from '../interface/ReturnFunc'
import { compatibleAsync } from '../..'

interface BaseOnce {
  /**
   * 将指定函数包装为只调用一次，其他的调用返回旧值
   * 主要适用场景是只允许调用一次的地方，例如 Tab 的初始化
   * 本质上 {@link limit} 的特化
   * * 示意图:
   * a => b => c => d => e =>
   * a ==|====|====|====|====>
   *     |b   |c   |d   |e  (die)
   *
   * @param fn 需要包装的函数
   * @returns 包装后的函数
   */
  once<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
  ): Fn & { origin: Fn; clear: () => void }

  /**
   * 包装一个函数为只执行指定次数的函数
   * @param fn 需要包装的函数
   * @param max 最大执行次数
   * @returns 包装后的函数
   */
  limit<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    max: number,
  ): Fn & { origin: Fn; clear: () => void }
  /**
   * 包装一个函数为指定参数只执行一次的函数
   * @param fn 需要包装的函数
   * @param identity 参数转换的函数，参数为需要包装函数的参数
   * @returns 需要被包装的函数
   */
  onceOfSameParam<Fn extends Function>(
    fn: Fn,
    identity?: (...args: any[]) => string,
  ): Fn & { origin: Fn; clear: (...keys: any[]) => void }
  /**
   * 将函数包装为同一时间只能调用一次，其他的调用返回旧值
   * 主要适用场景是同一时间只允许存在一个 UI 调用（弹出层）
   * 示意图:
   * a => b => c => d => e =>
   * a ==|===> c ==|===> e =>
   *     |b        |d     (die)
   *
   * @param func 需要包装的函数
   * @returns 包装后的函数
   */
  onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(
    func: Fn,
  ): Fn & { origin: Fn; clear: () => void }
  /**
   * 在固定时间周期内只执行函数一次
   * @param {Function} fn 执行的函数
   * @param {Number} time 时间周期
   * @returns {Function} 包装后的函数
   */
  onceOfCycle<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    time: number,
  ): Fn & { origin: Fn; clear: () => void }
}

/**
 * 抽象的 once 类，用于让 JS Class 进行继承扩展
 */
export abstract class BasicOnce implements BaseOnce {
  private className = Reflect.getPrototypeOf(this).constructor.name
  once<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error(`${this.className} 的 once 函数未实现`)
  }

  limit<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    max: number,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error(`${this.className} 的 limit 函数未实现`)
  }

  onceOfCycle<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    time: number,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error(`${this.className} 的 onceOfCycle 函数未实现`)
  }

  onceOfSameParam<Fn extends Function>(
    fn: Fn,
    identity?: (...args: any[]) => string,
  ): Fn & { origin: Fn; clear: (...keys: any[]) => void } {
    throw new Error(`${this.className} 的 onceOfSameParam 函数未实现`)
  }

  onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(
    func: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error(`${this.className} 的 onceOfSimultaneously 函数未实现`)
  }
}

/**
 * 基于内存的 once 系列函数
 */
class RamOnceClass extends BasicOnce {
  once<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    return this.limit(fn, 1)
  }

  limit<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    max: number,
  ): Fn & { origin: Fn; clear: () => void } {
    let flag = max
    let cache: R
    const res = new Proxy(fn, {
      apply(target, thisArg, args) {
        if (flag <= 0) {
          return cache
        }
        flag--
        // 如果是异步函数则返回异步的结果
        return compatibleAsync(Reflect.apply(target, thisArg, args), res => {
          cache = res
          return cache
        })
      },
    })
    return Object.assign(res, {
      origin: fn,
      clear() {
        cache = null as any
      },
    })
  }

  onceOfSameParam<Fn extends Function>(
    fn: Fn,
    identity = (...args: any[]) =>
      `onceOfSameParam-${fn.toString()}-${JSON.stringify(args)}`,
  ): Fn & { origin: Fn; clear: (...keys: any[]) => void } {
    const cacheMap = new Map()
    const res = new Proxy(fn, {
      apply(_, _this, args) {
        const key = identity(args)
        const old = cacheMap.get(key)
        if (old !== undefined) {
          return old
        }
        const res = Reflect.apply(_, _this, args)
        return compatibleAsync(res, res => {
          cacheMap.set(key, res)
          return res
        })
      },
    })
    return Object.assign(res, {
      origin: fn,
      clear(...keys: any[]): void {
        if (keys.length) {
          cacheMap.clear()
        } else {
          keys.forEach(key => cacheMap.delete(key))
        }
      },
    })
  }

  onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    let flag = false
    let cache: R
    const res = new Proxy(fn, {
      apply(_, _this, args) {
        if (flag) {
          return cache
        }
        flag = true
        return compatibleAsync(Reflect.apply(_, _this, args), res => {
          cache = res
          flag = false
          return res
        })
      },
    })
    return Object.assign(res, {
      origin: fn,
      clear() {
        cache = null as any
      },
    })
  }

  onceOfCycle<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    time: number,
  ): Fn & { origin: Fn; clear: () => void } {
    let lastUpdate: number
    let lastValue: R
    const res = new Proxy(fn, {
      apply(_, _this, args) {
        const now = Date.now()
        if (lastUpdate && now - lastUpdate < time) {
          return lastValue
        }
        return compatibleAsync(Reflect.apply(_, _this, args), res => {
          lastUpdate = now
          lastValue = res
          return res
        })
      },
    })

    return Object.assign(res, {
      origin: fn,
      clear() {
        lastValue = null as any
      },
    })
  }
}

abstract class StorageOnceClass extends BasicOnce {
  protected constructor(private storage: Storage) {
    super()
  }

  once<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    return this.limit(fn, 1)
  }

  limit<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    max: number,
  ): Fn & { origin: Fn; clear: () => void } {
    const flagKey = `StorageOnceClass_Flag_${
      Reflect.getPrototypeOf(this.storage).constructor.name
    }_${fn.toString()}`
    const cacheKey = `StorageOnceClass_Cache_${
      Reflect.getPrototypeOf(this.storage).constructor.name
    }_${fn.toString()}`
    this.storage.setItem(flagKey, max.toString())
    this.storage.setItem(cacheKey, JSON.stringify(null))
    const _this = this
    const res = new Proxy(fn, {
      apply(target, thisArg, args) {
        const flag = parseInt(_this.storage.getItem(flagKey)!)
        if (flag <= 0) {
          return JSON.parse(_this.storage.getItem(cacheKey)!)
        }
        _this.storage.setItem(flagKey, (flag - 1).toString())
        // 如果是异步函数则返回异步的结果
        return compatibleAsync(Reflect.apply(target, thisArg, args), res => {
          _this.storage.setItem(cacheKey, JSON.stringify(res))
          return res
        })
      },
    })
    return Object.assign(res, {
      origin: fn,
      clear() {
        _this.storage.setItem(cacheKey, JSON.stringify(null))
      },
    })
  }

  onceOfCycle<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    time: number,
  ): Fn & { origin: Fn; clear: () => void } {
    return super.onceOfCycle(fn, time)
  }

  onceOfSameParam<Fn extends Function>(
    fn: Fn,
    identity?: (...args: any[]) => string,
  ): Fn & { origin: Fn; clear: (...keys: any[]) => void } {
    return super.onceOfSameParam(fn, identity)
  }

  onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(
    func: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    return super.onceOfSimultaneously(func)
  }
}

/**
 * 基于 LocalStorage 的 once 系列函数
 */
class LocalStorageOnceClass extends BasicOnce {
  once<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error()
  }

  limit<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    max: number,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error()
  }

  onceOfCycle<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    time: number,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error()
  }

  onceOfSameParam<Fn extends Function>(
    fn: Fn,
    identity?: (...args: any[]) => string,
  ): Fn & { origin: Fn; clear: (...keys: any[]) => void } {
    throw new Error()
  }

  onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(
    func: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error()
  }
}

/**
 * 基于 SessionStorage 的 once 系列函数
 */
class SessionStorageOnceClass extends BasicOnce {
  once<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error()
  }

  limit<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    max: number,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error()
  }

  onceOfCycle<R, Fn extends ReturnFunc<R>>(
    fn: Fn,
    time: number,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error()
  }

  onceOfSameParam<Fn extends Function>(
    fn: Fn,
    identity?: (...args: any[]) => string,
  ): Fn & { origin: Fn; clear: (...keys: any[]) => void } {
    throw new Error()
  }

  onceOfSimultaneously<R, Fn extends ReturnFunc<R>>(
    func: Fn,
  ): Fn & { origin: Fn; clear: () => void } {
    throw new Error()
  }
}

/**
 * 绑定 this 便于使用者解构
 */
function bindObjectThis<T extends object>(obj: T): T {
  const prototypeKeys = Reflect.ownKeys(Reflect.getPrototypeOf(obj))
    //筛选掉构造函数
    .filter(k => !new Set<any>(['constructor']).has(k)) as (keyof T)[]
  prototypeKeys
    .filter(k => obj[k] instanceof Function)
    .forEach(k => {
      obj[k] = (obj[k] as any).bind(obj)
    })
  return obj
}

/**
 * 导出的 OnceUtil 实体类
 */
export const OnceInstance = {
  RamOnce: bindObjectThis(new RamOnceClass()),
  LocalStorageOnce: bindObjectThis(new LocalStorageOnceClass()),
  SessionStorageOnce: bindObjectThis(new SessionStorageOnceClass()),
}
