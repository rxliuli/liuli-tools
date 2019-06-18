/**
 * 路径工具
 */
export declare class PathUtil {
    /**
     * 拼接多个路径
     *
     * @param paths 路径数组
     * @return {String} 拼接完成的路径
     */
    static join(...paths: string[]): string;
    /**
     * 路径分隔符
     */
    private static Separator;
    /**
     * 拼接两个路径
     *
     * @param pathStart 开始路径
     * @param pathEnd   结束路径
     * @return {String} 拼接完成的两个路径
     */
    private static _join;
}
/**
 * 导出一个路径工具类
 * @deprecated 已废弃，请直接使用类的静态函数
 */
export declare const pathUtil: typeof PathUtil;
//# sourceMappingURL=PathUtil.d.ts.map