import { Newable } from '../interface/Newable';
/**
 * 使用 Proxy 实现通用的单例模式
 * @param clazz 需要包装为单例的类型
 * @returns 包装后的单例模式类，使用 {@code new} 创建将只在第一次有效
 */
export declare function singleModel<R extends object, Clazz extends Function = Newable<R>>(clazz: Clazz): Clazz;
//# sourceMappingURL=singleModel.d.ts.map