/**
 * 点的接口
 */
export interface Point {
    readonly x: number;
    readonly y: number;
}
/**
 * 矩形接口
 */
export interface Rect {
    /**
     * 左下角的起始坐标
     */
    readonly start: Point;
    /**
     * 右上角的终点坐标
     */
    readonly end: Point;
    /**
     * 计算是否有相交或重叠
     * @param that
     */
    isIntersectsOrOverlap(that: Rect): boolean;
    /**
     * 计算相交或重叠区域，如果没有重叠则抛出异常
     * 方案 1
     * 1. 计算大致的【方向】
     * 2. 根据方向决定计算的【公式】
     * 3. 计算两个交点，生成 Rect 对象
     * 方案 2
     * 1. 计算相近四条边的交点
     * 2. 计算相近的四条边的【交集】
     * 3. 判断交集是否在矩形内
     * 4. 根据交点生成 Rect 对象
     * 参考：https://www.zhihu.com/question/28854765
     * @param that
     * @throws
     */
    intersectsOrOverlap(that: Rect): Rect;
    /**
     * 是否包含指定的矩形
     * @param that
     */
    isContains(that: Rect): boolean;
    /**
     * 判断矩形内是否包含指定点
     * @param point
     */
    isContains(point: Point): boolean;
    /**
     * 获取矩形的面积
     */
    area(): number;
}
/**
 * -1 指的是相对在负轴方向（左/下）
 * 0 指的是在该轴上相同
 * 1 指的是相对在正轴方向（右/上）
 */
export declare type SimplePointCompareType = -1 | 0 | 1;
/**
 * 基于笛卡尔坐标系的点
 */
export declare class SimplePoint implements Point {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    /**
     * 计算点的相对位置
     * 是 that 相对于当前矩形的位置
     * @param that
     */
    compare(that: Point): [SimplePointCompareType, SimplePointCompareType];
    private static compute;
}
/**
 * 简单矩形
 */
export declare class SimpleRect implements Rect {
    readonly start: SimplePoint;
    readonly end: SimplePoint;
    private static swap;
    constructor(start: Point, end: Point);
    /**
     * 计算规则参考：
     * - https://stackoverflow.com/questions/23302698/java-check-if-two-rectangles-overlap-at-any-point
     * @param that
     */
    isIntersectsOrOverlap(that: Rect): boolean;
    /**
     * 计算规则参考
     * - https://lucumt.info/post/calculate-total-area-of-two-rectangles/
     * @param that
     */
    intersectsOrOverlap(that: Rect): SimpleRect;
    isContains(that: Rect): boolean;
    isContains(point: Point): boolean;
    area(): number;
}
/**
 * 矩形的工具类
 */
export declare class RectUtil {
    static isIntersectsOrOverlap(rects: Rect[]): boolean;
    /**
     * 获取相交或重叠的矩形对列表
     * @param rects
     * @returns [相交的矩形1, 相交的矩形 2][]，如果没有任何矩形相交则返回 []
     */
    static intersectsOrOverlap(rects: Rect[]): [Rect, Rect][];
}
//# sourceMappingURL=Rect.d.ts.map