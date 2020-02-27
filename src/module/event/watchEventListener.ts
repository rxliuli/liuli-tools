/**
 * 监听 event 的添加/删除，使 DOM 事件是可撤销的
 * 注：必须及早运行，否则无法监听之前添加的事件
 * @deprecated 实际上 {@link EventUtil} 已经更好的实现了这个功能，如果需要则直接修改原型即可，无需使用该函数
 */
export function watchEventListener() {
  /**
   * 用来保存监听到的事件信息
   */
  class Event {
    constructor(
      public el: Element,
      public type: string,
      public listener: EventListener,
      public useCapture: boolean,
    ) {}
  }
  /**
   * 监听所有的 addEventListener, removeEventListener 事件
   */
  const documentAddEventListener = document.addEventListener
  const eventTargetAddEventListener = EventTarget.prototype.addEventListener
  const documentRemoveEventListener = document.removeEventListener
  const eventTargetRemoveEventListener =
    EventTarget.prototype.removeEventListener
  const events: Event[] = []

  /**
   * 自定义的添加事件监听函数
   * @param type 事件类型
   * @param listener 事件监听函数
   * @param [useCapture] 是否需要捕获事件冒泡，默认为 false
   */
  function addEventListener(
    type: string,
    listener: EventListener,
    useCapture = false,
  ) {
    const $addEventListener =
      // @ts-ignore
      this === document ? documentAddEventListener : eventTargetAddEventListener
    // @ts-ignore
    events.push(new Event(this, type, listener, useCapture))
    // @ts-ignore
    $addEventListener.apply(this, arguments)
  }

  /**
   * 自定义的根据类型删除事件函数
   * 该方法会删除这个类型下面全部的监听函数，不管数量
   * @param type 事件类型
   */
  function removeEventListenerByType(type: string) {
    const $removeEventListener =
      // @ts-ignore
      this === document
        ? documentRemoveEventListener
        : eventTargetRemoveEventListener
    const removeIndexList = events
      // @ts-ignore
      .map((e, i) => (e.el === this || e.type === arguments[0] ? i : -1))
      .filter(i => i !== -1)
    removeIndexList.forEach(i => {
      const e = events[i]
      $removeEventListener.apply(e.el, [e.type, e.listener, e.useCapture])
    })
    removeIndexList.sort((a, b) => b - a).forEach(i => events.splice(i, 1))
  }

  document.addEventListener = EventTarget.prototype.addEventListener = addEventListener
  // @ts-ignore
  document.removeEventListenerByType = EventTarget.prototype.removeEventListenerByType = removeEventListenerByType
}
