/**
 * 切换 DOM 元素的 class
 * @param {Element} el DOM 元素
 * @param {Object} obj 切换的状态/class 键值对象
 * @return 根据状态切换 class 的函数
 */
export declare function toggleClass<K extends Exclude<PropertyKey, symbol>>(el: Element, obj: Record<K, string>): (state: K) => void;
//# sourceMappingURL=toggleClass.d.ts.map