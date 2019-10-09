import { ArrayKFn } from '../interface/ArrayKFn';
import { ArrayReduceCallback } from '../interface/ArrayReduceCallback';
import { Supplier } from '../interface/Supplier';
/**
 * js 数组按照某个条件进行分组
 *
 * @param arr 要进行分组的数组
 * @param k 元素分组的唯一标识函数
 * @returns 元素标识 => 数组映射 Map
 * @typeparam T 数组元素的类型
 * @typeparam K 分组依据的 Key 的类型，也是结果 Map 的 K
 */
export declare function groupBy<T, K>(arr: T[], k: ArrayKFn<T, K>): Map<K, T[]>;
/**
 * js 数组按照某个条件进行分组
 *
 * @param arr 要进行分组的数组
 * @param k 元素分组的唯一标识函数
 * @param vFn 元素分组的值处理的函数。第一个参数是累计值，第二个参数是当前正在迭代的元素，如果你使用过 {@see Array.reduce} 函数的话应该对此很熟悉
 * @returns 元素标识 => 数组映射 Map
 * @typeparam T 数组元素的类型
 * @typeparam K 分组依据的 Key 的类型，也是结果 Map 的 K
 * @typeparam R 如果未指定 init 参数，则 Map 的值必然是一个数组，至于数组的类型则是任意的，由函数参数 vFn 决定
 */
export declare function groupBy<T, K, R>(arr: T[], k: ArrayKFn<T, K>, vFn: ArrayReduceCallback<T, R[]>): Map<K, R[]>;
/**
 * js 数组按照某个条件进行分组
 *
 * @param arr 要进行分组的数组
 * @param k 元素分组的唯一标识函数
 * @param vFn 元素分组的值处理的函数。第一个参数是累计值，第二个参数是当前正在迭代的元素，如果你使用过 {@link Array#reduce} 函数的话应该对此很熟悉
 * @param init 每个分组的产生初始值的函数。类似于 reduce 的初始值，但它是一个函数，避免初始值在所有分组中进行累加。
 * @returns 元素标识 => 数组映射 Map
 * @typeparam T 数组元素的类型
 * @typeparam K 分组依据的 Key 的类型，也是结果 Map 的 K
 * @typeparam V 如果指定了 init 参数，则 Map 的值类型即为 init 函数参数的返回值类型，例如可以使用 init 返回一个 Map 以实现多级级联 Map
 */
export declare function groupBy<T = any, K = any, V = []>(arr: T[], k: ArrayKFn<T, K>, vFn: ArrayReduceCallback<T, V>, init: Supplier<V>): Map<K, V>;
//# sourceMappingURL=groupBy.d.ts.map