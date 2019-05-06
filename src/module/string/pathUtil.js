/**
 * 路径工具
 */
export class PathUtil {
  /**
   * 拼接两个路径
   *
   * @param {String} pathStart 开始路径
   * @param {String} pathEnd   结束路径
   * @return {String} 拼接完成的两个路径
   */
  static _join (pathStart, pathEnd) {
    if (pathStart.endsWith(PathUtil.Separator)) {
      return (pathStart + pathEnd).replace(
        PathUtil.Separator + PathUtil.Separator,
        PathUtil.Separator
      )
    }
    if (pathEnd.startsWith(PathUtil.Separator)) {
      return pathStart + pathEnd
    }
    return pathStart + PathUtil.Separator + pathEnd
  }
  /**
   * 拼接多个路径
   *
   * @param {...String} paths 路径数组
   * @return {String} 拼接完成的路径
   */
  join (...paths) {
    return paths.reduce(PathUtil._join)
  }
}
/**
 * 路径分隔符
 */
PathUtil.Separator = '/'

/**
 * 导出一个路径工具类
 */
export const pathUtil = new PathUtil()
