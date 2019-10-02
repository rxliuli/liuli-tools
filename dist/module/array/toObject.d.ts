import { ArrayKFn } from '../interface/ArrayKFn';
export declare function toObject<T, K extends PropertyKey>(arr: T[], kFn: ArrayKFn<T, K>): Record<PropertyKey, T>;
export declare function toObject<T, K extends PropertyKey, V>(arr: T[], kFn: ArrayKFn<T, K>, vFn: ArrayKFn<T, V>): Record<PropertyKey, V>;
//# sourceMappingURL=toObject.d.ts.map