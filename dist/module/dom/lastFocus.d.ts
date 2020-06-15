import { Nullable } from '../interface/Nullable';
/**
 * 获取到最后一个获得焦点的元素
 * @returns 最后一个获取到焦点的元素
 */
declare function _lastFocus(): Nullable<Element> | EventTarget;
export declare const lastFocus: typeof _lastFocus & {
    init(): void;
};
export {};
//# sourceMappingURL=lastFocus.d.ts.map