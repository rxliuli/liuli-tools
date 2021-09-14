import path from 'path'

export class PathUtil {
  /**
   * 从这个项目的根目录读取，开发环境是 src/../，运行时则是 dist/../
   */
  static resolveOfProject(filePath: string): string {
    return path.resolve(__dirname, '..', filePath)
  }
}
