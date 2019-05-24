/**
 * 异步的 reduce 回调函数类型
 */
type AsyncArrayReduceCallback<T, R> = (
  res: R,
  item: T,
  index: number,
  arr: AsyncArray<T>,
) => Promise<R>
/**
 * 异步的数组一般迭代类型
 */
type AsyncArrayCallback<T, R> = (
  item: T,
  index: number,
  arr: AsyncArray<T>,
) => Promise<R>

/**
 * 异步的数组
 * 基于普通的 Array 类型实现
 */
export class AsyncArray<T> {
  /**
   * 当前数组的长度
   * 主要是为了便于与 Array 进行转换
   */
  get length() {
    return this._arr.length
  }
  /**
   * 内部的数组
   */
  private _arr: T[]
  /**
   * 构造函数
   * @param args 数组初始元素
   */
  constructor(...args: T[]) {
    this._arr = args
  }
  /**
   * 异步的 forEach
   * @param fn 异步迭代函数
   */
  public async forEach(fn: AsyncArrayCallback<T, void>): Promise<void> {
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
    fn: AsyncArrayCallback<T, boolean>,
  ): Promise<AsyncArray<T>> {
    const res = new AsyncArray<T>()
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
  public async map<R>(fn: AsyncArrayCallback<T, R>): Promise<AsyncArray<R>> {
    const res = new AsyncArray<R>()
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
    fn: AsyncArrayCallback<T, R[]>,
  ): Promise<AsyncArray<R>> {
    const res = new AsyncArray<R>()
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
  public async every(fn: AsyncArrayCallback<T, boolean>): Promise<boolean> {
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
  public async find(fn: AsyncArrayCallback<T, boolean>): Promise<T | null> {
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
    fn: AsyncArrayCallback<T, boolean>,
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
    fn: AsyncArrayReduceCallback<T, R>,
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
    fn: AsyncArrayReduceCallback<T, R>,
    res?: R,
  ): Promise<R> {
    for (let i = this.length - 1; i >= 0; i--) {
      if (res) {
        res = await fn.call(this, res, this._arr[i], i, this)
      } else {
        res = this._arr[i] as any
      }
    }
    return res as any
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
  public [Symbol.iterator]() {
    const iterator = this._arr.values()
    return {
      next() {
        return iterator.next()
      },
    }
  }
}
