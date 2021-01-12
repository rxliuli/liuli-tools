/**
 * 路径工具
 */
export class PathUtil {
  /**
   * 拼接多个路径
   *
   * @param paths 路径数组
   * @return {String} 拼接完成的路径
   */
  public static join(...paths: string[]): string {
    return paths.reduce(PathUtil._join)
  }
  /**
   * 路径分隔符
   */
  private static Separator = '/'
  /**
   * 拼接两个路径
   *
   * @param pathStart 开始路径
   * @param pathEnd   结束路径
   * @return {String} 拼接完成的两个路径
   */
  private static _join(pathStart: string, pathEnd: string): string {
    if (pathStart.endsWith(PathUtil.Separator)) {
      return (pathStart + pathEnd).replace(
        PathUtil.Separator + PathUtil.Separator,
        PathUtil.Separator,
      )
    }
    if (pathEnd.startsWith(PathUtil.Separator)) {
      return pathStart + pathEnd
    }
    return pathStart + PathUtil.Separator + pathEnd
  }
}

/**
 * 导出一个路径工具类
 * @deprecated 已废弃，请直接使用类的静态函数
 */
export const pathUtil = PathUtil
