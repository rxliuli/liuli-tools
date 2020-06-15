import { ArrayKFn } from '../interface/ArrayKFn';
import { ArrayDeconstruct } from '../interface/ArrayDeconstruct';
export declare function arrayToMap<T extends any[], K, V>(arr: T, k: ArrayKFn<ArrayDeconstruct<T>, K>): Map<K, ArrayDeconstruct<T>>;
export declare function arrayToMap<T extends any[], K, V>(arr: T, k: ArrayKFn<ArrayDeconstruct<T>, K>, v?: ArrayKFn<ArrayDeconstruct<T>, V>): Map<K, V>;
//# sourceMappingURL=arrayToMap.d.ts.map