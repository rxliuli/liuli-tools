/**
 * 发布订阅模式
 * @typeparam T 订阅主题的类型，虽然可以为 any，但这里是刻意进行限制以避免 “全局” 的发布订阅中心对象
 * @deprecated 已废弃，请使用语义更好、类型安全且 API 更强大的 {@see EventEmitter} 进行事件总线处理
 */
export class PubSubMachine<T> {
  /**
   * 订阅者集合
   */
  private subMap = new Map<T, Function[]>()
  /**
   * 发布一个主题
   * @param topic 发布的主题
   * @param [args] 主题订阅所需要的参数
   */
  public pub(topic: any, ...args: any[]) {
    const fns = this.subMap.get(topic)
    if (fns === undefined) {
      return
    }
    fns.forEach(fn => fn(...args))
  }
  /**
   * 订阅一个主题
   * @param topic 订阅的主题
   * @param fn 回调的函数
   */
  public sub(topic: any, fn: Function) {
    if (!this.subMap.has(topic)) {
      this.subMap.set(topic, [])
    }
    this.subMap.get(topic)!.push(fn)
  }
  /**
   * 取消订阅
   * @param topic 订阅的主题
   * @param fn 订阅的函数，没有则删除这个主题下所有的函数
   */
  public unsub(topic: any, fn?: Function) {
    if (fn === undefined) {
      this.subMap.delete(topic)
      return
    }
    if (!this.subMap.has(topic)) {
      return
    }
    const fns = this.subMap.get(topic)
    fns!.splice(fns!.indexOf(fn), 1)
  }
}
