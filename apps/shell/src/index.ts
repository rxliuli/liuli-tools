import path from 'path'
import { copy, mkdirp, move, pathExists, remove } from 'fs-extra'
import { AsyncArray } from '@liuli-util/async'

export class ShellProgram {
  /**
   * 删除指定的文件或目录（即便它可能有子目录）
   * @param files
   */
  static async remove(files: string[]) {
    await Promise.all(files.map((file) => remove(path.resolve(file))))
  }

  private static async basicCopyOrMove(
    files: string[],
    op: (src: string, dest: string) => Promise<void>,
  ) {
    const sources = files.slice(0, files.length - 1)
    const dest = files[files.length - 1]
    if (sources.length > 1) {
      await AsyncArray.forEach(sources, async (source) => {
        await op(
          path.resolve(source),
          path.resolve(dest, path.basename(source)),
        )
      })
    } else if (sources.length === 1) {
      const source = sources[0]
      if (await pathExists(path.resolve(dest))) {
        await op(
          path.resolve(source),
          path.resolve(dest, path.basename(source)),
        )
      } else {
        await op(path.resolve(source), path.resolve(dest))
      }
    }
  }

  /**
   * 复制文件或目录到指定位置
   * 1. 源文件只有一个
   *   1. 目标位置存在，则复制文件到目录下。例如 cp public dist/ 则会将 public 复制到 dist/public
   *   2. 目标位置不存在，则将之复制并重命名到指定位置。例如 cp public dist/static 则会将 public 复制到 dist/static
   * 2. 源文件有多个，则复制文件到目录下（如果不存在则自动创建）。例如 cp public package.json dist/ 则会将 public,package.json 复制到 dist/ 目录
   * @param files
   */
  static async copy(files: string[]) {
    await ShellProgram.basicCopyOrMove(files, copy)
  }
  /**
   * 移动文件或目录到指定位置
   * 基本上与 copy 的逻辑一致
   * @param files
   */
  static async move(files: string[]) {
    await ShellProgram.basicCopyOrMove(files, move)
  }

  /**
   * 递归创建指定的目录
   * @param dirs
   */
  static async mkdir(dirs: string[]) {
    await Promise.all(dirs.map((source) => mkdirp(path.resolve(source))))
  }
}
