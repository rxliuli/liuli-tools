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

  static add<K extends keyof DocumentEventMap, D extends Document | Element>(
    dom: D,
    type: K,
    listener: (this: D, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  static add<D extends Document | Element>(
    dom: D,
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
    dom.addEventListener(type, listener as any, options)
  }

  //endregion

  //region remove

  static remove<K extends keyof DocumentEventMap, D extends Document | Element>(
    dom: D,
    type: K,
    listener: (this: D, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void
  static remove<D extends Document | Element>(
    dom: D,
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

  static removeByType<
    K extends keyof DocumentEventMap,
    D extends Document | Element
  >(
    dom: D,
    type: K,
    options?: boolean | EventListenerOptions,
  ): (readonly [Function, boolean | AddEventListenerOptions | undefined])[]
  static removeByType<D extends Document | Element>(
    dom: D,
    type: string,
    options?: boolean | EventListenerOptions,
  ): (readonly [Function, boolean | AddEventListenerOptions | undefined])[]
  static removeByType<K extends keyof WindowEventMap>(
    dom: Window,
    type: K,
    options?: boolean | EventListenerOptions,
  ): (readonly [Function, boolean | AddEventListenerOptions | undefined])[]
  static removeByType(
    dom: Window,
    type: string,
    options?: boolean | EventListenerOptions,
  ): (readonly [Function, boolean | AddEventListenerOptions | undefined])[]
  static removeByType(
    dom: EventOriginType,
    type: any,
    options?: boolean,
  ): (readonly [Function, boolean | AddEventListenerOptions | undefined])[] {
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
      const res = [cacheListener.listener, cacheListener.options] as const
      dom.removeEventListener(
        cacheListener.type,
        cacheListener.listener as any,
        cacheListener.options,
      )
      return res
    })
  }

  //endregion
}
