import { ValuesType } from 'utility-types'
import { ClassUtil } from '@liuli-util/object'

/**
 * 异步数组的基本接口
 * 仅声明一些纯函数，真正的链式异步调用在外层 API 实现
 */
export interface BaseAsyncArray {
  reduce<T extends any[], R>(
    arr: T,
    fn: (res: R, item: ValuesType<T>, index: number) => Promise<R>,
    res: R,
  ): Promise<R>

  map<T extends any[], R>(
    arr: T,
    fn: (item: ValuesType<T>, index: number) => Promise<R>,
  ): Promise<R[]>

  filter<T extends any[]>(
    arr: T,
    fn: (item: ValuesType<T>, index: number) => Promise<boolean>,
  ): Promise<T[]>

  forEach<T extends any[]>(
    arr: T,
    fn: (item: ValuesType<T>, index: number) => Promise<void>,
  ): Promise<void>
}

export abstract class BasicAsyncArray
  implements Pick<BaseAsyncArray, 'reduce'> {
  reduce<T extends any[], R>(
    arr: T,
    fn: (res: R, item: ValuesType<T>, index: number) => Promise<R>,
    res: R,
  ): Promise<R> {
    return arr.reduce(
      (res: Promise<R>, item: ValuesType<T>, index: number) =>
        res.then((r) => fn(r, item, index)),
      Promise.resolve(res),
    )
  }
}

export class SerialAsyncArray
  extends BasicAsyncArray
  implements BaseAsyncArray {
  map<T, R>(
    arr: T[],
    fn: (item: T, index: number) => Promise<R>,
  ): Promise<R[]> {
    return this.reduce(
      arr,
      async (res, ...args) => {
        res.push(await fn(...args))
        return res
      },
      [] as R[],
    )
  }

  async filter<T>(
    arr: T[],
    fn: (item: T, index: number) => Promise<boolean>,
  ): Promise<T[]> {
    return await this.reduce(
      arr,
      async (res, item, index) => {
        if (await fn(item, index)) {
          res.push(item)
        }
        return res
      },
      [] as T[],
    )
  }

  async forEach<T extends any[]>(
    arr: T,
    fn: (item: ValuesType<T>, index: number) => Promise<void>,
  ): Promise<void> {
    await this.reduce(
      arr,
      async (res, item, index) => {
        await fn(item, index)
        return res
      },
      null,
    )
  }
}

export class ParallelAsyncArray
  extends BasicAsyncArray
  implements BaseAsyncArray {
  map<T, R>(
    arr: T[],
    fn: (item: T, index: number) => Promise<R>,
  ): Promise<R[]> {
    return Promise.all(arr.map((item, index) => fn(item, index)))
  }

  async filter<T>(
    arr: T[],
    fn: (item: T, index: number) => Promise<boolean>,
  ): Promise<T[]> {
    const res: T[] = []
    await this.map(arr, async (item, index) => {
      if (await fn(item, index)) {
        res.push(item)
      }
    })
    return res
  }

  async forEach<T extends any[]>(
    arr: T,
    fn: (item: ValuesType<T>, index: number) => Promise<void>,
  ): Promise<void> {
    await this.map(arr, fn)
  }
}

export const serialAsyncArray = ClassUtil.bindMethodThis(new SerialAsyncArray())
export const parallelAsyncArray = ClassUtil.bindMethodThis(
  new ParallelAsyncArray(),
)

enum ActionTypeEnum {
  Filter = 'filter',
  Map = 'map',
  ForEach = 'forEach',
  Reduce = 'reduce',
  Parallel = 'parallel',
  Serial = 'serial',
}

class Action {
  public static Type = ActionTypeEnum

  constructor(
    public readonly type: ActionTypeEnum,
    public readonly args: any[],
  ) {
    this.type = type
    this.args = args
  }
}

export class AsyncArray<T> implements PromiseLike<T[]> {
  private tasks: Action[] = []

  constructor(private readonly arr: T[]) {}

  map<R>(fn: (item: T, index: number) => Promise<R>): AsyncArray<R> {
    this.tasks.push(new Action(ActionTypeEnum.Map, [fn]))
    return this as any
  }

  filter(fn: (item: T, index: number) => Promise<boolean>): this {
    this.tasks.push(new Action(ActionTypeEnum.Filter, [fn]))
    return this
  }

  parallel(): this {
    this.tasks.push(new Action(ActionTypeEnum.Parallel, []))
    return this
  }

  serial(): this {
    this.tasks.push(new Action(ActionTypeEnum.Serial, []))
    return this
  }

  then<TResult1 = T[], TResult2 = never>(
    resolve?:
      | ((value: T[]) => PromiseLike<TResult1> | TResult1)
      | undefined
      | null,
    reject?:
      | ((reason: any) => PromiseLike<TResult2> | TResult2)
      | undefined
      | null,
  ): PromiseLike<TResult1 | TResult2> {
    const res = this.value()
    res
      .then((r) => {
        resolve && resolve(res as any)
        return r
      })
      .catch((e) => {
        reject && reject(e as any)
        throw e
      })
    return res as any
  }

  private async value(): Promise<any> {
    let isSerial = false

    function getAsyncArray() {
      return isSerial ? serialAsyncArray : parallelAsyncArray
    }

    let res = this.arr
    for (const task of this.tasks) {
      switch (task.type) {
        case ActionTypeEnum.Filter:
          res = await getAsyncArray().filter(res, task.args[0])
          break
        case ActionTypeEnum.Map:
          res = await getAsyncArray().map(res, task.args[0])
          break
        case ActionTypeEnum.ForEach:
          await getAsyncArray().forEach(res, task.args[0])
          return
        case ActionTypeEnum.Reduce:
          return await getAsyncArray().reduce(res, task.args[0], task.args[1])
        case ActionTypeEnum.Parallel:
          isSerial = false
          break
        case ActionTypeEnum.Serial:
          isSerial = true
          break
      }
    }
    return res
  }
}
