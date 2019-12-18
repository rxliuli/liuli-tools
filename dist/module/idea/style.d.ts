/**
 * 将类型映射为重载函数接口
 */
interface StyleGetSetInterface<P extends keyof CSSStyleDeclaration> {
    fn(): CSSStyleDeclaration[P];
    fn(val: CSSStyleDeclaration[P]): StyleMapping;
}
/**
 * 根据字段映射出一个重载函数类型签名
 */
declare type StyleGetSet<P extends keyof CSSStyleDeclaration> = StyleGetSetInterface<P>[keyof StyleGetSetInterface<P>];
/**
 * 返回的包装后的对象类型
 * 每个函数无参调用时返回属性值，有参调用时设置属性值
 */
declare type StyleMapping = {
    [P in keyof CSSStyleDeclaration]: StyleGetSet<P>;
};
/**
 * 包装 DOM 的 style 以便捷进行取值/赋值
 * 注: 如果没有查询到 DOM 节点则返回 `null`
 * 灵感来自: <https://tobiasahlin.com/blog/chaining-styles-with-proxy/>
 * @param val 需要包装的 DOM 或者 DOM 选择器
 * @returns 需要包装的
 */
export declare function style(val: string | Element | null): StyleMapping | null;
export {};
//# sourceMappingURL=style.d.ts.map