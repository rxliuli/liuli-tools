import { ArrayCallback } from '../interface/ArrayCallback';
export declare function toObject<T, K extends PropertyKey>(arr: T[], kFn: ArrayCallback<T, K>): Record<PropertyKey, T>;
export declare function toObject<T, K extends PropertyKey, V>(arr: T[], kFn: ArrayCallback<T, K>, vFn: ArrayCallback<T, V>): Record<PropertyKey, V>;
//# sourceMappingURL=toObject.d.ts.map