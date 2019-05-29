/**
 * 路径工具
 */
export declare class PathUtil {
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
    /**
     * 拼接多个路径
     *
     * @param paths 路径数组
     * @return {String} 拼接完成的路径
     */
    join(...paths: string[]): string;
}
/**
 * 导出一个路径工具类
 */
export declare const pathUtil: PathUtil;
//# sourceMappingURL=pathUtil.d.ts.map