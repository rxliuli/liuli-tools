type EventType = string | number

/**
 * 事件发射/处理器
 */
export class EventEmitter {
  private readonly events = new Map<EventType, Function[]>()

  /**
   * 添加一个事件监听程序
   * @param type 监听类型
   * @param callback 处理回调
   * @returns {@code this}
   */
  add(type: EventType, callback: Function) {
    const callbacks = this.events.get(type) || []
    callbacks.push(callback)
    this.events.set(type, callbacks)
    return this
  }
  /**
   * 移除一个事件监听程序
   * @param type 监听类型
   * @param callback 处理回调
   * @returns {@code this}
   */
  remove(type: EventType, callback: Function) {
    const callbacks = this.events.get(type) || []
    this.events.set(
      type,
      callbacks.filter((fn: any) => fn !== callback),
    )
    return this
  }
  /**
   * 移除一类事件监听程序
   * @param type 监听类型
   * @returns {@code this}
   */
  removeByType(type: EventType) {
    this.events.delete(type)
    return this
  }
  /**
   * 触发一类事件监听程序
   * @param type 监听类型
   * @param args 处理回调需要的参数
   * @returns {@code this}
   */
  emit(type: EventType, ...args: any[]) {
    const callbacks = this.events.get(type) || []
    callbacks.forEach(fn => {
      fn(...args)
    })
    return this
  }

  /**
   * 获取一类事件监听程序
   * @param type 监听类型
   * @returns 一个只读的数组，如果找不到，则返回空数组 {@code []}
   */
  listeners(type: EventType) {
    return Object.freeze(this.events.get(type) || [])
  }
}
