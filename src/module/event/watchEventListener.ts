import { watch } from '../function/watch'
import { groupBy } from '../array/groupBy'

/**
 * 用来保存监听到的事件信息
 */
class Event {
  constructor(
    public el: any,
    public type: string,
    public listener: EventListenerOrEventListenerObject | null,
    public options?: boolean | AddEventListenerOptions,
  ) {}
}
/**
 * 监听 event 的添加
 * 注：必须及早添加
 */
export function watchEventListener() {
  /**
   * 监听所有的 addEventListener, removeEventListener 事件
   */
  const documentAddEventListener = document.addEventListener
  const eventTargetAddEventListener = EventTarget.prototype.addEventListener
  const documentRemoveEventListener = document.removeEventListener
  const eventTargetRemoveEventListener =
    EventTarget.prototype.removeEventListener
  let events: Event[] = []

  /**
   * 自定义的添加事件监听函数
   * @param {String} type 事件类型
   * @param {EventListener} listener 事件监听函数
   * @param {Boolean} [useCapture=true] 是否需要捕获事件冒泡，默认为 false
   */
  function addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    useCapture?: boolean | AddEventListenerOptions,
  ) {
    // @ts-ignore
    const _this = this
    const $addEventListener =
      _this === document
        ? documentAddEventListener
        : eventTargetAddEventListener
    events.push(new Event(_this, type, listener, useCapture))
    // @ts-ignore
    $addEventListener.apply(this, type, listener, useCapture)
  }

  /**
   * 自定义的根据类型删除事件函数
   * 该方法会删除这个类型下面全部的监听函数，不管数量
   * @param {String} type 事件类型
   */
  // @ts-ignore
  function removeEventListenerByType(type: string) {
    // @ts-ignore
    const _this = this
    const $removeEventListener =
      _this === document
        ? documentRemoveEventListener
        : eventTargetRemoveEventListener
    const map: Map<boolean, Event[]> = groupBy(
      events,
      e => e.el === _this && e.type === type,
    )
    const removeArr = map.get(true)
    removeArr!.forEach(e => {
      // @ts-ignore
      $removeEventListener.apply(e.el, [e.type, e.listener, e.useCapture])
    })
    // @ts-ignore
    events = map.get(false)
  }

  // @ts-ignore
  document.addEventListener = EventTarget.prototype.addEventListener = addEventListener
  // 此处是为了新增函数 removeEventListenerByType
  // @ts-ignore
  document.removeEventListenerByType = EventTarget.prototype.removeEventListenerByType = removeEventListenerByType
}
