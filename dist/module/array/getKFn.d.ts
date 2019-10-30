import { ArrayKFn } from '../interface/ArrayKFn';
import { ArrayCallback } from '../interface/ArrayCallback';
/**
 * 获取提取对象属性的函数
 * @param k 提取对象属性的函数或者是属性名（允许使用 . 进行分割）
 * @returns 提取对象属性的函数
 */
export declare function getKFn<T, R>(k: ArrayKFn<T, R>): ArrayCallback<T, R>;
//# sourceMappingURL=getKFn.d.ts.map