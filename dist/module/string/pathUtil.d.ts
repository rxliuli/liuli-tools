/**
 * 路径工具
 */
export declare class PathUtil {
    /**
     * 拼接两个路径
     *
     * @param {String} pathStart 开始路径
     * @param {String} pathEnd   结束路径
     * @return {String} 拼接完成的两个路径
     */
    static _join(pathStart: any, pathEnd: any): any;
    /**
     * 拼接多个路径
     *
     * @param {...String} paths 路径数组
     * @return {String} 拼接完成的路径
     */
    join(...paths: any[]): any;
}
/**
 * 导出一个路径工具类
 */
export declare const pathUtil: PathUtil;
//# sourceMappingURL=pathUtil.d.ts.map