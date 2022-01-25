import { readFile, writeFile } from 'fs-extra'
import path from 'path'

enum FlagEnum {
  Begin = '//region env2dts',
  End = '//endregion env2dts',
}

/**
 * 在指定位置插入代码
 * @param old
 * @param map
 */
export function insertCode(old: string, map: Map<string, string>): string {
  const lines = old.split('\n')
  const beginIndex = lines.findIndex((line) => line.includes(FlagEnum.Begin))
  const endIndex = lines.findIndex((line) => line.includes(FlagEnum.End))
  if (beginIndex === -1 || endIndex === -1) {
    throw new Error('没有找到下标')
  }
  const otherCode = [...lines.slice(0, beginIndex + 1), ...lines.slice(endIndex, lines.length)].join('\n')

  return [
    ...lines.slice(0, beginIndex + 1),
    ...[...map].filter(([env, code]) => !otherCode.includes(env)).map(([, code]) => '  ' + code),
    ...lines.slice(endIndex, lines.length),
  ].join('\n')
}

/**
 * 将生成的 dts 代码写入到指定文件中
 * @param file
 * @param map
 */
export async function write(file: string, map: Map<string, string>): Promise<void> {
  const res = await readFile(path.resolve(file), 'utf-8')
  await writeFile(path.resolve(file), insertCode(res, map))
}
