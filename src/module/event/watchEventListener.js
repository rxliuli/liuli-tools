// @ts-check
/**
 * 监听 event 的添加
 * 注：必须及早添加
 */
export function watchEventListener () {
  /**
   * 监听所有的 addEventListener, removeEventListener 事件
   */
  const documentAddEventListener = document.addEventListener
  const eventTargetAddEventListener = EventTarget.prototype.addEventListener
  const documentRemoveEventListener = document.removeEventListener
  const eventTargetRemoveEventListener =
    EventTarget.prototype.removeEventListener
  const events = []

  /**
   * 用来保存监听到的事件信息
   */
  class Event {
    constructor (el, type, listener, useCapture) {
      this.el = el
      this.type = type
      this.listener = listener
      this.useCapture = useCapture
    }
  }

  /**
   * 自定义的添加事件监听函数
   * @param {String} type 事件类型
   * @param {EventListener} listener 事件监听函数
   * @param {Boolean} [useCapture=true] 是否需要捕获事件冒泡，默认为 false
   */
  function addEventListener (type, listener, useCapture = false) {
    const _this = this
    const $addEventListener =
      _this === document
        ? documentAddEventListener
        : eventTargetAddEventListener
    events.push(new Event(_this, type, listener, useCapture))
    $addEventListener.apply(this, arguments)
  }

  /**
   * 自定义的根据类型删除事件函数
   * 该方法会删除这个类型下面全部的监听函数，不管数量
   * @param {String} type 事件类型
   */
  // @ts-ignore
  function removeEventListenerByType (type) {
    const _this = this
    const $removeEventListener =
      _this === document
        ? documentRemoveEventListener
        : eventTargetRemoveEventListener
    const removeIndexArr = events
      .map((e, i) => (e.el === _this || e.type === arguments[0] ? i : -1))
      .filter(i => i !== -1)
    removeIndexArr.forEach(i => {
      const e = events[i]
      $removeEventListener.apply(e.el, [e.type, e.listener, e.useCapture])
    })
    removeIndexArr.sort((a, b) => b - a).forEach(i => events.splice(i, 1))
  }

  ;(function initWatchDOM () {
    document.addEventListener = EventTarget.prototype.addEventListener = addEventListener
    // 此处是为了新增函数 removeEventListenerByType
    // @ts-ignore
    document.removeEventListenerByType = EventTarget.prototype.removeEventListenerByType = removeEventListenerByType
  })()
}
