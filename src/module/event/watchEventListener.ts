import { EventUtil } from './EventUtil'

/**
 * 监听 event 的添加/删除，使 DOM 事件是可撤销的
 * 注：必须及早运行，否则无法监听之前添加的事件
 * @deprecated 实际上 EventUtil 已经更好的实现了这个功能，如果需要则直接修改原型即可，无需使用该函数
 */
export function watchEventListener() {
  document.addEventListener = EventTarget.prototype.addEventListener = EventUtil.add as any
  // @ts-ignore
  document.removeEventListenerByType = EventTarget.prototype.removeEventListenerByType = EventUtil.removeByType as any
}
