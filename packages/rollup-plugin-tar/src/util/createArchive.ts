import { create, CreateOptions } from 'tar'
import * as path from 'path'
import FastGlob from 'fast-glob'

export interface ArchiveOptions {
  // sourceDir 源目录，一般设置为 dist
  sourceDir: string
  // destPath 目标位置，可能是 <packageName>.jpl
  destPath: string
}

/**
 * 创建 jpl 压缩文件
 * @param options
 */
export async function createArchive(options: ArchiveOptions): Promise<void> {
  const sourceDir = path.resolve(options.sourceDir)
  const destPath = path.resolve(options.destPath)
  console.log('createArchive: ', sourceDir, destPath)
  const distFiles = (await FastGlob(`./**`, { onlyFiles: true, cwd: sourceDir })).map((f) =>
    f.substring(sourceDir.length + 1),
  )
  await create(
    {
      strict: true,
      portable: true,
      file: destPath,
      cwd: sourceDir,
      sync: true,
    } as Partial<CreateOptions>,
    distFiles,
  )
}
