import { ValuesType } from 'utility-types'

enum ActionTypeEnum {
  Filter = 'filter',
  Map = 'map',
  ForEach = 'forEach',
  Reduce = 'reduce',
  FlatMap = 'flatMap',
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

/**
 * 异步数组，支持静态方法和链式调用
 */
export class AsyncArray<T> implements PromiseLike<T[]> {
  static reduce<T extends any[], R>(
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

  static map<T, R>(
    arr: T[],
    fn: (item: T, index: number) => Promise<R>,
  ): Promise<R[]> {
    return Promise.all(arr.map((item, index) => fn(item, index)))
  }

  static async filter<T>(
    arr: T[],
    fn: (item: T, index: number) => Promise<boolean>,
  ): Promise<T[]> {
    const res: T[] = []
    await AsyncArray.map(arr, async (item, index) => {
      if (await fn(item, index)) {
        res.push(item)
      }
    })
    return res
  }

  static async flatMap<T, R>(
    arr: T[],
    fn: (item: T, index: number) => Promise<R[]>,
  ): Promise<R[]> {
    return (
      await Promise.all(arr.map((item, index) => fn(item, index)))
    ).flatMap((r) => r)
  }

  static async forEach<T extends any[]>(
    arr: T,
    fn: (item: ValuesType<T>, index: number) => Promise<void>,
  ): Promise<void> {
    await AsyncArray.map(arr, fn)
  }

  private tasks: Action[] = []

  constructor(private readonly arr: T[]) {}

  map<R>(fn: (item: T, index: number) => Promise<R>): AsyncArray<R> {
    this.tasks.push(new Action(ActionTypeEnum.Map, [fn]))
    return this as any
  }

  flatMap<R>(fn: (item: T, index: number) => Promise<R[]>): AsyncArray<R> {
    this.tasks.push(new Action(ActionTypeEnum.FlatMap, [fn]))
    return this as any
  }

  filter(fn: (item: T, index: number) => Promise<boolean>): this {
    this.tasks.push(new Action(ActionTypeEnum.Filter, [fn]))
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
    let res = this.arr
    for (const task of this.tasks) {
      switch (task.type) {
        case ActionTypeEnum.Filter:
          res = await AsyncArray.filter(res, task.args[0])
          break
        case ActionTypeEnum.Map:
          res = await AsyncArray.map(res, task.args[0])
          break
        case ActionTypeEnum.FlatMap:
          res = await AsyncArray.flatMap(res, task.args[0])
          break
        case ActionTypeEnum.ForEach:
          await AsyncArray.forEach(res, task.args[0])
          return
        case ActionTypeEnum.Reduce:
          return await AsyncArray.reduce(res, task.args[0], task.args[1])
      }
    }
    return res
  }
}
