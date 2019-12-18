import { ArrayKFn } from '../interface/ArrayKFn';
export declare function toObject<T, K extends PropertyKey>(arr: T[], kFn: ArrayKFn<T, K>): Record<K, T>;
export declare function toObject<T, K extends PropertyKey, V>(arr: T[], kFn: ArrayKFn<T, K>, vFn: ArrayKFn<T, V>): Record<K, V>;
//# sourceMappingURL=toObject.d.ts.map