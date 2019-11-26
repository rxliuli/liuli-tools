/**
 * 事件工具类
 */
export declare class EventUtil {
    /**
     * 缓存的事件监听对象映射表
     */
    private static listenerMap;
    static add<K extends keyof DocumentEventMap>(dom: Document, type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    static add(dom: Document, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    static add<K extends keyof WindowEventMap>(window: Window, type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    static add(window: Window, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    static remove<K extends keyof DocumentEventMap>(dom: Document, type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    static remove(dom: Document, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    static remove<K extends keyof WindowEventMap>(dom: Window, type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    static remove(dom: Window, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    static removeByType<K extends keyof DocumentEventMap>(dom: Document, type: K, options?: boolean | EventListenerOptions): void;
    static removeByType(dom: Document, type: string, options?: boolean | EventListenerOptions): void;
    static removeByType<K extends keyof WindowEventMap>(dom: Window, type: K, options?: boolean | EventListenerOptions): void;
    static removeByType(dom: Window, type: string, options?: boolean | EventListenerOptions): void;
}
//# sourceMappingURL=EventUtil.d.ts.map