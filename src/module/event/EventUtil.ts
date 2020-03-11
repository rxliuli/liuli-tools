import { groupBy } from '../array/groupBy'

/**
 * 缓存的事件监听对象
 */
interface CacheListener {
  /**
   * @property 事件的类型
   */
  type: string
  /**
   * @property 事件的监听函数
   */
  listener: Function
  /**
   * @property 事件监听器选项
   */
  options?: boolean | AddEventListenerOptions
}

type EventOriginType = Document | Element | Window

/**
 * 事件工具类
 */
export class EventUtil {
  /**
   * 缓存的事件监听对象映射表
   */
  private static listenerMap: Map<EventOriginType, CacheListener[]> = new Map()

  //region add

  static add<K extends keyof DocumentEventMap>(
    dom: Document,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  static add(
    dom: Document,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void
  static add<K extends keyof ElementEventMap>(
    el: Element,
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  static add(
    el: Element,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void
  static add<K extends keyof WindowEventMap>(
    window: Window,
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  static add(
    window: Window,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void
  static add(
    dom: EventOriginType,
    type: any,
    listener: any,
    options?: boolean,
  ): void {
    if (!EventUtil.listenerMap.has(dom)) {
      EventUtil.listenerMap.set(dom, [])
    }
    EventUtil.listenerMap.get(dom)!.push({
      type,
      listener,
      options,
    })
    dom.addEventListener(type, listener, options)
  }

  //endregion

  //region remove

  static remove<K extends keyof DocumentEventMap>(
    dom: Document,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void
  static remove(
    dom: Document,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void
  static remove<K extends keyof ElementEventMap>(
    el: Element,
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void
  static remove(
    el: Element,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void
  static remove<K extends keyof WindowEventMap>(
    dom: Window,
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void
  static remove(
    dom: Window,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void
  static remove(
    dom: EventOriginType,
    type: any,
    listener: any,
    options?: boolean,
  ): void {
    dom.removeEventListener(type, listener as any, options)
    EventUtil.listenerMap.set(
      dom,
      (EventUtil.listenerMap.get(dom) || []).filter(
        cacheListener =>
          cacheListener.type !== type ||
          cacheListener.listener !== listener ||
          cacheListener.options !== options,
      ),
    )
  }

  //endregion

  //region removeByType

  static removeByType<K extends keyof DocumentEventMap>(
    dom: Document,
    type: K,
    options?: boolean | EventListenerOptions,
  ): CacheListener[]
  static removeByType(
    dom: Document,
    type: string,
    options?: boolean | EventListenerOptions,
  ): CacheListener[]
  static removeByType<K extends keyof ElementEventMap>(
    el: Element,
    type: K,
    options?: boolean | EventListenerOptions,
  ): CacheListener[]
  static removeByType(
    el: Element,
    type: string,
    options?: boolean | EventListenerOptions,
  ): CacheListener[]
  static removeByType<K extends keyof WindowEventMap>(
    dom: Window,
    type: K,
    options?: boolean | EventListenerOptions,
  ): CacheListener[]
  static removeByType(
    dom: Window,
    type: string,
    options?: boolean | EventListenerOptions,
  ): CacheListener[]
  static removeByType(
    dom: EventOriginType,
    type: any,
    options?: boolean,
  ): CacheListener[] {
    const listenerList = EventUtil.listenerMap.get(dom)
    if (listenerList === undefined) {
      return []
    }
    const map = groupBy(
      listenerList,
      cacheListener =>
        type === cacheListener.type && options === cacheListener.options,
    )
    const removeCacheListenerList = map.get(true) || []
    const retainCacheListenerList = map.get(true) || []
    EventUtil.listenerMap.set(dom, retainCacheListenerList)
    return removeCacheListenerList.map(cacheListener => {
      dom.removeEventListener(
        cacheListener.type,
        cacheListener.listener as any,
        cacheListener.options,
      )
      return cacheListener
    })
  }

  //endregion
}
