import { isNullOrUndefined } from '../obj/isNullOrUndefined'
import { async } from '../async/async'
import { returnItself } from '../function/returnItself'
import { ReturnFunc } from '../interface/ReturnFunc'

/**
 * 操作类型
 */
enum ActionType {
  forEach = 'forEach',
  filter = 'filter',
  map = 'map',
  flatMap = 'flatMap',
  every = 'every',
  find = 'find',
  findIndex = 'findIndex',
  reduce = 'reduce',
  reduceRight = 'reduceRight',
  some = 'some',
  flat = 'flat',
  sort = 'sort',
}
/**
 * 保存高阶函数传入的异步操作
 * @field 异步操作的类型
 * @field 异步操作
 */
class Action {
  public static Type = ActionType
  constructor(public type: ActionType, public args: any[]) {
    this.type = type
    this.args = args
  }
}

/**
 * 异步的 reduce 回调函数类型
 */
type AsyncArrayReduceCallback<T, R, IArray> = (
  res: R,
  item: T,
  index: number,
  arr: IArray,
) => Promise<R>
/**
 * 异步的数组一般迭代类型
 */
type AsyncArrayCallback<T, R, IArray> = (
  item: T,
  index: number,
  arr: IArray,
) => Promise<R>

/**
 * 抽象异步数组，实现了一些公共的函数
 */
abstract class InnerBaseAsyncArray<T> {
  /**
   * 内部的数组
   */
  protected _arr: T[]
  /**
   * 当前数组的长度
   * 主要是为了便于与 Array 进行转换
   */
  get length() {
    return this._arr.length
  }
  /**
   * 构造函数
   * @param args 数组初始元素
   */
  constructor(...args: T[]) {
    this._arr = args
  }
  /**
   * 获取内部数组的值，将返回一个浅复制的数组
   */
  public value(): T[] {
    return this._arr.slice()
  }
  /**
   * 使该对象可以被 for-of 迭代
   */
  public *[Symbol.iterator]() {
    for (const v of this._arr) {
      yield v
    }
  }
}

/**
 * 串行的异步数组
 */
export class InnerAsyncArray<T> extends InnerBaseAsyncArray<T> {
  constructor(...args: T[]) {
    super(...args)
  }
  /**
   * 异步的 forEach
   * @param fn 异步迭代函数
   */
  public async forEach(
    fn: AsyncArrayCallback<T, void, InnerAsyncArray<T>>,
  ): Promise<void> {
    for (let i = 0; i < this.length; i++) {
      await fn.call(this, this._arr[i], i, this)
    }
  }
  /**
   * 异步的 filter
   * @param fn 异步过滤函数
   * @returns 过滤后的新数组
   */
  public async filter(
    fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T>>,
  ): Promise<InnerAsyncArray<T>> {
    const res = new InnerAsyncArray<T>()
    for (let i = this.length - 1; i >= 0; i--) {
      if (await fn.call(this, this._arr[i], i, this)) {
        res._arr.push(this._arr[i])
      }
    }
    return res
  }
  /**
   * 异步的 map
   * @param fn 异步映射函数
   * @returns 经过映射产生的新的异步数组
   */
  public async map<R>(
    fn: AsyncArrayCallback<T, R, InnerAsyncArray<T>>,
  ): Promise<InnerAsyncArray<R>> {
    const res = new InnerAsyncArray<R>()
    for (let i = 0; i < this.length; i++) {
      res._arr.push(await fn.call(this, this._arr[i], i, this))
    }
    return res
  }
  /**
   * 异步的 flatMap
   * @param fn 异步映射函数，产生一个新的数组
   * @returns 压平一层的数组
   */
  public async flatMap<R>(
    fn: AsyncArrayCallback<T, R[], InnerAsyncArray<T>>,
  ): Promise<InnerAsyncArray<R>> {
    const res = new InnerAsyncArray<R>()
    for (let i = 0; i < this.length; i++) {
      res._arr.push(...(await fn.call(this, this._arr[i], i, this)))
    }
    return res
  }
  /**
   * 异步的 every
   * @param fn 异步匹配函数
   * @returns 是否全部匹配
   */
  public async every(
    fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T>>,
  ): Promise<boolean> {
    for (let i = 0; i < this.length; i++) {
      if (!(await fn.call(this, this._arr[i], i, this))) {
        return false
      }
    }
    return true
  }
  /**
   * 异步的 find
   * @param fn 异步查询函数
   * @returns 查询到的第一个值
   */
  public async find(
    fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T>>,
  ): Promise<T | null> {
    for (let i = 0; i < this.length; i++) {
      const res = await fn.call(this, this._arr[i], i, this)
      if (res) {
        return this._arr[i]
      }
    }
    return null
  }
  /**
   * 异步 findIndex
   * @param fn 异步查询函数
   * @returns 查询到的第一个值的下标
   */
  public async findIndex(
    fn: AsyncArrayCallback<T, boolean, InnerAsyncArray<T>>,
  ): Promise<number | null> {
    for (let i = 0; i < this.length; i++) {
      const res = await fn.call(this, this._arr[i], i, this)
      if (res) {
        return i
      }
    }
    return null
  }
  /**
   * 异步的 reduce
   * @param fn 归纳函数
   * @param res 初始值，默认为第一个元素
   * @returns 归纳后的值
   */
  public async reduce<R = T>(
    fn: AsyncArrayReduceCallback<T, R, InnerAsyncArray<T>>,
    res?: R,
  ): Promise<R> {
    for (let i = 0; i < this.length; i++) {
      if (res) {
        res = await fn.call(this, res, this._arr[i], i, this)
      } else {
        res = this._arr[i] as any
      }
    }
    return res as any
  }
  /**
   * 异步的 reduceRight
   * @param fn 归纳函数
   * @param res 初始值，默认为最后一个元素
   * @returns 归纳后的值
   */
  public async reduceRight<R = T>(
    fn: AsyncArrayReduceCallback<T, R, InnerAsyncArray<T>>,
    res?: R,
  ): Promise<R> {
    for (let i = this.length - 1; i >= 0; i--) {
      if (res) {
        res = await fn.apply(this, [res, this._arr[i], i, this])
      } else {
        res = this._arr[i] as any
      }
    }
    return res as any
  }
}

/**
 * 并发的异步数组
 */
export class InnerAsyncArrayParallel<T> extends InnerBaseAsyncArray<T> {
  /**
   * 提供一个函数方便根据已有的数组或类数组（Set/Map）
   * @param arr 一个可迭代元素
   * @returns 创建一个新的异步数组包装
   */
  public static from<T>(
    arr: Iterable<T> | ArrayLike<T> | null | undefined,
  ): InnerAsyncArrayParallel<T> {
    if (isNullOrUndefined(arr)) {
      return new InnerAsyncArrayParallel()
    }
    return new InnerAsyncArrayParallel(...Array.from(arr))
  }
  constructor(...args: T[]) {
    super(...args)
  }
  /**
   * 异步的 forEach
   * 注：执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
   * @param fn 异步迭代函数
   */
  public async forEach(
    fn: AsyncArrayCallback<T, void, InnerAsyncArrayParallel<T>>,
  ): Promise<void> {
    await this._all(fn)
  }
  /**
   * 异步的 filter
   * 注：执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
   * @param fn 异步过滤函数
   * @returns 过滤后的新数组
   */
  public async filter(
    fn: AsyncArrayCallback<T, boolean, InnerAsyncArrayParallel<T>>,
  ): Promise<InnerAsyncArrayParallel<T>> {
    const res = await this._all(fn)
    const result = new InnerAsyncArrayParallel<T>()
    for (let i = 0, len = res.length; i < len; i++) {
      if (res[i]) {
        result._arr.push(this._arr[i])
      }
    }
    return result
  }
  /**
   * 异步的 map
   * 注：执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
   * @param fn 异步映射函数
   * @returns 经过映射产生的新的异步数组
   */
  public async map<R>(
    fn: AsyncArrayCallback<T, R, InnerAsyncArrayParallel<T>>,
  ): Promise<InnerAsyncArrayParallel<R>> {
    return new InnerAsyncArrayParallel(...(await this._all(fn)))
  }
  /**
   * 异步的 flatMap
   * 注：执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
   * @param fn 异步映射函数，产生一个新的数组
   * @returns 压平一层的数组
   */
  public async flatMap<R>(
    fn: AsyncArrayCallback<T, R[], InnerAsyncArrayParallel<T>>,
  ): Promise<InnerAsyncArrayParallel<R>> {
    const res = await this._all(fn)
    return new InnerAsyncArrayParallel(...res.flat())
  }
  /**
   * 异步的 every
   * 注：执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
   * 注：实际上是全部遍历一遍才会去判断是否有不符合谓词的元素，所以如果异步操作有副作用请不要使用此函数（例如 Ajax 修改数据库）
   * @param fn 异步匹配函数
   * @returns 是否全部匹配
   */
  public async every(
    fn: AsyncArrayCallback<T, boolean, InnerAsyncArrayParallel<T>>,
  ): Promise<boolean> {
    return (await this._all(fn)).every(returnItself)
  }
  /**
   * 异步的 find
   * 注：执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
   * 注：实际上是全部遍历一遍才会去判断是否有符合谓词的元素，所以如果异步操作有副作用请不要使用此函数（例如 Ajax 修改数据库）
   * @param fn 异步查询函数
   * @returns 查询到的第一个值
   */
  public async find(
    fn: AsyncArrayCallback<T, boolean, InnerAsyncArrayParallel<T>>,
  ): Promise<T | null> {
    const res = await this._all(fn)
    for (let i = 0, len = res.length; i < len; i++) {
      if (res[i]) {
        return this._arr[i]
      }
    }
    return null
  }
  /**
   * 异步 findIndex
   * 注：执行异步操作的顺序无法确定，如果顺序很重要的话（不符合 [交换律] 的操作），则不应该使用此函数
   * 注：实际上是全部遍历一遍才会去判断是否有符合谓词的元素，所以如果异步操作有副作用请不要使用此函数（例如 Ajax 修改数据库）
   * @param fn 异步查询函数
   * @returns 查询到的第一个值的下标
   */
  public async findIndex(
    fn: AsyncArrayCallback<T, boolean, InnerAsyncArrayParallel<T>>,
  ): Promise<number> {
    return (await this._all(fn)).findIndex(returnItself)
  }
  /**
   * 异步的 reduce
   * @param fn 归纳函数
   * @param res 初始值，默认为第一个元素
   * @returns 归纳后的值
   */
  public async reduce<R = T>(
    fn: AsyncArrayReduceCallback<T, R, InnerAsyncArrayParallel<T>>,
    res?: R,
  ): Promise<R> {
    for (let i = 0; i < this.length; i++) {
      if (res) {
        res = await fn.call(this, res, this._arr[i], i, this)
      } else {
        res = this._arr[i] as any
      }
    }
    return res as any
  }
  /**
   * 异步的 reduceRight
   * @param fn 归纳函数
   * @param res 初始值，默认为最后一个元素
   * @returns 归纳后的值
   */
  public async reduceRight<R = T>(
    fn: AsyncArrayReduceCallback<T, R, InnerAsyncArrayParallel<T>>,
    res?: R,
  ): Promise<R> {
    for (let i = this.length - 1; i >= 0; i--) {
      if (res) {
        res = await fn.apply(this, [res, this._arr[i], i, this])
      } else {
        res = this._arr[i] as any
      }
    }
    return res as any
  }
  private async _all<R>(
    fn: AsyncArrayCallback<T, R, InnerAsyncArrayParallel<T>>,
  ): Promise<R[]> {
    return await Promise.all(
      this._arr.map((v, i) => fn.apply(this, [v, i, this])),
    )
  }
}
export class AsyncArray<T> implements PromiseLike<T> {
  /**
   * 提供一个函数方便根据已有的数组或类数组（Set/Map）
   * @param arr 一个可迭代元素
   * @returns 创建一个新的异步数组包装
   */
  public static from<T>(
    arr: Iterable<T> | ArrayLike<T> | null | undefined,
  ): AsyncArray<T> {
    const reuslt = new AsyncArray<T>()
    if (isNullOrUndefined(arr)) {
      return reuslt
    }
    reuslt._arr = Array.from(arr)
    return reuslt
  }
  private _arr: T[]
  private _task: Action[]
  private _parallel: boolean
  constructor(...args: T[]) {
    this._arr = Array.from(args)
    /**
     * @field 保存异步任务
     * @type {Action[]}
     */
    this._task = []
    /**
     * 是否并行化
     */
    this._parallel = false
  }
  public async forEach(
    fn: AsyncArrayCallback<
      T,
      void,
      InnerAsyncArray<T> | InnerAsyncArrayParallel<T>
    >,
  ): Promise<void> {
    this._task.push(new Action(Action.Type.forEach, [fn]))
    return await this.then()
  }
  public filter(
    fn: AsyncArrayCallback<
      T,
      boolean,
      InnerAsyncArray<T> | InnerAsyncArrayParallel<T>
    >,
  ): AsyncArray<T> {
    this._task.push(new Action(Action.Type.filter, [fn]))
    return this
  }
  public map<R>(
    fn: AsyncArrayCallback<
      T,
      R,
      InnerAsyncArray<T> | InnerAsyncArrayParallel<T>
    >,
  ): AsyncArray<R> {
    this._task.push(new Action(Action.Type.map, [fn]))
    return this as any
  }
  public flatMap<R>(
    fn: AsyncArrayCallback<
      T,
      R[],
      InnerAsyncArray<T> | InnerAsyncArrayParallel<T>
    >,
  ): AsyncArray<R> {
    this._task.push(new Action(Action.Type.flatMap, [fn]))
    return this as any
  }
  public every(
    fn: AsyncArrayCallback<
      T,
      boolean,
      InnerAsyncArray<T> | InnerAsyncArrayParallel<T>
    >,
  ): Promise<boolean> {
    this._task.push(new Action(Action.Type.every, [fn]))
    return this.then()
  }
  public find(
    fn: AsyncArrayCallback<
      T,
      boolean,
      InnerAsyncArray<T> | InnerAsyncArrayParallel<T>
    >,
  ): Promise<T | null> {
    this._task.push(new Action(Action.Type.find, [fn]))
    return this.then()
  }
  public findIndex(
    fn: AsyncArrayCallback<
      T,
      boolean,
      InnerAsyncArray<T> | InnerAsyncArrayParallel<T>
    >,
  ): Promise<number> {
    this._task.push(new Action(Action.Type.findIndex, [fn]))
    return this.then()
  }
  public reduce<R = T>(
    fn: AsyncArrayReduceCallback<T, R, InnerAsyncArray<T>>,
    res?: R,
  ): Promise<R> {
    this._task.push(new Action(Action.Type.reduce, [fn]))
    return this.then()
  }
  public reduceRight<R = T>(
    fn: AsyncArrayReduceCallback<T, R, InnerAsyncArray<T>>,
    res?: R,
  ): Promise<R> {
    this._task.push(new Action(Action.Type.reduceRight, [fn]))
    return this.then()
  }
  public some(
    fn: AsyncArrayCallback<
      T,
      boolean,
      InnerAsyncArray<T> | InnerAsyncArrayParallel<T>
    >,
  ): AsyncArray<T> {
    this._task.push(new Action(Action.Type.some, [fn]))
    return this
  }
  public flat(depth = 1): AsyncArray<T> {
    this._task.push(new Action(Action.Type.flat, [depth]))
    return this
  }

  public sort(fn?: (a: T, b: T) => number): AsyncArray<T> {
    this._task.push(new Action(Action.Type.sort, [fn]))
    return this
  }
  public parallel(): AsyncArray<T> {
    this._parallel = true
    return this
  }
  public serial(): AsyncArray<T> {
    this._parallel = false
    return this
  }
  /**
   * 终结整个链式操作并返回结果
   */
  public async then(): Promise<any> {
    const asyncArray = this._parallel
      ? new InnerAsyncArray(this._arr)
      : new InnerAsyncArrayParallel(this._arr)
    let result
    for (const task of this._task) {
      result = await Reflect.get(asyncArray, task.type)(...task.args)
    }
    return result
  }
  public value(): Promise<any> {
    return this.then()
  }
}
